import { Injectable } from '@angular/core';

import { AbstractHttpService } from 'projects/softgami-ngx-core/src/lib/softgami-core/repository/abstract-http-service';

@Injectable({
    providedIn: 'root',
})
export class HttpService extends AbstractHttpService {}
