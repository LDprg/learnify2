import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    data: FormGroup;

    constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router, private apiService: ApiService) {
        this.data = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {
    }

    register() {
        this.apiService.register(this.data.value.email, this.data.value.username, this.data.value.password).then((res) => {
            this.apiService.signIn(this.data.value.email, this.data.value.password).then((_) => {
                if (this.apiService.isLoggedIn()) {
                    this.router.navigateByUrl('/profile');
                } else {
                    this.presentErrorAlert(res.message);
                }
            }).catch((err) => {
                this.presentErrorAlert(err);
            });
        }).catch((err) => {
            this.presentErrorAlert(err);
        });
    }

    async presentErrorAlert(message: string) {
        const alert = await this.alertController.create({
            header: 'Error',
            subHeader: 'Register Failed',
            message: message,
            buttons: ['OK'],
        });

        await alert.present();
    }
}
