import { Component, OnInit } from '@angular/core';

import { AbstractHtml5StorageService } from 'projects/softgami-ngx-core/src/lib/html5-storage/abstract-html5-storage.service';
import { LocalStorageService } from 'projects/softgami-ngx-core/src/lib/html5-storage/local-storage/local-storage.service';
import { SessionStorageService } from 'projects/softgami-ngx-core/src/lib/html5-storage/session-storage/session-storage.service';

@Component({
    selector: 'app-html5-storage-tester',
    templateUrl: './html5-storage-tester.component.html',
})
export class Html5StorageTesterComponent implements OnInit {

    defaultStorageValue: string | undefined;
    localStorageValue: string | undefined;
    sessionStorageValue: string | undefined;

    constructor(
        private readonly html5StorageService: AbstractHtml5StorageService,
        private readonly localStorageService: LocalStorageService,
        private readonly sessionStorageService: SessionStorageService,
    ) { }

    ngOnInit(): void {

        this.defaultStorageValue = this.html5StorageService.get<string>('default-key');
        this.localStorageValue = this.localStorageService.get<string>('local-storage-key');
        this.sessionStorageValue = this.sessionStorageService.get<string>('session-storage-key');

        this.html5StorageService.onChanges()
            .subscribe((result: string) => {

                console.log(result);

            });

        this.localStorageService.onChanges()
            .subscribe((result: string) => {

                console.log(result);

            });

        this.sessionStorageService.onChanges()
            .subscribe((result: string) => {

                console.log(result);

            });

    }

    changeDefaultStorageValue(element: EventTarget | null): void {

        const inputElement: HTMLInputElement | null = element as HTMLInputElement;
        if (inputElement && inputElement.value) {

            this.html5StorageService.set('default-key', inputElement.value);
            this.defaultStorageValue = this.html5StorageService.get<string>('default-key');

        }

    }

    changeLocalStorageValue(element: EventTarget | null): void {

        const inputElement: HTMLInputElement | null = element as HTMLInputElement;
        if (inputElement && inputElement.value) {

            this.localStorageService.set('local-storage-key', inputElement.value);
            this.localStorageValue = this.localStorageService.get<string>('local-storage-key');

        }

    }

    changeSessionStorageValue(element: EventTarget | null): void {

        const inputElement: HTMLInputElement | null = element as HTMLInputElement;
        if (inputElement && inputElement.value) {

            this.sessionStorageService.set('session-storage-key', inputElement.value);
            this.sessionStorageValue = this.sessionStorageService.get<string>('session-storage-key');

        }

    }

}
