import { FormControl } from '@angular/forms';
import * as BrazilianUtils from '@brazilian-utils/is-valid-cpf';

import { TaxNumberValidator } from './tax-number.validator';

describe('Tax Number Validator', () => {

    let control: FormControl;
    let spyIsValidCpf: jasmine.Spy;

    beforeEach(() => {

        control = new FormControl(null, [ TaxNumberValidator() ]);

    });

    it('should be defined', () => {

        expect(control).toBeDefined();

    });

    it('should be valid when value is null', () => {

        control.setValue(null);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is undefined', () => {

        control.setValue(undefined);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should call isValidCpf test when no locale was provided', () => {

        spyIsValidCpf = spyOn(BrazilianUtils, 'default');
        control.setValue('12');
        expect(spyIsValidCpf).toHaveBeenCalledWith('12');

    });

    it('should call VALID_PHONE_BR test when locale is "pt"', () => {

        spyIsValidCpf = spyOn(BrazilianUtils, 'default');
        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('12');
        expect(spyIsValidCpf).toHaveBeenCalledWith('12');

    });

    it('should call VALID_PHONE_BR test when locale is "pt-br"', () => {

        spyIsValidCpf = spyOn(BrazilianUtils, 'default');
        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt-br'));
        control.setValue('12');
        expect(spyIsValidCpf).toHaveBeenCalledWith('12');

    });

    it('should call VALID_PHONE_BR test with lowercase when locale is "PT-BR"', () => {

        spyIsValidCpf = spyOn(BrazilianUtils, 'default');
        control.clearValidators();
        control.setValidators(TaxNumberValidator('PT-BR'));
        control.setValue('12');
        expect(spyIsValidCpf).toHaveBeenCalledWith('12');

    });




    it('should be invalid when locale is "pt" and value is empty string', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "1001395166"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('1001395166');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "1001395166"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('1001395166');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "1001395166"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('1001395166');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "1001395166"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('1001395166');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "1001395166"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('1001395166');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when locale was not provided and value is "10013951661"', () => {

        control.setValue('10013951661');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale is "pt" and value is "10013951661"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('10013951661');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale is "pt-br" and value is "10013951661"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt-br'));
        control.setValue('10013951661');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale was not provided and value is "874.847.196-84"', () => {

        control.setValue('874.847.196-84');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale is "pt" and value is "874.847.196-84"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt'));
        control.setValue('874.847.196-84');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale is "pt-br" and value is "874.847.196-84"', () => {

        control.clearValidators();
        control.setValidators(TaxNumberValidator('pt-br'));
        control.setValue('874.847.196-84');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });


    afterEach(() => {

        control = null;

    });

});
