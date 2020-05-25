import { Pipe, PipeTransform } from '@angular/core';
import { SoftgamiTsUtilsService } from 'softgami-ts-core';

@Pipe({
    name: 'includes',
})
export class IncludesPipe implements PipeTransform {

    transform(valuesList: Array<any>, path: string, searchText: string, isCaseSensitive = false): any[] {

        if (valuesList === null || valuesList === undefined || !valuesList.length) return [];
        if (path === null || path === undefined) return [];
        if (searchText === null || searchText === undefined) return [];
        if (searchText === '') return valuesList;
        const resultList: Array<any> = [];

        valuesList.forEach((value: any) => {
            const valueResolved: string = SoftgamiTsUtilsService.resolveObjectPath<string>(value, path);
            if (valueResolved) {
                if (isCaseSensitive && valueResolved.includes(searchText)) {
                    resultList.push(value);
                } else if (!isCaseSensitive &&  valueResolved.toLowerCase().includes(searchText.toLowerCase())) {
                    resultList.push(value);
                }
            }
        });

        return resultList;

    }

}
