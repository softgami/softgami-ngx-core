import 'reflect-metadata';

import { QueryParam } from '../decorators/query-param.decorator';
import { QueryParamMetadataKey } from '../decorators/query-param-metadata-keys';
import { Sortable } from '../decorators/sortable.decorator';
import { SortableMetadataKey } from '../decorators/sortable-metadata-key';
import { SortBySelectOption } from './sort-by-select-options.interface';
import { Type } from '../decorators/type.decorator';
import { TypeMetadataKey } from '../decorators/type-metadata-key';

export abstract class AbstractQueryable {

    @Type('number')
    uniqueId: number = new Date().getTime();

    @QueryParam()
    @Type('string')
    sort: string = null;

    @QueryParam()
    @Type('number')
    limit: number = null;

    @QueryParam()
    @Type('number')
    skip: number = null;

    @QueryParam()
    @Type('string')
    'appInstance._id': string = null;

    @QueryParam()
    @Type('string')
    'user._id': string = null;

    @QueryParam()
    @Sortable({ label: 'NAME' })
    @Type('string')
    name: string = null;

    @QueryParam()
    @Sortable({ label: 'CREATED_AT' })
    @Type('string')
    createdAt: string = null;

    getType(property: string): string {

        return Reflect.getMetadata(TypeMetadataKey, this, property);

    }

    getSortableOptions(property: string): SortBySelectOption {

        return Reflect.getMetadata(SortableMetadataKey, this, property) as SortBySelectOption;

    }

    toQueryParamsObject(): { [param: string]: string | string[] } {

        const object: { [param: string]: string | string[] } = {};

        Object.getOwnPropertyNames(this).forEach((property: string) => {
            const isQueryParam: boolean = Reflect.getMetadata(QueryParamMetadataKey, this, property);
            if (isQueryParam === true && this[property] !== null && this[property] !== undefined) {
                object[property] = this[property];
            }
        });

        return object;

    }

    toSortOptions(): SortBySelectOption[] {

        const returnValues: SortBySelectOption[] = [];
        Object.getOwnPropertyNames(this).forEach((property: string) => {
            const options: SortBySelectOption = this.getSortableOptions(property);
            if (options) {
                options.field = property;
                returnValues.push(options);
            }
        });

        return returnValues;

    }

    updatePropertiesFromParams(params: {
        [key: string]: any;
    }) {

        Object.getOwnPropertyNames(this).forEach((property: string) => {

            const type: string = this.getType(property);
            const isQueryParam: boolean = Reflect.getMetadata(QueryParamMetadataKey, this, property);

            if (isQueryParam) {
                switch (type) {
                    case 'number':
                        this.updateNumberParam(property, params);
                        break;
                    case 'decimal':
                        this.updateDecimalParam(property, params);
                        break;
                    case 'boolean':
                        this.updateBooleanParam(property, params);
                        break;
                    case 'string':
                    default:
                        this.updateStringParam(property, params);
                        break;
                }
            }

        });

    }

    updateNumberParam(property: string, params: {
        [key: string]: any;
    }) {

        if (params && params[property] !== null && params[property] !== undefined) {
            const value: number = parseInt(params[property], 10);
            this[property] = !isNaN(value) ? value : undefined;
        } else this[property] = undefined;

    }

    updateDecimalParam(property: string, params: {
        [key: string]: any;
    }) {

        if (params && params[property] !== null && params[property] !== undefined) {
            const value: number = parseFloat(params[property]);
            this[property] = !isNaN(value) ? value : undefined;
        } else this[property] = undefined;

    }

    updateBooleanParam(property: string, params: {
        [key: string]: any;
    }) {

        if (params && params[property] !== null && params[property] !== undefined) {
            if (params[property] === 'true') {
                this[property] = true;
            } else if (params[property] === 'false') {
                this[property] = false;
            } else this[property] = undefined;
        } else this[property] = undefined;

    }

    updateStringParam(property: string, params: {
        [key: string]: any;
    }) {

        if (property === 'sort') {
            if (this.canUpdateSortParam(params[property])) {
                this[property] = params[property];
            }
        } else this[property] = params[property];

    }

    canUpdateSortParam(param: string): boolean {

        if (param === null || param === undefined || param === '') return true;
        const arrValues: string[] = param.split(':');
        if (arrValues[0] && this.hasOwnProperty(arrValues[0])) {
            return true;
        }
        return false;
    }

}
