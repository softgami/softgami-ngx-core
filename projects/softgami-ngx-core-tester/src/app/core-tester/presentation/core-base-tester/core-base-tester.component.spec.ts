import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreBaseTesterComponent } from './core-base-tester.component';

describe('CoreBaseTesterComponent', () => {
    let component: CoreBaseTesterComponent;
    let fixture: ComponentFixture<CoreBaseTesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ CoreBaseTesterComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoreBaseTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
