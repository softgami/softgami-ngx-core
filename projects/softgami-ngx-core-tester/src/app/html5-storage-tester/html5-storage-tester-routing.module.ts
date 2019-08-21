import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Html5StorageTesterComponent } from './presentation/html5-storage-tester/html5-storage-tester.component';

const appRoutes: Routes = [
    {
        path: 'html5-storage',
        component: Html5StorageTesterComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes),
    ],
    exports: [RouterModule],
})
export class Html5StorageTesterRoutingModule { }
