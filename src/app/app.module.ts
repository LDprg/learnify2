import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage-angular';
import {FormsModule} from "@angular/forms";
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {ApiService} from "./api.service";
import {ExportModalComponent} from "./export-modal/export-modal.component";
import {ImportModalComponent} from "./import-modal/import-modal.component";

@NgModule({
    imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, FormsModule],
    declarations: [AppComponent, ExportModalComponent, ImportModalComponent],
    providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, ApiService],
    bootstrap: [AppComponent],
})
export class AppModule {
}
