import { FormControl } from '@angular/forms';

import { PhoneValidator } from './phone.validator';
import { VALID_PHONE_BR_REGEX } from 'softgami-ts-core';

describe('Phone Validator', () => {

    let control: FormControl;
    let spyPhoneBR: jasmine.Spy;

    beforeEach(() => {

        control = new FormControl(null, [ PhoneValidator() ]);

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

    it('should call VALID_PHONE_BR_REGEX test when no locale was provided', () => {

        spyPhoneBR = spyOn(VALID_PHONE_BR_REGEX, 'test');
        control.setValue('12');
        expect(spyPhoneBR).toHaveBeenCalledWith('12');

    });

    it('should call VALID_PHONE_BR_REGEX test when locale is "pt"', () => {

        spyPhoneBR = spyOn(VALID_PHONE_BR_REGEX, 'test');
        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('12');
        expect(spyPhoneBR).toHaveBeenCalledWith('12');

    });

    it('should call VALID_PHONE_BR_REGEX test when locale is "pt-br"', () => {

        spyPhoneBR = spyOn(VALID_PHONE_BR_REGEX, 'test');
        control.clearValidators();
        control.setValidators(PhoneValidator('pt-br'));
        control.setValue('12');
        expect(spyPhoneBR).toHaveBeenCalledWith('12');

    });

    it('should call VALID_PHONE_BR_REGEX test with lowercase when locale is "PT-BR"', () => {

        spyPhoneBR = spyOn(VALID_PHONE_BR_REGEX, 'test');
        control.clearValidators();
        control.setValidators(PhoneValidator('PT-BR'));
        control.setValue('12');
        expect(spyPhoneBR).toHaveBeenCalledWith('12');

    });

    it('should be invalid when locale is "pt" and value is empty string', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "(4199999999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('(4199999999');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "(41)99999999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('(41)99999999');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "(41)9999-999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('(41)9999-999');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when locale is "pt" and value is "(41)9999-99999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('(41)9999-99999');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when locale is "pt" and value is "4199999999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('4199999999');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale is "pt" and value is "41999999999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('41999999999');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale is "pt" and value is "(41)9999-9999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('(41)9999-9999');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale is "pt" and value is "(41)99999-9999"', () => {

        control.clearValidators();
        control.setValidators(PhoneValidator('pt'));
        control.setValue('(41)99999-9999');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale was not provided and value is "(41)9999-9999"', () => {

        control.setValue('(41)9999-9999');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when locale was not provided and value is "(41)99999-9999"', () => {

        control.setValue('(41)99999-9999');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    afterEach(() => {

        control = null;

    });

});
