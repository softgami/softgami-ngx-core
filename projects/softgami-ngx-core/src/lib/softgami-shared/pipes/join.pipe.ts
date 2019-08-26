import { Pipe, PipeTransform } from '@angular/core';

import { UtilsService } from '../../softgami-core/services/utils.service';

@Pipe({
    name: 'join',
})
export class JoinPipe implements PipeTransform {

    constructor(private readonly utilsService: UtilsService) {}

    transform(valuesList: Array<any>, path?: string): string {

        if (path === null || path === undefined) return '';

        const valuesListCopy: Array<any> = Object.assign([], valuesList);

        const joinedValues: string[] = [];
        if (valuesListCopy && valuesListCopy.length) {

            const firstValue: any = valuesListCopy.shift();
            const firstValueResolved: string = this.utilsService.resolveObjectPath<string>(firstValue, path);
            if (firstValueResolved) joinedValues.push(firstValueResolved);

            valuesListCopy.forEach((value: any) => {
                const valueResolved: string = this.utilsService.resolveObjectPath<string>(value, path);
                if (valueResolved) joinedValues.push(valueResolved);
            });

        }
        return joinedValues.join(', ');

    }

}
