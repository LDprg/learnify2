import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {ViewWillEnter} from "@ionic/angular";

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
export class LearningPage implements OnInit, ViewWillEnter {
    public id!: string;
    public starred: boolean = false;

    public status: Status = Status.Ask;

    public set : any;
    public data : any;

    public answerText: any;

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ionViewWillEnter() {

        this.apiService.getSet(this.id).then((res) => {
            this.set = res;


            this.data = res.data;
            this.data = this.shuffleArray(this.data);

            console.log(this.data);
        });
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        this.starred = this.activatedRoute.snapshot.paramMap.get('starred') === 'true';
    }

    checkAnswer() {
        this.status = Status.Answer;
    }

    shuffleArray (value: any[]) {

        let items: any[] = [];

        for (let i = 0; i < value.length; i++) {
            items.push(value[i]);
        }

        // reversing items array
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        return items;
    }
}
