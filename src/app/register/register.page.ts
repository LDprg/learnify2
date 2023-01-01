import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController} from "@ionic/angular";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    data: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController, private apiService: ApiService) {
      this.data = this.formBuilder.group({
          email: ['', Validators.compose([Validators.required, Validators.email])],
          username: ['', Validators.required],
          password: ['', Validators.required],
      });
  }

  ngOnInit() {
  }

  register() {

  }

}
