import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Injector, OnDestroy, OnInit, StaticProvider, Type, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Thing } from 'softgami-ts-core';
import { TranslateService} from '@ngx-translate/core';

import { AbstractCoreService } from '../../services/abstract-core.service';
import { AbstractHtml5StorageService } from '../../../html5-storage/abstract-html5-storage.service';

export abstract class AbstractBaseComponent<T extends Thing> implements OnDestroy, OnInit {

    static providers: StaticProvider[] = [];
    static injector: Injector = null;
    subscription: Subscription;
    activatedRoute: ActivatedRoute;
    coreService: AbstractCoreService;
    router: Router;
    translateService: TranslateService;
    html5StorageService: AbstractHtml5StorageService;
    object: T;
    isInitCalled: boolean;
    form: FormGroup;
    shouldUpdateDefaultFormFromParams: boolean;
    totalControlsFilled = 0;

    @ViewChild('formElement', { static: false }) formElement;

    constructor() {

        this.shouldUpdateDefaultFormFromParams = true;
        this.waitForInit();

    }

    abstract initMainObject(): T;
    abstract handleQueryParams(params: T);

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

    }

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
                this.object = this.object ? this.object : this.initMainObject();
                return params;
            }),
            map((params: Params) => {
                this.object.updatePropertiesFromParams(params);
                if (this.shouldUpdateDefaultFormFromParams) {
                    this.updateFormFromParams(this.form, params);
                } else {
                    this.updateTotalControlsFilled();
                }
                return params;
            }),
        )
        .subscribe((params: Params) => {

            this.handleQueryParams(params as T);
            this.initFormChangesSubscription();

        });
        this.addSubscription(subscription);

    }

    initFormChangesSubscription() {

        if (!this.form) return;

        const s: Subscription = this.form.valueChanges
        .pipe(
            distinctUntilChanged(),
            debounceTime(10),
        )
        .subscribe((val) => {
            this.updateTotalControlsFilled();
        });
        this.addSubscription(s);

    }

    updateFormFromThing(form: FormGroup, thing: T) {

        if (!form || !thing) return;

        Object.getOwnPropertyNames(thing).forEach((property: string) => {
            if (form.controls[property] && form.controls[property].value !== thing[property]) {
                form.controls[property].setValue(thing[property]);
            }
        });
        this.updateTotalControlsFilled();

    }

    updateFormFromParams(form: FormGroup, params: Params) {

        if (!form || !params) return;

        Object.getOwnPropertyNames(form.controls).forEach((control: string) => {
            form.controls[control].setValue(params[control] ? params[control] : null);
        });
        this.updateTotalControlsFilled();

    }

    updateFormFromObject<O>(form: FormGroup, object: O) {

        if (!form || !object) return;

        Object.getOwnPropertyNames(form.controls).forEach((control: string) => {
            form.controls[control].setValue((object[control] !== null && object[control] !== undefined) ? object[control] : null);
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

        this.totalControlsFilled = Object.keys(this.form.controls)
        .filter((key: string) => {
            const control = this.form.controls[key];
            if (!control || control.value === null || control.value === undefined) {
                return false;
            } else return true;
        })
        .length;

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
