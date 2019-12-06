import { catchError, finalize, map, tap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { ErrorResponse } from './error/error-response.interface';
import { ErrorResponseFactory } from './error/error-response-factory';

export abstract class AbstractHttpService {

    constructor(private readonly httpClient: HttpClient) { }

    get<T>(url: string, params?: HttpParams, headers?: HttpHeaders): Observable<T> {

        return this.httpClient.get(url, { params, observe: 'response', headers })
        .pipe(
            tap((res: HttpResponse<T>) => {
                this.onSuccess(res);
            }, (error: HttpErrorResponse) => {
                this.onError(error);
            }),
            finalize(() => {
                this.onEnd();
            }),
            map((res: HttpResponse<T>) => {
                return res.body;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(this.handleError(error));
            }),
        );

    }

    post<I, O>(url: string, body: I, params?: HttpParams, headers?: HttpHeaders): Observable<O> {

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
            map((res: HttpResponse<O>) => {
                return res.body;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(this.handleError(error));
            }),
        );

    }

    put<I, O>(url: string, body: I, params?: HttpParams, headers?: HttpHeaders): Observable<O> {

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
            map((res: HttpResponse<O>) => {
                return res.body;
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
                return res.body;
            }),
            catchError((error: HttpErrorResponse) => {
                return throwError(this.handleError(error));
            }),
        );

    }

    onSuccess<T>(response: HttpResponse<T>): void {}

    onError(response: HttpErrorResponse): void { }

    onEnd(): void { }

    handleError(error: HttpErrorResponse): ErrorResponse {

        return ErrorResponseFactory.getErrorResponse(error.status);

    }

}
