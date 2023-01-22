import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, IonInput, ViewWillEnter} from "@ionic/angular";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, ViewWillEnter {
    data: FormGroup;

    @ViewChild('pass', {static: false}) pass: IonInput | undefined;

    constructor(private formBuilder: FormBuilder, private alertController: AlertController, private router: Router, private apiService: ApiService) {
        this.data = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.required],
        });
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.apiService.getUserData();
    }

    login() {
        if (!this.data.valid) {
            this.presentErrorAlert('Please enter valid data');
            return;
        }

        this.apiService.signIn(this.data.value.email, this.data.value.password).then((res) => {
            if (res.message) {
                this.presentErrorAlert(res.message);
            } else {
                this.router.navigateByUrl('/profile');
            }
        }).catch((err) => {
            this.presentErrorAlert(err);
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
