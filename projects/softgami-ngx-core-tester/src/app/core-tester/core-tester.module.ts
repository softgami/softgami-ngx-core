import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';

import { AbstractCoreService } from 'projects/softgami-ngx-core/src/lib/softgami-core/services/abstract-core.service';
import { AbstractHttpService } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/abstract-http-service';
import { AbstractMessageService } from 'projects/softgami-ngx-core/src/lib/softgami-core/services/abstract-message.service';
import { SoftgamiCoreModule } from 'projects/softgami-ngx-core/src/lib/softgami-core/softgami-core.module';

import { AbstractCatsRepositoryService } from '../../domain/core-tester/repository/abstract-cats-repository.service';
import { CatsHttpRepositoryService } from './services/cats-http-repository.service';
import { CoreBaseTesterComponent } from './presentation/core-base-tester/core-base-tester.component';
import { CoreService } from './services/core.service';
import { CoreTesterRoutingModule } from './core-tester-routing.module';
import { GetAllCatsUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/get-all-cats-use-case.service';
import { GetAllTigerCatsUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/get-all-tiger-cats-use-case.service';
import { GetOneCatUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/get-one-cat-use-case.service';
import { GetOneTigerCatUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/get-one-tiger-cat-use-case.service';
import { HttpService } from './services/http.service';
import { MessageService } from './services/message.service';
import { RepositoryTesterComponent } from './presentation/repository-tester/repository-tester.component';
import { SaveCatUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/save-cat-use-case.service';
import { SaveTigerCatUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/save-tiger-cat-use-case.service';
import { UpdateCatUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/update-cat-use-case.service';
import { UpdateTigerCatUseCaseService } from '../../domain/core-tester/repository-tester/use-cases/update-tiger-cat-use-case.service';

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
        SoftgamiCoreModule.forRoot(),
    ],
    providers: [
        {
            provide: AbstractCatsRepositoryService,
            useExisting: CatsHttpRepositoryService,
        },
        {
            provide: GetAllCatsUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new GetAllCatsUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: GetAllTigerCatsUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new GetAllTigerCatsUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: GetOneCatUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new GetOneCatUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: GetOneTigerCatUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new GetOneTigerCatUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: SaveCatUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new SaveCatUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: SaveTigerCatUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new SaveTigerCatUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: UpdateCatUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new UpdateCatUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: UpdateTigerCatUseCaseService,
            useFactory: (
                a: AbstractCatsRepositoryService,
            ) => {

                return new UpdateTigerCatUseCaseService(a);

            },
            deps: [
                AbstractCatsRepositoryService,
            ],
        },
        {
            provide: AbstractCoreService,
            useExisting: CoreService,
        },
        {
            provide: AbstractMessageService,
            useExisting: MessageService,
        },
        {
            provide: AbstractHttpService,
            useClass: HttpService,
            deps: [ HttpClient ],
        },
    ],
})
export class CoreTesterModule {

    constructor(injector: Injector) {

        SoftgamiCoreModule.setInjector(injector);

    }

}
