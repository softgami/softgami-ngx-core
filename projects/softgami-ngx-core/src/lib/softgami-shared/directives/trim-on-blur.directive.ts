import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[trimOnBlur]',
})
export class TrimOnBlurDirective {

    constructor(private readonly control: NgControl) { }

    @HostListener('blur') blur() {

        if (this.control.value) {

            const value: string = this.control.value.toString();
            this.control.control.setValue(value.trim(), {
                emitEvent: true,
                emitModelToViewChange: true,
                emitViewToModelChange: true,
            });

        }

    }

}
