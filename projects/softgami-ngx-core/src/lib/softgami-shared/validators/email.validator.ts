import { AbstractControl, ValidationErrors } from '@angular/forms';

import { VALID_EMAIL_REGEX } from 'softgami-ts-core';

export function EmailValidator() {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            email: true,
        };

        if (control.value === null || control.value === undefined) {
            return null;
        }

        return VALID_EMAIL_REGEX.test(control.value) ? null : error;

    };

}
