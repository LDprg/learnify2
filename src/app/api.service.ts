import {Injectable} from '@angular/core';
// import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endpoint = 'http://192.168.0.183:8082';

    // httpOptions = {
    //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };

    // constructor(private httpClient: HttpClient) {
    // }

    public signIn(email : string, password :string) {
        return fetch(this.endpoint + '/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json());
        // return this.httpClient.post(this.endpoint + '/api/auth/signin', {
        //     email: email,
        //     password: password
        // }, this.httpOptions);
    }
}
