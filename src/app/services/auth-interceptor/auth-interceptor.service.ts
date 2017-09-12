import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';

import { Router } from '@angular/router';

import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    public configService: ConfigService,
    public router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isApi = false;
    if (/^\/api\//.test(request.url)) {
      isApi = true;
      request = request.clone({
        setHeaders: {
          Authorization: this.configService.getToken()
        },
        url: request.url.replace(/^\/api\//, `${this.configService.apiUrl()}/api/`)
      });
    }
    return next.handle(request).do(event => {}, err => {
      if (isApi && (err.status === 401 || err.status === 403)) {
        this.configService.setToken(null);
        this.router.navigate(['/login']);
      }
    });
  }

}
