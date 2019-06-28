import { ModuleWithProviders } from '@angular/core';

import { SharedModule } from './shared.module';

describe('SharedModule', () => {

    let sharedModule: SharedModule;

    beforeEach(() => {

        sharedModule = new SharedModule();

    });

    it('should create an instance', () => {

        expect(sharedModule).toBeTruthy();

    });

    describe('forRoot', () => {

        it('forRoot should return object', () => {

            expect(sharedModule).toBeTruthy();

            const result: ModuleWithProviders<any> = SharedModule.forRoot();

            expect(result).toEqual({
                ngModule: SharedModule,
                providers: [ ],
            });

        });

    });

    afterEach(() => {

        sharedModule = null;

    });

});
