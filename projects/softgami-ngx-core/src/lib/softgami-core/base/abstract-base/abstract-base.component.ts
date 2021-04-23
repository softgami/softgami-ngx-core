/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivatedRoute, Navigation, ParamMap, Params, Router } from '@angular/router';
import { Component, Injector, OnDestroy, OnInit, StaticProvider, Type, ViewChild } from '@angular/core';
import { concatMap, debounceTime, delay, distinctUntilChanged, filter, first, map } from 'rxjs/operators';
import { FormGroup, NgForm } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { Thing } from 'softgami-ts-core';
import { TranslateService } from '@ngx-translate/core';

import { AbstractCoreService } from '../../services/abstract-core.service';
import { AbstractHtml5StorageService } from '../../../html5-storage/abstract-html5-storage.service';
import { AbstractMessageService } from '../../services/abstract-message.service';
import { ComponentState } from './component-state.enum';

@Component({
    template: '',
})
export abstract class AbstractBaseComponent<T extends Thing> implements OnDestroy, OnInit {

    static providers: StaticProvider[] = [];
    static injector: Injector | null = null;
    subscription: Subscription = new Subscription();
    object: T | null = null;
    isInitCalled = false;
    form: FormGroup = new FormGroup({});
    totalControlsFilled = 0;
    defaultSuccessSaveMessage = 'DEFAULT_SUCCESS_SAVE_MESSAGE';
    defaultErrorSaveMessage = '';
    defaultSuccessDeleteMessage = 'DEFAULT_SUCCESS_DELETE_MESSAGE';
    defaultErrorLoadObjectMessage = '';
    componentState: ComponentState = ComponentState.SUCCESS;
    paramMapId: string | null = null;
    readonly ComponentStateEnum = ComponentState;

    @ViewChild('formElement', { static: false }) formElement: NgForm | null = null;

