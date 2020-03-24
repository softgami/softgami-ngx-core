import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SortBySelectOption } from 'softgami-ts-core';

import { Cat } from '../../../../domain/core-tester/models/cat.model';
import { GetAllCatsUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/get-all-cats-use-case.service';

@Component({
    selector: 'app-repository-tester',
    templateUrl: './repository-tester.component.html',
    styleUrls: ['./repository-tester.component.scss'],
})
export class RepositoryTesterComponent implements OnInit {

    searchText: string;
    cats: Cat[];
    sortOptions: SortBySelectOption[];
    selectedSortOption: string;
    form: FormGroup;
    @ViewChild('f', { static: false }) f;

    constructor(private readonly getAllCatsUseCaseService: GetAllCatsUseCaseService) { }

    ngOnInit() {

        this.sortOptions = new Cat().toSortOptions();
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            description: new FormControl(''),
            q: new FormControl('', [Validators.required]),
            parentCollection: new FormGroup({
                name: new FormControl('', [Validators.required]),
            }),
            language: new FormControl(null, [Validators.required]),
        });

    }

    onSubmit() {

    }

    callApi() {

        this.form.get('language').setValue({
            id: '12345',
            name: 'name of the language',
        });
        const cat: Cat = new Cat();
        cat.q = this.searchText;

        this.getAllCatsUseCaseService.execute(cat)
        .subscribe((cats: Cat[]) => {
            this.cats = cats;
        });

    }

}
