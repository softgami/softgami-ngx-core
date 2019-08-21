import { TestBed } from '@angular/core/testing';

import { AbstractCoreService } from './abstract-core.service';

class CoreService extends AbstractCoreService {}

describe('AbstractCoreService', () => {

    let service: CoreService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                CoreService,
            ],
        });

    });

    beforeEach(() => {

        service = TestBed.get(CoreService);

    });

    it('should be created', () => {

        expect(service).toBeTruthy();

    });

    afterEach(() => {

        service = null;

    });

});
