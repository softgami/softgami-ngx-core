import { Inject, Injectable } from '@angular/core';

import { Html5StorageService } from '../html5-storage.service';
import { SHOULD_ENCRYPT_LOCAL_STORAGE } from '../should-encrypt-local-storage.const';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService extends Html5StorageService {

    shouldEncrypt: boolean;

    constructor(@Inject(SHOULD_ENCRYPT_LOCAL_STORAGE) shouldEncrypt: boolean) {

        super(shouldEncrypt, window.localStorage);
        this.shouldEncrypt = shouldEncrypt;

    }

    set(key: string, value: object | number | string | boolean): void {

        super.set(key, value);

    }

    get<T>(key: string): T {

        return super.get<T>(key);

    }

    clear() {

        super.clear();

    }

}
