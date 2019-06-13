import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';

import { LocalStorageService } from './local-storage/local-storage.service';
import { SessionStorageService } from './session-storage/session-storage.service';
import { SHOULD_ENCRYPT_LOCAL_STORAGE } from './should-encrypt-local-storage.const';
import { SHOULD_ENCRYPT_SESSION_STORAGE } from './should-encrypt-session-storage.const';

@NgModule({
    imports: [
        CommonModule,
    ],
})
export class Html5StorageModule {

    static forRoot(shouldEncryptSessionStorage: boolean, shouldEncryptLocalStorage: boolean): ModuleWithProviders {

        return {
            ngModule: Html5StorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: shouldEncryptSessionStorage,
                },
                {
                    provide: SHOULD_ENCRYPT_LOCAL_STORAGE,
                    useValue: shouldEncryptLocalStorage,
                },
                LocalStorageService,
                SessionStorageService,
            ],
        };

    }

}
