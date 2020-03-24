import { QueryParam, Thing, Type, Types } from 'softgami-ts-core';

export class Cat extends Thing {

    @Type({ type: Types.NUMBER })
    id: number;

    @Type({ type: Types.STRING })
    name: string;

    @Type({ type: Types.STRING })
    origin: string;

    @QueryParam()
    @Type({ type: Types.STRING })
    q?: string;

}
