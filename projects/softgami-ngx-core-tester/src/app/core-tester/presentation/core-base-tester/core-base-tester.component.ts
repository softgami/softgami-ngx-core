import { Component } from '@angular/core';

import { AbstractBaseComponent } from 'projects/softgami-ngx-core/src/lib/softgami-core/base/abstract-base/abstract-base.component';

import { AppParams } from './app-params.interface';

@Component({
    selector: 'app-core-base-tester',
    templateUrl: './core-base-tester.component.html',
    styleUrls: ['./core-base-tester.component.scss'],
})
export class CoreBaseTesterComponent extends AbstractBaseComponent<AppParams> {

    constructor() {

        super();

    }

    initQueryParams(): AppParams {

        const params: AppParams = {
            userId: null,
            appId: null,
        };
        return params;

    }

    updateParams(params: AppParams) {

        this.queryParams.userId = params.userId ? parseInt(params.userId.toString(), 10) : null;
        this.queryParams.appId = params.appId ? parseInt(params.appId.toString(), 10) : null;

    }

    handleQueryParams(params: AppParams) {

        console.log(this.queryParams);
        console.log('----------------------');
        console.log(params);

    }

    incrementUserId() {

        this.updateRoute({userId: this.queryParams.userId + 1});

    }

}
