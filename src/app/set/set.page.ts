import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {AlertController, ViewWillEnter} from "@ionic/angular";

@Component({
    selector: 'app-set',
    templateUrl: './set.page.html',
    styleUrls: ['./set.page.scss'],
})
export class SetPage implements OnInit, ViewWillEnter {
    public id!: string;
    public set: any = null;
    public userStat : any = null;
    public editMode = false;
    public editId = -1;


    constructor(private alertController: AlertController, private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        this.apiService.getSet(this.id).then((set) => {
            this.set = set;
        });
    }

    status() {
        return JSON.stringify(this.set);
    }

    canBeLearned() {
        return this.set.data.length <= 0;
    }

    getLines() {
        return this.editMode ? "full" : "none";
    }

    newCard() {
        this.set.data.push({
            first: "",
            second: "",
        });

        this.apiService.updateSet(this.set.id, this.set).then((res) => {
            this.apiService.getSet(this.id).then((set) => {
                this.set = set;
            });
        });
    }

    editCard(id : number) {
        this.editMode = !this.editMode;
        this.editId = id;

        if (!this.editMode) {
            this.apiService.updateSet(this.set.id, this.set).then((res) => {
                this.apiService.getSet(this.id).then((set) => {
                    this.set = set;
                });
            });
        }
    }

    deleteCard(id : number) {
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
                                        this.set = set;
                                    });
                                });
                            }
                        }
                    ]
                }).then(r => r.present());
                break;
            }
        }
    }

    isEditMode(id : number) {
        return this.editMode && this.editId == id;
    }
}
