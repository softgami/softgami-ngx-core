import { Observable } from 'rxjs';

import { Cat } from '../models/cat.model';

export abstract class AbstractCatsRepositoryService {

    abstract getAll(cat: Cat): Observable<Cat[] | null>;

}
