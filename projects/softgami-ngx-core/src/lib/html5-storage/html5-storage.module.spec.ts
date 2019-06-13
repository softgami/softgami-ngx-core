import { Html5StorageModule } from './html5-storage.module';
import { LocalStorageService } from './local-storage/local-storage.service';
import { SessionStorageService } from './session-storage/session-storage.service';
import { SHOULD_ENCRYPT_LOCAL_STORAGE } from './should-encrypt-local-storage.const';
import { SHOULD_ENCRYPT_SESSION_STORAGE } from './should-encrypt-session-storage.const';

describe('Html5StorageModule', () => {

    let html5StorageModule: Html5StorageModule;

    beforeEach(() => {

        html5StorageModule = new Html5StorageModule();

    });

    it('should create an instance', () => {

        expect(html5StorageModule).toBeTruthy();

    });

    it('forRoot should return object when should encrypt session true and should encrypt local true', () => {

        expect(html5StorageModule).toBeTruthy();

        const result = Html5StorageModule.forRoot(true, true);

        expect(result).toEqual({
            ngModule: Html5StorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: true,
                },
                {
                    provide: SHOULD_ENCRYPT_LOCAL_STORAGE,
                    useValue: true,
                },
                LocalStorageService,
                SessionStorageService,
            ],
        });

    });

    it('forRoot should return object when should encrypt session true and should encrypt local false', () => {

        expect(html5StorageModule).toBeTruthy();

        const result = Html5StorageModule.forRoot(true, false);

        expect(result).toEqual({
            ngModule: Html5StorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: true,
                },
                {
                    provide: SHOULD_ENCRYPT_LOCAL_STORAGE,
                    useValue: false,
                },
                LocalStorageService,
                SessionStorageService,
            ],
        });

    });

    it('forRoot should return object when should encrypt session false and should encrypt local true', () => {

        expect(html5StorageModule).toBeTruthy();

        const result = Html5StorageModule.forRoot(false, true);

        expect(result).toEqual({
            ngModule: Html5StorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: false,
                },
                {
                    provide: SHOULD_ENCRYPT_LOCAL_STORAGE,
                    useValue: true,
                },
                LocalStorageService,
                SessionStorageService,
            ],
        });

    });

    it('forRoot should return object when should encrypt session false and should encrypt local false', () => {

        expect(html5StorageModule).toBeTruthy();

        const result = Html5StorageModule.forRoot(false, false);

        expect(result).toEqual({
            ngModule: Html5StorageModule,
            providers: [
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: false,
                },
                {
                    provide: SHOULD_ENCRYPT_LOCAL_STORAGE,
                    useValue: false,
                },
                LocalStorageService,
                SessionStorageService,
            ],
        });

    });

    afterEach(() => {

        html5StorageModule = null;

    });

});
