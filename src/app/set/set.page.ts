import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {AlertController, ModalController, ViewWillEnter} from "@ionic/angular";
import {ExportModalComponent} from "../export-modal/export-modal.component";
import {ImportModalComponent} from "../import-modal/import-modal.component";

@Component({
    selector: 'app-set',
    templateUrl: './set.page.html',
    styleUrls: ['./set.page.scss'],
})
export class SetPage implements OnInit, ViewWillEnter {
    public id!: string;

    public set: any = null;

    public orginal: any = null;
    public userStat: any = null;
    public editMode = false;
    public editId = -1;

    public sortMode :string= "norm";

    constructor(private alertController: AlertController, private modalController: ModalController, private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    }

    async sort (newItem : any) {
        if (this.sortMode == "alphaAsc") {
            newItem.data = await newItem.data.sort((a: any, b: any) => {
                return a.first.localeCompare(b.first);
            });
        } else if (this.sortMode == "alphaDesc") {
            newItem.data = await  newItem.data.sort((a: any, b: any) => {
                return b.first.localeCompare(a.first);
            });
        } else if (this.userStat != null && this.userStat.data != null) {
             if (this.sortMode == "statAsc") {
                newItem.data = await  newItem.data.sort((a: any, b: any) => {
                    return  (this.getStat(b._id, 'success') + 1) / (this.getStat(b._id, 'wrong') + 1) -
                            (this.getStat(a._id, 'success') + 1) / (this.getStat(a._id, 'wrong') + 1);
                });
            } else if (this.sortMode == "statDesc") {
                newItem.data = await  newItem.data.sort((a: any, b: any) => {
                    return  (this.getStat(b._id, 'wrong') + 1) / (this.getStat(b._id, 'success') + 1) -
                            (this.getStat(a._id, 'wrong') + 1) / (this.getStat(a._id, 'success') + 1);
                });
            }
        }

        return await newItem;
    }

    ionViewWillEnter() {
        this.apiService.getSet(this.id).then((set) => {
            this.setSet(set);

            this.apiService.getUserStats(this.id).then((stat) => {
                this.userStat = stat;
            });
        });
    }

    setSet(data: any){
        this.orginal = data;
        this.sort(data).then((newItem) => {
            this.set = newItem;
        });
    }

    itemTrackBy(index : number, item: any) {
        return item._id;
    }

    status() {
        return JSON.stringify(this.set);
    }

    canBeLearned() {
        if (this.set != null && this.set?.data != null) {
            return this.set.data.length <= 0;
        }

        return false;
    }

    getLines() {
        return this.editMode ? "full" : "none";
    }

    newCard() {
        this.orginal.data.push({
            first: "",
            second: "",
        });

        this.apiService.updateSet(this.orginal.id, this.orginal).then((res) => {
            this.apiService.getSet(this.id).then((set) => {
                this.setSet(set);
            });
        });
    }

    editCard(id: number) {
        this.editMode = !this.editMode;
        this.editId = id;

        if (!this.editMode) {
            this.apiService.updateSet(this.set.id, this.set).then((res) => {
                this.apiService.getSet(this.id).then((set) => {
                    this.setSet(set);
                });
            });
        }
    }

    deleteCard(id: number) {
        if (!this.editMode) {
            for (let i = 0; i < this.set.data.length; i++) {
                if (this.set.data[i]._id == id) {
                    this.alertController.create({
                        header: "Delete",
                        message: "Are you sure you want to delete this Card?",
                        buttons: [
                            {
                                text: "No",
                            },
                            {
                                text: "Yes",
                                handler: () => {
                                    this.set.data.splice(i, 1);
                                    this.apiService.updateSet(this.set.id, this.set).then((res) => {
                                        this.apiService.getSet(this.id).then((set) => {
                                            this.setSet(set);
                                        });
                                    });
                                }
                            }
                        ]
                    }).then(r => r.present());
                    break;
                }
            }
        } else {
            this.editMode = false;
        }
    }

    getStat(id: string, type: string) {
        if (this.userStat != null && this.userStat.data != null) {
            for (let i = 0; i < this.userStat.data.length; i++) {
                if (this.userStat.data[i].cardid == id) {
                    if (this.userStat.data[i].stat[type] != null) {
                        return this.userStat.data[i].stat[type];
                    } else {
                        return 0;
                    }
                }
            }
        }
        return 0;
    }

    getStar(id: string) {
        if (this.userStat != null && this.userStat.data != null) {
            for (let i = 0; i < this.userStat.data.length; i++) {
                if (this.userStat.data[i].cardid == id) {
                    if (this.userStat.data[i].stared != null) {
                        return this.userStat.data[i].stared;
                    } else {
                        return false;
                    }
                }
            }
        }
        return false;
    }

    setStar(id: string) {
        this.apiService.updateUserStared(this.id, id, !this.getStar(id)).then((res) => {
            if (this.userStat != null && this.userStat.data != null) {
                for (let i = 0; i < this.userStat.data.length; i++) {
                    if (this.userStat.data[i].cardid == id) {
                        this.userStat.data[i].stared = !this.userStat.data[i].stared;
                    }
                }
            }

            this.apiService.getUserStats(this.id).then((stat) => {
                this.userStat = stat;
            });
        });
    }

    export() {
        this.modalController.create({
            component: ExportModalComponent,
            componentProps: {
                set: this.set
            }
        }).then(r => r.present());
    }

    import() {
        this.modalController.create({
            component: ImportModalComponent,
        }).then(r => {
            r.present();
            r.onWillDismiss().then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.set.data.push(res.data[i]);
                }

                this.apiService.updateSet(this.set.id, this.set).then((res) => {
                    this.apiService.getSet(this.id).then((set) => {
                        this.setSet(set);
                    });
                });
            });
        });
    }

    isEditMode(id: number) {
        return this.editMode && this.editId == id;
    }
}
