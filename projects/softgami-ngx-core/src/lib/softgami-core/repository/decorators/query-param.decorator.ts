import 'reflect-metadata';

import { QueryParamMetadataKey } from './query-param-metadata-keys';

export function QueryParam() {

    return Reflect.metadata(QueryParamMetadataKey, true);

}
