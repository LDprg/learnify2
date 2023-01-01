import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {ApiService} from "../api.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
    data: FormGroup;

    constructor(private formBuilder: FormBuilder, private alertController: AlertController, private apiService: ApiService) {
        this.data = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    login() {
        console.log('login');
        console.log(this.data.value);
        if (!this.data.valid) {
            this.presentErrorAlert('Please enter valid data');
            return;
        }

        this.apiService.signIn(this.data.value.email, this.data.value.password).then((res) => {
            console.log(res);
            if (!res.message) {
                console.log('Login successful');
            } else {
                this.presentErrorAlert(res.message);
            }
        });
    }

    async presentErrorAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Login Failed',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }

}
