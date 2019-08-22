import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mathPipe',
})
export class MathPipe implements PipeTransform {

    transform(input: number, args?: string): number {

        switch (args) {
            case 'floor':
                return Math.floor(input);
            default:
                return input;
        }

    }

}
