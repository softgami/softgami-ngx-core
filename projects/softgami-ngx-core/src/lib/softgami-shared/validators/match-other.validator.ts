import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchOtherValidator(otherControl: AbstractControl): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            matchOther: true,
        };

        if (!otherControl) return null;

        otherControl.valueChanges.subscribe(() => {
            control.updateValueAndValidity();
        });

        if (otherControl.value === control.value) {
            return null;
        }

        return error;

    };

}
