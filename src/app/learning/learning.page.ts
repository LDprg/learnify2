import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../api.service";
import {IonInput, ViewWillEnter} from "@ionic/angular";

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
    public correctionText: string = "";

    public index: number = 0;
    public correctCount : number = 0;

    @ViewChild('answer', { static: false }) answer: IonInput | undefined;
    @ViewChild('correction', { static: false }) correction: IonInput | undefined;

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ionViewWillEnter() {

        this.apiService.getSet(this.id).then((res) => {
            this.set = res;

            if(this.starred) {
                this.apiService.getUserStats(this.id).then((stat) => {
                    let temp : any[] = [];

                    for (let statItem of stat.data) {
                        if(statItem.stared) {
                            for (let setItem of this.set.data) {

                                if(setItem._id == statItem.cardid) {
                                    temp.push(setItem);
                                    break;
                                }
                            }
                        }
                    }

                    this.data = this.shuffleArray(temp);
                });

            } else {
                this.data = res.data;
                this.data = this.shuffleArray(this.data);
            }
        });

        this.correctCount = 0;
        this.index = 0;
        this.status = Status.Ask;
        this.correctionText = "";
        this.answerText = "";
        this.setFocus();
    }

    getQuestion() {
        if (this.data !== undefined) {
            return this.data[this.index].first;
        }
    }

    getAnswer() {
        if (this.data !== undefined) {
            return this.data[this.index].second;
        } else {
            return "";
        }
    }

    getAnswerText() {
        if (this.status == Status.Ask) {
            if (this.answerText === undefined) {
                return "";
            }
            return this.answerText;
        } else {
            if (this.correctionText === undefined) {
                return "";
            }
            return this.correctionText;
        }
    }

    setFocus() {
        setTimeout(() =>
        {
            if(this.status == Status.Ask) {
                this.answer?.setFocus();
            } else {
                this.correction?.setFocus();
            }
        }, 100);
    }

    ngOnInit() {
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        this.starred = this.activatedRoute.snapshot.paramMap.get('starred') === 'true';
    }

    checkAnswer() {
        let answer = this.getAnswerText().trim();
        let correct = this.getAnswer().trim();

        if (answer == correct) {
            this.status = Status.Ask;
            this.correctCount++;
            this.data[this.index].correct = true;
            this.apiService.updateUserStats(this.id, this.data[this.index]._id, "success");
            this.nextItem();
        } else {
            this.status = Status.Answer;
        }

        this.setFocus();
    }

    enterAnswer() {
        let answer = this.getAnswerText().trim();
        let correct = this.getAnswer().trim();

        if(answer == correct){
            this.status = Status.Ask;
            this.data[this.index].wrong = true;
            this.apiService.updateUserStats(this.id, this.data[this.index]._id, "wrong");
            this.correctionText = "";
            this.nextItem();
            this.setFocus();
        }
    }

    skip() {
        this.status = Status.Ask;
        this.apiService.updateUserStats(this.id, this.data[this.index]._id, "skip");
        this.nextItem();
        this.setFocus();
    }

    nextItem(){
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
