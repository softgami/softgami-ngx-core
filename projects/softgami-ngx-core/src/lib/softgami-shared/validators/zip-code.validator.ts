import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZipCodeRegexFactoryService } from 'softgami-ts-core';

import { SoftgamiNgxCoreModule } from '../../softgami-ngx-core.module';

export function ZipCodeValidator(locale?: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (control.value === null || control.value === undefined) {
            return null;
        }

        const error: ValidationErrors = {
            zipCode: true,
        };

        let regex: RegExp;

        if (locale) {
            locale = locale.toLowerCase();
            regex = new ZipCodeRegexFactoryService().getRegexByLocale(locale);
        } else if (SoftgamiNgxCoreModule.country) {
            regex = new ZipCodeRegexFactoryService().getRegexByCountry(SoftgamiNgxCoreModule.country);
        } else {
            return error;
        }

        return regex && regex.test(control.value) ? null : error;

    };

}
