import { Pipe, PipeTransform } from '@angular/core';
import { SoftgamiTsUtilsService } from 'softgami-ts-core';

@Pipe({
    name: 'filterList',
})
export class FilterListPipe implements PipeTransform {

    transform<T>(valuesList: T[], path: string, filter: string | boolean | number): T[] {

        if (valuesList === null || valuesList === undefined || !valuesList.length) return [];
        if (path === null || path === undefined) return [];
        if (filter === null || filter === undefined || filter === '') return [];
        const resultList: T[] = [];

        valuesList.forEach((value: T) => {

            const valueResolved: string | undefined = SoftgamiTsUtilsService.resolveObjectPath<string>(value, path);
            if (valueResolved === filter) resultList.push(value);

        });

        return resultList;

    }

}
