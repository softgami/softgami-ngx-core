import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function NoWhitespaceValidator(): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            whitespace: true,
        };

        if (control.value === null || control.value === undefined) {

            return null;

        }

        const value: string = control.value.toString();

        const isWhitespace: boolean = value.trim().length === 0;
        return isWhitespace ? error : null;

    };

}
