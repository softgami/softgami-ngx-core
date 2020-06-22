import { ActivatedRoute, Navigation, ParamMap, Params, Router } from '@angular/router';
import { concatMap, debounceTime, delay, distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { FormGroup, NgForm } from '@angular/forms';
import { Injector, OnDestroy, OnInit, StaticProvider, Type, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { Thing } from 'softgami-ts-core';
import { TranslateService} from '@ngx-translate/core';

import { AbstractCoreService } from '../../services/abstract-core.service';
import { AbstractHtml5StorageService } from '../../../html5-storage/abstract-html5-storage.service';
import { AbstractMessageService } from '../../services/abstract-message.service';

export abstract class AbstractBaseComponent<T extends Thing> implements OnDestroy, OnInit {

    static providers: StaticProvider[] = [];
    static injector: Injector = null;
    subscription: Subscription;
    object: T;
    isInitCalled: boolean;
    form: FormGroup;
    totalControlsFilled = 0;
    isLoading = true;
    defaultSuccessSaveMessage = 'DEFAULT_SUCCESS_SAVE_MESSAGE';
    defaultErrorSaveMessage: string;
    defaultSuccessDeleteMessage = 'DEFAULT_SUCCESS_DELETE_MESSAGE';
    defaultErrorLoadObjectMessage: string;

    @ViewChild('formElement', { static: false }) formElement: NgForm;

    constructor(
        public router?: Router,
        public activatedRoute?: ActivatedRoute,
        public coreService?: AbstractCoreService,
        public translateService?: TranslateService,
        public html5StorageService?: AbstractHtml5StorageService,
        public messageService?: AbstractMessageService,
    ) {

        if (this.shouldUpdateObjectFromRouterData() && this.router) {
            const navigation: Navigation = this.router.getCurrentNavigation();
            if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state.dataObject) {
                this.object = navigation.extras.state.dataObject;
            }
        }
        this.waitForInit();
        if (this.getInitialForm()) this.form = this.getInitialForm();
        this.initParamMapIdSubscription();

    }

    abstract initMainObject(): T;
    abstract handleQueryParams(params: T);

    ngOnInit() {

        this.isInitCalled = true;
        this.initializeBase();

    }

    getInitialForm(): FormGroup {

        return null;

    }

    shouldUpdateObjectFromRouterData(): boolean {

        return true;

    }

    shouldUpdateDefaultFormFromParams(): boolean {

        return true;

    }

    shouldUpdateObjectFromParamMapId(): boolean {

        return false;

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

        if (!this.activatedRoute) {
            this.activatedRoute = this.getInjectedResource<ActivatedRoute>(staticInjector, ActivatedRoute);
        }
        if (!this.coreService) {
            this.coreService =
                this.getInjectedResource<AbstractCoreService>(staticInjector, AbstractCoreService as Type<AbstractCoreService>);
        }
        if (!this.router) {
            this.router = this.getInjectedResource<Router>(staticInjector, Router);
        }
        if (!this.translateService) {
            this.translateService = this.getInjectedResource<TranslateService>(staticInjector, TranslateService);
        }
        if (!this.html5StorageService) {
            this.html5StorageService = this.getInjectedResource<AbstractHtml5StorageService>
            (staticInjector, AbstractHtml5StorageService as Type<AbstractHtml5StorageService>);
        }
        if (!this.messageService) {
            this.messageService = this.getInjectedResource<AbstractMessageService>
            (staticInjector, AbstractMessageService as Type<AbstractMessageService>);
        }

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
            debounceTime(200),
            concatMap((params: Params) => {
                this.object = this.object ? this.object : this.initMainObject();
                return of(params);
            }),
            concatMap((params: Params) => {
                if (this.object && this.object instanceof Thing) this.object.updatePropertiesFromParams(params);
                else {
                    console.warn('main object is not defined or is not a instance of Thing.', this.constructor.name);
                }
                if (this.shouldUpdateDefaultFormFromParams()) {
                    this.updateFormFromParams(this.form, params);
                } else {
                    this.updateTotalControlsFilled();
                }
                return of(params);
            }),
        )
        .subscribe((params: Params) => {

            this.handleQueryParams(params as T);
            this.initFormChangesSubscription();

        });
        this.addSubscription(subscription);

    }

    initParamMapIdSubscription() {

        if (!this.activatedRoute) return;

        const s: Subscription = this.activatedRoute.paramMap
        .pipe(
            map((paramsAsMap: ParamMap) => paramsAsMap.get('id')),
            delay(200),
            filter((id: string) => {
                if (!this.shouldUpdateObjectFromParamMapId()) return true;
                if (id === null || id === undefined) {
                    this.reset();
                    return false;
                }
                return true;
            }),
            concatMap((id: string) => {
                if (this.shouldUpdateObjectFromParamMapId()) {
                    if (this.object && (this.object as any)._id) return of(this.object);
                    return this.defaultFindOneObject(id);
                } else return of(null);
            }),
        ).subscribe((object: T) => {

            if (!object) return;
            setTimeout(() => {
                this.isLoading = false;
                this.object = object;
                this.updateFormFromObject<T>(this.form, object);
                this.successDefaultObjectLoaded(object);
            }, 100);

        }, () => {
            this.messageService.error(this.defaultErrorLoadObjectMessage);
            this.changeRoute('');
        });
        this.addSubscription(s);

    }

    defaultFindOneObject(id: string): Observable<T> {

        console.error('defaultFindOneObject not implemented yet.');
        throw new Error('defaultFindOneObject not implemented yet.');

    }

    successDefaultObjectLoaded(object: T) {}

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

    changeRoute(urlSuffix: string) {

        const relativeUrl = `../${urlSuffix}`;
        const url: string = this.router.createUrlTree([relativeUrl], {relativeTo: this.activatedRoute}).toString();
        this.router.navigate([url], { state: { dataObject: this.object }});

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

    reset() {

        setTimeout(() => {
            this.isLoading = false;
        }, 10);
        if (this.object) {
            this.resetForm();
            this.object = undefined;
        }

    }

    resetForm() {

        this.formElement.resetForm();
        const formGroup: FormGroup = this.getInitialForm();
        if (formGroup) {
            Object.keys(formGroup.controls).forEach((controlName: string) => {
                this.form.get(controlName).setValue(formGroup.get(controlName).value);
            });
        }
    }

    onDefaultSubmitSaveObject() {

        if (this.form.invalid) return;

        this.isLoading = true;
        this.object = Object.assign(this.object || {}, this.form.getRawValue());

        const s: Subscription = this.defaultSaveObject(this.object)
        .subscribe((o: T) => {

            this.onSuccessSaveObject();
            this.object = o;
            this.changeRoute((o as any)._id);

        }, () => {
            this.isLoading = false;
            this.onErrorSaveObject();
        });
        this.addSubscription(s);

    }

    defaultSaveObject(object: T): Observable<T> {

        this.isLoading = false;
        console.error('defaultSaveObject not implemented yet.');
        throw new Error('defaultSaveObject not implemented yet.');

    }

    onSuccessSaveObject() {

        this.messageService.success(this.defaultSuccessSaveMessage);

    }

    onErrorSaveObject() {

        this.messageService.error(this.defaultErrorSaveMessage);

    }

    defaultConfirmAndDeleteObjec() {

        if (!this.object || !(this.object as any)._id) return;

        const s: Subscription = this.showDefaultConfirmDeleteDialog()
        .pipe(
            first(),
            filter((result: boolean) => result === true),
            concatMap(() => {
                this.isLoading = true;
                return this.defaultDeleteObject();
            }),
        )
        .subscribe(() => {

            this.messageService.success(this.defaultSuccessDeleteMessage);
            this.router.navigate(
                ['../'],
                { relativeTo: this.activatedRoute, queryParams: { skip: 0 }, queryParamsHandling: 'merge' },
            );

        }, () => {
            this.isLoading = false;
            this.messageService.error(this.defaultErrorSaveMessage);
        });
        this.subscription.add(s);

    }

    defaultDeleteObject(): Observable<void> {

        console.error('defaultDeleteObject not implemented yet.');
        throw new Error('defaultDeleteObject not implemented yet.');

    }

    showDefaultConfirmDeleteDialog(): Observable<boolean> {

        console.error('showDefaultConfirmDialog not implemented yet.');
        throw new Error('showDefaultConfirmDialog not implemented yet.');

    }

    ngOnDestroy() {

        if (this.subscription) this.subscription.unsubscribe();

    }

}
