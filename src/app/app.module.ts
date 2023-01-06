import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage-angular';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ApiService} from "./api.service";
import {FormsModule} from "@angular/forms";
import {ExportModalComponent} from "./export-modal/export-modal.component";
import {ImportModalComponent} from "./import-modal/import-modal.component";

@NgModule({
    declarations: [AppComponent, ExportModalComponent, ImportModalComponent],
    imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
