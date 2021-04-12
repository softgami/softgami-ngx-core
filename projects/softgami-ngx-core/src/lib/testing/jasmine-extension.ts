/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export abstract class JasmineExtension {

    public static spyOn: ((arg1: any, arg2: any) => any) | null = null;
    public static createSpyObj: ((arg1: any, arg2: any) => any) | null = null;

    public static init(spyOn: (arg1: any, arg2: any) => any, createSpyObj: (arg1: any, arg2: any) => any): void {

        JasmineExtension.spyOn = spyOn;
        JasmineExtension.createSpyObj = createSpyObj;

    }

    public static createComponentSpy<T>(object: any): T {

        /* const skipMethodsList: string[] = [
            'constructor',
            'ngOnChanges',
            'ngOnInit',
            'ngDoCheck',
            'ngAfterContentInit',
            'ngAfterContentChecked',
            'ngAfterViewInit',
            'ngAfterViewChecked',
            'ngOnDestroy',
            '__defineGetter__',
            '__defineSetter__',
            'hasOwnProperty',
            '__lookupGetter__',
            '__lookupSetter__',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'toString',
            'valueOf',
            'toLocaleString',
        ]; */

        const componentSpy = {};

        JasmineExtension.getInstanceMethodNames(object)
        // .filter((property: string) => skipMethodsList.includes(property) === false)
            .forEach((property: string) => {

                if (JasmineExtension && JasmineExtension.spyOn) {

                    (componentSpy as any)[property] = JasmineExtension.spyOn(object, property);
                    (componentSpy as any)[property].and.callThrough();

                }

            });

        return componentSpy as T;

    }

    public static getInstanceMethodNames(obj: unknown): string[] {

        const methodNames: string[] = [];

        let proto = Object.getPrototypeOf(obj);

        while (proto) {

            Object.getOwnPropertyNames(proto).forEach((name: string) => {

                if (name !== 'constructor') {

                    if (JasmineExtension.hasMethod(proto, name)) {

                        methodNames.push(name);

                    }

                }

            });
            proto = Object.getPrototypeOf(proto);

        }

        const uniqueArrayMethodNames = [ ...new Set(methodNames) ];

        return uniqueArrayMethodNames;

    }

    public static hasMethod(obj: unknown, name: string): boolean {

        const desc: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(obj, name);
        return !!desc && typeof desc.value === 'function';

    }

    public static createServiceSpy<T>(type: { name: string; prototype: any }): T | null {

        if (JasmineExtension && JasmineExtension.createSpyObj) {

            return JasmineExtension.createSpyObj(type.name, Object.getOwnPropertyNames(type.prototype));

        }
        return null;

    }

}
