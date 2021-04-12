import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[trimOnBlur]',
})
export class TrimOnBlurDirective {

    constructor(private readonly control: NgControl) { }

    @HostListener('blur') blur(): void {

        if (this.control.value) {

            const value: string = this.control.value.toString();
            if (this.control && this.control.control) {

                this.control.control.setValue(value.trim(), {
                    emitEvent: true,
                    emitModelToViewChange: true,
                    emitViewToModelChange: true,
                });

            }

        }

    }

}
