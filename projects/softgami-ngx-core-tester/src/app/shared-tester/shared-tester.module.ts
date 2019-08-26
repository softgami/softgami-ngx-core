import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SoftgamiSharedModule } from 'projects/softgami-ngx-core/src/lib/softgami-shared/softgami-shared.module';

import { SharedPipesTesterComponent } from './presentation/shared-pipes-tester/shared-pipes-tester.component';
import { SharedTesterRoutingModule } from './shared-tester-routing.module';
import { SharedValidatorsTesterComponent } from './presentation/shared-validators-tester/shared-validators-tester.component';

@NgModule({
    declarations: [
        SharedPipesTesterComponent,
        SharedValidatorsTesterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedTesterRoutingModule,
        SoftgamiSharedModule,
    ],
    providers: [],
})
export class SharedTesterModule {}
