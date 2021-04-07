import { AbstractControl, FormControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef, Input } from '@angular/core';

import { MatchOtherValidator } from '../validators/match-other.validator';

@Directive({
    selector: '[matchOtherValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchOtherValidatorDirective), multi: true } ],
})
export class MatchOtherValidatorDirective implements Validator {

    @Input() otherControl: FormControl;

    validate(control: AbstractControl): ValidationErrors | null {

        return MatchOtherValidator(this.otherControl)(control);

    }

}
