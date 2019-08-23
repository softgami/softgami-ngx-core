import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FileSizeFormatterPipe } from './pipes/file-size-formatter.pipe';
import { MathPipe } from './pipes/math.pipe';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        FileSizeFormatterPipe,
        MathPipe,
    ],
    exports: [
        FileSizeFormatterPipe,
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
