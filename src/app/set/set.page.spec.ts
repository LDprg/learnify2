import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {SetPage} from './set.page';

describe('SetPage', () => {
    let component: SetPage;
    let fixture: ComponentFixture<SetPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SetPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SetPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
