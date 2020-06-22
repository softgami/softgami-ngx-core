import { Inject } from '@angular/core';

export abstract class AbstractMessageService {
    constructor(@Inject([]) ...args: any[]) {}
    abstract error(message?: string): void;
    abstract info(message?: string): void;
    abstract success(message?: string): void;
    abstract warning(message?: string): void;
}
