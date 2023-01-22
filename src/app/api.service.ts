import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endpoint = 'http://192.168.0.183:8082';
    headers = {
        'Content-Type': 'application/json'
    }
    accessToken: string = "";
    id: string = "";
    username: string = "";
    email: string = "";

    constructor(private storage: Storage) {
        this.storage.create();
        this.storage.get('token').then((val) => {
            if (val)
                this.accessToken = val;
        });
        this.storage.get('endpoint').then((val) => {
            if (val)
                this.endpoint = val;
        });
    }

    public setUrl(url: string) {
        this.endpoint = url;
        if (url)
            this.storage.set('endpoint', url);
        return this.getUserData();
    }

    public signIn(email: string, password: string) {
        console.log('signIn');
        let url = new URL(this.endpoint + '/api/auth/signin');

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'POST',
            headers: this.headers,
            data: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.data).then(res => {
            if (res.accessToken) {
                this.setToken(res.accessToken);
            }
            return res;
        });
    }

    public register(email: string, username: string, password: string) {
        console.log('register');
        let url = new URL(this.endpoint + '/api/auth/signup');

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'POST',
            headers: this.headers,
            data: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        }).then(res => res.data);
    }

    public isLoggedIn() {
        return !!this.accessToken;

    }

    public getUserData() {
        console.log('getUserData');
        let url = new URL(this.endpoint + '/api/user');

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'GET',
            headers: this.headers,
        }).then(res => res.data).then(res => {
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

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'POST',
            headers: this.headers
        }).then(res => res.data);
    }

    public searchSets(search: string, count: number = 10) {
        console.log('searchSets');
        let url = new URL(this.endpoint + '/api/set/search/' + search + "/" + count);

        return CapacitorHttp.request({
            url:url.toString(),
            method: 'GET',
            headers: this.headers,
        }).then(res => res.data);
    }

    public getUserSets() {
        console.log('getUserSets');
        let url = new URL(this.endpoint + '/api/user/set');

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'GET',
            headers: this.headers,
        }).then(res => res.data);
    }

    public createSet(set: any) {
        console.log('createSet');
        let url = new URL(this.endpoint + '/api/set');

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'POST',
            headers: this.headers,
            data: JSON.stringify(set)
        }).then(res => res.data);
    }

    public updateSet(id: number, set: any) {
        console.log('updateSet');
        let url = new URL(this.endpoint + '/api/set/' + id);

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'PUT',
            headers: this.headers,
            data: JSON.stringify(set)
        }).then(res => res.data);
    }

    public deleteSet(id: string) {
        console.log('deleteSet');
        let url = new URL(this.endpoint + '/api/set/' + id);

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'DELETE',
            headers: this.headers,
        }).then(res => res.data);
    }

    public getSet(id: string) {
        console.log('getSet');
        let url = new URL(this.endpoint + '/api/set/' + id);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'GET',
            headers: this.headers,
        }).then(res => res.data);
    }

    public getUserStats(id: string) {
        console.log('getUserStats');
        let url = new URL(this.endpoint + '/api/user/stat/' + id + '/short');

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'GET',
            headers: this.headers,
        }).then(res => res.data);
    }

    public updateUserStats(id: string, card: string, type: string) {
        console.log('updateUserStats');
        let url = new URL(this.endpoint + '/api/user/stat/' + id + "/" + card);

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'PUT',
            headers: this.headers,
            data: JSON.stringify({
                type: type
            })
        }).then(res => res.data);
    }

    public updateUserStared(id: string, card: string, stared: boolean) {
        console.log('updateUserStared');
        let url = new URL(this.endpoint + '/api/user/stat/' + id + "/" + card + "/stared");

        if (this.accessToken)
            url.searchParams.append('accessToken', this.accessToken);

        return CapacitorHttp.request({
            url: url.toString(),
            method: 'PUT',
            headers: this.headers,
            data: JSON.stringify({
                stared: stared
            })
        }).then(res => res.data);
    }

    private setToken(token: string) {
        this.accessToken = token;
        if (token)
            this.storage.set('token', token);
        return this.getUserData();
    }
}
