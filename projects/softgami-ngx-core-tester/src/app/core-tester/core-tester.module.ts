import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injector, NgModule } from '@angular/core';

import { SoftgamiCoreModule } from 'projects/softgami-ngx-core/src/lib/softgami-core/softgami-core.module';

import { AbstractCatsRepositoryService } from '../../domain/core-tester/repository/abstract-cats-repository.service';
import { CatsHttpRepositoryService } from './services/cats-http-repository.service';
import { CoreBaseTesterComponent } from './presentation/core-base-tester/core-base-tester.component';
import { CoreService } from './services/core.service';
import { CoreTesterRoutingModule } from './core-tester-routing.module';
import { GetAllCatsUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/get-all-cats-use-case.service';
import { HttpService } from './services/http.service';
import { RepositoryTesterComponent } from './presentation/repository-tester/repository-tester.component';

@NgModule({
    declarations: [
        CoreBaseTesterComponent,
        RepositoryTesterComponent,
    ],
    imports: [
        CommonModule,
        CoreTesterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SoftgamiCoreModule.forRoot(CoreService, HttpService),
    ],
    providers: [
        CoreService,
        HttpService,
        {
            provide: AbstractCatsRepositoryService,
            useClass: CatsHttpRepositoryService,
        },
        GetAllCatsUseCaseService,
    ],
})
export class CoreTesterModule {

    constructor(injector: Injector) {

        SoftgamiCoreModule.setInjector(injector);

    }
}
