import { Pipe, PipeTransform } from '@angular/core';

import { UtilsService } from '../../softgami-core/services/utils.service';

@Pipe({
    name: 'filterList',
})
export class FilterListPipe implements PipeTransform {

    constructor(private readonly utilsService: UtilsService) {}

    transform(valuesList: Array<any>, path: string, filter: string | boolean | number): Array<any> {

        if (valuesList === null || valuesList === undefined || !valuesList.length) return [];
        if (path === null || path === undefined) return [];
        if (filter === null || filter === undefined || filter === '') return [];
        const resultList: Array<any> = [];

        valuesList.forEach((value: any) => {
            const valueResolved: string = this.utilsService.resolveObjectPath<string>(value, path);
            if (valueResolved === filter) resultList.push(value);
        });

        return resultList;

    }

}
