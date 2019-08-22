import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { VALID_DATE } from '../regex/valid-date.regex';

export function DateValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            date: true,
        };

        if (control.value === null || control.value === undefined) {
            return null;
        }

        return VALID_DATE.test(control.value) ? null : error;

    };

}

