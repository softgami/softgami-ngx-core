import { HttpParams } from '@angular/common/http';
import { Thing } from 'softgami-ts-core';

import { InterceptorOptions } from './interceptor-options.interface';

export class InterceptorHttpParams extends HttpParams {

    thing: Thing;
    interceptorOptions: InterceptorOptions | undefined;

    constructor(
        private readonly t: Thing,
        private readonly options?: InterceptorOptions | undefined,
    ) {

        super(t ? { fromObject: t.toQueryParamsObject() } : undefined);
        this.thing = t;
        this.interceptorOptions = options;

    }

}
