import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {

    let service: UtilsService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                UtilsService,
            ],
        });
    });

    beforeEach(() => {

        service = TestBed.get(UtilsService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    describe('resolveObjectPath', () => {

        it('resolveObjectPath should return undefined when object is null', () => {

            const result: string = service.resolveObjectPath<string>(null, '');

            expect(result).toBe(undefined);

        });

        it('resolveObjectPath should return undefined when object is undefined', () => {

            const result: string = service.resolveObjectPath<string>(undefined, '');

            expect(result).toBe(undefined);

        });

        it('resolveObjectPath should return undefined when path is null', () => {

            const result: string = service.resolveObjectPath<string>({}, null);

            expect(result).toBe(undefined);

        });

        it('resolveObjectPath should return undefined when path is undefined', () => {

            const result: string = service.resolveObjectPath<string>({}, undefined);

            expect(result).toBe(undefined);

        });

        it('resolveObjectPath should return "some value" when object and path "value"', () => {

            const obj: any  = {value: 'some value'};
            const result: string = service.resolveObjectPath<string>(obj, 'value');

            expect(result).toBe('some value');

        });

        it('resolveObjectPath should return "some value content" when object and path "value.content"', () => {

            const obj: any  = {
                value: {
                    content: 'some value content',
                },
            };
            const result: string = service.resolveObjectPath<string>(obj, 'value.content');

            expect(result).toBe('some value content');

        });

        it('resolveObjectPath should return "some another value content" when object and path "value.content.another"', () => {

            const obj: any  = {
                value: {
                    content: {
                        another: 'some another value content',
                    },
                },
            };
            const result: string = service.resolveObjectPath<string>(obj, 'value.content.another');

            expect(result).toBe('some another value content');

        });

        it('resolveObjectPath should return undefined when object and path doesnt exists in object', () => {

            const obj: any  = {
                value: {
                    content: {
                        another: 'some another value content',
                    },
                },
            };
            const result: string = service.resolveObjectPath<string>(obj, 'value.content.incorret.path');

            expect(result).toBeUndefined();

        });

    });

    afterEach(() => {

        service = null;

    });

});
