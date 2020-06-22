import { Inject } from '@angular/core';

export abstract class AbstractCoreService {
    constructor(@Inject([]) ...args: any[]) {}
}
