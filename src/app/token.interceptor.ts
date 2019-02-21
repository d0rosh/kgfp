import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServices } from './core/auth/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthServices){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(this.auth.isAuthenticated()){
            if(req.url.indexOf('omdbapi') == -1  && req.url.indexOf('postcodes') == -1){
                req = req.clone({
                    setHeaders: {
                        Authorization: this.auth.getToken()
                    }
                });
            }
        }
        return next.handle(req);
    }
}