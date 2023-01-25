import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {AlertController, ViewWillEnter} from "@ionic/angular";

@Component({
    selector: 'app-sets',
    templateUrl: './sets.page.html',
    styleUrls: ['./sets.page.scss'],
})
export class SetsPage implements OnInit, ViewWillEnter {
    public Sets: any = [];

    constructor(private alertController: AlertController, private apiService: ApiService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.refresh();
    }

    refresh() {
        this.apiService.getUserSets().then((res) => {
            this.Sets = res;
        });
    }

    newSet() {
        this.alertController.create({
            header: 'Name for the new Set',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name (min 3 characters)',
                    attributes: {
                        minlength: 3,
                    },
                }
            ],
            buttons: [
                'Cancel',
                {
                    text: 'Create',
                    handler: (input) => {
                        this.apiService.createSet({
                            name: input.name,
                        }).then((res) => {
                            this.refresh();
                        });
                    },
                },
            ],
        }).then((alert) => {
            alert.present();
        });
    }

    deleteSet(id: string) {
        this.alertController.create({
            header: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                'No',
                {
                    text: 'Yes',
                    handler: () => {
                        this.apiService.deleteSet(id).then((res) => {
                            this.refresh();
                        });
                    },
                },
            ],
        }).then((alert) => {
            alert.present();
        });
    }

    renameSet(id: string) {
        this.apiService.getSet(id).then((res) => {
            this.alertController.create({
                header: 'Rename',
                inputs: [
                    {
                        name: 'name',
                        placeholder: 'Name (min 3 characters)',
                        value: res.name,
                        attributes: {
                            minlength: 3,
                        },
                    }
                ],
                buttons: [
                    'Cancel',
                    {
                        text: 'Rename',
                        handler: (input) => {
                            this.apiService.updateSet(id, {
                                name: input.name,
                                ...res.data,
                            }).then((res) => {
                                this.refresh();
                            });
                        },
                    },
                ],
            }).then((alert) => {
                alert.present();
            });
        });
    }
}
