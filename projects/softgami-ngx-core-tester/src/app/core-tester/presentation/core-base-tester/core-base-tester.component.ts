import { Component } from '@angular/core';

import { AbstractBaseComponent } from 'projects/softgami-ngx-core/src/lib/softgami-core/base/abstract-base/abstract-base.component';
import { AbstractQueryable } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/models/abstract-queryable';
import { Sortable } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/decorators/sortable.decorator';
import { Type } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/decorators/type.decorator';

import { AppParams } from './app-params.interface';

export class TQueryable extends AbstractQueryable {

    @Sortable({ label: 'TYPE' })
    @Type('string')
    type: string = null;

}

@Component({
    selector: 'app-core-base-tester',
    templateUrl: './core-base-tester.component.html',
    styleUrls: ['./core-base-tester.component.scss'],
})
export class CoreBaseTesterComponent extends AbstractBaseComponent<TQueryable> {

    constructor() {

        super();

    }

    initQueryParams(): TQueryable {

        return new TQueryable();

    }

    updateParams(params: AppParams) {}

    handleQueryParams(params: TQueryable) {

        console.log(this.queryable);
        console.log('----------------------');
        console.log(params);

    }

    incrementUserId() {

        // this.updateRoute({userId: this.queryable.userId + 1});

    }

}
