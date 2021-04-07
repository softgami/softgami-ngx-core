import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef, Input } from '@angular/core';

import { TaxNumberValidator } from '../validators/tax-number.validator';

@Directive({
    selector: '[taxNumberValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => TaxNumberValidatorDirective), multi: true } ],
})
export class TaxNumberValidatorDirective implements Validator {

    @Input() taxNumberValidatorCountryCode: string;
    @Input() taxNumberValidatorIsIndividual: boolean;

    validate(control: AbstractControl): ValidationErrors | null {

        return TaxNumberValidator(this.taxNumberValidatorCountryCode, this.taxNumberValidatorIsIndividual)(control);

    }

}
