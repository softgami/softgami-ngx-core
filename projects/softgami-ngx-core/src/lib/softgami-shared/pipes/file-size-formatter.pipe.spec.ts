import { FileSizeFormatterPipe } from './file-size-formatter.pipe';

describe('FileSizeFormatterPipe', () => {

    let pipe: FileSizeFormatterPipe;

    beforeEach(() => {

        pipe = new FileSizeFormatterPipe();

    });

    it('should be created', () => {

        expect(pipe).toBeTruthy();

    });

    describe('transform', () => {

        it('transform should return "" when sizeInBytes is null', () => {

            const sizeInBytes = null;

            const result: string = pipe.transform(sizeInBytes);

            expect(result).toBe('');

        });

        it('transform should return "" when sizeInBytes is undefined', () => {

            const sizeInBytes = undefined;

            const result: string = pipe.transform(sizeInBytes);

            expect(result).toBe('');

        });

        it('transform should return "" when sizeInBytes is not a number', () => {

            const sizeInBytes: any = '';

            const result: string = pipe.transform(sizeInBytes);

            expect(result).toBe('');

        });

        it('transform should return "" when sizeInBytes is NaN', () => {

            const sizeInBytes = NaN;

            const result: string = pipe.transform(sizeInBytes);

            expect(result).toBe('');

        });

        it('transform should call formatToKB() when arg is "KB"', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes, 'KB');

            expect(spyKB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();
            expect(spyAuto).not.toHaveBeenCalled();

        });

        it('transform should call formatToKB() when arg is "kb"', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes, 'kb');

            expect(spyKB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();
            expect(spyAuto).not.toHaveBeenCalled();

        });

        it('transform should call formatToMB() when arg is "MB"', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes, 'MB');

            expect(spyMB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyKB).not.toHaveBeenCalled();
            expect(spyAuto).not.toHaveBeenCalled();

        });

        it('transform should call formatToMB() when arg is "mb"', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes, 'mb');

            expect(spyMB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyKB).not.toHaveBeenCalled();
            expect(spyAuto).not.toHaveBeenCalled();

        });

        it('transform should call formatAuto() when arg is "AUTO"', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes, 'AUTO');

            expect(spyAuto).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();
            expect(spyKB).not.toHaveBeenCalled();

        });

        it('transform should call formatAuto() when arg is "auto"', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes, 'auto');

            expect(spyAuto).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();
            expect(spyKB).not.toHaveBeenCalled();

        });

        it('transform should call formatAuto() when arg is "Auto"', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes, 'Auto');

            expect(spyAuto).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();
            expect(spyKB).not.toHaveBeenCalled();

        });

        it('transform should call formatAuto() when arg is falsy', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;

            const result: string = pipe.transform(sizeInBytes);

            expect(spyAuto).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();
            expect(spyKB).not.toHaveBeenCalled();

        });

        it('transform should call formatAuto() when arg is not a string', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');
            const spyAuto: jasmine.SpyObj<any> = spyOn(pipe, 'formatAuto');
            const sizeInBytes = 54300;
            const arg: any = 10;

            const result: string = pipe.transform(sizeInBytes, arg);

            expect(spyAuto).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();
            expect(spyKB).not.toHaveBeenCalled();

        });

    });

    describe('formatToKB', () => {

        it('formatToKB should return "0.29KB" when sizeInBytes is 300', () => {

            const sizeInBytes = 300;

            const result: string = pipe.formatToKB(sizeInBytes);

            expect(result).toBe('0.29KB');

        });

        it('formatToKB should return "5.27KB" when sizeInBytes is 5400', () => {

            const sizeInBytes = 5400;

            const result: string = pipe.formatToKB(sizeInBytes);

            expect(result).toBe('5.27KB');

        });

        it('formatToKB should return "1205621.76KB" when sizeInBytes is 1234556678', () => {

            const sizeInBytes = 1234556678;

            const result: string = pipe.formatToKB(sizeInBytes);

            expect(result).toBe('1205621.76KB');

        });

    });

    describe('formatToMB', () => {

        it('formatToMB should return "0.00MB" when sizeInBytes is 300', () => {

            const sizeInBytes = 300;

            const result: string = pipe.formatToMB(sizeInBytes);

            expect(result).toBe('0.00MB');

        });

        it('formatToMB should return "0.01MB" when sizeInBytes is 5400', () => {

            const sizeInBytes = 5400;

            const result: string = pipe.formatToMB(sizeInBytes);

            expect(result).toBe('0.01MB');

        });

        it('formatToMB should return "1.18MB" when sizeInBytes is 1234556', () => {

            const sizeInBytes = 1234556;

            const result: string = pipe.formatToMB(sizeInBytes);

            expect(result).toBe('1.18MB');

        });

        it('formatToMB should return "1177.36MB" when sizeInBytes is 1234556678', () => {

            const sizeInBytes = 1234556678;

            const result: string = pipe.formatToMB(sizeInBytes);

            expect(result).toBe('1177.36MB');

        });

    });

    describe('formatAuto', () => {

        it('formatAuto should call formatToKB() when sizeInBytes in less than 1024 * 1024', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');

            let limitSize = 1024 * 1024;
            limitSize = 1048576;
            let sizeInBytes = 1048575;

            let result: string = pipe.formatAuto(sizeInBytes);

            expect(spyKB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();

            sizeInBytes = 10485;
            spyMB.calls.reset();
            spyKB.calls.reset();

            result = pipe.formatAuto(sizeInBytes);

            expect(spyKB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyMB).not.toHaveBeenCalled();

        });

        it('formatAuto should call formatToMB() when sizeInBytes in greater than or equal to 1024 * 1024', () => {

            const spyKB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToKB');
            const spyMB: jasmine.SpyObj<any> = spyOn(pipe, 'formatToMB');

            let limitSize = 1024 * 1024;
            limitSize = 1048576;
            let sizeInBytes = limitSize;

            let result: string = pipe.formatAuto(sizeInBytes);

            expect(spyMB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyKB).not.toHaveBeenCalled();

            sizeInBytes = 104857622;
            spyMB.calls.reset();
            spyKB.calls.reset();

            result = pipe.formatAuto(sizeInBytes);

            expect(spyMB).toHaveBeenCalledWith(sizeInBytes);
            expect(spyKB).not.toHaveBeenCalled();

        });

    });

    afterEach(() => {

        pipe = null;

    });

});
