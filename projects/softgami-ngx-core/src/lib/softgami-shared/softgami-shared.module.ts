import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import { FilterListPipe } from './pipes/filter-list.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MathPipe } from './pipes/math.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FileSizeFormatterPipe,
        FilterListPipe,
        JoinPipe,
        MathPipe,
    ],
    exports: [
        FileSizeFormatterPipe,
        FilterListPipe,
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
