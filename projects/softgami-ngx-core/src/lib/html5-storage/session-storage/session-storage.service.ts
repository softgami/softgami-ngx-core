import { Inject, Injectable } from '@angular/core';

import { AbstractHtml5StorageService } from '../abstract-html5-storage.service';
import { SHOULD_ENCRYPT_SESSION_STORAGE } from '../should-encrypt-session-storage.const';

@Injectable({
    providedIn: 'root',
})
export class SessionStorageService extends AbstractHtml5StorageService {

    shouldEncrypt: boolean;

    constructor(@Inject(SHOULD_ENCRYPT_SESSION_STORAGE) shouldEncrypt: boolean) {

        super(shouldEncrypt, window.sessionStorage);
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
