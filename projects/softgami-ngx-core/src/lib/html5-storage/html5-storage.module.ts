import { ModuleWithProviders } from '@angular/core';

import { AbstractHtml5StorageService } from './abstract-html5-storage.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { NgModuleHtml5StorageModule } from './ng-module-html5-storage.module';
import { SessionStorageService } from './session-storage/session-storage.service';
import { SHOULD_ENCRYPT_LOCAL_STORAGE } from './should-encrypt-local-storage.const';
import { SHOULD_ENCRYPT_SESSION_STORAGE } from './should-encrypt-session-storage.const';

export class Html5StorageModule {

    static forRoot(
        shouldEncryptSessionStorage: boolean,
        shouldEncryptLocalStorage: boolean,
        DefaultHtml5StorageService: typeof AbstractHtml5StorageService,
    ): ModuleWithProviders<NgModuleHtml5StorageModule> {

        return {
            ngModule: NgModuleHtml5StorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: shouldEncryptSessionStorage,
                },
                {
                    provide: SHOULD_ENCRYPT_LOCAL_STORAGE,
                    useValue: shouldEncryptLocalStorage,
                },
                {
                    provide: AbstractHtml5StorageService,
                    useExisting: DefaultHtml5StorageService,
                },
                LocalStorageService,
                SessionStorageService,
            ],
        };

    }

}
