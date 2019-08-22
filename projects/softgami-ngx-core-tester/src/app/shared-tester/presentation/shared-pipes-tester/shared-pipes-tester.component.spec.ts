import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPipesTesterComponent } from './shared-pipes-tester.component';

describe('SharedPipesTesterComponent', () => {
    let component: SharedPipesTesterComponent;
    let fixture: ComponentFixture<SharedPipesTesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SharedPipesTesterComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SharedPipesTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
