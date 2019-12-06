import 'reflect-metadata';

import { TypeMetadataKey } from './type-metadata-key';

export function Type(type: 'string' | 'number' | 'decimal' | 'boolean') {

    return Reflect.metadata(TypeMetadataKey, type);

}
