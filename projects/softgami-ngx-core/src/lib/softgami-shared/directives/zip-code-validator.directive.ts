import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

import { ZipCodeValidator } from '../validators/zip-code.validator';

@Directive({
    selector: '[zipCodeValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: ZipCodeValidatorDirective, multi: true } ],
})
export class ZipCodeValidatorDirective implements Validator {

    @Input() zipCodeValidatorLocale: string;

    validate(control: AbstractControl): {[key: string]: any} | null {

        return ZipCodeValidator(this.zipCodeValidatorLocale)(control);

    }

}
