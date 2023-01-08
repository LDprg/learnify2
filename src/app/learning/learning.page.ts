import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

export enum Status {
    Ask,
    Answer,
    Final,
}

@Component({
    selector: 'app-learning',
    templateUrl: './learning.page.html',
    styleUrls: ['./learning.page.scss'],
})
export class LearningPage implements OnInit {
    public id!: string;
    public starred: boolean = false;

    public status: Status = Status.Ask;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        this.starred = this.activatedRoute.snapshot.paramMap.get('starred') === 'true';
    }

}
