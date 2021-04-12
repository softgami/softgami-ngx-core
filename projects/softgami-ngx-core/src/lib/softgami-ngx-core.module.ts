import { Country, Language } from 'softgami-ts-core';
import { NgModule } from '@angular/core';

// @dynamic
@NgModule({
    declarations: [ ],
    imports: [ ],
    exports: [ ],
})
export class SoftgamiNgxCoreModule {

    static country: Country | undefined;
    static language: Language | undefined;

}
