import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ViewWillEnter} from "@ionic/angular";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, ViewWillEnter {
    user = {
        id: null,
        username: null,
        email: null,
    }

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.apiService.getUserData().then((res) => {
            this.user = res;
        });
    }
}
