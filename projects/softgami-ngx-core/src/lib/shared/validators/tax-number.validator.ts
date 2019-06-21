import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import isValidCpf from '@brazilian-utils/is-valid-cpf';

export function TaxNumberValidator(locale?: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (control.value === null || control.value === undefined) {
            return null;
        }

        const error: ValidationErrors = {
            taxNumber: true,
        };
        locale = locale ? locale.toLowerCase() : null;

        switch (locale) {
            case 'pt':
            case 'pt-br':
                return isValidCpf(control.value) ? null : error;
            default:
                return isValidCpf(control.value) ? null : error;
        }

    };

}
