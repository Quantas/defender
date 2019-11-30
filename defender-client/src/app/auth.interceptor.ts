import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { Injector, Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private oidcSecurityService: OidcSecurityService;

    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToForward = req;

        if (this.oidcSecurityService === undefined) {
            this.oidcSecurityService = this.injector.get(OidcSecurityService);
        }
        if (this.oidcSecurityService !== undefined) {
            const token = this.oidcSecurityService.getToken();
            if (token !== '') {
                const tokenValue = 'Bearer ' + token;
                requestToForward = req.clone({ setHeaders: { Authorization: tokenValue } });
            }
        }

        return next.handle(requestToForward);
    }
}
