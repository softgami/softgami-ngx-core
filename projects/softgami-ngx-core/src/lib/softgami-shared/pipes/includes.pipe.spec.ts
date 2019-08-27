import { SoftgamiTsUtilsService } from 'softgami-ts-core';
import { TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

import { IncludesPipe } from './includes.pipe';
import { JasmineExtension } from '../../testing/jasmine-extension';

describe('IncludesPipe', () => {

    let pipe: IncludesPipe;

    let utilsServiceSpy: jasmine.SpyObj<SoftgamiTsUtilsService>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                IncludesPipe,
                {
                    provide: SoftgamiTsUtilsService,
                    useValue: JasmineExtension.createServiceSpy(SoftgamiTsUtilsService),
                }
            ],
        });

    });

    beforeEach(() => {

        utilsServiceSpy = TestBed.get<SoftgamiTsUtilsService>(SoftgamiTsUtilsService as Type<SoftgamiTsUtilsService>);
        pipe = TestBed.get<IncludesPipe>(IncludesPipe as Type<IncludesPipe>);

    });

    it('should be created', () => {

        expect(pipe).toBeTruthy();

    });

    describe('transform', () => {

        it('transform should return empty list when valuesList is null', () => {

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

            const result: Array<any> = pipe.transform(['some value'], null, null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when path is undefined', () => {

            const result: Array<any> = pipe.transform(['some value'], undefined, null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when searchText is null', () => {

            const result: Array<any> = pipe.transform(['some value'], '', null);

            expect(result).toEqual([]);

        });

        it('transform should return empty list when searchText is undefined', () => {

            const result: Array<any> = pipe.transform(['some value'], '', undefined);

            expect(result).toEqual([]);

        });

        it('transform should return valuesList when searchText is ""', () => {

            const valuesList: string[] = ['some value', 'other value'];

            const result: Array<any> = pipe.transform(valuesList, '', '');

            expect(result).toEqual(valuesList);

        });

        it('transform should return empty list when resolveObjectPath returns undefined and list has 1 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValue(undefined);
            const valuesList: string[] = ['some value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(result).toEqual([]);

        });

        it('transform should return empty list when resolveObjectPath returns undefined and list has 2 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues(undefined, undefined);
            const valuesList: string[] = ['some value', 'another value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(result).toEqual([]);

        });

        it('transform should return empty list when resolveObjectPath returns undefined and list has 3 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues(undefined, undefined, undefined);
            const valuesList: string[] = ['some value', 'another value', 'some another value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some another value', '');
            expect(result).toEqual([]);

        });

        it('transform should return item when case is insensitive', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another value');
            const valuesList: string[] = ['another value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(result).toEqual(['another value']);

        });

        it('transform should not return item when case is sensitive', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another value');
            const valuesList: string[] = ['another value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(result).toEqual([]);

        });

        it('transform should return item when case is sensitive', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another value');
            const valuesList: string[] = ['another value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(result).toEqual(['another value']);

        });

        it('transform should return 2 items when case is insensitive', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another value', 'some value');
            const valuesList: string[] = ['another value', 'some value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(result).toEqual(['another value', 'some value']);

        });

        it('transform should return 2 items when case is insensitive and input has 3 items', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another value', 'some value', 'some item');
            const valuesList: string[] = ['another value', 'some value', 'some item'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value');

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some item', '');
            expect(result).toEqual(['another value', 'some value']);

        });

        it('transform should not return item when case is sensitive and list has 3 items', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another value', 'some value', 'some item');
            const valuesList: string[] = ['another value', 'some value', 'some item'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some item', '');
            expect(result).toEqual([]);

        });

        it('transform should return item when case is sensitive and list has 3 items', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another Value', 'some Value', 'some item');
            const valuesList: string[] = ['another value', 'some value', 'some item'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some item', '');
            expect(result).toEqual(['another value', 'some value']);

        });

        it('transform should call resolveObjectPath 1 time when valuesList has 1 element', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another Value');
            const valuesList: string[] = ['another value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(1);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');

        });


        it('transform should call resolveObjectPath 2 times when valuesList has 2 elements', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another Value', 'some Value');
            const valuesList: string[] = ['another value', 'some value'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(2);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');

        });

        it('transform should call resolveObjectPath 3 times when valuesList has 3 elements', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another Value', 'some Value', 'some item');
            const valuesList: string[] = ['another value', 'some value', 'some item'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(3);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some item', '');

        });

        it('transform should call resolveObjectPath 4 times when valuesList has 4 elements', () => {

            utilsServiceSpy.resolveObjectPath.and.returnValues('another Value', 'some Value', 'some item', 'yet another item');
            const valuesList: string[] = ['another value', 'some value', 'some item', 'yet another item'];

            const result: Array<any> = pipe.transform(valuesList, '', 'Value', true);

            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledTimes(4);
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('another value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some value', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('some item', '');
            expect(utilsServiceSpy.resolveObjectPath).toHaveBeenCalledWith('yet another item', '');

        });

    });

    afterEach(() => {

        pipe = null;

    });

});
