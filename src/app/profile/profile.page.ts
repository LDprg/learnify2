import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    user = {
        id: null,
        username: null,
        email: null,
    }

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {
        this.apiService.getUserData().then((res) => {
            this.user = res;
        });
    }
}
