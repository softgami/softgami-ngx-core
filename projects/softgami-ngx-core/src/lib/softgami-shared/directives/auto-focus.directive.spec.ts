import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { AutoFocusDirective } from './auto-focus.directive';

@Component({
    template: `
    <h3 autoFocus tabindex="10">Focusabled Element</h3>
    <h4 tabindex="100">Not Focusabled Element</h4>
    `,
})
class TestComponent { }

describe('AutoFocusDirective', () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let rootElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            declarations: [
                AutoFocusDirective,
                TestComponent,
            ],
        }).compileComponents();

    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        rootElement = fixture.debugElement;

    });

    it('should create an instance', () => {

        expect(fixture).toBeTruthy();
        expect(component).toBeTruthy();

    });

    describe('ngOnInit', () => {

        it('ngOnInit should throw error when element has no tabindex', () => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.removeAttribute('tabindex');
            expect(() => fixture.detectChanges())
                .toThrow(
                    new Error('Elements with directive autoFocus should have a tabindex equal or greater than 0.'));

        });

        it('ngOnInit should not call element focus when element has no tabindex', () => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.removeAttribute('tabindex');

            const spy: jasmine.Spy = spyOn(h3Element, 'focus');

            expect(() => fixture.detectChanges())
                .toThrow(
                    new Error('Elements with directive autoFocus should have a tabindex equal or greater than 0.'));
            expect(spy).not.toHaveBeenCalled();

        });

        it('ngOnInit should throw error when element has tabindex less than 0', () => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '-1');
            expect(() => fixture.detectChanges())
                .toThrow(
                    new Error('Elements with directive autoFocus should have a tabindex equal or greater than 0.'));

        });

        it('ngOnInit should not call element focus when element has tabindex less than 0', () => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '-1');

            const spy: jasmine.Spy = spyOn(h3Element, 'focus');

            expect(() => fixture.detectChanges())
                .toThrow(
                    new Error('Elements with directive autoFocus should have a tabindex equal or greater than 0.'));
            expect(spy).not.toHaveBeenCalled();

        });

        it('ngOnInit should not throw error when element has tabindex 0', () => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '0');

            expect(() => fixture.detectChanges()).not.toThrowError();

        });

        it('ngOnInit should not throw error when element has tabindex greater than 0', () => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '1');

            expect(() => fixture.detectChanges()).not.toThrowError();

        });

        it('ngOnInit should call focus on element when element has tabindex 0', fakeAsync(() => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '0');
            const spy: jasmine.Spy = spyOn(h3Element, 'focus');

            fixture.detectChanges();

            expect(spy).toHaveBeenCalled();

        }));

        it('ngOnInit should call focus on element when element has tabindex greater than 0', fakeAsync(() => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '1');
            const spy: jasmine.Spy = spyOn(h3Element, 'focus');

            fixture.detectChanges();

            expect(spy).toHaveBeenCalled();

        }));

        it('ngOnInit should set focus on element when element has tabindex 0', fakeAsync(() => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '0');
            const h4Element: HTMLElement = rootElement.children[1].nativeElement as HTMLElement;
            h4Element.focus();

            fixture.detectChanges();

            expect(document.activeElement).toBe(h3Element);

        }));

        it('ngOnInit should set focus on element when element has tabindex greater than 0', fakeAsync(() => {

            fixture = TestBed.createComponent(TestComponent);
            rootElement = fixture.debugElement;

            const h3Element: HTMLElement = rootElement.children[0].nativeElement as HTMLElement;
            h3Element.setAttribute('tabindex', '1');
            const h4Element: HTMLElement = rootElement.children[1].nativeElement as HTMLElement;
            h4Element.focus();

            fixture.detectChanges();

            expect(document.activeElement).toBe(h3Element);

        }));

    });

    afterEach(() => {

        fixture = null;
        component = null;
        rootElement = null;

    });

});