    constructor(
        public router?: Router,
        public activatedRoute?: ActivatedRoute,
        public coreService?: AbstractCoreService,
        public translateService?: TranslateService,
        public html5StorageService?: AbstractHtml5StorageService,
        public messageService?: AbstractMessageService,
    ) {

        if (this.shouldUpdateObjectFromRouterData() && this.router) {

            const navigation: Navigation | null = this.router.getCurrentNavigation();
            if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state.dataObject) {

                this.object = navigation.extras.state.dataObject;

            }

        }
        this.waitForInit();
        const initialForm: FormGroup | null = this.getInitialForm();
        if (initialForm !== null) {

            this.form = initialForm;

        }
        this.initParamMapIdSubscription();

    }

    abstract initMainObject(): T;
    abstract handleQueryParams(params: T): void;
    abstract getParamId(): string;

    ngOnInit(): void {

        this.isInitCalled = true;
        this.initializeBase();

    }

    getInitialForm(): FormGroup | null {

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

    waitForInit(): void {

        setTimeout(() => {

            if (this.isInitCalled !== true) {

                throw new Error(
                    this.constructor.name + ': ngOnInit must be called on child class if child class invoke own ngOnInit method.');

            }

        }, 1000);

    }

    initializeBase(): void {

        this.initProviders();
        this.initQueryParamsSubscription();

    }

    initProviders(): void {

        if (!AbstractBaseComponent.injector) {

            throw new Error(
                'AbstractBaseComponent.injector not defined. Should Call SoftgamiCoreModule.setInjector(injector: Injector)' +
                    'on AppModule initialization.',
            );

        }

        let staticInjector: Injector;
        if (AbstractBaseComponent.providers) {

            staticInjector = Injector.create({
                providers: AbstractBaseComponent.providers,
            });
            this.setInjectedResources(staticInjector);

        }

    }

    setInjectedResources(staticInjector: Injector): void {

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

            this.html5StorageService =
                this.getInjectedResource<AbstractHtml5StorageService>(staticInjector, AbstractHtml5StorageService as Type<AbstractHtml5StorageService>);

        }
        if (!this.messageService) {

            this.messageService =
                this.getInjectedResource<AbstractMessageService>(staticInjector, AbstractMessageService as Type<AbstractMessageService>);

        }

    }

    getInjectedResource<I>(staticInjector: Injector, type: Type<I>): I | undefined {

        try {

            return staticInjector.get<I>(type) as I;

        } catch (ex) {

            if (AbstractBaseComponent.injector) return AbstractBaseComponent.injector.get<I>(type) as I;
            return undefined;

        }

    }

    initQueryParamsSubscription(): void {

        if (!this.activatedRoute) {

            return;

        }

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
            ).subscribe((params: Params) => {

                this.handleQueryParams(params as T);
                this.initFormChangesSubscription();

            });
        this.addSubscription(subscription);

    }

    initParamMapIdSubscription(): void {

        if (!this.activatedRoute) return;

        const s: Subscription = this.activatedRoute.paramMap
            .pipe(
                map((paramsAsMap: ParamMap) => paramsAsMap.get('id')),
                delay(200),
                filter((id: string | null) => {

                    this.paramMapId = id;
                    if (!this.shouldUpdateObjectFromParamMapId()) return true;
                    if (id === null || id === undefined) {

                        this.reset();
                        return false;

                    }
                    return true;

                }),
                concatMap((id: string | null) => {

                    if (this.shouldUpdateObjectFromParamMapId()) {

                        if (this.object && this.getParamId()) return of(this.object);
                        else {

                            setTimeout(() => {

                                this.componentState = ComponentState.LOADING;

                            }, 0);
                            if (id) return this.defaultFindOneObject(id);
                            else return of(null);

                        }

                    } else return of(null);

                }),
            ).subscribe((object: T | null) => {

                if (!object) return;
                setTimeout(() => {

                    this.componentState = ComponentState.SUCCESS;
                    this.object = object;
                    if (this.form) this.updateFormFromObject<T>(this.form, object);
                    this.successDefaultObjectLoaded(object);

                }, 100);

            }, () => {

                if (this.messageService) this.messageService.error(this.defaultErrorLoadObjectMessage);
                this.changeRoute('');

            });
        this.addSubscription(s);

    }

    defaultFindOneObject(id: string): Observable<T> {

        console.error('defaultFindOneObject not implemented yet.');
        throw new Error('defaultFindOneObject not implemented yet.');

    }

    successDefaultObjectLoaded(object: T): void | null {

        return null;

    }

    initFormChangesSubscription(): void {

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

    updateFormFromThing(form: FormGroup, thing: T): void {

        if (!form || !thing) return;

        Object.getOwnPropertyNames(thing).forEach((property: string) => {

            if (form.controls[property] && form.controls[property].value !== (thing as any)[property]) {

                form.controls[property].setValue((thing as any)[property]);

            }

        });
        this.updateTotalControlsFilled();

    }

    updateFormFromParams(form: FormGroup | null, params: Params): void {

        if (!form || !params) return;

        Object.getOwnPropertyNames(form.controls).forEach((control: string) => {

            form.controls[control].setValue(params[control] ? params[control] : null);

        });
        this.updateTotalControlsFilled();

    }

    updateFormFromObject<O>(form: FormGroup, object: O): void {

        if (!form || !object) return;

        Object.getOwnPropertyNames(form.controls).forEach((control: string) => {

            form.controls[control].setValue(((object as any)[control] !== null && (object as any)[control] !== undefined) ? (object as any)[control] : null);

        });
        this.updateTotalControlsFilled();

    }

    changeRoute(urlSuffix: string): void {

        if (!this.router) return;
        const relativeUrl = `../${urlSuffix}`;
        const url: string = this.router.createUrlTree([ relativeUrl ], { relativeTo: this.activatedRoute }).toString();
        this.router.navigate([ url ], { state: { dataObject: this.object } });

    }

    updateRoute(queryParams: Params, activatedRoute?: ActivatedRoute, commands?: unknown[], queryParamsHandling?: 'merge' | 'preserve' | ''): void {

        if (!this.router) return;
        let url: string = this.router.createUrlTree([]).toString();
        if (activatedRoute && commands) {

            url = this.router.createUrlTree(commands, { relativeTo: activatedRoute }).toString();

        }
        if (queryParamsHandling === null || queryParamsHandling === undefined) {

            queryParamsHandling = 'merge';

        }
        queryParams = this.cleanParams(queryParams);
        this.router.navigate([ url ], { queryParams, queryParamsHandling });

    }

    updateTotalControlsFilled(): void {

        if (!this.form) return;

        this.totalControlsFilled = Object.keys(this.form.controls)
            .filter((key: string) => {

                const control = this.form ? this.form.controls[key] : null;
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

    addSubscription(subscrition: Subscription): void {

        this.subscription ? this.subscription.add(subscrition) : this.subscription = subscrition;

    }

    cleanSubscriptions(): void {

        if (this.subscription) this.subscription.unsubscribe();

    }

    reset(): void {

        setTimeout(() => {

            this.componentState = ComponentState.SUCCESS;

        }, 10);
        if (this.object) {

            this.resetForm();
            this.object = null;

        }

    }

    resetForm(): void {

        if (this.formElement) this.formElement.resetForm();
        const initialFormGroup: FormGroup | null = this.getInitialForm();
        if (initialFormGroup && initialFormGroup.controls) {

            Object.keys(initialFormGroup.controls).forEach((controlName: string) => {

                if (this.form) {

                    const initialControl = initialFormGroup.get(controlName);
                    const control = this.form.get(controlName);
                    if (initialControl && control) {

                        control.setValue(initialControl.value);

                    }

                }

            });

        }

    }

    onDefaultSubmitSaveObject(): void {

        if (!this.form || this.form.invalid) return;

        this.componentState = ComponentState.LOADING;
        this.object = Object.assign(this.object || {}, this.form.getRawValue());

        if (this.object) {

            const s: Subscription = this.defaultSaveObject(this.object)
                .subscribe((o: T) => {

                    this.componentState = ComponentState.SUCCESS;
                    this.object = o;
                    this.onSuccessSaveObject();
                    this.changeRoute(this.getParamId());

                }, () => {

                    this.componentState = ComponentState.ERROR;
                    this.onErrorSaveObject();

                });
            this.addSubscription(s);

        }

    }

    defaultSaveObject(object: T): Observable<T> {

        this.componentState = ComponentState.ERROR;
        console.error('defaultSaveObject not implemented yet.');
        throw new Error('defaultSaveObject not implemented yet.');

    }

    onSuccessSaveObject(): void {

        if (this.messageService) this.messageService.success(this.defaultSuccessSaveMessage);

    }

    onErrorSaveObject(): void {

        if (this.messageService) this.messageService.error(this.defaultErrorSaveMessage);

    }

    defaultConfirmAndDeleteObject(): void {

        if (!this.object || !this.getParamId()) return;

        const s: Subscription = this.showDefaultConfirmDeleteDialog()
            .pipe(
                first(),
                filter((result: boolean) => result === true),
                concatMap(() => {

                    this.componentState = ComponentState.LOADING;
                    return this.defaultDeleteObject();

                }),
            )
            .subscribe(() => {

                if (this.messageService) this.messageService.success(this.defaultSuccessDeleteMessage);
                if (this.router) {

                    this.router.navigate(
                        [ '../' ],
                        { relativeTo: this.activatedRoute, queryParams: { skip: 0 }, queryParamsHandling: 'merge' },
                    );

                }

            }, () => {

                this.componentState = ComponentState.ERROR;
                if (this.messageService) this.messageService.error(this.defaultErrorSaveMessage);

            });
        this.subscription.add(s);

    }

    defaultDeleteObject(): Observable<void> {

        console.error('defaultDeleteObject not implemented yet.');
        throw new Error('defaultDeleteObject not implemented yet.');

    }

    showDefaultConfirmDeleteDialog(): Observable<boolean> {

        console.error('showDefaultConfirmDeleteDialog not implemented yet.');
        throw new Error('showDefaultConfirmDeleteDialog not implemented yet.');

    }

    ngOnDestroy(): void {

        if (this.subscription) this.subscription.unsubscribe();

    }

}
