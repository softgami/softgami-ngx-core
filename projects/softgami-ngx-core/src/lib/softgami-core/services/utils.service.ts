import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UtilsService {

    resolveObjectPath<T>(obj: any, path: string): T {

        if (obj === null || obj === undefined) return undefined;

        if (path === null || path === undefined) return undefined;

        const result: T = path.split('.').reduce((prev, curr) => {
            return prev ? prev[curr] : undefined;
        }, obj);

        return result;

    }

}
