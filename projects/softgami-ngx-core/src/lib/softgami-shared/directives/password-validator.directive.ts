import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

import { PasswordValidator } from '../validators/password.validator';

@Directive({
    selector: '[passwordValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true } ],
})
export class PasswordValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {

        return PasswordValidator()(control);

    }

}
