import {Component} from '@angular/core';
import {ApiService} from "./api.service";
import {Storage} from "@ionic/storage-angular";

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

    public LightMode: boolean = false;
    public Url: string = "http://192.168.0.183:8082";

    constructor(private storage: Storage, private apiService: ApiService) {
        this.storage.get('theme').then((val) => {
            if (val) {
                document.body.classList.add('dark');
                this.LightMode = false;
            } else {
                document.body.classList.remove('dark');
                this.LightMode = true;
            }
        });

        this.storage.get('url').then((val) => {
            if (val) {
                this.Url = val;
                this.apiService.setUrl(this.Url);
            }
        });
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
            this.storage.set('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            this.storage.remove('theme');
        }
    }

    public changeUrl() {
        this.apiService.setUrl(this.Url);
        this.storage.set('url', this.Url);
    }
}
