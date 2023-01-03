import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage-angular';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ApiService} from "./api.service";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
