import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractHttpService } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/abstract-http-service';

import { AbstractCatsRepositoryService } from '../../../domain/core-tester/repository/abstract-cats-repository.service';
import { Cat } from '../../../domain/core-tester/models/cat.model';

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

    getAll(cat: Cat): Observable<Cat[]> {

        let url = 'https://api.thecatapi.com/v1/breeds';
        if (cat.q) url = url + '/search';
        const params: HttpParams = new HttpParams({ fromObject: cat.toQueryParamsObject() });
        let headers: HttpHeaders = new HttpHeaders();

        headers = headers.set('Authorization', 'token');

        return this.httpService.get<Cat[]>(url, params, headers);

    }

}
