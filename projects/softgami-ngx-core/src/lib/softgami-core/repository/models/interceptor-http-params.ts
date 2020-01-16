import { HttpParams } from '@angular/common/http';

import { AbstractQueryable } from './abstract-queryable';
import { InterceptorOptions } from './interceptor-options.interface';

export class InterceptorHttpParams extends HttpParams {

    queryable: AbstractQueryable;
    interceptorOptions: InterceptorOptions;

    constructor(
        private readonly abstractQueryable: AbstractQueryable,
        private readonly options?: InterceptorOptions,
    ) {

        super({ fromObject: abstractQueryable.toQueryParamsObject() });
        this.queryable = abstractQueryable;
        this.interceptorOptions = options;

    }

}
