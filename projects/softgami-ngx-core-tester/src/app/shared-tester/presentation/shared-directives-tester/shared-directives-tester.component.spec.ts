import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedDirectivesTesterComponent } from './shared-directives-tester.component';

describe('SharedDirectivesTesterComponent', () => {

    let component: SharedDirectivesTesterComponent;
    let fixture: ComponentFixture<SharedDirectivesTesterComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ SharedDirectivesTesterComponent ],
        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(SharedDirectivesTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
