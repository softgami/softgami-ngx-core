import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Html5StorageTesterComponent } from './html5-storage-tester.component';

describe('Html5StorageTesterComponent', () => {
    let component: Html5StorageTesterComponent;
    let fixture: ComponentFixture<Html5StorageTesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ Html5StorageTesterComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Html5StorageTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
