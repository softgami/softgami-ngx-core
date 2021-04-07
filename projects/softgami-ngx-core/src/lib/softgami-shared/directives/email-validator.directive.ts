import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';

import { EmailValidator } from '../validators/email.validator';

@Directive({
    selector: '[emailValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailValidatorDirective), multi: true } ],
})
export class EmailValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {

        return EmailValidator()(control);

    }

}
