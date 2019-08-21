import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedTesterRoutingModule } from './shared-tester-routing.module';
import { SharedValidatorsTesterComponent } from './presentation/shared-validators-tester/shared-validators-tester.component';

@NgModule({
    declarations: [
        SharedValidatorsTesterComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedTesterRoutingModule,
    ],
    providers: [],
})
export class SharedTesterModule {}
