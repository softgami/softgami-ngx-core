import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SortBySelectOption } from 'softgami-ts-core';

import { Cat } from '../../../../domain/core-tester/models/cat.model';
import { GetAllCatsUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/get-all-cats-use-case.service';
import { GetAllTigerCatsUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/get-all-tiger-cats-use-case.service';
import { GetOneCatUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/get-one-cat-use-case.service';
import { GetOneTigerCatUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/get-one-tiger-cat-use-case.service';
import { SaveCatUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/save-cat-use-case.service';
import { SaveTigerCatUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/save-tiger-cat-use-case.service';
import { TigerCat } from '../../../../domain/core-tester/models/tiger-cat.model';
import { UpdateCatUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/update-cat-use-case.service';
import { UpdateTigerCatUseCaseService } from '../../../../domain/core-tester/repository-tester/use-cases/update-tiger-cat-use-case.service';

@Component({
    selector: 'app-repository-tester',
    templateUrl: './repository-tester.component.html',
    styleUrls: [ './repository-tester.component.scss' ],
})
export class RepositoryTesterComponent implements OnInit {

    searchText: string | undefined;
    cats: Cat[] | undefined;
    sortOptions: SortBySelectOption[] | undefined;
    selectedSortOption: string | undefined;
    form: FormGroup = new FormGroup({});
    @ViewChild('f', { static: false }) f: ElementRef | undefined;

    constructor(
        private readonly getAllCatsUseCaseService: GetAllCatsUseCaseService,
        private readonly getAllTigerCatsUseCaseService: GetAllTigerCatsUseCaseService,
        private readonly getOneCatUseCaseService: GetOneCatUseCaseService,
        private readonly getOneTigerCatUseCaseService: GetOneTigerCatUseCaseService,
        private readonly saveCatUseCaseService: SaveCatUseCaseService,
        private readonly saveTigerCatUseCaseService: SaveTigerCatUseCaseService,
        private readonly updateCatUseCaseService: UpdateCatUseCaseService,
        private readonly updateTigerCatUseCaseService: UpdateTigerCatUseCaseService,
    ) { }

    ngOnInit(): void {

        this.sortOptions = new Cat().toSortOptions();
        this.form = new FormGroup({
            name: new FormControl('', [ Validators.required ]),
            description: new FormControl(''),
            q: new FormControl('', [ Validators.required ]),
            parentCollection: new FormGroup({
                name: new FormControl('', [ Validators.required ]),
            }),
            language: new FormControl(null, [ Validators.required ]),
        });

    }

    onSubmit(): void {

        console.log(this.form.getRawValue());

    }

    callApi(): void {

        if (this.form) {

            const languageControl: AbstractControl | null = this.form.get('language');
            if (languageControl) {

                languageControl.setValue({
                    id: '12345',
                    name: 'name of the language',
                });

            }

        }

        const cat: Cat = new Cat();
        cat.q = this.searchText;

        this.getAllCatsUseCaseService.execute(cat)
            .subscribe((cats: Cat[] | null) => {

                console.log(cats);
                if (cats) {

                    this.cats = cats;

                }

            });

        this.getAllTigerCatsUseCaseService.execute(cat)
            .subscribe((tigerCats: TigerCat[] | null) => {

                console.log(tigerCats);

            });

    }

    callOne(): void {

        this.getOneCatUseCaseService.execute(new Cat())
            .subscribe((cat: Cat | null) => {

                console.log(cat);

            });
        this.getOneTigerCatUseCaseService.execute(new Cat())
            .subscribe((tigerCat: TigerCat | null) => {

                console.log(tigerCat);

            });

    }

    save(): void {

        const cat: Cat = new Cat();
        cat.name = 'cat 1';
        this.saveCatUseCaseService.execute(cat)
            .subscribe((cat: Cat | null) => {

                console.log(cat);

            });
        this.saveTigerCatUseCaseService.execute(new TigerCat())
            .subscribe((tigerCat: TigerCat | null) => {

                console.log(tigerCat);

            });

    }

    update(): void {

        const cat: Cat = new Cat();
        cat.name = 'cat 1';
        this.updateCatUseCaseService.execute(cat)
            .subscribe((cat: Cat | null) => {

                console.log(cat);

            });
        this.updateTigerCatUseCaseService.execute(new TigerCat())
            .subscribe((tigerCat: TigerCat | null) => {

                console.log(tigerCat);

            });

    }

}
