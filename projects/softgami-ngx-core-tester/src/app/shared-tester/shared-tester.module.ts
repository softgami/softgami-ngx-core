import { CommonModule } from '@angular/common';
import { Country } from 'softgami-ts-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';

import { SoftgamiNgxCoreModule } from 'projects/softgami-ngx-core/src/lib/softgami-ngx-core.module';
import { SoftgamiSharedModule } from 'projects/softgami-ngx-core/src/lib/softgami-shared/softgami-shared.module';

import { SharedDirectivesTesterComponent } from './presentation/shared-directives-tester/shared-directives-tester.component';
import { SharedPipesTesterComponent } from './presentation/shared-pipes-tester/shared-pipes-tester.component';
import { SharedTesterRoutingModule } from './shared-tester-routing.module';
import { SharedValidatorsTesterComponent } from './presentation/shared-validators-tester/shared-validators-tester.component';

@NgModule({
    declarations: [
        SharedDirectivesTesterComponent,
        SharedPipesTesterComponent,
        SharedValidatorsTesterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgxMaskModule.forRoot(),
        ReactiveFormsModule,
        SharedTesterRoutingModule,
        SoftgamiSharedModule,
    ],
    providers: [],
})
export class SharedTesterModule {

    constructor() {

        const country: Country = new Country();
        country.code = 'br';

        SoftgamiNgxCoreModule.country = country;

    }

}
