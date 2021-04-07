import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef, Input } from '@angular/core';

import { DateValidator } from '../validators/date.validator';

@Directive({
    selector: '[dateValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidatorDirective), multi: true } ],
})
export class DateValidatorDirective implements Validator {

    @Input() dateValidatorLocale: string;

    validate(control: AbstractControl): ValidationErrors | null {

        return DateValidator(this.dateValidatorLocale)(control);

    }

}
