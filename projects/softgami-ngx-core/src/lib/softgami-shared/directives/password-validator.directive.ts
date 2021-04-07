import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';

import { PasswordValidator } from '../validators/password.validator';

@Directive({
    selector: '[passwordValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidatorDirective), multi: true } ],
})
export class PasswordValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {

        return PasswordValidator()(control);

    }

}
