import * as CryptoJS from 'crypto-js';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { AbstractHtml5StorageService } from './abstract-html5-storage.service';

describe('AbstractHtml5StorageService', () => {

    let service: AbstractHtml5StorageService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                AbstractHtml5StorageService,
            ],
        });

    });

    beforeEach(() => {

        service = TestBed.get(AbstractHtml5StorageService as Type<AbstractHtml5StorageService>);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    describe('onChanges', () => {

        it('onChanges should return changes property', () => {

            expect(service.onChanges()).toBe(service.changes);

        });

    });

    describe('set', () => {

        it('set should return when value is null', () => {

            const spy: jasmine.Spy = spyOn(window.sessionStorage, 'setItem').and.returnValue(null);

            service.set('key', null);

            expect(spy).not.toHaveBeenCalled();

        });

        it('set should return when value is undefined', () => {

            const spy: jasmine.Spy = spyOn(window.sessionStorage, 'setItem').and.returnValue(null);

            service.set('key', undefined);

            expect(spy).not.toHaveBeenCalled();

        });

        it('set should set storage without encryption when should not encrypt ', () => {

            service.storage = window.sessionStorage;
            const spy: jasmine.Spy = spyOn(window.sessionStorage, 'setItem').and.returnValue(null);
            const spyCryptoJsSHA512: jasmine.Spy = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
            const spyCryptoJsEncrypt: jasmine.Spy = spyOn(CryptoJS.AES, 'encrypt').and.returnValue('encryptedValue');
            const spyChange: jasmine.Spy = spyOn(service.changes, 'next').and.returnValue(null);
            service.shouldEncrypt = false;

            service.set('key', 'value');

            expect(spy).toHaveBeenCalledWith('key', JSON.stringify('value'));
            expect(spyCryptoJsSHA512).not.toHaveBeenCalled();
            expect(spyCryptoJsEncrypt).not.toHaveBeenCalled();
            expect(spyChange).toHaveBeenCalledWith('key');

        });

        it('set should set storage with encryption when should encrypt', () => {

            service.storage = window.sessionStorage;
            const spySession: jasmine.Spy = spyOn(window.sessionStorage, 'setItem').and.returnValue(null);
            const spyCryptoJsSHA512: jasmine.Spy = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
            const spyCryptoJsEncrypt: jasmine.Spy = spyOn(CryptoJS.AES, 'encrypt').and.returnValue('encryptedValue');
            const spyChange: jasmine.Spy = spyOn(service.changes, 'next').and.returnValue(null);
            service.shouldEncrypt = true;

            service.set('key', 'value');

            expect(spySession).toHaveBeenCalledWith('encryptedKey', 'encryptedValue');
            expect(spyCryptoJsSHA512).toHaveBeenCalledWith('key');
            expect(spyCryptoJsEncrypt).toHaveBeenCalledWith(JSON.stringify('value'), service.privateKey);
            expect(spyChange).toHaveBeenCalledWith('key');

        });

    });

    describe('get', () => {

        it('get should return storage string without encryption when should not encrypt and value string ', () => {

            service.storage = window.sessionStorage;
            const spySession: jasmine.Spy = spyOn(window.sessionStorage, 'getItem').and.returnValue('"valueFromSessionStorage"');
            const spyCryptoJsSHA512: jasmine.Spy = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
            const spyCryptoJsDecrypt: jasmine.Spy = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('encryptedValue');
            service.shouldEncrypt = false;

            const result: string = service.get<string>('key');

            expect(result).toBeDefined();
            expect(spySession).toHaveBeenCalledWith('key');
            expect(spyCryptoJsSHA512).not.toHaveBeenCalled();
            expect(spyCryptoJsDecrypt).not.toHaveBeenCalled();

        });

        it('get should return storage undefined without encryption when should not encrypt and value undefined', () => {

            service.storage = window.sessionStorage;
            const spySession: jasmine.Spy = spyOn(window.sessionStorage, 'getItem').and.returnValue(undefined);
            const spyCryptoJsSHA512: jasmine.Spy = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
            const spyCryptoJsDecrypt: jasmine.Spy = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('encryptedValue');
            service.shouldEncrypt = false;

            const result: string = service.get<string>('key');

            expect(result).toBeUndefined();
            expect(spySession).toHaveBeenCalledWith('key');
            expect(spyCryptoJsSHA512).not.toHaveBeenCalled();
            expect(spyCryptoJsDecrypt).not.toHaveBeenCalled();

        });

        it('get should return storage undefined with encryption when should encrypt and value undefined', () => {

            service.storage = window.sessionStorage;
            const spySession: jasmine.Spy = spyOn(window.sessionStorage, 'getItem').and.returnValue(undefined);
            const spyCryptoJsSHA512: jasmine.Spy = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
            const spyCryptoJsDecrypt: jasmine.Spy = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('encryptedValue');
            service.shouldEncrypt = true;

            const result: string = service.get<string>('key');

            expect(result).toBeUndefined();
            expect(spySession).not.toHaveBeenCalledWith('key');
            expect(spySession).toHaveBeenCalledWith('encryptedKey');
            expect(spyCryptoJsSHA512).toHaveBeenCalledWith('key');
            expect(spyCryptoJsDecrypt).not.toHaveBeenCalled();

        });

        it('get should return storage string with encryption when should encrypt and value string parseable', () => {

            service.storage = window.sessionStorage;
            const spySession: jasmine.Spy = spyOn(window.sessionStorage, 'getItem').and.returnValue('"valueFromSessionStorage"');
            const spyCryptoJsSHA512: jasmine.Spy = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
            const spyCryptoJsDecrypt: jasmine.Spy = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('"decryptedValue"');
            service.shouldEncrypt = true;

            const result: string = service.get<string>('key');

            expect(result).toBeDefined();
            expect(spySession).not.toHaveBeenCalledWith('key');
            expect(spySession).toHaveBeenCalledWith('encryptedKey');
            expect(spyCryptoJsSHA512).toHaveBeenCalled();
            expect(spyCryptoJsDecrypt).toHaveBeenCalledWith('"valueFromSessionStorage"', service.privateKey);

        });

        it('get should return storage undefined with encryption when should encrypt and value string not parseable', () => {

            service.storage = window.sessionStorage;
            const spySession: jasmine.Spy = spyOn(window.sessionStorage, 'getItem').and.returnValue('"valueFromSessionStorage"');
            const spyCryptoJsSHA512: jasmine.Spy = spyOn(CryptoJS, 'SHA512').and.returnValue('encryptedKey');
            const spyCryptoJsDecrypt: jasmine.Spy = spyOn(CryptoJS.AES, 'decrypt').and.returnValue('decryptedValue not parseable');
            service.shouldEncrypt = true;

            const result: string = service.get<string>('key');

            expect(result).toBeUndefined();
            expect(spySession).not.toHaveBeenCalledWith('key');
            expect(spySession).toHaveBeenCalledWith('encryptedKey');
            expect(spyCryptoJsSHA512).toHaveBeenCalled();
            expect(spyCryptoJsDecrypt).toHaveBeenCalledWith('"valueFromSessionStorage"', service.privateKey);

        });

    });

    describe('clear', () => {

        it('clear should call storage clear when called', () => {

            service.storage = window.sessionStorage;
            const spySession: jasmine.Spy = spyOn(window.sessionStorage, 'clear').and.returnValue(null);

            service.clear();

            expect(spySession).toHaveBeenCalled();

        });

    });

    afterEach(() => {

        service = null;

    });

});
