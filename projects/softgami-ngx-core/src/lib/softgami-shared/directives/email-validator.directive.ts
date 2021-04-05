import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

import { EmailValidator } from '../validators/email.validator';

@Directive({
    selector: '[emailValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true } ],
})
export class EmailValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {

        return EmailValidator()(control);

    }

}
