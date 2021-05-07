import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { RepositoryModule } from './repository/repository.module';

export const translateModule = TranslateModule.forRoot();

@NgModule({
    imports: [
        CommonModule,
        RepositoryModule,
        translateModule,
    ],
})
export class NgModuleSoftgamiCoreModule {}
