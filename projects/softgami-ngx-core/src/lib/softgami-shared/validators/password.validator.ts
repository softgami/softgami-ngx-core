import { AbstractControl, ValidationErrors } from '@angular/forms';
import { PasswordUtilsService, PasswordValidationErrors } from 'softgami-ts-core';

export function PasswordValidator() {

    return (control: AbstractControl): ValidationErrors | null => {

        let error: ValidationErrors = {
            password: true,
        };

        if (control.value === null || control.value === undefined) {
            return null;
        }

        const result: boolean | PasswordValidationErrors = PasswordUtilsService.validatePassword(control.value);

        if (result === true) return null;

        switch (result) {
            case PasswordValidationErrors.MIN_LENGHT_8:
                error = {
                    passwordMinLength: true,
                };
                break;
            case PasswordValidationErrors.MAX_LENGHT_20:
                error = {
                    passwordMaxLength: true,
                };
                break;
            case PasswordValidationErrors.AT_LEAST_ONE_LOWERCASE_LETTER:
                error = {
                    passwordAtLeastOneLowercaseLetter: true,
                };
                break;
            case PasswordValidationErrors.AT_LEAST_ONE_UPPERCASE_LETTER:
                error = {
                    passwordAtLeastOneUppercaseLetter: true,
                };
                break;
            case PasswordValidationErrors.AT_LEAST_ONE_NUMBER:
                error = {
                    passwordAtLeastOneNumber: true,
                };
                break;
            case PasswordValidationErrors.AT_LEAST_ONE_SPECIAL_CHAR:
                error = {
                    passwordAtLeastOneSpecialChar: true,
                };
                break;
            case PasswordValidationErrors.INVALID_CHARS:
                error = {
                    passwordInvalidChars: true,
                };
                break;
            case PasswordValidationErrors.SEQUENTIAL_CHARS:
                error = {
                    passwordSequentialChars: true,
                };
                break;
            case PasswordValidationErrors.REPEATED_CHARS:
                error = {
                    passwordRepeatedChars: true,
                };
                break;
        }

        return error;

    };

}
