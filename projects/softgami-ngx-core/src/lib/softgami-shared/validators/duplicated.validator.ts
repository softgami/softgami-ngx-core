import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DuplicatedValidator(index: number, values: any[], key?: string): ValidatorFn {

    return (control: AbstractControl): {[key: string]: any} | null => {

        const error: ValidationErrors = {
            duplicated: true,
        };
        let returnValue: ValidationErrors = null;
        if (!control.value) return null;

        values.forEach((v: any, i: number) => {

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
