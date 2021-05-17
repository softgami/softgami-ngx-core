import { Injectable } from '@angular/core';

import { AbstractMessageService } from 'projects/softgami-ngx-core/src/lib/softgami-core/services/abstract-message.service';

@Injectable({
    providedIn: 'root',
})
export class MessageService extends AbstractMessageService {

    error(message?: string): void {

        throw new Error('Method not implemented.');

    }

    info(message?: string): void {

        throw new Error('Method not implemented.');

    }

    success(message?: string): void {

        throw new Error('Method not implemented.');

    }

    warning(message?: string): void {

        throw new Error('Method not implemented.');

    }

}
