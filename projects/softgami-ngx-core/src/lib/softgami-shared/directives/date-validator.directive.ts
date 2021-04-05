import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

import { DateValidator } from '../validators/date.validator';

@Directive({
    selector: '[dateValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: DateValidatorDirective, multi: true } ],
})
export class DateValidatorDirective implements Validator {

    @Input() dateValidatorLocale: string;

    validate(control: AbstractControl): {[key: string]: any} | null {

        return DateValidator(this.dateValidatorLocale)(control);

    }

}
