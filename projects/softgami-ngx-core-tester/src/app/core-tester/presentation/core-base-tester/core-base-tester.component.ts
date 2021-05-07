import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import {
    ExcludeIndexes,
    QueryParam,
    Required,
    Schemable,
    SoftgamiTsUtilsService,
    Sortable,
    Thing,
    Trim,
    Type,
    Types,
    Unique,
} from 'softgami-ts-core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AbstractBaseComponent } from 'projects/softgami-ngx-core/src/lib/softgami-core/base/abstract-base/abstract-base.component';

export class Language extends Thing {

    @QueryParam()
    @Required()
    @Type({ type: Types.MONGO_OBJECT_ID })
    _id: string | null = null;

    @QueryParam()
    @Sortable({ label: 'CODE' })
    @Required()
    @Schemable()
    @Trim()
    @Unique()
    @Type({ type: Types.NUMBER })
    code: number | null = null;

    @QueryParam()
    @Schemable()
    @Sortable({ label: 'LANGUAGE' })
    @Type({ type: Types.OBJECT, class: Language })
    @ExcludeIndexes()
    parent?: Language | null = null;

}

export class TObject extends Thing {

    @QueryParam()
    @Required()
    @Type({ type: Types.MONGO_OBJECT_ID })
    _id: string | null = null;

    @QueryParam()
    @Required()
    @Sortable({ label: 'TYPE' })
    @Type({ type: Types.ARRAY, arrayItemType: Types.NUMBER })
    types: number[] | null = null;

    @QueryParam()
    @Schemable()
    @Sortable({ label: 'LANGUAGE', field: 'language.name' })
    @Required()
    @Type({ type: Types.OBJECT, class: Language })
    @ExcludeIndexes()
    language: Language | null = null;

}

@Component({
    selector: 'app-core-base-tester',
    templateUrl: './core-base-tester.component.html',
})
export class CoreBaseTesterComponent extends AbstractBaseComponent<TObject> {

    constructor(private route: ActivatedRoute) {

        super(undefined, route);
        if (this.form) {

            this.form.addControl('status', new FormControl('active', [ Validators.required ]));

        }

    }

    getParamId(): string {

        return this.object && this.object._id ? this.object._id : '';

    }

    shouldUpdateDefaultFormFromParams(): boolean {

        return false;

    }

    shouldUpdateObjectFromParamMapId(): boolean {

        return true;

    }

    defaultFindOneObject(id: string): Observable<TObject | null> {

        return of({
            _id: '123456789012345678901234',
            types: [ 1, 2 ],
            language: {
                _id: '123456789012345678901234',
                name: 'Português',
                code: 'pt-br',
                parent: {
                    _id: '123456789012345678901234',
                    name: 'Português',
                    code: 'pt-br',
                },
            } as unknown as Language,
        } as TObject);

    }

    successDefaultObjectLoaded(object: TObject): void {

        console.log(SoftgamiTsUtilsService.cleanEmpty(object));

    }

    getInitialForm(): FormGroup {

        return new FormGroup(
            {
                name: new FormControl('test', Validators.compose([ Validators.required ])),
                isActive: new FormControl(true, [ Validators.required ]),
            },
        );

    }

    initMainObject(): TObject {

        return new TObject();

    }

    handleQueryParams(params: TObject): void {

        /* this.object.name = 'tempname';
        this.object.language = new Language();
        this.object.language.code = 1234;
        this.object.language.name = 'languageName';
        this.object.language.idioma = new Language();
        this.object.language.idioma.name = 'languageName2';
        this.object.language.idioma.code = 12345;
        this.object.language.idioma.idioma = new Language();
        this.object.language.idioma.idioma.name = 'languageName3';
        this.object.language.idioma.idioma.code = 123456; */

        // console.log(this.object);
        // console.log('----------------------');
        // console.log(this.object);

    }

    incrementUserId(): void {

        // this.updateRoute({userId: this.queryable.userId + 1});

    }

    onSubmit(): void {

        if (this.form) console.log(this.form.getRawValue());

    }

    resetFormCall(): void {

        this.resetForm();

    }

}
