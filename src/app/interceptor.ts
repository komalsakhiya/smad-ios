import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { ToastService } from './service/toast.service';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
    accessToken;
    constructor(public route: Router, public _toastService: ToastService, private loaderService: LoaderService) {
        this.accessToken = localStorage.getItem('accessToken');
    }
    // function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.loaderService.displayLoader(true);
        // how to update the request Parameters
        // if (this.accessToken) {

        // request = request.clone({
        //     headers: request.headers.set("Content-Type",
        //         'application/json')
        // });

        // logging the updated Parameters to browser's console
        return next.handle(request).pipe(
            map((event: HttpResponse<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body) {
                        this.loaderService.displayLoader(false);
                    }
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                this.loaderService.displayLoader(false);
                const errorMessage = error.error;
                if (error.status === 401) {
                    this._toastService.presentToast(errorMessage);
                    // localStorage.removeItem('accessToken');
                    // localStorage.removeItem('currentUser');
                    this.route.navigate(['/auth/login']);
                }
                return throwError(error);
            })
        );
    }
}


