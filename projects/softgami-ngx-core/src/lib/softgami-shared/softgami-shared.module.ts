import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { AutoFocusDirective } from './directives/auto-focus.directive';
import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { IncludesPipe } from './pipes/includes.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MathPipe } from './pipes/math.pipe';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { TrimOnBlurDirective } from './directives/trim-on-blur.directive';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        AutoFocusDirective,
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MathPipe,
        NumbersOnlyDirective,
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
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MathPipe,
        NumbersOnlyDirective,
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
