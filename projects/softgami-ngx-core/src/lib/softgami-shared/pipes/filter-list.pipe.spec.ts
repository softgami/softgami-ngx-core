import { SoftgamiTsUtilsService } from 'softgami-ts-core';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { FilterListPipe } from './filter-list.pipe';
import { JasmineExtension } from '../../testing/jasmine-extension';

describe('FilterListPipe', () => {

    let pipe: FilterListPipe;

    // let utilsServiceSpy: jasmine.SpyObj<SoftgamiTsUtilsService>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                FilterListPipe,
                {
                    provide: SoftgamiTsUtilsService,
                    useValue: JasmineExtension.createServiceSpy(SoftgamiTsUtilsService),
                },
            ],
        });

    });

    beforeEach(() => {

        // utilsServiceSpy = TestBed.get<SoftgamiTsUtilsService>(SoftgamiTsUtilsService as Type<SoftgamiTsUtilsService>);
        pipe = TestBed.get<FilterListPipe>(FilterListPipe as Type<FilterListPipe>);

    });

    it('should be created', () => {

        expect(pipe).toBeTruthy();

    });

    describe('transform', () => {

        /* it('transform should return empty list when valuesList is null', () => {

            const result: Array<any> = pipe.transform(null, null, null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when valuesList is undefined', () => {

            const result: Array<any> = pipe.transform(undefined, null, null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when valuesList is empty list', () => {

            const result: Array<any> = pipe.transform([], null, null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when path is null', () => {

            const result: Array<any> = pipe.transform([ '' ], null, null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when path is undefined', () => {

            const result: Array<any> = pipe.transform([ '' ], undefined, null);

            expect(result).toEqual([]);

        });

        it('transform should call resolveObjectPath 1 time when values list has 1 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue('Jules Verne');

            const result: Array<any> = pipe.transform([ 'Jules Verne' ], '', 'Jules Verne');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(1);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');

        });

        it('transform should call resolveObjectPath 2 times when values list has 2 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('Jules Verne', 'Arthur Conan Doyle');

            const result: Array<any> = pipe.transform([ 'Jules Verne', 'Arthur Conan Doyle' ], '', 'Jules Verne');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Arthur Conan Doyle', '');

        });

        it('transform should call resolveObjectPath 3 times when values list has 3 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('Jules Verne', 'Arthur Conan Doyle', 'J. R. R. Tolkien');

            const result: Array<any> = pipe.transform([ 'Jules Verne', 'Arthur Conan Doyle', 'J. R. R. Tolkien' ], '', 'Jules Verne');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Arthur Conan Doyle', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('J. R. R. Tolkien', '');

        });

        it('transform should return list when path is "" and valuesList is with basic strings', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue('Jules Verne');

            const result: Array<any> = pipe.transform([ 'Jules Verne' ], '', 'Jules Verne');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('Jules Verne', '');
            expect(result).toEqual([ 'Jules Verne' ]);

        });

        it('transform should return empty list when filter is null', () => {

            const result: Array<any> = pipe.transform([ '' ], 'some.path', null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when filter is undefined', () => {

            const result: Array<any> = pipe.transform([ '' ], 'some.path', undefined);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when filter is ""', () => {

            const result: Array<any> = pipe.transform([ '' ], 'some.path', '');

            expect(result).toEqual([]);

        });

        it('transform should return empty list when valuesList has 1 element and resolveObjectPath return undefined', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue(null);

            const result: Array<any> = pipe.transform([ '' ], 'some.path', 'some filter');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('', 'some.path');
            expect(result).toEqual([]);

        });

        it('transform should return list with 1 element when valuesList has 1 element and resolveObjectPath return valid value', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue('some filter');

            const result: Array<any> = pipe.transform([ 'some value' ], 'some.path', 'some filter');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', 'some.path');
            expect(result).toEqual([ 'some value' ]);

        });

        it(`transform should return list with 1 element when valuesList has 2 element and
            resolveObjectPath return valid value and undefined`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('some value', undefined);

            const result: Array<any> = pipe.transform([ 'some value', 'another value' ], 'some.path', 'some value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', 'some.path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', 'some.path');
            expect(result).toEqual([ 'some value' ]);

        });

        it(`transform should return list with 1 element when valuesList has 2 element and
            resolveObjectPath return valid values but 1 not equal filter`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('some value', 'other value');

            const result: Array<any> = pipe.transform([ 'some value', 'another value' ], 'some.path', 'some value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', 'some.path');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', 'some.path');
            expect(result).toEqual([ 'some value' ]);

        });

        it(`transform should return list with 2 elements when valuesList has 3 element and
            resolveObjectPath return valid values but 2 not equal filter boolean`, () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues(
                true,
                false,
                true,
            );
            const valuesList: any[] = [
                { name: 'some', valid: true },
                { name: 'another', valid: false },
                { name: 'more one', valid: true },
            ];

            const result: Array<any> = pipe.transform(valuesList, 'valid', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({ name: 'some', valid: true }, 'valid');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({ name: 'another', valid: false }, 'valid');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith({ name: 'more one', valid: true }, 'valid');
            expect(result).toEqual([
                { name: 'some', valid: true },
                { name: 'more one', valid: true },
            ]);

        }); */

    });

    afterEach(() => {

        pipe = null;

    });

});
