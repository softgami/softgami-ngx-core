import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { VALID_PHONE_BR_REGEX } from 'softgami-ts-core';

export function PhoneValidator(locale?: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (control.value === null || control.value === undefined) {
            return null;
        }

        const error: ValidationErrors = {
            phone: true,
        };
        locale = locale ? locale.toLowerCase() : null;

        switch (locale) {
            case 'pt':
            case 'pt-br':
                return VALID_PHONE_BR_REGEX.test(control.value) ? null : error;
            default:
                return VALID_PHONE_BR_REGEX.test(control.value) ? null : error;
        }

    };

}
