import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SoftgamiTsUtilsService } from 'softgami-ts-core';

import { AutoFocusDirective } from './directives/auto-focus.directive';
import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { IncludesPipe } from './pipes/includes.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MathPipe } from './pipes/math.pipe';

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
    ],
    providers: [
        {
            provide: SoftgamiTsUtilsService,
            useValue: new SoftgamiTsUtilsService(),
        }
    ],
    exports: [
        AutoFocusDirective,
        FileSizeFormatterPipe,
        FilterListPipe,
        IncludesPipe,
        JoinPipe,
        MathPipe,
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
