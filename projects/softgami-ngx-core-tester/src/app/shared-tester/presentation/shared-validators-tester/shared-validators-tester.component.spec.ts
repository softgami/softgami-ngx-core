import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedValidatorsTesterComponent } from './shared-validators-tester.component';

describe('SharedValidatorsTesterComponent', () => {

    let component: SharedValidatorsTesterComponent;
    let fixture: ComponentFixture<SharedValidatorsTesterComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ SharedValidatorsTesterComponent ],
        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(SharedValidatorsTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
