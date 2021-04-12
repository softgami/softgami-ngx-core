import { QueryParam, Thing, Type, Types } from 'softgami-ts-core';

export class Cat extends Thing {

    @Type({ type: Types.NUMBER })
    id: number | null = null;

    @Type({ type: Types.STRING })
    name: string | null = null;

    @Type({ type: Types.STRING })
    origin: string | null = null;

    @QueryParam()
    @Type({ type: Types.STRING })
    q?: string | null = null;

}
