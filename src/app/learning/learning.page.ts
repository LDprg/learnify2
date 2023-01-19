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

    public set: any;
    public data: any;

    public answerText: any;

    public index: number = 0;

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ionViewWillEnter() {

        this.apiService.getSet(this.id).then((res) => {
            this.set = res;

            if(this.starred) {
                this.apiService.getUserStats(this.id).then((stat) => {
                    let temp : any[] = [];

                    console.log(stat.data);
                    console.log(this.set.data);

                    for (let statItem of stat.data) {
                        if(statItem.stared) {
                            for (let setItem of this.set.data) {
                                console.log(setItem);
                                console.log(statItem);

                                if(setItem._id == statItem.cardid) {
                                    temp.push(setItem);
                                    break;
                                }
                            }
                        }
                    }

                    console.log(temp);

                    this.data = this.shuffleArray(temp);

                    console.log(this.data);
                });

            } else {
                this.data = res.data;
                this.data = this.shuffleArray(this.data);
            }
        });
    }

    getQuestion() {
        if (this.data !== undefined) {
            return this.data[this.index].first;
        }
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        this.starred = this.activatedRoute.snapshot.paramMap.get('starred') === 'true';
    }

    checkAnswer() {
        this.status = Status.Answer;
    }

    skip() {
        this.status = Status.Ask;
        this.answerText = "";

        this.index++;

        if(this.index >= this.data.length) {
            this.status = Status.Final;
        }
    }

    again() {
        this.status = Status.Ask;
        this.answerText = "";

        this.index = 0;

        this.ionViewWillEnter();
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
