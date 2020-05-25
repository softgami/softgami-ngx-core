import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SoftgamiTsUtilsService } from 'softgami-ts-core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[numbersOnly]',
})
export class NumbersOnlyDirective {

    // private regex: RegExp = new RegExp(/^\d+(((\.){0}\d*)|((\.){1}\d{1,}))$/g);
    private regex: RegExp = new RegExp(/^\d+(\.){0,1}\d*$/g);
    private regexIntegerOnly = '^[0-9]*$';
    private specialKeys: Array<string> = [ 'Backspace', 'Tab', 'End', 'Home', '-', 'Control', 'ArrowRight', 'ArrowLeft', 'Enter'];
    @Input() integerOnly: boolean;
    @Input() asNumber: boolean;
    @Input() fractionDigits: number;

    constructor(private el: ElementRef, private control: NgControl) {}

    @HostListener('keydown', [ '$event' ])
    onKeyDown(event: KeyboardEvent) {

        if (this.specialKeys.indexOf(event.key) !== -1) return;

        if (event.ctrlKey) {
            switch (event.code) {
                case 'KeyA':
                case 'KeyC':
                case 'KeyV':
                case 'KeyX':
                case 'KeyZ':
                    return;
            }
        }

        const current: string = this.el.nativeElement.value;
        const next: string = current.concat(event.key);

        if (next && !String(next).match(this.integerOnly ? this.regexIntegerOnly : this.regex)) {
            event.preventDefault();
            return;
        }

    }

    @HostListener('input', [ '$event' ])
    onInput(event: KeyboardEvent) {

        let val: number = Number(this.el.nativeElement.value);
        if (this.asNumber && this.control && this.integerOnly) {
            this.control.control.setValue(isNaN(val) || this.el.nativeElement.value === '' ? '' : val);
        }
        if (this.asNumber && this.control && !this.integerOnly && this.el.nativeElement.value) {
            if (this.el.nativeElement.value[this.el.nativeElement.value.length - 1] !== '.') {
                if (this.fractionDigits !== null && this.fractionDigits !== undefined) {
                    const fractionDigits: number = parseInt(this.fractionDigits.toString(), 10);
                    if (!isNaN(fractionDigits) && fractionDigits >= 0) {
                        val = SoftgamiTsUtilsService.truncateDecimals(val, fractionDigits);
                    }
                }
                this.control.control.setValue(isNaN(val) || this.el.nativeElement.value === '' ? '' : val);
            }
        }

    }

}
