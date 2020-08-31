import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { DateValidator } from '../validators/date.validator';
import { Directive, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[dateValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true}],
})
export class DateValidatorDirective implements Validator {

    @Input() dateValidatorLocale: string;

    validate(control: AbstractControl): {[key: string]: any} | null {

        return DateValidator(this.dateValidatorLocale)(control);

    }

}
