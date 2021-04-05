import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

import { NoWhitespaceValidator } from '../validators/no-whitespace.validator';

@Directive({
    selector: '[noWhiteSpaceValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: NoWhiteSpaceValidatorDirective, multi: true } ],
})
export class NoWhiteSpaceValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {

        return NoWhitespaceValidator()(control);

    }

}
