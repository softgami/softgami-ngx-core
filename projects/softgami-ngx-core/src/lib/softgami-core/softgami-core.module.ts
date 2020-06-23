import { Injector, ModuleWithProviders } from '@angular/core';

import { AbstractBaseComponent } from './base/abstract-base/abstract-base.component';
import { NgModuleSoftgamiCoreModule } from './ng-module-softgami-core.module';

export class SoftgamiCoreModule {

    static forRoot(): ModuleWithProviders<NgModuleSoftgamiCoreModule> {

        return {
            ngModule: NgModuleSoftgamiCoreModule,
        };

    }

    static setInjector(injector: Injector) {

        AbstractBaseComponent.injector = injector;

    }

}
