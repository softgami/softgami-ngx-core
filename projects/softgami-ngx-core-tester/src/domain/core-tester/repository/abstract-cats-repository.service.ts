import { Observable } from 'rxjs';

import { AbstractQueryable } from 'projects/softgami-ngx-core-tester/src/app/core-tester/services/cats-http-repository.service';
import { Cat } from '../models/cat.interface';

export abstract class AbstractCatsRepositoryService {
    abstract getAll(queryable: AbstractQueryable): Observable<Cat[]>;
}
