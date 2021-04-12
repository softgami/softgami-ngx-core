import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef, Input } from '@angular/core';

import { DuplicatedValidator } from '../validators/duplicated.validator';

@Directive({
    selector: '[duplicatedValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => DuplicatedValidatorDirective), multi: true } ],
})
export class DuplicatedValidatorDirective<T> implements Validator {

    @Input() duplicatedValidatorIndex: number | undefined;
    @Input() duplicatedValidatorValues: T[] = [];
    @Input() duplicatedValidatorKey: string | undefined;

    validate(control: AbstractControl): ValidationErrors | null {

        if (this.duplicatedValidatorIndex !== undefined && this.duplicatedValidatorIndex >= 0 && this.duplicatedValidatorValues &&
            Array.isArray(this.duplicatedValidatorValues) && this.duplicatedValidatorKey) {

            return DuplicatedValidator<T>(this.duplicatedValidatorIndex, this.duplicatedValidatorValues, this.duplicatedValidatorKey)(control);

        }
        return null;

    }

}
