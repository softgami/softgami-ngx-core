import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { TrimOnBlurDirective } from './trim-on-blur.directive';
import { FormControl, NgControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    template: `
    <input trimOnBlur [(ngModel)]="trimOnBlur"/>
    <input [formControl]="inputControl" type="text" trimOnBlur/>
    `,
})
class TestComponent {

    trimOnBlur = null;
    inputControl: FormControl = new FormControl();

}

describe('TrimOnBlurDirective', () => {

    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let rootElement: DebugElement;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [
                TrimOnBlurDirective,
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

    });

    describe('blur', () => {

        it('blur should keep value of element when value is null', async () => {

            const inputElement: DebugElement = rootElement.children[0];
            component.trimOnBlur = null;
            fixture.detectChanges();
            await fixture.whenStable();

            inputElement.triggerEventHandler('blur', null);
            fixture.detectChanges();

            expect(component.trimOnBlur).toEqual(null);
            expect(inputElement.nativeElement.value).toEqual('');

        });

        it('blur should keep value of element when no trim is needed', async () => {

            const inputElement: DebugElement = rootElement.children[0];
            component.trimOnBlur = 'hello world';
            fixture.detectChanges();
            await fixture.whenStable();

            inputElement.triggerEventHandler('blur', null);
            fixture.detectChanges();

            expect(component.trimOnBlur).toEqual('hello world');
            expect(inputElement.nativeElement.value).toEqual('hello world');

        });

        it('blur should remove spaces before or after of value when value has spaces before or after', async () => {

            const inputElement: HTMLInputElement = rootElement.children[0].nativeElement as HTMLInputElement;

            component.trimOnBlur = ' hello world ';
            fixture.detectChanges();
            await fixture.whenStable();

            inputElement.dispatchEvent(new Event('blur'));

            expect(inputElement.value).toEqual('hello world');
            expect(component.trimOnBlur).toEqual('hello world');

        });

        it('blur should keep value of element when value is null and element is FormControl', async () => {

            const inputElement: DebugElement = rootElement.children[1];
            component.inputControl.setValue(null);
            const spy: jasmine.Spy = spyOn(component.inputControl, 'setValue').and.callThrough();
            fixture.detectChanges();
            await fixture.whenStable();

            inputElement.triggerEventHandler('blur', null);
            fixture.detectChanges();

            expect(spy).not.toHaveBeenCalled();
            expect(component.inputControl.value).toEqual(null);
            expect(inputElement.nativeElement.value).toEqual('');

        });

        it('blur should keep value of element when no trim is needed and element is FormControl', async () => {

            const inputElement: DebugElement = rootElement.children[1];
            component.inputControl.setValue('hello world form control');
            const spy: jasmine.Spy = spyOn(component.inputControl, 'setValue').and.callThrough();
            fixture.detectChanges();
            await fixture.whenStable();

            inputElement.triggerEventHandler('blur', null);
            fixture.detectChanges();

            expect(spy).toHaveBeenCalledWith('hello world form control', {
                emitEvent: true,
                emitModelToViewChange: true,
                emitViewToModelChange: true,
            });
            expect(component.inputControl.value).toEqual('hello world form control');
            expect(inputElement.nativeElement.value).toEqual('hello world form control');

        });

        it(`blur should remove spaces before or after of value when value has spaces before or after
            and element is FormControl`, async () => {

            const inputElement: HTMLInputElement = rootElement.children[1].nativeElement as HTMLInputElement;
            component.inputControl.setValue(' hello world form control with spaces ');
            const spy: jasmine.Spy = spyOn(component.inputControl, 'setValue').and.callThrough();
            fixture.detectChanges();
            await fixture.whenStable();

            inputElement.dispatchEvent(new Event('blur'));

            expect(spy).toHaveBeenCalledWith('hello world form control with spaces', {
                emitEvent: true,
                emitModelToViewChange: true,
                emitViewToModelChange: true,
            });
            expect(component.inputControl.value).toEqual('hello world form control with spaces');
            expect(inputElement.value).toEqual('hello world form control with spaces');

        });

    });

    afterEach(() => {

        fixture = null;
        component = null;
        rootElement = null;

    });

});
