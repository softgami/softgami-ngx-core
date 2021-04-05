import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

import { TaxNumberValidator } from '../validators/tax-number.validator';

@Directive({
    selector: '[taxNumberValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: TaxNumberValidatorDirective, multi: true } ],
})
export class TaxNumberValidatorDirective implements Validator {

    @Input() taxNumberValidatorCountryCode: string;
    @Input() taxNumberValidatorIsIndividual: boolean;

    validate(control: AbstractControl): {[key: string]: any} | null {

        return TaxNumberValidator(this.taxNumberValidatorCountryCode, this.taxNumberValidatorIsIndividual)(control);

    }

}
