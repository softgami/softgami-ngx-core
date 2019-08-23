import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, filter, map } from 'rxjs/operators';
import { Injector, OnDestroy, OnInit, StaticProvider, Type } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService} from '@ngx-translate/core';

import { AbstractCoreService } from '../../services/abstract-core.service';
import { AbstractHtml5StorageService } from '../../../html5-storage/abstract-html5-storage.service';

export abstract class AbstractBaseComponent<QueryParamsT> implements OnDestroy, OnInit {

    static providers: StaticProvider[] = [];
    static injector: Injector = null;
    subscription: Subscription;
    activatedRoute: ActivatedRoute;
    coreService: AbstractCoreService;
    router: Router;
    translateService: TranslateService;
    html5StorageService: AbstractHtml5StorageService;
    params: Params;

    constructor() {}

    abstract initQueryParams(): QueryParamsT;
    abstract handleQueryParams(params: QueryParamsT);

    ngOnInit() {

        this.initializeBase();

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

    getInjectedResource<T>(staticInjector: Injector, type: Type<T>): T {

        try {
            return staticInjector.get<T>(type) as T;
        } catch (ex) {
            return AbstractBaseComponent.injector.get<T>(type) as T;
        }

    }

    initQueryParamsSubscription() {

        const subscription: Subscription = this.activatedRoute.queryParams
        .pipe(
            debounceTime(100),
            map((params: Params) => {
                this.params = this.initQueryParams();
                return params;
            }),
            filter((params: Params) => this.hasParamsChanged(params)),
        )
        .subscribe((params: Params) => {

            this.handleQueryParams(params as QueryParamsT);

        });
        this.addSubscription(subscription);

    }

    hasParamsChanged(params: Params): boolean {

        for (const prop in this.params) {
            if (this.params[prop] !== params[prop]) return true;
        }

        return false;

    }

    updateRoute(queryParams: Params, activatedRoute?: ActivatedRoute, comands?: any[], queryParamsHandling?: 'merge' | 'preserve' | '') {

        let url: string = this.router.createUrlTree([]).toString();
        if (activatedRoute && comands) {
            url = this.router.createUrlTree(comands, { relativeTo: activatedRoute }).toString();
        }
        if (queryParamsHandling === null || queryParamsHandling === undefined) {
            queryParamsHandling = 'merge';
        }
        this.router.navigate([url], { queryParams, queryParamsHandling });

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
