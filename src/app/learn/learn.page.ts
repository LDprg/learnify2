import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";

@Component({
    selector: 'app-learn',
    templateUrl: './learn.page.html',
    styleUrls: ['./learn.page.scss'],
})
export class LearnPage implements OnInit {
    public learnSets: any = [];

    public query: string = '';
    public count: number = 10;

    constructor(private apiService: ApiService) {
    }

    ngOnInit() {

    }

    search() {
        this.count = Math.abs(this.count);

        let query = ' ';
        if (this.query.length > 0) query = this.query;

        this.apiService.searchSets(query, this.count).then((res) => {
            this.learnSets = res;
        });
    }

}
