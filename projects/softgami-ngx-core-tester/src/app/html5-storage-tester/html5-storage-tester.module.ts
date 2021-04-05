import { NgModule } from '@angular/core';

import { Html5StorageModule } from 'projects/softgami-ngx-core/src/lib/html5-storage/html5-storage.module';
import { LocalStorageService } from 'projects/softgami-ngx-core/src/public-api';

import { Html5StorageTesterComponent } from './presentation/html5-storage-tester/html5-storage-tester.component';
import { Html5StorageTesterRoutingModule } from './html5-storage-tester-routing.module';

@NgModule({
    declarations: [
        Html5StorageTesterComponent,
    ],
    imports: [
        Html5StorageModule.forRoot(false, false, LocalStorageService),
        Html5StorageTesterRoutingModule,
    ],
    providers: [
    ],
})
export class Html5StorageTesterModule {}
