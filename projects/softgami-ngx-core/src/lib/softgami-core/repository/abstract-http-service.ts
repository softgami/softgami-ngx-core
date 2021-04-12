import { catchError, finalize, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { ErrorResponse } from './error/error-response.interface';
import { ErrorResponseFactory } from './error/error-response-factory';

export abstract class AbstractHttpService {

    constructor(private readonly httpClient: HttpClient) { }

    get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T | null> {

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

                    return res && res instanceof HttpResponse ? res.body : res;

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

    post<I, O>(url: string, body: I, params?: HttpParams, headers?: HttpHeaders): Observable<O | null> {

        return this.httpClient.post<O>(url, body, { observe: 'response', params, headers })
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

                    return res && res instanceof HttpResponse ? res.body : res;

                }),
                catchError((error: HttpErrorResponse) => {

                    return throwError(this.handleError(error));

                }),
            );

    }

    put<I, O>(url: string, body: I, params?: HttpParams, headers?: HttpHeaders): Observable<O | null> {

        return this.httpClient.put<O>(url, body, { observe: 'response', params, headers })
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

                    return res && res instanceof HttpResponse ? res.body : res;

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

}
