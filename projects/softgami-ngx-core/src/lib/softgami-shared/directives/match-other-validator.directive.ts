import { AbstractControl, FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

import { MatchOtherValidator } from '../validators/match-other.validator';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[matchOtherValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: MatchOtherValidatorDirective, multi: true}],
})
export class MatchOtherValidatorDirective implements Validator {

    @Input() otherControl: FormControl;

    validate(control: AbstractControl): {[key: string]: any} | null {

        return MatchOtherValidator(this.otherControl)(control);

    }

}
