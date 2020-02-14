import { Component } from '@angular/core';
import {
    ExcludeIndexes,
    Index,
    QueryParam,
    Required,
    Schemable,
    Sortable,
    Thing,
    Trim,
    Type,
    Types,
    Unique,
} from 'softgami-ts-core';

import { AbstractBaseComponent } from 'projects/softgami-ngx-core/src/lib/softgami-core/base/abstract-base/abstract-base.component';

import { AppParams } from './app-params.interface';

export class Language extends Thing {

    @QueryParam()
    @Sortable({ label: 'CODE' })
    @Required()
    @Index()
    @Schemable()
    @Trim()
    @Unique()
    @Type({ type: Types.NUMBER })
    code: number = null;

    @QueryParam()
    @Schemable()
    @Sortable({ label: 'LANGUAGE' })
    @Required()
    @Type({ type: Types.OBJECT, class: Language })
    @ExcludeIndexes()
    idioma: Language = null;

}

export class TObject extends Thing {

    @QueryParam()
    @Sortable({ label: 'TYPE' })
    @Type({ type: Types.ARRAY, arrayItemType: Types.NUMBER })
    types: number[] = null;

    @QueryParam()
    @Schemable()
    @Sortable({ label: 'LANGUAGE', field: 'language.name' })
    @Required()
    @Type({ type: Types.OBJECT, class: Language})
    @ExcludeIndexes()
    language: Language = null;

}

@Component({
    selector: 'app-core-base-tester',
    templateUrl: './core-base-tester.component.html',
    styleUrls: ['./core-base-tester.component.scss'],
})
export class CoreBaseTesterComponent extends AbstractBaseComponent<TObject> {

    constructor() {

        super();

    }

    initQueryParams(): TObject {

        return new TObject();

    }

    updateParams(params: AppParams) {}

    handleQueryParams(params: TObject) {

        /*this.object.name = 'tempname';
        this.object.language = new Language();
        this.object.language.code = 1234;
        this.object.language.name = 'languageName';
        this.object.language.idioma = new Language();
        this.object.language.idioma.name = 'languageName2';
        this.object.language.idioma.code = 12345;
        this.object.language.idioma.idioma = new Language();
        this.object.language.idioma.idioma.name = 'languageName3';
        this.object.language.idioma.idioma.code = 123456;*/

        // console.log(this.object);
        console.log('----------------------');
        console.log(this.object);

    }

    incrementUserId() {

        // this.updateRoute({userId: this.queryable.userId + 1});

    }

}
