import {Component, Input, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {text} from "ionicons/icons";

@Component({
    selector: 'app-export-modal',
    templateUrl: './export-modal.component.html',
    styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent implements OnInit {
    @Input() set : any;

    constructor(private modalController: ModalController, private navParams: NavParams) {
        this.set = this.navParams.get('set');
    }

    ngOnInit() {
    }

    close() {
        this.modalController.dismiss(null, 'cancel');
    }

    getExport() {
        let text = "";
        for (const item of this.set.data) {
            text += item.first.trim() + "\t" + item.second.trim() + "\n";
        }
        return text;
    }
}
