import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PhoneRegexFactoryService } from 'softgami-ts-core';

import { SoftgamiNgxCoreModule } from '../../softgami-ngx-core.module';

export function PhoneValidator(locale?: string): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (control.value === null || control.value === undefined) {

            return null;

        }

        const error: ValidationErrors = {
            phone: true,
        };

        let regex: RegExp;

        if (locale) {

            locale = locale.toLowerCase();
            regex = new PhoneRegexFactoryService().getRegexByLocale(locale);

        } else if (SoftgamiNgxCoreModule.country) {

            regex = new PhoneRegexFactoryService().getRegexByCountry(SoftgamiNgxCoreModule.country);

        } else {

            return error;

        }

        return regex && regex.test(control.value) ? null : error;

    };

}
