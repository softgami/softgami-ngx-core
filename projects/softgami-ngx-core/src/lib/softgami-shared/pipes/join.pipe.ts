import { Pipe, PipeTransform } from '@angular/core';
import { SoftgamiTsUtilsService } from 'softgami-ts-core';

@Pipe({
    name: 'join',
})
export class JoinPipe implements PipeTransform {

    transform<T>(valuesList: T[], path?: string): string {

        if (path === null || path === undefined) return '';

        const valuesListCopy: T[] = Object.assign([], valuesList);

        const joinedValues: string[] = [];
        if (valuesListCopy && valuesListCopy.length) {

            const firstValue: T = valuesListCopy.shift();
            const firstValueResolved: string = SoftgamiTsUtilsService.resolveObjectPath<string>(firstValue, path);
            if (firstValueResolved) joinedValues.push(firstValueResolved);

            valuesListCopy.forEach((value: T) => {

                const valueResolved: string = SoftgamiTsUtilsService.resolveObjectPath<string>(value, path);
                if (valueResolved) joinedValues.push(valueResolved);

            });

        }
        return joinedValues.join(', ');

    }

}
