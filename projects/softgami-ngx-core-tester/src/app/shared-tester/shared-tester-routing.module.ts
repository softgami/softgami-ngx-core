import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedValidatorsTesterComponent } from './presentation/shared-validators-tester/shared-validators-tester.component';

const appRoutes: Routes = [
    {
        path: 'shared/validators',
        component: SharedValidatorsTesterComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [RouterModule],
})
export class SharedTesterRoutingModule { }
