import { AbstractControl, ValidationErrors } from '@angular/forms';

import { VALID_EMAIL } from '../regex/valid-email.regex';

export function EmailValidator() {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            email: true,
        };

        if (control.value === null || control.value === undefined) {
            return null;
        }

        return VALID_EMAIL.test(control.value) ? null : error;

    };

}
