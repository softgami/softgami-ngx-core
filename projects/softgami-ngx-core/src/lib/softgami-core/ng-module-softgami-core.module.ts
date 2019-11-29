import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { RepositoryModule } from './repository/repository.module';

@NgModule({
    imports: [
        CommonModule,
        RepositoryModule,
        TranslateModule.forRoot(),
    ],
})
export class NgModuleSoftgamiCoreModule {}
