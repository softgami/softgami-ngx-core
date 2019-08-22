import { ModuleWithProviders } from '@angular/core';

import { SoftgamiSharedModule } from './softgami-shared.module';

describe('SoftgamiSharedModule', () => {

    let sharedModule: SoftgamiSharedModule;

    beforeEach(() => {

        sharedModule = new SoftgamiSharedModule();

    });

    it('should create an instance', () => {

        expect(sharedModule).toBeTruthy();

    });

    describe('forRoot', () => {

        it('forRoot should return object', () => {

            expect(sharedModule).toBeTruthy();

            const result: ModuleWithProviders<any> = SoftgamiSharedModule.forRoot();

            expect(result).toEqual({
                ngModule: SoftgamiSharedModule,
                providers: [ ],
            });

        });

    });

    afterEach(() => {

        sharedModule = null;

    });

});
