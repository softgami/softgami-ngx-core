import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreBaseTesterComponent } from './presentation/core-base-tester/core-base-tester.component';
import { RepositoryTesterComponent } from './presentation/repository-tester/repository-tester.component';

const appRoutes: Routes = [
    {
        path: 'core/base',
        component: CoreBaseTesterComponent,
    },
    {
        path: 'core/repository',
        component: RepositoryTesterComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [ RouterModule ],
})
export class CoreTesterRoutingModule { }
