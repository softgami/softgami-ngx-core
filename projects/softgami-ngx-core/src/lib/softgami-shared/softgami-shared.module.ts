import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AutoFocusDirective } from './directives/auto-focus.directive';
import { DateValidatorDirective } from './directives/date-validator.directive';
import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { IncludesPipe } from './pipes/includes.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MathPipe } from './pipes/math.pipe';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { PhoneValidatorDirective } from './directives/phone-validator.directive';
import { TrimOnBlurDirective } from './directives/trim-on-blur.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AutoFocusDirective,
        DateValidatorDirective,
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MathPipe,
        NumbersOnlyDirective,
        PhoneValidatorDirective,
        TrimOnBlurDirective,
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
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MathPipe,
        NumbersOnlyDirective,
        PhoneValidatorDirective,
        TrimOnBlurDirective,
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
