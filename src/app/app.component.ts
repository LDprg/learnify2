import {Component} from '@angular/core';
import {ApiService} from "./api.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public mainPages = [
        {title: 'Home', url: '/home', icon: 'home'},
        {title: 'Learn', url: '/folder/Learn', icon: 'school'},
    ];

    public userPages = [
        {title: 'Profile', url: 'profile', icon: 'person-circle'},
        {title: 'Sets', url: '/folder/Sets', icon: 'list'},
    ];

    public accountPages = [
        {title: 'Login', url: '/login', icon: 'log-in'},
        {title: 'Register', url: 'register', icon: 'id-card'},
    ];

    constructor(private apiService: ApiService) {
    }

    public logout() {
        this.apiService.logout();
    }

    public isLoggedIn() {
        return this.apiService.isLoggedIn();
    }
}
