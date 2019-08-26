import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import { JoinPipe } from './pipes/join.pipe';
import { MathPipe } from './pipes/math.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FileSizeFormatterPipe,
        JoinPipe,
        MathPipe,
    ],
    exports: [
        FileSizeFormatterPipe,
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
