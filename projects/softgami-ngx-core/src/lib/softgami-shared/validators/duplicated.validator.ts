import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DuplicatedValidator<T>(index: number, values: T[], key?: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            duplicated: true,
        };
        let returnValue: ValidationErrors = null;
        if (!control.value) return null;

        values.forEach((v: T, i: number) => {

            if (i !== index) {

                if (key) {

                    if (v[key] === control.value) returnValue = error;

                } else {

                    if (v === control.value) returnValue = error;

                }

            }

        });

        return returnValue;

    };

}
