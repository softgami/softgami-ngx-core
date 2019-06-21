import { SharedModule } from './shared.module';

describe('Html5StorageModule', () => {

    let sharedModule: SharedModule;

    beforeEach(() => {

        sharedModule = new SharedModule();

    });

    it('should create an instance', () => {

        expect(sharedModule).toBeTruthy();

    });

    it('forRoot should return object', () => {

        expect(sharedModule).toBeTruthy();

        const result = SharedModule.forRoot();

        expect(result).toEqual({
            ngModule: SharedModule,
            providers: [ ],
        });

    });

    afterEach(() => {

        sharedModule = null;

    });

});
