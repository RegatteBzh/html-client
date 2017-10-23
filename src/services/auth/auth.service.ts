import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  setToken(token: string) {
    sessionStorage.setItem('authorization', token || '');
  }

  getToken(): string {
    return sessionStorage.getItem('authorization') || '';
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  authGoogleCheckout(res: any): Observable<AuthCheckout> {
    return this.http.post<AuthCheckout>(`/api/auth/google/checkout`, res)
  }

}

export class AuthCheckout {
  token: string;
}
