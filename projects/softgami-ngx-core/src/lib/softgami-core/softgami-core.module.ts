import { Injector, ModuleWithProviders } from '@angular/core';

import { AbstractBaseComponent } from './base/abstract-base/abstract-base.component';
import { AbstractCoreService } from './services/abstract-core.service';
import { AbstractHttpService } from './repository/abstract-http-service';
import { NgModuleSoftgamiCoreModule } from './ng-module-softgami-core.module';

export class SoftgamiCoreModule {

    static forRoot(
        CoreService: typeof AbstractCoreService,
        HttpService?: typeof AbstractHttpService,
    ): ModuleWithProviders<NgModuleSoftgamiCoreModule> {

        return {
            ngModule: NgModuleSoftgamiCoreModule,
            providers: [
                {
                    provide: AbstractCoreService,
                    useExisting: CoreService,
                },
                {
                    provide: AbstractHttpService,
                    useExisting: HttpService,
                },
            ],
        };

    }

    static setInjector(injector: Injector) {

        AbstractBaseComponent.injector = injector;

    }

}
