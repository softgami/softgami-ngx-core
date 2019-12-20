
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { debounceTime, concatMap, filter, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Injector, OnDestroy, OnInit, StaticProvider, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService} from '@ngx-translate/core';

import { AbstractCoreService } from '../../services/abstract-core.service';
import { AbstractHtml5StorageService } from '../../../html5-storage/abstract-html5-storage.service';
import { AbstractQueryable } from '../../repository/models/abstract-queryable';

export abstract class AbstractBaseComponent<Q extends AbstractQueryable> implements OnDestroy, OnInit {

    static providers: StaticProvider[] = [];
    static injector: Injector = null;
    subscription: Subscription;
    activatedRoute: ActivatedRoute;
    coreService: AbstractCoreService;
    router: Router;
    translateService: TranslateService;
    html5StorageService: AbstractHtml5StorageService;
    queryable: Q;
    isInitCalled: boolean;
    form: FormGroup;
    shouldUpdateDefaultFormFromParams: boolean;
    totalControlsFilled = 0;

    @ViewChild('formElement', { static: false }) formElement;

    constructor() {

        this.shouldUpdateDefaultFormFromParams = true;
        this.waitForInit();

    }

    abstract initQueryParams(): Q;
    abstract handleQueryParams(params: Q);

    ngOnInit() {

        this.isInitCalled = true;
        this.initializeBase();

    }

    waitForInit() {

        setTimeout(() => {
            if (this.isInitCalled !== true) {
                throw new Error(
                    this.constructor.name + ': ngOnInit must be called on child class if child class invoke own ngOnInit method.');
            }
        }, 1000);

    }

    getActivatedRoute(): ActivatedRoute {

        return this.activatedRoute;

    }

    initializeBase() {

        this.initProviders();
        this.initQueryParamsSubscription();

    }

    initProviders() {

        if (!AbstractBaseComponent.injector) {
            throw new Error(
                'AbstractBaseComponent.injector not defined. Should Call SoftgamiCoreModule.setInjector(injector: Injector)' +
                    'on AppModule initialization.',
            );
        }

        let staticInjector: Injector;
        if (AbstractBaseComponent.providers && AbstractBaseComponent.providers.length) {
            staticInjector = Injector.create({
                providers: AbstractBaseComponent.providers,
            });
        }

        this.setInjectedResources(staticInjector);

    }

    setInjectedResources(staticInjector: Injector) {

        this.activatedRoute = this.getInjectedResource<ActivatedRoute>(staticInjector, ActivatedRoute);
        this.coreService = this.getInjectedResource<AbstractCoreService>(staticInjector, AbstractCoreService as Type<AbstractCoreService>);
        this.router = this.getInjectedResource<Router>(staticInjector, Router);
        this.translateService = this.getInjectedResource<TranslateService>(staticInjector, TranslateService);
        this.html5StorageService = this.getInjectedResource<AbstractHtml5StorageService>
            (staticInjector, AbstractHtml5StorageService as Type<AbstractHtml5StorageService>);

        this.subscribeParamMap();

    }

    subscribeParamMap() {

        this.activatedRoute = this.getActivatedRoute();

        let param: string;
        let translatedNewRoute: string;
        const s: Subscription = this.activatedRoute.paramMap
        .pipe(
            map((paramsAsMap: ParamMap) => paramsAsMap.get('id')),
            filter((p: string) => p !== null && p !== undefined && p !== ''),
            concatMap((p: string) => {
                param = p;
                return this.translateService.get('ROUTES.new');
            }),
            map((value: string) => {
                translatedNewRoute = value;
                return value === param;
            }),
        )
        .subscribe((value: boolean) => {

            if (value) this.handleParamMapNewRoute(translatedNewRoute);
            else this.handleParamMapId(param);

        });
        this.addSubscription(s);

    }

    handleParamMapId(id: string) {}

    handleParamMapNewRoute(routeParam: string) {}

    getInjectedResource<I>(staticInjector: Injector, type: Type<I>): I {

        try {
            return staticInjector.get<I>(type) as I;
        } catch (ex) {
            return AbstractBaseComponent.injector.get<I>(type) as I;
        }

    }

    initQueryParamsSubscription() {

        const subscription: Subscription = this.activatedRoute.queryParams
        .pipe(
            debounceTime(100),
            map((params: Params) => {
                this.queryable = this.queryable ? this.queryable : this.initQueryParams();
                return params;
            }),
            filter((params: Params) => {
                return this.hasParamsChanged(params);
            }),
            map((params: Params) => {
                this.updateQueryable(params);
                if (this.shouldUpdateDefaultFormFromParams) {
                    this.updateFormFromQueryable(this.queryable, this.form);
                }
                return params;
            }),
        )
        .subscribe((params: Params) => {

            this.updateTotalControlsFilled();
            this.handleQueryParams(params as Q);

        });
        this.addSubscription(subscription);

    }

    hasParamsChanged(params: Params): boolean {

        let hasChanged = false;
        Object.getOwnPropertyNames(this.queryable).forEach((property: string) => {
            const paramsValue: string = params[property] ? params[property].toString() : params[property];
            const value: string = this.queryable[property] ? this.queryable[property].toString() : this.queryable[property];
            if (value !== paramsValue) {
                hasChanged =  true;
            }
        });

        return hasChanged;

    }

    updateQueryable(params: Params) {

        this.queryable.updatePropertiesFromParams(params);

    }

    updateFormFromQueryable(queryable: AbstractQueryable, form: FormGroup) {

        if (!form || !queryable) return;

        Object.getOwnPropertyNames(queryable).forEach((property: string) => {
            if (form.controls[property] && form.controls[property].value !== queryable[property]) {
                form.controls[property].setValue(queryable[property]);
            }
        });
        this.updateTotalControlsFilled();

    }

    updateFormFromObject<T>(form: FormGroup, object: T) {

        if (!form || !object) return;

        Object.getOwnPropertyNames(form.controls).forEach((control: string) => {
            form.controls[control].setValue(object[control]);
        });
        this.updateTotalControlsFilled();

    }

    updateRoute(queryParams: Params, activatedRoute?: ActivatedRoute, commands?: any[], queryParamsHandling?: 'merge' | 'preserve' | '') {

        let url: string = this.router.createUrlTree([]).toString();
        if (activatedRoute && commands) {
            url = this.router.createUrlTree(commands, { relativeTo: activatedRoute }).toString();
        }
        if (queryParamsHandling === null || queryParamsHandling === undefined) {
            queryParamsHandling = 'merge';
        }
        queryParams = this.cleanParams(queryParams);
        this.router.navigate([url], { queryParams, queryParamsHandling });

    }

    updateTotalControlsFilled() {

        if (!this.form) return;

        this.totalControlsFilled =  Object.keys(this.form.controls)
        .filter((key: string) => {
            const control = this.form.controls[key];
            if (!control || control.value === null || control.value === undefined) {
                return false;
            } else return true;
        }).length;

    }

    cleanParams(params: Params): Params {

        if (!params) return params;

        Object.getOwnPropertyNames(params).forEach((property: string) => {
            if (params[property] === undefined || params[property] === '') {
                params[property] = null;
            }
        });
        return params;

    }

    addSubscription(subscrition: Subscription) {

        this.subscription ? this.subscription.add(subscrition) : this.subscription = subscrition;

    }

    cleanSubscriptions() {

        this.subscription = undefined;

    }

    ngOnDestroy() {

        if (this.subscription) this.subscription.unsubscribe();

    }

}
