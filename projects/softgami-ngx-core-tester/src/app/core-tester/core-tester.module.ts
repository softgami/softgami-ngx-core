import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injector, NgModule } from '@angular/core';

import { SoftgamiCoreModule } from 'projects/softgami-ngx-core/src/lib/softgami-core/softgami-core.module';

import { CoreBaseTesterComponent } from './presentation/core-base-tester/core-base-tester.component';
import { CoreService } from './services/core.service';
import { CoreTesterRoutingModule } from './core-tester-routing.module';

@NgModule({
    declarations: [
        CoreBaseTesterComponent,
    ],
    imports: [
        CommonModule,
        CoreTesterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SoftgamiCoreModule.forRoot(CoreService),
    ],
    providers: [
        CoreService,
    ],
})
export class CoreTesterModule {

    constructor(injector: Injector) {

        SoftgamiCoreModule.setInjector(injector);

    }
}
