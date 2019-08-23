import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreBaseTesterComponent } from './presentation/core-base-tester/core-base-tester.component';

const appRoutes: Routes = [
    {
        path: 'core/base',
        component: CoreBaseTesterComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [RouterModule],
})
export class CoreTesterRoutingModule { }
