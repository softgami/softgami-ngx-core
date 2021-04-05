import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryTesterComponent } from './repository-tester.component';

describe('RepositoryTesterComponent', () => {

    let component: RepositoryTesterComponent;
    let fixture: ComponentFixture<RepositoryTesterComponent>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [ RepositoryTesterComponent ],
        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(RepositoryTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {

        expect(component).toBeTruthy();

    });

});
