import { Observable } from 'rxjs';
import { Thing } from 'softgami-ts-core';

export abstract class AbstractBaseCRUDRepositoryService<T> {
    abstract find(thing?: Thing): Observable<T[]>;
    abstract findOne(id: string, appInstanceId: string): Observable<T>;
    abstract save(object: T): Observable<T>;
    abstract update(object: T): Observable<T>;
    abstract remove(id: string, appInstanceId: string): Observable<void>;
}
