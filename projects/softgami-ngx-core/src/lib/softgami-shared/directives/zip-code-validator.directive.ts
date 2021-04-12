import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef, Input } from '@angular/core';

import { ZipCodeValidator } from '../validators/zip-code.validator';

@Directive({
    selector: '[zipCodeValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => ZipCodeValidatorDirective), multi: true } ],
})
export class ZipCodeValidatorDirective implements Validator {

    @Input() zipCodeValidatorLocale: string | undefined;

    validate(control: AbstractControl): ValidationErrors | null {

        return ZipCodeValidator(this.zipCodeValidatorLocale)(control);

    }

}
