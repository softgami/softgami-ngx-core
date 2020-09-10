import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AutoFocusDirective } from './directives/auto-focus.directive';
import { DateValidatorDirective } from './directives/date-validator.directive';
import { DuplicatedValidatorDirective } from './directives/duplicated-validator.directive';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { IncludesPipe } from './pipes/includes.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MatchOtherValidatorDirective } from './directives/match-other-validator.directive';
import { MathPipe } from './pipes/math.pipe';
import { NoWhiteSpaceValidatorDirective } from './directives/no-whitespace-validator.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { PasswordValidatorDirective } from './directives/password-validator.directive';
import { PhoneValidatorDirective } from './directives/phone-validator.directive';
import { TaxNumberValidatorDirective } from './directives/tax-number-validator.directive';
import { TrimOnBlurDirective } from './directives/trim-on-blur.directive';
import { ZipCodeValidatorDirective } from './directives/zip-code-validator.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AutoFocusDirective,
        DateValidatorDirective,
        DuplicatedValidatorDirective,
        EmailValidatorDirective,
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MatchOtherValidatorDirective,
        MathPipe,
        NoWhiteSpaceValidatorDirective,
        NumbersOnlyDirective,
        PasswordValidatorDirective,
        PhoneValidatorDirective,
        TaxNumberValidatorDirective,
        TrimOnBlurDirective,
        ZipCodeValidatorDirective,
    ],
    providers: [
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MathPipe,
    ],
    exports: [
        AutoFocusDirective,
        DateValidatorDirective,
        DuplicatedValidatorDirective,
        EmailValidatorDirective,
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MatchOtherValidatorDirective,
        MathPipe,
        NoWhiteSpaceValidatorDirective,
        NumbersOnlyDirective,
        PasswordValidatorDirective,
        PhoneValidatorDirective,
        TaxNumberValidatorDirective,
        TrimOnBlurDirective,
        ZipCodeValidatorDirective,
    ],
})
export class SoftgamiSharedModule {

    static forRoot(): ModuleWithProviders {

        return {
            ngModule: SoftgamiSharedModule,
            providers: [ ],
        };

    }

}
