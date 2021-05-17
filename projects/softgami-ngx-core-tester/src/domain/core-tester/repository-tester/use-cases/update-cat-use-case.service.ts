import { Observable } from 'rxjs';
import { UseCase } from 'softgami-ts-core';

import { AbstractCatsRepositoryService } from '../../repository/abstract-cats-repository.service';
import { Cat } from '../../models/cat.model';

export class UpdateCatUseCaseService implements UseCase<Cat, Cat | null> {

    constructor(private readonly catsRepository: AbstractCatsRepositoryService) {}

    execute(cat: Cat): Observable<Cat | null> {

        return this.catsRepository.update(cat);

    }

}
