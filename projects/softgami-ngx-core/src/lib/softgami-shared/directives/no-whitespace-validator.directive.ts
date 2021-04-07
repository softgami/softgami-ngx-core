import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';

import { NoWhitespaceValidator } from '../validators/no-whitespace.validator';

@Directive({
    selector: '[noWhiteSpaceValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => NoWhiteSpaceValidatorDirective), multi: true } ],
})
export class NoWhiteSpaceValidatorDirective implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {

        return NoWhitespaceValidator()(control);

    }

}
