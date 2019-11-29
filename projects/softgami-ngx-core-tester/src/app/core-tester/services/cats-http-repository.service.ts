import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractHttpService } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/abstract-http-service';

import { AbstractCatsRepositoryService } from '../../../domain/core-tester/repository/abstract-cats-repository.service';
import { Cat } from '../../../domain/core-tester/models/cat.interface';

export abstract class AbstractQueryable {

    sort: string = null;
    limit: number = null;
    skip: number = null;
    appInstanceId: string = null;
    userId: string = null;
    id: Schemable<string> = {
        type: 'string',
        value: null,
    };

    abstract getProperties(): Schemable<any>[];

    toQueryParamsObject(): { [param: string]: string | string[] } {

        const object: { [param: string]: string | string[] } = {};

        Object.getOwnPropertyNames(this).forEach((property: string) => {
            if (this[property] !== null && this[property] !== undefined) {
                object[property] = this[property];
            }
        });

        return object;

    }

    toSortOptions(): { key: string; value: string; }[] {

        const skipList: string[] = ['sort', 'limit', 'skip', 'appInstanceId', 'userId'];
        const returnValues: { key: string; value: string; }[] = [];
        Object.getOwnPropertyNames(this).forEach((property: string) => {
            if (!skipList.includes(property)) {
                returnValues.push({ key: property.toUpperCase(), value: property });
            }
        });

        return returnValues;

    }

}

export class CatQueryable extends AbstractQueryable {
    name: string = null;
    description: string = null;
    q: string = null;
    'parentCollection.name': string = null;
    'new._id': Schemable<number> = null;

    getProperties() {
        return [
            this['new._id'],
        ];
    }
}

export interface Schemable<T> {
    type: 'string' | 'boolean' | 'number' | 'object';
    value: T;
    isRequired?: boolean;
    isQueryAble?: boolean;
    isSortable?: boolean;
}

@Injectable()
export class CatsHttpRepositoryService extends AbstractCatsRepositoryService {

    constructor(private readonly httpService: AbstractHttpService) {

        super();

    }

    getAll(queryable: AbstractQueryable): Observable<Cat[]> {

        const url = 'https://api.thecatapi.com/v1/breeds/search';
        const params: HttpParams = new HttpParams({ fromObject: queryable.toQueryParamsObject() });
        let headers: HttpHeaders = new HttpHeaders();

        headers = headers.set('Authorization', 'token');

        return this.httpService.get<Cat[]>(url, params, headers);

    }
}
