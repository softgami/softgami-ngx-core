import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef, Input } from '@angular/core';

import { PhoneValidator } from '../validators/phone.validator';

@Directive({
    selector: '[phoneValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhoneValidatorDirective), multi: true } ],
})
export class PhoneValidatorDirective implements Validator {

    @Input() phoneValidatorLocale: string;

    validate(control: AbstractControl): ValidationErrors | null {

        return PhoneValidator(this.phoneValidatorLocale)(control);

    }

}
