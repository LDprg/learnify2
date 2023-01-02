import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sets',
    templateUrl: './sets.page.html',
    styleUrls: ['./sets.page.scss'],
})
export class SetsPage implements OnInit {
    public Sets: any = [];

    constructor() {
    }

    ngOnInit() {
    }

}
