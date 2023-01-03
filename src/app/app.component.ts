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
        {title: 'Learn', url: '/learn', icon: 'school'},
    ];

    public userPages = [
        {title: 'Profile', url: '/profile', icon: 'person-circle'},
        {title: 'Sets', url: '/sets', icon: 'list'},
    ];

    public accountPages = [
        {title: 'Login', url: '/login', icon: 'log-in'},
        {title: 'Register', url: '/register', icon: 'id-card'},
    ];

    public LightMode : boolean = false;
    public Url : string = "";

    constructor(private apiService: ApiService) {
        this.switchTheme();
    }

    public logout() {
        this.apiService.logout();
    }

    public isLoggedIn() {
        return this.apiService.isLoggedIn();
    }

    public switchTheme() {
        if (!this.LightMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }

    public changeUrl() {

    }
}
