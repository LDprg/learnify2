import {Injectable} from '@angular/core';

// import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endpoint = 'http://192.168.0.183:8082';
    headers = {
        'Content-Type': 'application/json',
        // 'WithCredentials': 'true'
    }
    accessToken = null;
    id = null;
    username = null;
    email = null;

    // httpOptions = {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };

    // constructor(private httpClient: HttpClient) {
    // }

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
                this.accessToken = res.accessToken;
                this.id = res.id;
                this.username = res.username;
                this.email = res.email;
            }
            return res;
        });
        // return this.httpClient.post(this.endpoint + '/api/auth/signin', {
        //     email: email,
        //     password: password
        // }, this.httpOptions);
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
        return this.accessToken != null;
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
                this.accessToken = null;
                this.id = null;
                this.username = null;
                this.email = null;
            }

            return res;
        });
    }

    public logout() {
        console.log('logout');
        let url = new URL(this.endpoint + '/api/auth/signout');

        this.accessToken = null;
        this.id = null;
        this.username = null;
        this.email = null;

        return fetch(url, {
            method: 'POST',
            headers: this.headers
        }).then(res => res.json());
    }
}
