import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';


@NgModule({
    imports: [
        CommonModule,
    ],
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {

        return {
            ngModule: SharedModule,
            providers: [ ],
        };

    }

}
