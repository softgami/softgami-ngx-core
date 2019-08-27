import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedDirectivesTesterComponent } from './presentation/shared-directives-tester/shared-directives-tester.component';
import { SharedPipesTesterComponent } from './presentation/shared-pipes-tester/shared-pipes-tester.component';
import { SharedValidatorsTesterComponent } from './presentation/shared-validators-tester/shared-validators-tester.component';

const appRoutes: Routes = [
    {
        path: 'shared/pipes',
        component: SharedPipesTesterComponent,
    },
    {
        path: 'shared/validators',
        component: SharedValidatorsTesterComponent,
    },
    {
        path: 'shared/directives',
        component: SharedDirectivesTesterComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [RouterModule],
})
export class SharedTesterRoutingModule { }
