import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

import { PhoneValidator } from '../validators/phone.validator';

@Directive({
    selector: '[phoneValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: PhoneValidatorDirective, multi: true } ],
})
export class PhoneValidatorDirective implements Validator {

    @Input() phoneValidatorLocale: string;

    validate(control: AbstractControl): {[key: string]: any} | null {

        return PhoneValidator(this.phoneValidatorLocale)(control);

    }

}
