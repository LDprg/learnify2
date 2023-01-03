import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-set',
    templateUrl: './set.page.html',
    styleUrls: ['./set.page.scss'],
})
export class SetPage implements OnInit {
    public id!: string;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    }

}
