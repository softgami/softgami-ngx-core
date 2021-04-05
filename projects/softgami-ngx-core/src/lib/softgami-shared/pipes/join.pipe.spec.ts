import { SoftgamiTsUtilsService } from 'softgami-ts-core';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { JasmineExtension } from '../../testing/jasmine-extension';
import { JoinPipe } from './join.pipe';

describe('FileSizeFormatterPipe', () => {

    let pipe: JoinPipe;

    let utilsServiceSpy: jasmine.SpyObj<SoftgamiTsUtilsService>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                JoinPipe,
                {
                    provide: SoftgamiTsUtilsService,
                    useValue: JasmineExtension.createServiceSpy(SoftgamiTsUtilsService),
                },
            ],
        });

    });

    beforeEach(() => {

        utilsServiceSpy = TestBed.get<SoftgamiTsUtilsService>(SoftgamiTsUtilsService as Type<SoftgamiTsUtilsService>);
        pipe = TestBed.get<JoinPipe>(JoinPipe as Type<JoinPipe>);

    });

    it('should be created', () => {

        expect(pipe).toBeTruthy();

    });

    describe('transform', () => {

        it('transform should return "" when path is null', () => {

            const result: string = pipe.transform([], null);

            expect(result).toEqual('');

        });

        it('transform should return "" when path is undefined', () => {

            const result: string = pipe.transform([], undefined);

            expect(result).toEqual('');

        });

        it('transform should call resolveObjectPath 1 time when list has 1 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue('Jules Verne');
            const result: string = pipe.transform([ 'Jules Verne' ], '');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(1);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');

        });

        it('transform should call resolveObjectPath 2 times when list has 2 elements', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('Jules Verne', 'Arthur Conan Doyle');
            const result: string = pipe.transform([ 'Jules Verne', 'Arthur Conan Doyle' ], '');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Arthur Conan Doyle', '');

        });

        it('transform should call resolveObjectPath 3 times when list has 3 elements', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('Jules Verne', 'Arthur Conan Doyle', 'J. R. R. Tolkien');
            const result: string = pipe.transform([ 'Jules Verne', 'Arthur Conan Doyle', 'J. R. R. Tolkien' ], '');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Arthur Conan Doyle', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('J. R. R. Tolkien', '');

        });

        it('transform should return "Jules Verne" when path is "" and list is basic strings list', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue('Jules Verne');
            const result: string = pipe.transform([ 'Jules Verne' ], '');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');
            expect(result).toEqual('Jules Verne');

        });

        it('transform should return "" when path is valid and valuesList is empty', () => {

            const result: string = pipe.transform([], 'name');

            expect(result).toEqual('');

        });

        it('transform should return "Jules Verne" when path is valid and valuesList contains one element with name "Jules Verne"', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue('Jules Verne');

            const result: string = pipe.transform([ { name: 'Jules Verne' } ], 'name');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({ name: 'Jules Verne' }, 'name');
            expect(result).toEqual('Jules Verne');

        });

        it(`transform should return "Jules Verne" when path is valid and
            valuesList contains one element with name "J. R. R. Tolkien"`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue('J. R. R. Tolkien');

            const result: string = pipe.transform([ { name: 'J. R. R. Tolkien' } ], 'name');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({ name: 'J. R. R. Tolkien' }, 'name');
            expect(result).toEqual('J. R. R. Tolkien');

        });

        it('transform should return "" when resolveObjectPath returns null', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue(null);

            const result: string = pipe.transform([ { name: 'J. R. R. Tolkien' } ], 'invalid.path');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({ name: 'J. R. R. Tolkien' }, 'invalid.path');
            expect(result).toEqual('');

        });

        it('transform should return "" when resolveObjectPath returns undefined', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue(undefined);

            const result: string = pipe.transform([ { name: 'J. R. R. Tolkien' } ], 'invalid.path');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({ name: 'J. R. R. Tolkien' }, 'invalid.path');
            expect(result).toEqual('');

        });

        it(`transform should return "J. R. R. Tolkien, Jules Verne" when resolveObjectPath
            returns "J. R. R. Tolkien" and then return "Jules Verne"`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('J. R. R. Tolkien', 'Jules Verne');
            const valuesList: any[] = [
                {
                    name: 'J. R. R. Tolkien',
                },
                {
                    name: 'Jules Verne',
                },
            ];

            const result: string = pipe.transform(valuesList, 'some path');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'J. R. R. Tolkien',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Jules Verne',
            }, 'some path');
            expect(result).toEqual('J. R. R. Tolkien, Jules Verne');

        });

        it(`transform should return "J. R. R. Tolkien, Jules Verne, Arthur Conan Doyle" when resolveObjectPath
            returns "J. R. R. Tolkien" and then return "Jules Verne" and then returns "Arthur Conan Doyle"`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('J. R. R. Tolkien', 'Jules Verne', 'Arthur Conan Doyle');
            const valuesList: any[] = [
                {
                    name: 'J. R. R. Tolkien',
                },
                {
                    name: 'Jules Verne',
                },
                {
                    name: 'Arthur Conan Doyle',
                },
            ];

            const result: string = pipe.transform(valuesList, 'some path');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'J. R. R. Tolkien',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Jules Verne',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Arthur Conan Doyle',
            }, 'some path');
            expect(result).toEqual('J. R. R. Tolkien, Jules Verne, Arthur Conan Doyle');

        });

        it(`transform should return "Jules Verne, Arthur Conan Doyle" when resolveObjectPath
            returns undefined and then returns "Jules Verne" and then returns "Arthur Conan Doyle"`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues(undefined, 'Jules Verne', 'Arthur Conan Doyle');
            const valuesList: any[] = [
                {
                    name: 'J. R. R. Tolkien',
                },
                {
                    name: 'Jules Verne',
                },
                {
                    name: 'Arthur Conan Doyle',
                },
            ];

            const result: string = pipe.transform(valuesList, 'some path');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'J. R. R. Tolkien',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Jules Verne',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Arthur Conan Doyle',
            }, 'some path');
            expect(result).toEqual('Jules Verne, Arthur Conan Doyle');

        });

        it(`transform should return "J. R. R. Tolkien, Arthur Conan Doyle" when resolveObjectPath
            returns "J. R. R. Tolkien" and then returns undefined and then returns "Arthur Conan Doyle"`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('J. R. R. Tolkien', undefined, 'Arthur Conan Doyle');
            const valuesList: any[] = [
                {
                    name: 'J. R. R. Tolkien',
                },
                {
                    name: 'Jules Verne',
                },
                {
                    name: 'Arthur Conan Doyle',
                },
            ];

            const result: string = pipe.transform(valuesList, 'some path');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'J. R. R. Tolkien',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Jules Verne',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Arthur Conan Doyle',
            }, 'some path');
            expect(result).toEqual('J. R. R. Tolkien, Arthur Conan Doyle');

        });

        it(`transform should return "J. R. R. Tolkien, Jules Verne" when resolveObjectPath
            returns "J. R. R. Tolkien" and then returns "Jules Verne" and then returns undefined`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('J. R. R. Tolkien', 'Jules Verne', undefined);
            const valuesList: any[] = [
                {
                    name: 'J. R. R. Tolkien',
                },
                {
                    name: 'Jules Verne',
                },
                {
                    name: 'Arthur Conan Doyle',
                },
            ];

            const result: string = pipe.transform(valuesList, 'some path');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'J. R. R. Tolkien',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Jules Verne',
            }, 'some path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({
                name: 'Arthur Conan Doyle',
            }, 'some path');
            expect(result).toEqual('J. R. R. Tolkien, Jules Verne');

        });

    });

    afterEach(() => {

        pipe = null;

    });

});
