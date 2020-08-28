import { FormControl } from '@angular/forms';

import { EmailValidator } from './email.validator';
import { VALID_EMAIL_REGEX } from 'softgami-ts-core';

describe('Email Validator', () => {

    let control: FormControl;
    let spyEmail: jasmine.Spy;

    beforeEach(() => {

        control = new FormControl(null, [ EmailValidator() ]);

    });

    it('should be defined', () => {

        expect(control).toBeDefined();

    });

    it('should be valid when value is null', () => {

        spyEmail = spyOn(VALID_EMAIL_REGEX, 'test');
        control.setValue(null);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();
        expect(spyEmail).not.toHaveBeenCalled();

    });

    it('should be valid when value is undefined', () => {

        spyEmail = spyOn(VALID_EMAIL_REGEX, 'test');
        control.setValue(undefined);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();
        expect(spyEmail).not.toHaveBeenCalled();

    });

    it('should call test with "e" when value is "e"', () => {

        spyEmail = spyOn(VALID_EMAIL_REGEX, 'test');
        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('e');
        expect(spyEmail).toHaveBeenCalledWith('e');

    });

    it('should call test with "e" when value is "e@do.c"', () => {

        spyEmail = spyOn(VALID_EMAIL_REGEX, 'test');
        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('e@do.c');
        expect(spyEmail).toHaveBeenCalledWith('e@do.c');

    });

    it('should call test with "e" when value is "e@do.co"', () => {

        spyEmail = spyOn(VALID_EMAIL_REGEX, 'test');
        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('e@do.co');
        expect(spyEmail).toHaveBeenCalledWith('e@do.co');

    });

    it('should be invalid when value is "e"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('e');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "em"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "em@"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em@');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "@"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('@');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "em@d"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em@d');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "em@do"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em@do');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "em@do."', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em@do.');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "em@do.c"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em@do.c');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "emdo.co"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('emdo.co');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "e@d.c"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('e@d.c');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value is "@e@d.co"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('@e@d.co');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value is "e@d.co"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('e@d.co');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is "em@d.co"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em@d.co');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is "em@do.co"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('em@do.co');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is "1e@d.co"', () => {

        control.clearValidators();
        control.setValidators(EmailValidator());
        control.setValue('1e@d.co');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

});
