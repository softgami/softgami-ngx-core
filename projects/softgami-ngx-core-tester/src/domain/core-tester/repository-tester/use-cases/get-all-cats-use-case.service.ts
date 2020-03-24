import { Observable } from 'rxjs';
import { UseCase } from 'softgami-ts-core';

import { AbstractCatsRepositoryService } from '../../repository/abstract-cats-repository.service';
import { Cat } from '../../models/cat.model';

export class GetAllCatsUseCaseService implements UseCase<Cat, Cat[]> {

    constructor(private readonly catsRepository: AbstractCatsRepositoryService) {}

    execute(cat: Cat): Observable<Cat[]> {

        return this.catsRepository.getAll(cat);

    }

}
