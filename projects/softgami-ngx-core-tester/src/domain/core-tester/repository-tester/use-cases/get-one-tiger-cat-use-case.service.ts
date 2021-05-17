import { Observable } from 'rxjs';
import { UseCase } from 'softgami-ts-core';

import { AbstractCatsRepositoryService } from '../../repository/abstract-cats-repository.service';
import { Cat } from '../../models/cat.model';
import { TigerCat } from '../../models/tiger-cat.model';

export class GetOneTigerCatUseCaseService implements UseCase<Cat, TigerCat | null> {

    constructor(private readonly catsRepository: AbstractCatsRepositoryService) {}

    execute(cat: Cat): Observable<TigerCat | null> {

        return this.catsRepository.findOneTiger('');

    }

}
