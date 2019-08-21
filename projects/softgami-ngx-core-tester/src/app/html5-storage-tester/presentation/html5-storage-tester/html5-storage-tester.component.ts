import { Component, OnInit } from '@angular/core';

import { AbstractHtml5StorageService } from 'projects/softgami-ngx-core/src/lib/html5-storage/abstract-html5-storage.service';
import { LocalStorageService } from 'projects/softgami-ngx-core/src/lib/html5-storage/local-storage/local-storage.service';
import { SessionStorageService } from 'projects/softgami-ngx-core/src/lib/html5-storage/session-storage/session-storage.service';
import { fromEvent } from 'rxjs';

@Component({
    selector: 'app-html5-storage-tester',
    templateUrl: './html5-storage-tester.component.html',
    styleUrls: ['./html5-storage-tester.component.scss'],
})
export class Html5StorageTesterComponent implements OnInit {

    defaultStorageValue: string;
    localStorageValue: string;
    sessionStorageValue: string;

    constructor(
        private readonly html5StorageService: AbstractHtml5StorageService,
        private readonly localStorageService: LocalStorageService,
        private readonly sessionStorageService: SessionStorageService,
    ) { }

    ngOnInit() {

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

    changeDefaultStorageValue(value) {

        this.html5StorageService.set('default-key', value);
        this.defaultStorageValue = this.html5StorageService.get<string>('default-key');

    }

    changeLocalStorageValue(value) {

        this.localStorageService.set('local-storage-key', value);
        this.localStorageValue = this.localStorageService.get<string>('local-storage-key');

    }

    changeSessionStorageValue(value) {

        this.sessionStorageService.set('session-storage-key', value);
        this.sessionStorageValue = this.sessionStorageService.get<string>('session-storage-key');

    }

}