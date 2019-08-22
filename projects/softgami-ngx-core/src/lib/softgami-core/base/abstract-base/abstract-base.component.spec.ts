import { ActivatedRoute, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Injector, Type } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';

import { AbstractBaseComponent } from './abstract-base.component';
import { AbstractCoreService } from '../../services/abstract-core.service';
import { AbstractHtml5StorageService } from '../../../html5-storage';
import { JasmineExtension } from '../../../testing/jasmine-extension';

@Component({
    selector: 'lib-base-component',
    template: '',
})
export class BaseComponent extends AbstractBaseComponent<string> {

    initQueryParams(): string {

        return null;

    }

    handleQueryParams(params?: any) { }

}

describe('AbstractBaseComponent', () => {

    let fixture: ComponentFixture<BaseComponent>;
    let component: BaseComponent;
    let rootElement: DebugElement;
    let componentSpy: jasmine.SpyObj<BaseComponent>;

    let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
    let translateServiceSpy: jasmine.SpyObj<TranslateService>;
    let coreServiceSpy: jasmine.SpyObj<AbstractCoreService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let html5StorageServiceSpy: jasmine.SpyObj<AbstractHtml5StorageService>;

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
            ],
            declarations: [ BaseComponent ],
            providers: [
                Injector,
            ]
        })
        .compileComponents();

    }));

    beforeEach(async(() => {

        coreServiceSpy = JasmineExtension.createServiceSpy(AbstractCoreService);
        routerSpy = JasmineExtension.createServiceSpy(Router);
        translateServiceSpy = JasmineExtension.createServiceSpy(TranslateService);
        html5StorageServiceSpy = JasmineExtension.createServiceSpy(AbstractHtml5StorageService);
        activatedRouteSpy = JasmineExtension.createServiceSpy(ActivatedRoute);

    }));

    beforeEach(async(() => {

        AbstractBaseComponent.injector = TestBed.get<Injector>(Injector as unknown as Type<Injector>);
        AbstractBaseComponent.providers = [
            {
                provide: AbstractCoreService,
                useValue: coreServiceSpy,
            },
            {
                provide: Router,
                useValue: routerSpy,
            },
            {
                provide: TranslateService,
                useValue: translateServiceSpy,
            },
            {
                provide: ActivatedRoute,
                useValue: activatedRouteSpy,
            },
        ];

    }));

    beforeEach(async(() => {

        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;
        componentSpy = JasmineExtension.createComponentSpy(component);
        componentSpy.initializeBase.and.callFake(() => {});
        fixture.detectChanges();
        rootElement = fixture.debugElement;

    }));

    it('should create', () => {

        expect(component).toBeTruthy();

    });

    describe('ngOnInit', () => {

        it('ngOnInit should call initializeBase when called', () => {

            expect(componentSpy.initializeBase).toHaveBeenCalled();

        });

    });

    describe('initializeBase', () => {

        it('initializeBase should call initProviders when called', () => {

            componentSpy.initializeBase.and.callThrough();
            componentSpy.initProviders.and.returnValue();
            componentSpy.initQueryParamsSubscription.and.returnValue();

            component.initializeBase();

            expect(componentSpy.initProviders).toHaveBeenCalled();

        });

        it('initializeBase should call initQueryParamsSubscription when called', () => {

            componentSpy.initializeBase.and.callThrough();
            componentSpy.initProviders.and.returnValue();
            componentSpy.initQueryParamsSubscription.and.returnValue();

            component.initializeBase();

            expect(componentSpy.initQueryParamsSubscription).toHaveBeenCalled();

        });

    });

    describe('initProviders', () => {

        it('initProviders should throw error when injector is null', () => {

            AbstractBaseComponent.injector = null;
            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();

            expect(() => component.initProviders())
            .toThrow(
                new Error('AbstractBaseComponent.injector not defined. Should Call SoftgamiCoreModule.setInjector(injector: Injector)' +
            'on AppModule initialization.'));

        });

        it('initProviders should throw error when injector is undefined', () => {

            AbstractBaseComponent.injector = undefined;
            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();

            expect(() => component.initProviders())
            .toThrow(
                new Error('AbstractBaseComponent.injector not defined. Should Call SoftgamiCoreModule.setInjector(injector: Injector)' +
            'on AppModule initialization.'));

        });

        it('initProviders should not throw error when injector is defined', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();

            expect(() => component.initProviders())
            .not.toThrow(
                new Error('AbstractBaseComponent.injector not defined. Should Call SoftgamiCoreModule.setInjector(injector: Injector)' +
            'on AppModule initialization.'));

        });

        it('initProviders should not call Injector.create when providers list is null', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();
            const spyInjector: jasmine.Spy = spyOn(Injector, 'create');
            AbstractBaseComponent.providers = null;

            component.initProviders();

            expect(spyInjector).not.toHaveBeenCalled();

        });

        it('initProviders should not call Injector.create when providers list is undefined', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();
            const spyInjector: jasmine.Spy = spyOn(Injector, 'create');
            AbstractBaseComponent.providers = undefined;

            component.initProviders();

            expect(spyInjector).not.toHaveBeenCalled();

        });

        it('initProviders should not call Injector.create when providers list is empty', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();
            const spyInjector: jasmine.Spy = spyOn(Injector, 'create');
            AbstractBaseComponent.providers = [];

            component.initProviders();

            expect(spyInjector).not.toHaveBeenCalled();

        });

        it('initProviders should call Injector.create when providers list has elements', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();
            const spyInjector: jasmine.Spy = spyOn(Injector, 'create');

            component.initProviders();

            expect(spyInjector).toHaveBeenCalled();

        });

        it('initProviders should call setInjectedResources with static injector undefined when providers list is null', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();
            AbstractBaseComponent.providers = null;

            component.initProviders();

            expect(componentSpy.setInjectedResources).toHaveBeenCalledWith(undefined);

        });

        it('initProviders should call setInjectedResources with static injector undefined when providers list is undefined', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();
            AbstractBaseComponent.providers = undefined;

            component.initProviders();

            expect(componentSpy.setInjectedResources).toHaveBeenCalledWith(undefined);

        });

        it('initProviders should call setInjectedResources with static injector undefined when providers list is empty', () => {

            componentSpy.initProviders.and.callThrough();
            componentSpy.setInjectedResources.and.returnValue();
            AbstractBaseComponent.providers = [];

            component.initProviders();

            expect(componentSpy.setInjectedResources).toHaveBeenCalledWith(undefined);

        });

    });

    describe('setInjectedResources', () => {

        it('setInjectedResources should call getInjectedResource and set ActivatedRoute', () => {

            componentSpy.setInjectedResources.and.callThrough();
            componentSpy.getInjectedResource.and.returnValue(true);
            component.activatedRoute = undefined;

            component.setInjectedResources(AbstractBaseComponent.injector);

            expect(componentSpy.getInjectedResource).toHaveBeenCalledWith(AbstractBaseComponent.injector, ActivatedRoute);
            expect(component.activatedRoute).toBeDefined();

        });

        it('setInjectedResources should call getInjectedResource and set AbstractCoreService', () => {

            componentSpy.setInjectedResources.and.callThrough();
            componentSpy.getInjectedResource.and.returnValue(true);
            component.coreService = undefined;

            component.setInjectedResources(AbstractBaseComponent.injector);

            expect(componentSpy.getInjectedResource).toHaveBeenCalledWith(AbstractBaseComponent.injector, AbstractCoreService);
            expect(component.coreService).toBeDefined();

        });

        it('setInjectedResources should call getInjectedResource and set Router', () => {

            componentSpy.setInjectedResources.and.callThrough();
            componentSpy.getInjectedResource.and.returnValue(true);
            component.router = undefined;

            component.setInjectedResources(AbstractBaseComponent.injector);

            expect(componentSpy.getInjectedResource).toHaveBeenCalledWith(AbstractBaseComponent.injector, Router);
            expect(component.router).toBeDefined();

        });

        it('setInjectedResources should call getInjectedResource and set TranslateService', () => {

            componentSpy.setInjectedResources.and.callThrough();
            componentSpy.getInjectedResource.and.returnValue(true);
            component.translateService = undefined;

            component.setInjectedResources(AbstractBaseComponent.injector);

            expect(componentSpy.getInjectedResource).toHaveBeenCalledWith(AbstractBaseComponent.injector, TranslateService);
            expect(component.translateService).toBeDefined();

        });

        it('setInjectedResources should call getInjectedResource and set AbstractHtml5StorageService', () => {

            componentSpy.setInjectedResources.and.callThrough();
            componentSpy.getInjectedResource.and.returnValue(true);
            component.html5StorageService = undefined;

            component.setInjectedResources(AbstractBaseComponent.injector);

            expect(componentSpy.getInjectedResource).toHaveBeenCalledWith(AbstractBaseComponent.injector, AbstractHtml5StorageService);
            expect(component.html5StorageService).toBeDefined();

        });

    });

    describe('getInjectedResource', () => {

        it('getInjectedResource should call AbstractBaseComponent.injector.get() when static injector is null', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get');

            const result: ActivatedRoute = component.getInjectedResource<ActivatedRoute>(null, ActivatedRoute);

            expect(spyInjector).toHaveBeenCalledWith(ActivatedRoute);

        });

        it('getInjectedResource should call AbstractBaseComponent.injector.get() when static injector is undefined', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get');

            const result: ActivatedRoute = component.getInjectedResource<ActivatedRoute>(undefined, ActivatedRoute);

            expect(spyInjector).toHaveBeenCalledWith(ActivatedRoute);

        });

        it('getInjectedResource should call staticInjector.get() when static injector is defined', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get');

            const result: ActivatedRoute = component.getInjectedResource<ActivatedRoute>(AbstractBaseComponent.injector, ActivatedRoute);

            expect(spyInjector).toHaveBeenCalledWith(ActivatedRoute);

        });

        it('getInjectedResource should return ActivatedRoute when called', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get').and.returnValue(activatedRouteSpy);

            const result: ActivatedRoute = component.getInjectedResource<ActivatedRoute>(AbstractBaseComponent.injector, ActivatedRoute);

            expect(spyInjector).toHaveBeenCalledWith(ActivatedRoute);
            expect(result).toEqual(activatedRouteSpy);

        });

        it('getInjectedResource should return AbstractCoreService when called', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get').and.returnValue(coreServiceSpy);

            const result: AbstractCoreService =
                component.getInjectedResource<AbstractCoreService>
                (AbstractBaseComponent.injector, AbstractCoreService as Type<AbstractCoreService>);

            expect(spyInjector).toHaveBeenCalledWith(AbstractCoreService);
            expect(result).toEqual(coreServiceSpy);

        });

        it('getInjectedResource should return Router when called', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get').and.returnValue(routerSpy);

            const result: Router = component.getInjectedResource<Router>(AbstractBaseComponent.injector, Router);

            expect(spyInjector).toHaveBeenCalledWith(Router);
            expect(result).toEqual(routerSpy);

        });

        it('getInjectedResource should return TranslateService when called', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get').and.returnValue(translateServiceSpy);

            const result: TranslateService =
                component.getInjectedResource<TranslateService>(AbstractBaseComponent.injector, TranslateService);

            expect(spyInjector).toHaveBeenCalledWith(TranslateService);
            expect(result).toEqual(translateServiceSpy);

        });

        it('getInjectedResource should return AbstractHtml5StorageService when called', () => {

            componentSpy.getInjectedResource.and.callThrough();
            const spyInjector: jasmine.Spy = spyOn(AbstractBaseComponent.injector, 'get').and.returnValue(html5StorageServiceSpy);

            const result: AbstractHtml5StorageService =
                component.getInjectedResource<AbstractHtml5StorageService>
                (AbstractBaseComponent.injector, AbstractHtml5StorageService as Type<AbstractHtml5StorageService>);

            expect(spyInjector).toHaveBeenCalledWith(AbstractHtml5StorageService);
            expect(result).toEqual(html5StorageServiceSpy);

        });

    });

    describe('initQueryParamsSubscription', () => {

        it('initQueryParamsSubscription should call activatedRoute queryparams subscribe when called', () => {

            componentSpy.initQueryParamsSubscription.and.callThrough();
            componentSpy.initQueryParams.and.returnValue(null);
            componentSpy.hasParamsChanged.and.returnValue(null);
            componentSpy.handleQueryParams.and.returnValue(null);
            componentSpy.addSubscription.and.returnValue(null);
            const mockActiveRoute = {
                queryParams: of({}),
            };
            component.activatedRoute = mockActiveRoute as ActivatedRoute;
            const spyQueryParamsSubscribe: jasmine.Spy = spyOn(mockActiveRoute.queryParams, 'subscribe');

            component.initQueryParamsSubscription();

            expect(spyQueryParamsSubscribe).toHaveBeenCalled();

        });

        it('initQueryParamsSubscription should add subscription to list when called', () => {

            componentSpy.initQueryParamsSubscription.and.callThrough();
            componentSpy.initQueryParams.and.returnValue(null);
            componentSpy.hasParamsChanged.and.returnValue(null);
            componentSpy.handleQueryParams.and.returnValue(null);
            componentSpy.addSubscription.and.returnValue(null);
            const mockActiveRoute = {
                queryParams: of({}),
            };
            component.activatedRoute = mockActiveRoute as ActivatedRoute;

            component.initQueryParamsSubscription();

            expect(componentSpy.addSubscription).toHaveBeenCalled();

        });

        it('initQueryParamsSubscription should set params when subscription fired', () => {

            componentSpy.initQueryParamsSubscription.and.callThrough();
            componentSpy.initQueryParams.and.returnValue({arg: 1} as any);
            componentSpy.hasParamsChanged.and.returnValue(null);
            componentSpy.handleQueryParams.and.returnValue(null);
            componentSpy.addSubscription.and.returnValue(null);
            const mockActiveRoute = {
                queryParams: of({}),
            };
            component.activatedRoute = mockActiveRoute as ActivatedRoute;
            component.params = null;

            component.initQueryParamsSubscription();

            expect(componentSpy.initQueryParams).toHaveBeenCalled();
            expect(component.params).toEqual({arg: 1});

        });

        it('initQueryParamsSubscription should call hasParamsChanged when subscription fired', () => {

            componentSpy.initQueryParamsSubscription.and.callThrough();
            componentSpy.initQueryParams.and.returnValue({arg: 1} as any);
            componentSpy.hasParamsChanged.and.returnValue(null);
            componentSpy.handleQueryParams.and.returnValue(null);
            componentSpy.addSubscription.and.returnValue(null);
            const mockActiveRoute = {
                queryParams: of({arg: 2} as any),
            };
            component.activatedRoute = mockActiveRoute as ActivatedRoute;

            component.initQueryParamsSubscription();

            expect(componentSpy.hasParamsChanged).toHaveBeenCalledWith({arg: 2});

        });

        it('initQueryParamsSubscription should not call handleQueryParams when hasParamsChanged returns falsy values', () => {

            componentSpy.initQueryParamsSubscription.and.callThrough();
            componentSpy.initQueryParams.and.returnValue({arg: 1} as any);
            componentSpy.handleQueryParams.and.returnValue(null);
            componentSpy.addSubscription.and.returnValue(null);
            const mockActiveRoute = {
                queryParams: of({arg: 2} as any),
            };
            component.activatedRoute = mockActiveRoute as ActivatedRoute;
            componentSpy.hasParamsChanged.and.returnValue(null);

            component.initQueryParamsSubscription();

            expect(componentSpy.handleQueryParams).not.toHaveBeenCalled();

            componentSpy.hasParamsChanged.and.returnValue(undefined);

            component.initQueryParamsSubscription();

            expect(componentSpy.handleQueryParams).not.toHaveBeenCalled();

            componentSpy.hasParamsChanged.and.returnValue(false);

            component.initQueryParamsSubscription();

            expect(componentSpy.handleQueryParams).not.toHaveBeenCalled();

        });

        it(`initQueryParamsSubscription should call handleQueryParams with "{arg: 2}"
            when hasParamsChanged returns true and subscription fired with "{arg: 2}"`, () => {

            componentSpy.initQueryParamsSubscription.and.callThrough();
            componentSpy.initQueryParams.and.returnValue({arg: 1} as any);
            componentSpy.hasParamsChanged.and.returnValue(true);
            componentSpy.handleQueryParams.and.returnValue(null);
            componentSpy.addSubscription.and.returnValue(null);
            const mockActiveRoute = {
                queryParams: of({arg: 2} as any),
            };
            component.activatedRoute = mockActiveRoute as ActivatedRoute;

            component.initQueryParamsSubscription();

            expect(componentSpy.hasParamsChanged).toHaveBeenCalledWith({arg: 2});

        });

        it(`initQueryParamsSubscription should call handleQueryParams with "{arg: 3}"
            when hasParamsChanged returns true and subscription fired with "{arg: 3}"`, () => {

            componentSpy.initQueryParamsSubscription.and.callThrough();
            componentSpy.initQueryParams.and.returnValue({arg: 1} as any);
            componentSpy.hasParamsChanged.and.returnValue(true);
            componentSpy.handleQueryParams.and.returnValue(null);
            componentSpy.addSubscription.and.returnValue(null);
            const mockActiveRoute = {
                queryParams: of({arg: 3} as any),
            };
            component.activatedRoute = mockActiveRoute as ActivatedRoute;

            component.initQueryParamsSubscription();

            expect(componentSpy.hasParamsChanged).toHaveBeenCalledWith({arg: 3});

        });

    });

    describe('hasParamsChanged', () => {

        it('hasParamsChanged should return true when params changed', () => {

            componentSpy.hasParamsChanged.and.callThrough();
            component.params = {arg: 1};

            let result: boolean = component.hasParamsChanged({});

            expect(result).toBeTruthy();

            component.params = {arg: 2};

            result = component.hasParamsChanged({arg: 1});

            expect(result).toBeTruthy();

            component.params = {arg: 2};

            result = component.hasParamsChanged({arg2: 2});

            expect(result).toBeTruthy();

        });

        it('hasParamsChanged should return false when params have not changed', () => {

            componentSpy.hasParamsChanged.and.callThrough();
            component.params = {};

            let result: boolean = component.hasParamsChanged({});

            expect(result).toBeFalsy();

            component.params = {arg: 1};

            result = component.hasParamsChanged({arg: 1});

            expect(result).toBeFalsy();

            component.params = {arg: 2};

            result = component.hasParamsChanged({arg: 2, arg2: 1});

            expect(result).toBeFalsy();

        });

    });

    describe('updateRoute', () => {

        it('updateRoute should call router createUrlTree 1 time with empty array when activated route is falsy', () => {

            componentSpy.updateRoute.and.callThrough();
            routerSpy.createUrlTree.and.returnValue({} as any);
            routerSpy.navigate.and.returnValue(null);
            component.router = routerSpy;

            component.updateRoute({arg: 1}, null);

            expect(routerSpy.createUrlTree.calls.count()).toEqual(1);
            expect(routerSpy.createUrlTree.calls.allArgs()).toEqual([[[]]]);

            routerSpy.createUrlTree.calls.reset();

            component.updateRoute({arg: 1}, undefined);

            expect(routerSpy.createUrlTree.calls.count()).toEqual(1);
            expect(routerSpy.createUrlTree.calls.allArgs()).toEqual([[[]]]);

        });

        it('updateRoute should call router createUrlTree 1 time with empty array when comands is falsy', () => {

            componentSpy.updateRoute.and.callThrough();
            routerSpy.createUrlTree.and.returnValue({} as any);
            routerSpy.navigate.and.returnValue(null);
            component.router = routerSpy;

            component.updateRoute({arg: 1}, activatedRouteSpy, null);

            expect(routerSpy.createUrlTree.calls.count()).toEqual(1);
            expect(routerSpy.createUrlTree.calls.allArgs()).toEqual([[[]]]);

            routerSpy.createUrlTree.calls.reset();

            component.updateRoute({arg: 1}, activatedRouteSpy, undefined);

            expect(routerSpy.createUrlTree.calls.count()).toEqual(1);
            expect(routerSpy.createUrlTree.calls.allArgs()).toEqual([[[]]]);

        });

        it('updateRoute should call router createUrlTree 2 times when comands and activated route are defined', () => {

            componentSpy.updateRoute.and.callThrough();
            routerSpy.createUrlTree.and.returnValue({} as any);
            routerSpy.navigate.and.returnValue(null);
            component.router = routerSpy;

            component.updateRoute({arg: 1}, activatedRouteSpy, []);

            expect(routerSpy.createUrlTree.calls.count()).toEqual(2);

        });

        it('updateRoute should call router navigate with "merge" when queryParamsHandling is falsy', () => {

            componentSpy.updateRoute.and.callThrough();
            routerSpy.createUrlTree.and.returnValue('/some-location' as any);
            routerSpy.navigate.and.returnValue(null);
            component.router = routerSpy;

            component.updateRoute({arg: 1}, activatedRouteSpy, [], null);

            expect(routerSpy.navigate).toHaveBeenCalledWith(['/some-location'],
                Object({ queryParams: Object({ arg: 1 }), queryParamsHandling: 'merge' }));

            routerSpy.navigate.calls.reset();
            component.updateRoute({arg: 2}, activatedRouteSpy, [], undefined);

            expect(routerSpy.navigate).toHaveBeenCalledWith(['/some-location'],
                Object({ queryParams: Object({ arg: 2 }), queryParamsHandling: 'merge' }));

        });

        it('updateRoute should call router navigate with "merge" when queryParamsHandling is "merge"', () => {

            componentSpy.updateRoute.and.callThrough();
            routerSpy.createUrlTree.and.returnValue('/some-location' as any);
            routerSpy.navigate.and.returnValue(null);
            component.router = routerSpy;

            component.updateRoute({arg: 3}, activatedRouteSpy, [], 'merge');

            expect(routerSpy.navigate).toHaveBeenCalledWith(['/some-location'],
                Object({ queryParams: Object({ arg: 3 }), queryParamsHandling: 'merge' }));

        });

        it('updateRoute should call router navigate with "preserve" when queryParamsHandling is "preserve"', () => {

            componentSpy.updateRoute.and.callThrough();
            routerSpy.createUrlTree.and.returnValue('/some-location' as any);
            routerSpy.navigate.and.returnValue(null);
            component.router = routerSpy;

            component.updateRoute({arg: 4}, activatedRouteSpy, [], 'preserve');

            expect(routerSpy.navigate).toHaveBeenCalledWith(['/some-location'],
                Object({ queryParams: Object({ arg: 4 }), queryParamsHandling: 'preserve' }));

        });

        it('updateRoute should call router navigate with "" when queryParamsHandling is ""', () => {

            componentSpy.updateRoute.and.callThrough();
            routerSpy.createUrlTree.and.returnValue('/some-location' as any);
            routerSpy.navigate.and.returnValue(null);
            component.router = routerSpy;

            component.updateRoute({arg: 5}, activatedRouteSpy, [], '');

            expect(routerSpy.navigate).toHaveBeenCalledWith(['/some-location'],
                Object({ queryParams: Object({ arg: 5 }), queryParamsHandling: '' }));

        });

    });

    describe('addSubscription', () => {

        it('addSubscription should set subscription when subscription is falsy', () => {

            componentSpy.addSubscription.and.callThrough();
            component.subscription = undefined;

            component.addSubscription(new Subscription());

            expect(component.subscription).toBeDefined();

            component.subscription = null;

            component.addSubscription(new Subscription());

            expect(component.subscription).toBeDefined();

        });

        it('addSubscription call subscription.add when subscription is defined', () => {

            componentSpy.addSubscription.and.callThrough();
            component.subscription = new Subscription();
            const spy: jasmine.Spy = spyOn(component.subscription, 'add');
            const mockSubscription: Subscription = new Subscription(() => {});

            component.addSubscription(mockSubscription);

            expect(spy).toHaveBeenCalledWith(mockSubscription);

        });

    });

    describe('cleanSubscriptions', () => {

        it('cleanSubscriptions should set subscription to undefined when called', () => {

            componentSpy.cleanSubscriptions.and.callThrough();
            component.subscription = new Subscription();

            component.cleanSubscriptions();

            expect(component.subscription).toBeUndefined();

        });

    });

    describe('ngOnDestroy', () => {

        it('ngOnDestroy should not call subscription.unsubscribe() when subscription is falsy', () => {

            componentSpy.ngOnDestroy.and.callThrough();
            component.subscription = new Subscription();
            const spy: jasmine.Spy = spyOn(component.subscription, 'unsubscribe');
            component.subscription = null;

            component.ngOnDestroy();

            expect(spy).not.toHaveBeenCalled();

            component.subscription = undefined;
            spy.calls.reset();

            component.ngOnDestroy();

            expect(spy).not.toHaveBeenCalled();

        });

        it('ngOnDestroy should call subscription.unsubscribe() when subscription is defined', () => {

            componentSpy.ngOnDestroy.and.callThrough();
            component.subscription = new Subscription();
            const spy: jasmine.Spy = spyOn(component.subscription, 'unsubscribe');

            component.ngOnDestroy();

            expect(spy).toHaveBeenCalled();

        });

    });

    afterEach(() => {

        fixture = null;
        component = null;
        rootElement = null;
        componentSpy = null;

        translateServiceSpy = null;
        coreServiceSpy = null;
        routerSpy = null;
        html5StorageServiceSpy = null;

    });
});
