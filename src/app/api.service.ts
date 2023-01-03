import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endpoint = 'http://192.168.0.183:8082';
    headers = {
        'Content-Type': 'application/json',
        // 'WithCredentials': 'true'
    }
    accessToken: string = "";
    id: string = "";
    username: string = "";
    email: string = "";

    // httpOptions = {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };

    // constructor(private httpClient: HttpClient) {
    // }

    constructor(private storage: Storage) {
        this.storage.create();
        this.storage.get('token').then((val) => {
            this.setToken(val);
        });
    }

    private setToken(token: string) {
        this.accessToken = token;
        this.storage.set('token', token);
        this.getUserData();
    }

    public setUrl(url: string) {
        this.endpoint = url;
        return this.getUserData();
    }

    public signIn(email: string, password: string) {
        console.log('signIn');
        let url = new URL(this.endpoint + '/api/auth/signin');

        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json()).then(res => {
            if (res.accessToken) {
                this.setToken(res.accessToken);
            }
            return res;
        });
    }

    public register(email: string, username: string, password: string) {
        console.log('register');
        let url = new URL(this.endpoint + '/api/auth/signup');

        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        }).then(res => res.json());
    }

    public isLoggedIn() {
        console.log('isLoggedIn');
        return this.accessToken.trim().length > 0;
    }

    public getUserData() {
        console.log('getUserData');
        let url = new URL(this.endpoint + '/api/user');

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return fetch(url, {
            method: 'GET',
            headers: this.headers,
        }).then(res => res.json()).then(res => {
            console.log(res);

            if (res.id) {
                this.id = res.id;
                this.username = res.username;
                this.email = res.email;
            } else {
                this.accessToken = "";
                this.storage.remove('token');
                this.id = "";
                this.username = "";
                this.email = "";
            }

            return res;
        }).catch(err => {
            console.log(err);

            this.accessToken = "";
            this.storage.remove('token');
            this.id = "";
            this.username = "";
            this.email = "";
        });
    }

    public logout() {
        console.log('logout');
        let url = new URL(this.endpoint + '/api/auth/signout');

        this.accessToken = "";
        this.storage.remove('token');
        this.id = "";
        this.username = "";
        this.email = "";

        return fetch(url, {
            method: 'POST',
            headers: this.headers
        }).then(res => res.json());
    }

    public searchSets(search: string, count: number = 10) {
        console.log('searchSets');
        let url = new URL(this.endpoint + '/api/set/search/' + search + "/" + count);

        return fetch(url, {
            method: 'GET',
            headers: this.headers,
        }).then(res => res.json());
    }

    public getUserSets() {
        console.log('getUserSets');
        let url = new URL(this.endpoint + '/api/user/set');

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return fetch(url, {
            method: 'GET',
            headers: this.headers,
        }).then(res => res.json());
    }

    public createSet(set: any) {
        console.log('createSet');
        let url = new URL(this.endpoint + '/api/set');

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(set)
        }).then(res => res.json());
    }

    public deleteSet(id: string) {
        console.log('deleteSet');
        let url = new URL(this.endpoint + '/api/set/' + id);

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return fetch(url, {
            method: 'DELETE',
            headers: this.headers,
        }).then(res => res.json());
    }
}
