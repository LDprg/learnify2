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
    public userStat: any = null;
    public data: any;

    public answerText: any;
    public correctionText: string = "";

    public index: number = 0;
    public correctCount: number = 0;
    public skippedCount: number = 0;

    public tempReadonly: boolean = false;
    public tempColor: string = "none";

    @ViewChild('answer', {static: false}) answer: IonInput | undefined;
    @ViewChild('correction', {static: false}) correction: IonInput | undefined;

    constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {
    }

    ionViewWillEnter() {
        this.apiService.getSet(this.id).then((res) => {
            this.set = res;

            if (this.starred) {
                this.apiService.getUserStats(this.id).then((stat) => {
                    let temp: any[] = [];

                    for (let statItem of stat.data) {
                        if (statItem.stared) {
                            for (let setItem of this.set.data) {

                                if (setItem._id == statItem.cardid) {
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

        this.apiService.getUserStats(this.id).then((stat) => {
            this.userStat = stat;
        });

        this.correctCount = 0;
        this.index = 0;
        this.status = Status.Ask;
        this.correctionText = "";
        this.answerText = "";
        this.setFocus();
    }

    floor(value: number) {
        return Math.round(value);
    }

    getQuestion() {
        if (this.data !== undefined) {
            return this.data[this.index].first;
        }
    }

    getAnswer() {
        if (this.data === undefined) {
            return "";
        }

        return this.answerFormat(this.data[this.index].second);
    }

    answerFormat(text: string) {
        let res = text;

        res = res.replace(/[(\[{][^(\[{}\])]*[}\])]/g, ' '); // remove content in brackets
        res = res.replace(/[;()\[\]{}\\/]/g,  ' '); // remove special characters
        res = res.replace(/(?<=[^\d]|([\d][,.][\d]))[.,]/g, ' '); // remove dots
        res = res.replace(/ {2,}/g, ' '); // remove multiple spaces
        res = res.trim(); // remove leading and trailing spaces

        // console.log(text);
        // console.log(res);
        return res;
    }

    getAnswerText() {
        let text = '';

        if (this.status == Status.Ask) {
            if (this.answerText === undefined) {
                return "";
            }
            text = this.answerText;
        } else {
            if (this.correctionText === undefined) {
                return "";
            }
            text = this.correctionText;
        }

        return this.answerFormat(text);
    }

    setFocus() {
        setTimeout(() => {
            if (this.status == Status.Ask) {
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
        if (this.tempReadonly) return;

        let answer = this.getAnswerText().trim();
        let correct = this.getAnswer().trim();

        if (answer == correct) {
            this.tempColor = "success";
            this.tempReadonly = true;
            setTimeout(() => {
                this.tempColor = "none";
                this.tempReadonly = false;
                this.status = Status.Ask;
                this.correctCount++;
                this.data[this.index].correct = true;
                this.apiService.updateUserStats(this.id, this.data[this.index]._id, "success");
                this.nextItem();
            }, 500);
        } else {
            this.status = Status.Answer;
        }

        this.setFocus();
    }

    enterAnswer() {
        if (this.tempReadonly) return;

        let answer = this.getAnswerText().trim();
        let correct = this.getAnswer().trim();

        if (answer == correct) {
            this.tempColor = "danger";
            this.tempReadonly = true;
            setTimeout(() => {
                this.tempColor = "none";
                this.tempReadonly = false;
                this.status = Status.Ask;
                this.data[this.index].wrong = true;
                this.apiService.updateUserStats(this.id, this.data[this.index]._id, "wrong");
                this.correctionText = "";
                this.nextItem();
                this.setFocus();
            }, 2000);
        }
    }

    skip() {
        if (this.tempReadonly) return;

        this.status = Status.Ask;
        this.skippedCount++;
        this.apiService.updateUserStats(this.id, this.data[this.index]._id, "skip");
        this.nextItem();
        this.setFocus();
    }

    changeWrong() {
        if (this.tempReadonly) return;

        this.status = Status.Ask;
        this.correctCount++;
        this.data[this.index].changed = true;
        this.apiService.updateUserStats(this.id, this.data[this.index]._id, "changed");
        this.correctionText = "";
        this.nextItem();
        this.setFocus();
    }

    nextItem() {
        if (this.tempReadonly) return;

        this.answerText = "";

        this.index++;

        if (this.index >= this.data.length) {
            this.status = Status.Final;
        }
    }

    markNothing() {
        let func = async () => {
            if (this.userStat != null && this.userStat.data != null) {
                for (let i = 0; i < this.userStat.data.length; i++) {
                    await this.setStarVal(this.userStat.data[i].cardid, false);
                }
                await this.apiService.getUserStats(this.id).then((stat) => {
                    this.userStat = stat;
                });
            }
        }
        func();
    }

    markAll() {
        let func = async () => {
            if (this.userStat != null && this.userStat.data != null) {
                for (let i = 0; i < this.userStat.data.length; i++) {
                   await this.setStarVal(this.userStat.data[i].cardid, true);
                }
                await this.apiService.getUserStats(this.id).then((stat) => {
                    this.userStat = stat;
                });
            }
        }
        func();
    }

    markWrong() {
        let func = async () => {
            for (let p of this.data) {
                if (p.wrong || (p.wrong == undefined && p.correct == undefined && p.changed == undefined)) {
                    await this.setStarVal(p._id, true);
                } else {
                    await this.setStarVal(p._id, false);
                }
            }
            await this.apiService.getUserStats(this.id).then((stat) => {
                this.userStat = stat;
            });
        }
        func();
    }

    markCorrect() {
        let func = async () => {
            for (let p of this.data) {
                if (p.correct || p.changed) {
                    await this.setStarVal(p._id, true);
                } else {
                    await this.setStarVal(p._id, false);
                }
            }
            await this.apiService.getUserStats(this.id).then((stat) => {
                this.userStat = stat;
            });
        }
        func();
    }

    getStar(id: string) {
        if (this.userStat != null && this.userStat.data != null) {
            for (let i = 0; i < this.userStat.data.length; i++) {
                if (this.userStat.data[i].cardid == id) {
                    if (this.userStat.data[i].stared != null) {
                        return this.userStat.data[i].stared;
                    } else {
                        return false;
                    }
                }
            }
        }
        return false;
    }

    setStar(id: string) {
        return this.setStarVal(id, !this.getStar(id)).then(() => {
            this.apiService.getUserStats(this.id).then((stat) => {
                this.userStat = stat;
            });
        });
    }

    setStarVal(id: string, value: boolean) {
        return this.apiService.updateUserStared(this.id, id, value).then((res) => {
            if (this.userStat != null && this.userStat.data != null) {
                for (let i = 0; i < this.userStat.data.length; i++) {
                    if (this.userStat.data[i].cardid == id) {
                        this.userStat.data[i].stared = value;
                    }
                }
            }
        });
    }

    again() {
        this.status = Status.Ask;
        this.answerText = "";

        this.index = 0;

        this.ionViewWillEnter();
    }

    shuffleArray(value: any[]) {

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
