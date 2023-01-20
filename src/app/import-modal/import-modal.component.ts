import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-import-modal',
    templateUrl: './import-modal.component.html',
    styleUrls: ['./import-modal.component.scss'],
})
export class ImportModalComponent implements OnInit {
    public text: string = "";

    constructor(private modalController: ModalController) {
    }

    ngOnInit() {
    }

    close() {
        this.modalController.dismiss(null, 'cancel');
    }

    keyDownFunction(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            let start = event.target.selectionStart;
            let end = event.target.selectionEnd;

            event.target.value = event.target.value.substring(0, start) + "\t" + event.target.value.substring(end);
            event.target.selectionStart = event.target.selectionEnd = start + 1;
        }
    }

    add() {
        let lines = this.text.split("\n");
        let data = [];

        for (const line of lines) {
            let parts = line.split("\t");
            if (parts.length == 2) {
                data.push({
                    first: parts[0].trim(),
                    second: parts[1].trim(),
                });
            }
        }

        this.modalController.dismiss(data, 'add');
    }
}
