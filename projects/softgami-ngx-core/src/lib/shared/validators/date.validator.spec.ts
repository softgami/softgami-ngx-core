import { FormControl } from '@angular/forms';

import { DateValidator } from './date.validator';

describe('Date Validator', () => {

    let control: FormControl;

    beforeEach(() => {

        control = new FormControl(null, [ DateValidator() ]);

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
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has not the pattern dd/mm/yyyy', () => {

        control.setValue('14-13-2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has day less than 1', () => {

        control.setValue('0/04/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31', () => {

        control.setValue('32/02/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has month less than 1', () => {

        control.setValue('01/0/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has month greater than 12', () => {

        control.setValue('01/13/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has year less than 1', () => {

        control.setValue('01/01/0');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has year less than 1600', () => {

        control.setValue('01/01/1599');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31 and month is 01', () => {

        control.setValue('32/01/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 31 and month is 01', () => {

        control.setValue('31/01/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 29 and month is 02', () => {

        control.setValue('30/02/2000');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 28 and month is 02 and year is not leap year', () => {

        control.setValue('29/02/1997');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

        control.setValue('29/02/1998');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

        control.setValue('29/02/1999');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day greater than 28 and month is 02 and year is leap year', () => {

        control.setValue('29/02/2000');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

        control.setValue('29/02/2004');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

        control.setValue('29/02/2008');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31 and month is 03', () => {

        control.setValue('32/03/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 31 and month is 03', () => {

        control.setValue('31/03/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 30 and month is 04', () => {

        control.setValue('31/04/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 30 and month is 04', () => {

        control.setValue('30/04/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31 and month is 05', () => {

        control.setValue('32/05/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 31 and month is 05', () => {

        control.setValue('31/05/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 30 and month is 06', () => {

        control.setValue('31/06/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 30 and month is 06', () => {

        control.setValue('30/06/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31 and month is 07', () => {

        control.setValue('32/07/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 31 and month is 07', () => {

        control.setValue('31/07/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31 and month is 08', () => {

        control.setValue('32/08/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 31 and month is 08', () => {

        control.setValue('31/08/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 30 and month is 09', () => {

        control.setValue('31/09/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 30 and month is 09', () => {

        control.setValue('30/09/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31 and month is 10', () => {

        control.setValue('32/10/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 31 and month is 10', () => {

        control.setValue('31/10/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 30 and month is 11', () => {

        control.setValue('31/11/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 30 and month is 11', () => {

        control.setValue('30/11/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    it('should be invalid when value has day greater than 31 and month is 12', () => {

        control.setValue('32/12/2019');
        expect(control.invalid).toBeTruthy();
        expect(control.valid).toBeFalsy();

    });

    it('should be valid when value has day 31 and month is 12', () => {

        control.setValue('31/12/2019');
        expect(control.valid).toBeTruthy();
        expect(control.invalid).toBeFalsy();

    });

    afterEach(() => {

        control = null;

    });

});
