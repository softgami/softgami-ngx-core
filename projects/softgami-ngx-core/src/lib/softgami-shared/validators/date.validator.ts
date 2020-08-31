import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateRegexFactoryService } from 'softgami-ts-core';

import { SoftgamiNgxCoreModule } from '../../softgami-ngx-core.module';

export function DateValidator(locale?: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        const error: ValidationErrors = {
            date: true,
        };

        if (control.value === null || control.value === undefined) {
            return null;
        }

        let regex: RegExp;

        if (locale) {
            locale = locale.toLowerCase();
            regex = new DateRegexFactoryService().getRegexByLocale(locale);
        } else if (SoftgamiNgxCoreModule.country) {
            regex = new DateRegexFactoryService().getRegexByCountry(SoftgamiNgxCoreModule.country);
        } else {
            return error;
        }

        return regex && regex.test(control.value) ? null : error;

    };

}

