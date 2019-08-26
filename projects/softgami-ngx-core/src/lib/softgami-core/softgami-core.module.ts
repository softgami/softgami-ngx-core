import { Injector, ModuleWithProviders } from '@angular/core';

import { AbstractBaseComponent } from './base/abstract-base/abstract-base.component';
import { AbstractCoreService } from './services/abstract-core.service';
import { NgModuleSoftgamiCoreModule } from './ng-module-softgami-core.module';
import { UtilsService } from './services/utils.service';

export class SoftgamiCoreModule {

    static forRoot(
        CoreService: typeof AbstractCoreService,
    ): ModuleWithProviders<NgModuleSoftgamiCoreModule> {

        return {
            ngModule: NgModuleSoftgamiCoreModule,
            providers: [
                {
                    provide: AbstractCoreService,
                    useExisting: CoreService,
                },
                UtilsService,
            ],
        };

    }

    static setInjector(injector: Injector) {

        AbstractBaseComponent.injector = injector;

    }

}
