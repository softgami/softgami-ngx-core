import { catchError, finalize, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SoftgamiTsUtilsService, Thing, ValidatorService } from 'softgami-ts-core';

import { ErrorResponse } from './error/error-response.interface';
import { ErrorResponseFactory } from './error/error-response-factory';

export abstract class AbstractHttpService {

    constructor(private readonly httpClient: HttpClient) { }

    get<T, M>(url: string, params?: HttpParams, headers?: HttpHeaders, ClassDefMapping?: new () => M): Observable<T | null> {

        return this.httpClient.get<T>(url, { params, observe: 'response', headers })
            .pipe(
                tap((res: HttpResponse<T> | T) => {

                    this.onSuccess(res);

                }, (error: HttpErrorResponse) => {

                    this.onError(error);

                }),
                finalize(() => {

                    this.onEnd();

                }),
                map((res: HttpResponse<T> | T) => {

                    return this.mapResponse<T, M>(res, ClassDefMapping) as unknown as T;

                }),
                catchError((error: HttpErrorResponse) => {

                    return throwError(this.handleError(error));

                }),
            );

    }

    getBlob(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<Blob | null> {

        return this.httpClient.get(url, { params, observe: 'response', headers, responseType: 'blob' })
            .pipe(
                tap((res: HttpResponse<Blob>) => {

                    this.onSuccess(res);

                }, (error: HttpErrorResponse) => {

                    this.onError(error);

                }),
                finalize(() => {

                    this.onEnd();

                }),
                map((res: HttpResponse<Blob>) => {

                    return res && res instanceof HttpResponse ? res.body : res;

                }),
                catchError((error: HttpErrorResponse) => {

                    return throwError(this.handleError(error));

                }),
            );

    }

    post<I, O>(url: string, body: I, params?: HttpParams, headers?: HttpHeaders, shouldCleanJson = false, ClassDefMapping?: new () => O): Observable<O | null> {

        const parsed: I | undefined = this.cleanJson(body, shouldCleanJson);

        return this.httpClient.post<O>(url, parsed || body, { observe: 'response', params, headers })
            .pipe(
                tap((res: HttpResponse<O>) => {

                    this.onSuccess(res);

                }, (error: HttpErrorResponse) => {

                    this.onError(error);

                }),
                finalize(() => {

                    this.onEnd();

                }),
                map((res: HttpResponse<O> | O) => {

                    return this.mapResponse<O, O>(res, ClassDefMapping);

                }),
                catchError((error: HttpErrorResponse) => {

                    return throwError(this.handleError(error));

                }),
            );

    }

    put<I, O>(url: string, body: I, params?: HttpParams, headers?: HttpHeaders, shouldCleanJson = false, ClassDefMapping?: new () => O): Observable<O | null> {

        const parsed: I | undefined = this.cleanJson(body, shouldCleanJson);

        return this.httpClient.put<O>(url, parsed || body, { observe: 'response', params, headers })
            .pipe(
                tap((res: HttpResponse<O>) => {

                    this.onSuccess(res);

                }, (error: HttpErrorResponse) => {

                    this.onError(error);

                }),
                finalize(() => {

                    this.onEnd();

                }),
                map((res: HttpResponse<O> | O) => {

                    return this.mapResponse<O, O>(res, ClassDefMapping);

                }),
                catchError((error: HttpErrorResponse) => {

                    return throwError(this.handleError(error));

                }),
            );

    }

    delete(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<void> {

        return this.httpClient.delete<void>(url, { observe: 'response', params, headers })
            .pipe(
                tap((res: HttpResponse<void>) => {

                    this.onSuccess(res);

                }, (error: HttpErrorResponse) => {

                    this.onError(error);

                }),
                finalize(() => {

                    this.onEnd();

                }),
                map((res: HttpResponse<void>) => {

                    return res.body as void;

                }),
                catchError((error: HttpErrorResponse) => {

                    return throwError(this.handleError(error));

                }),
            );

    }

    onSuccess<T>(response: HttpResponse<T | Blob> | T): void | null {

        return null;

    }

    onError(response: HttpErrorResponse): void | null {

        return null;

    }

    onEnd(): void | null {

        return null;

    }

    handleError(error: HttpErrorResponse): ErrorResponse {

        return ErrorResponseFactory.getErrorResponse(error.status);

    }

    cleanJson<I>(body: I, shouldCleanJson = false): I | undefined {

        let parsed: I | undefined;
        try {

            if (shouldCleanJson && body instanceof Thing) {

                parsed = ValidatorService
                    .validate<I>(
                        SoftgamiTsUtilsService.convertToCleanJson<I>(body, true),
                        body.constructor as new () => I,
                        undefined,
                        false,
                        false);
                if (parsed) parsed = SoftgamiTsUtilsService.convertToCleanJson<I>(parsed, true);

            }

        } catch (error) {

            console.warn('Could not clean json.', error);

        }

        return parsed;

    }

    mapResponse<I, O>(res: I | HttpResponse<I>, ClassDefMapping?: new () => O): O | null {

        if (res && res instanceof HttpResponse) {

            if (ClassDefMapping && res.body) {

                const object: O = new ClassDefMapping();
                if (object && object instanceof Thing) {

                    if (Array.isArray(res.body)) return res.body.map((o) => object.fromJson(o)) as unknown as O;
                    else return object.fromJson(res.body) as unknown as O;

                } else {

                    if (Array.isArray(res.body)) return res.body.map((o) => Object.assign(new ClassDefMapping(), o)) as unknown as O;
                    else return Object.assign(object, res.body) as unknown as O;

                }

            } else return res.body as unknown as O;

        } else return res as unknown as O;

    }

}
