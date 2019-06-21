import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            whitespace: true,
        };
        let value: string;

        if (control.value === null || control.value === undefined) {
            return null;
        }

        value = control.value.toString();

        const isWhitespace: boolean = value.trim().length === 0;
        return isWhitespace ? error : null;

    };

}
