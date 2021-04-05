import { TestBed } from '@angular/core/testing';

import { AbstractHtml5StorageService } from '../abstract-html5-storage.service';
import { SessionStorageService } from './session-storage.service';
import { SHOULD_ENCRYPT_SESSION_STORAGE } from '../should-encrypt-session-storage.const';

describe('SessionStorageService', () => {

    let spySuper: jasmine.Spy;
    let service: SessionStorageService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                SessionStorageService,
                {
                    provide: SHOULD_ENCRYPT_SESSION_STORAGE,
                    useValue: true,
                },
            ],
        });

    });

    beforeEach(() => {

        service = TestBed.get(SessionStorageService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    describe('set', () => {

        it('set should call super set with "key" and "value" when args are "key" and "value"', () => {

            spySuper = spyOn(AbstractHtml5StorageService.prototype, 'set');

            service.set('key', 'value');

            expect(spySuper).toHaveBeenCalledWith('key', 'value');

        });

        it('set should call super set with "key2" and "value2" when args are "key2" and "value2"', () => {

            spySuper = spyOn(AbstractHtml5StorageService.prototype, 'set');

            service.set('key2', 'value2');

            expect(spySuper).toHaveBeenCalledWith('key2', 'value2');

        });

    });

    describe('get', () => {

        it('get should call super get with "key" when arg is "key"', () => {

            spySuper = spyOn(AbstractHtml5StorageService.prototype, 'get').and.returnValue('value');

            const result: string = service.get<string>('key');

            expect(spySuper).toHaveBeenCalledWith('key');

        });

        it('get should call super get with "key2" when arg is "key2"', () => {

            spySuper = spyOn(AbstractHtml5StorageService.prototype, 'get').and.returnValue('value');

            const result: string = service.get<string>('key2');

            expect(spySuper).toHaveBeenCalledWith('key2');

        });

        it('get should return "value" when super get return "value"', () => {

            spySuper = spyOn(AbstractHtml5StorageService.prototype, 'get').and.returnValue('value');

            const result: string = service.get<string>('key');

            expect(result).toBe('value');

        });

        it('get should return "value2" when super get return "value2"', () => {

            spySuper = spyOn(AbstractHtml5StorageService.prototype, 'get').and.returnValue('value2');

            const result: string = service.get<string>('key');

            expect(result).toBe('value2');

        });

    });

    describe('clear', () => {

        it('clear should call super clear when clear was called', () => {

            spySuper = spyOn(AbstractHtml5StorageService.prototype, 'clear');

            service.clear();

            expect(spySuper).toHaveBeenCalled();

        });

    });

    afterEach(() => {

        spySuper = null;
        service = null;

    });

});
