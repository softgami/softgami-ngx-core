import { Pipe, PipeTransform } from '@angular/core';
import { SoftgamiTsUtilsService } from 'softgami-ts-core';

@Pipe({
    name: 'filterList',
})
export class FilterListPipe implements PipeTransform {

    transform(valuesList: Array<any>, path: string, filter: string | boolean | number): Array<any> {

        if (valuesList === null || valuesList === undefined || !valuesList.length) return [];
        if (path === null || path === undefined) return [];
        if (filter === null || filter === undefined || filter === '') return [];
        const resultList: Array<any> = [];

        valuesList.forEach((value: any) => {

            const valueResolved: string = SoftgamiTsUtilsService.resolveObjectPath<string>(value, path);
            if (valueResolved === filter) resultList.push(value);

        });

        return resultList;

    }

}
