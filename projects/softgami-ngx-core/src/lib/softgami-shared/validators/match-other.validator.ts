import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchOtherValidator(otherControl: AbstractControl): ValidatorFn {

    let mainControl: AbstractControl;

    otherControl.valueChanges.subscribe(() => {
        if (mainControl) {
            mainControl.updateValueAndValidity();
        }
    });

    return (control: AbstractControl): ValidationErrors | null => {

        mainControl = control;
        const error: ValidationErrors = {
            matchOther: true,
        };

        if (!otherControl) return null;

        if (otherControl.value === control.value) {
            return null;
        }

        return error;

    };

}
