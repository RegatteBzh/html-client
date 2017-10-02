import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

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
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isApi = false;
    if (/^\/api\//.test(request.url)) {
      isApi = true;
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.getToken()
        },
        url: request.url.replace(/^\/api\//, `${environment.apiUrl}/api/`)
      });
    }
    if (/^\/assets\//.test(request.url)) {
      isApi = true;
      request = request.clone({
        url: request.url.replace(/^\/assets\//, `${environment.apiUrl}/data/`)
      });
    }
    return next.handle(request).do(event => {}, err => {
      if (isApi && (err.status === 401 || err.status === 403)) {
        this.authService.setToken(null);
        this.router.navigate(['/login']);
      }
    });
  }

}
