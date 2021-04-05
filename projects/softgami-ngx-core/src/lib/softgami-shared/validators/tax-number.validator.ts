import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AbstractTaxNumberUtilsService, TaxNumberUtilsFactoryService } from 'softgami-ts-core';

import { SoftgamiNgxCoreModule } from '../../softgami-ngx-core.module';

export function TaxNumberValidator(countryCode?: string, isIndividual?: boolean): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

        if (control.value === null || control.value === undefined) {

            return null;

        }

        const error: ValidationErrors = {
            taxNumber: true,
        };

        let taxNumberUtilsService: AbstractTaxNumberUtilsService;

        if (countryCode) {

            countryCode = countryCode.toLowerCase();
            taxNumberUtilsService = new TaxNumberUtilsFactoryService().getUtilsServiceByCountryCode(countryCode, isIndividual);

        } else if (SoftgamiNgxCoreModule.country) {

            taxNumberUtilsService =
                new TaxNumberUtilsFactoryService().getUtilsServiceByCountry(SoftgamiNgxCoreModule.country, isIndividual);

        } else {

            return error;

        }

        return taxNumberUtilsService && taxNumberUtilsService.validate(control.value) ? null : error;

    };

}
