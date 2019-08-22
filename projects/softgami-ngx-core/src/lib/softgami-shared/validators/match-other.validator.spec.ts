import { FormControl } from '@angular/forms';

import { MatchOtherValidator } from './match-other.validator';

describe('Match Other Validator', () => {

    let control: FormControl;
    let otherControl: FormControl;
    let spyValueChanges: jasmine.Spy;
    let spyUpdate: jasmine.Spy;

    beforeEach(() => {

        otherControl = new FormControl(null);
        control = new FormControl(null, [ MatchOtherValidator(otherControl) ]);
        spyValueChanges = spyOn(otherControl.valueChanges, 'subscribe').and.returnValue(null);

    });

    it('should be defined', () => {

        expect(control).toBeDefined();
        expect(otherControl).toBeDefined();

    });

    it('should subscribe on other control values changes', () => {

        otherControl.setValue('value');
        expect(spyValueChanges).toHaveBeenCalled();

    });

    it('should call updateValueAndValidity when other control value changes', () => {

        spyUpdate = spyOn(control, 'updateValueAndValidity').and.returnValue(null);
        otherControl.setValue('value');
        expect(spyUpdate).toHaveBeenCalled();

    });

    it('should be invalid if control value and other control value are strings and not equal', () => {

        otherControl.setValue('value1');
        control.setValue('value2');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid if control value and other control value are numbers and not equal', () => {

        otherControl.setValue(1);
        control.setValue(2);
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid if control value and other control value are not strictly equal', () => {

        otherControl.setValue(1);
        control.setValue('1');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid if control value and other control value are booleans and not equal', () => {

        otherControl.setValue(true);
        control.setValue(false);
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid if control value is false and other control value is null', () => {

        otherControl.setValue(null);
        control.setValue(false);
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid if control value is false and other control value is undefined', () => {

        otherControl.setValue(undefined);
        control.setValue(false);
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid if control value is false and other control value is zero', () => {

        otherControl.setValue(0);
        control.setValue(false);
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid if control value and other control value are strings and strictly equal', () => {

        otherControl.setValue('value1');
        control.setValue('value1');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid if control value and other control value are numbers and strictly equal', () => {

        otherControl.setValue(1);
        control.setValue(1);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid if control value and other control value are booleans true and strictly equal', () => {

        otherControl.setValue(true);
        control.setValue(true);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be valid if control value and other control value are booleans false and strictly equal', () => {

        otherControl.setValue(false);
        control.setValue(false);
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    afterEach(() => {

        control = null;
        otherControl = null;

    });

});
