import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AbstractHttpService } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/abstract-http-service';

import { AbstractCatsRepositoryService } from '../../../domain/core-tester/repository/abstract-cats-repository.service';
import { Cat } from '../../../domain/core-tester/models/cat.model';
import { TigerCat } from '../../../domain/core-tester/models/tiger-cat.model';

export interface Schemable<T> {
    type: 'string' | 'boolean' | 'number' | 'object';
    value: T;
    isRequired?: boolean;
    isQueryAble?: boolean;
    isSortable?: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CatsHttpRepositoryService extends AbstractCatsRepositoryService {

    constructor(private readonly httpService: AbstractHttpService) {

        super();

    }

    getAll(cat: Cat): Observable<Cat[] | null> {

        let url = 'http://localhost:8080/';
        if (cat.q) url = url + '/search';
        const params: HttpParams = new HttpParams({ fromObject: cat.toQueryParamsObject() });
        let headers: HttpHeaders = new HttpHeaders();

        headers = headers.set('Authorization', 'token');

        return this.httpService.get(url, params, headers, Cat);

    }

    getAllTigers(cat: Cat): Observable<TigerCat[] | null> {

        let url = 'http://localhost:8080/';
        if (cat.q) url = url + '/search';
        const params: HttpParams = new HttpParams({ fromObject: cat.toQueryParamsObject() });
        let headers: HttpHeaders = new HttpHeaders();

        headers = headers.set('Authorization', 'token');

        return this.httpService.get(url, params, headers, TigerCat);

    }

    findOne(catId: string): Observable<Cat | null> {

        const url = 'http://localhost:8080/';
        return this.httpService.get(url, undefined, undefined, Cat);

    }

    findOneTiger(catId: string): Observable<TigerCat | null> {

        const url = 'http://localhost:8080/';
        return this.httpService.get(url, undefined, undefined, TigerCat);

    }

    save(cat: Cat): Observable<Cat | null> {

        const url = 'http://localhost:8080/';
        return this.httpService.post(url, cat, undefined, undefined, true, Cat);

    }

    saveTiger(cat: TigerCat): Observable<TigerCat | null> {

        const url = 'http://localhost:8080/';
        return this.httpService.post(url, cat, undefined, undefined, false, TigerCat);

    }

    update(cat: Cat): Observable<Cat | null> {

        const url = 'http://localhost:8080/';
        return this.httpService.put(url, cat, undefined, undefined, true, Cat);

    }

    updateTiger(cat: TigerCat): Observable<TigerCat | null> {

        const url = 'http://localhost:8080/';
        return this.httpService.put(url, cat, undefined, undefined, false, TigerCat);

    }

}
