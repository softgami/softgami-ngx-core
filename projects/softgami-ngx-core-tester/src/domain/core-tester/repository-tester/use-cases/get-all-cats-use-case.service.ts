import { Observable } from 'rxjs';
import { UseCase } from 'softgami-ts-core';

import { AbstractCatsRepositoryService } from '../../repository/abstract-cats-repository.service';
import { Cat } from '../../models/cat.interface';
import { CatQueryable } from 'projects/softgami-ngx-core-tester/src/app/core-tester/services/cats-http-repository.service';

export class GetAllCatsUseCaseService implements UseCase<CatQueryable, Cat[]> {

    constructor(private readonly catsRepository: AbstractCatsRepositoryService) {}

    execute(queryable: CatQueryable): Observable<Cat[]> {

        return this.catsRepository.getAll(queryable);

    }

}
