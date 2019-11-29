import { Component, OnInit, ViewChild } from '@angular/core';

import { CatQueryable } from '../../services/cats-http-repository.service';
import { Cat } from '../../../../domain/core-tester/models/cat.interface';
import { GetAllCatsUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/get-all-cats-use-case.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-repository-tester',
    templateUrl: './repository-tester.component.html',
    styleUrls: ['./repository-tester.component.scss'],
})
export class RepositoryTesterComponent implements OnInit {

    searchText: string;
    cats: Cat[];
    sortOptions: { key: string; value: string; }[];
    selectedSortOption: string;
    form: FormGroup;
    @ViewChild('f', { static: false }) f;

    constructor(private readonly getAllCatsUseCaseService: GetAllCatsUseCaseService) { }

    ngOnInit() {

        this.sortOptions = new CatQueryable().toSortOptions();
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
        const queryable: CatQueryable = new CatQueryable();
        queryable.name = 'some';
        queryable.q = this.searchText;
        queryable.limit = 10;
        queryable.skip = 0;
        queryable.id.value = '12345';

        const cat: Cat = this.form.getRawValue() as Cat;
        console.log(cat);

        /*this.getAllCatsUseCaseService.execute(queryable)
        .subscribe((cats: Cat[]) => {
            this.cats = cats;
        });*/

    }

}
