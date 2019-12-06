import { Observable } from 'rxjs';

import { AbstractQueryable } from './models/abstract-queryable';

export abstract class AbstractBaseCRUDRepositoryService<T> {
    abstract find(queryable?: AbstractQueryable): Observable<T[]>;
    abstract findOne(id: string, appInstanceId: string): Observable<T>;
    abstract save(object: T): Observable<T>;
    abstract update(object: T): Observable<T>;
    abstract remove(id: string, appInstanceId: string): Observable<void>;
}
