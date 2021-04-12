import { AbstractControl, NgModel, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, forwardRef, Input } from '@angular/core';

import { MatchOtherValidator } from '../validators/match-other.validator';

@Directive({
    selector: '[matchOtherValidator]',
    providers: [ { provide: NG_VALIDATORS, useExisting: forwardRef(() => MatchOtherValidatorDirective), multi: true } ],
})
export class MatchOtherValidatorDirective implements Validator {

    @Input() otherControl: NgModel | undefined;

    validate(control: AbstractControl): ValidationErrors | null {

        return this.otherControl ? MatchOtherValidator(this.otherControl.control)(control) : null;

    }

}
