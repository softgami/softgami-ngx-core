import { MathPipe } from './math.pipe';

describe('MathPipe', () => {

    let pipe: MathPipe;

    beforeEach(() => {

        pipe = new MathPipe();

    });

    it('should be created', () => {

        expect(pipe).toBeTruthy();

    });

    describe('transform', () => {

        it('transform should return value when no arg was provided', () => {

            const input = 2.3456;
            const result: number = pipe.transform(input);
            expect(result).toBe(input);

        });

        it('transform should return floor value from float value', () => {

            const floatValue = 2.3456;
            const floorValue: number = pipe.transform(floatValue, 'floor');
            expect(floorValue).toBe(2);

        });

    });

    afterEach(() => {

        pipe = null;

    });

});
