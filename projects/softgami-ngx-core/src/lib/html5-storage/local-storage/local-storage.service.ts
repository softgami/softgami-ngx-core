import { Inject, Injectable } from '@angular/core';

import { AbstractHtml5StorageService } from '../abstract-html5-storage.service';
import { SHOULD_ENCRYPT_LOCAL_STORAGE } from '../should-encrypt-local-storage.const';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService extends AbstractHtml5StorageService {

    shouldEncrypt: boolean;

    constructor(@Inject(SHOULD_ENCRYPT_LOCAL_STORAGE) shouldEncrypt: boolean) {

        super(shouldEncrypt, window.localStorage);
        this.shouldEncrypt = shouldEncrypt;

    }

    set<T>(key: string, value: T): void {

        super.set(key, value);

    }

    get<T>(key: string): T | undefined {

        return super.get<T>(key);

    }

}
