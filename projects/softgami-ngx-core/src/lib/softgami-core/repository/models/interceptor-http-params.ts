import { HttpParams } from '@angular/common/http';
import { Thing } from 'softgami-ts-core';

import { InterceptorOptions } from './interceptor-options.interface';

export class InterceptorHttpParams extends HttpParams {

    thing: Thing;
    interceptorOptions: InterceptorOptions;

    constructor(
        private readonly t: Thing,
        private readonly options?: InterceptorOptions,
    ) {

        super({ fromObject: t.toQueryParamsObject() });
        this.thing = t;
        this.interceptorOptions = options;

    }

}
