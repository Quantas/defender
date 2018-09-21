import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InfoService } from './info/info.service';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private infoService: InfoService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const header = event.headers.get('x-defender-host');
        if (header && header !== '') {
          this.infoService.publishInfoEvent({hostname: header});
        }
      }
    }));
  }

}
