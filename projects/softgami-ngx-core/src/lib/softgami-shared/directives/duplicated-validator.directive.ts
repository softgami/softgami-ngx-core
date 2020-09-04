import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

import { DuplicatedValidator } from '../validators/duplicated.validator';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[duplicatedValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: DuplicatedValidatorDirective, multi: true}],
})
export class DuplicatedValidatorDirective implements Validator {

    @Input() duplicatedValidatorIndex: number;
    @Input() duplicatedValidatorValues: any[] = [];
    @Input() duplicatedValidatorKey: string;

    validate(control: AbstractControl): {[key: string]: any} | null {

        if (this.duplicatedValidatorIndex >= 0 && this.duplicatedValidatorValues
            && Array.isArray(this.duplicatedValidatorValues) && this.duplicatedValidatorKey) {
            return DuplicatedValidator(this.duplicatedValidatorIndex, this.duplicatedValidatorValues, this.duplicatedValidatorKey)(control);
        }
        return null;

    }

}
