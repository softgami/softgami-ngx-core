import { FormControl } from '@angular/forms';

import { NoWhitespaceValidator } from './no-whitespace.validator';

describe('Whitespace Validator', () => {

    let control: FormControl;

    beforeEach(() => {

        control = new FormControl(null, [ NoWhitespaceValidator() ]);

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

    it('should be invalid when value is empty string', () => {

        control.setValue('');
        expect(control.valid).toBeFalsy();
        expect(control.invalid).toBeTruthy();

    });

    it('should be invalid when value is not empty string', () => {

        control.setValue('a');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is number', () => {

        control.setValue(10);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is boolean true', () => {

        control.setValue(true);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is boolean false', () => {

        control.setValue(false);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value is zero', () => {

        control.setValue(0);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value contains white spaces before', () => {

        control.setValue(' a');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid when value contains white spaces after', () => {

        control.setValue('a ');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    afterEach(() => {

        control = null;

    });

});
