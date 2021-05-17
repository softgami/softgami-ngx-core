import { Observable } from 'rxjs';

import { Cat } from '../models/cat.model';
import { TigerCat } from '../models/tiger-cat.model';

export abstract class AbstractCatsRepositoryService {

    abstract getAll(cat: Cat): Observable<Cat[] | null>;
    abstract getAllTigers(cat: Cat): Observable<TigerCat[] | null>;

    abstract findOne(catId: string): Observable<Cat | null>;
    abstract findOneTiger(catId: string): Observable<TigerCat | null>;

    abstract save(cat: Cat): Observable<Cat | null>;
    abstract saveTiger(cat: TigerCat): Observable<TigerCat | null>;

    abstract update(cat: Cat): Observable<Cat | null>;
    abstract updateTiger(cat: TigerCat): Observable<TigerCat | null>;

}
