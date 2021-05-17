import { Observable } from 'rxjs';
import { UseCase } from 'softgami-ts-core';

import { AbstractCatsRepositoryService } from '../../repository/abstract-cats-repository.service';
import { TigerCat } from '../../models/tiger-cat.model';

export class UpdateTigerCatUseCaseService implements UseCase<TigerCat, TigerCat | null> {

    constructor(private readonly catsRepository: AbstractCatsRepositoryService) {}

    execute(cat: TigerCat): Observable<TigerCat | null> {

        return this.catsRepository.updateTiger(cat);

    }

}
