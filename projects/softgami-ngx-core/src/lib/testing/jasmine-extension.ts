
export abstract class JasmineExtension {

    public static spyOn: (arg1: any, arg2: any) => any;
    public static createSpyObj: (arg1: any, arg2: any) => any;

    public static init(spyOn: (arg1: any, arg2: any) => any, createSpyObj: (arg1: any, arg2: any) => any) {

        JasmineExtension.spyOn = spyOn;
        JasmineExtension.createSpyObj = createSpyObj;

    }

    public static createComponentSpy<T>(object: any): T {

        const skipMethodsList: string[] = [
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
        ];

        const componentSpy: any = {};

        JasmineExtension.getInstanceMethodNames(object)
        // .filter((property: string) => skipMethodsList.includes(property) === false)
        .forEach((property: string) => {
            componentSpy[property] = JasmineExtension.spyOn(object, property);
            componentSpy[property].and.callThrough();
        });

        return componentSpy as T;

    }

    public static getInstanceMethodNames(obj: any): string[] {

        const methodNames: string[] = [];

        let proto: any = Object.getPrototypeOf(obj);

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

        const uniqueArrayMethodNames = [... new Set(methodNames)];

        return uniqueArrayMethodNames;

    }

    public static hasMethod(obj: any, name: string) {

        const desc: PropertyDescriptor = Object.getOwnPropertyDescriptor(obj, name);
        return !!desc && typeof desc.value === 'function';

    }

    public static createServiceSpy<T>(type: any): T {

        return JasmineExtension.createSpyObj(type.name as string, Object.getOwnPropertyNames(type.prototype) as any);

    }

}
