import { Observable } from 'rxjs';
import { Thing } from 'softgami-ts-core';

export abstract class AbstractBaseCRUDRepositoryService<T> {

    abstract find(thing?: Thing): Observable<T[] | null>;
    abstract findOne(id: string, appInstanceId: string): Observable<T | null>;
    abstract save(object: T): Observable<T | null>;
    abstract update(object: T): Observable<T | null>;
    abstract remove(id: string, appInstanceId: string): Observable<void>;

}
