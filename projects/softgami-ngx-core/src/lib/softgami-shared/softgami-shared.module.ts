import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { MathPipe } from './pipes';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        MathPipe,
    ],
    exports: [
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
