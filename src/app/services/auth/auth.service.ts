import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  setToken(token: string) {
    sessionStorage.setItem('authorization', token || '');
  }

  getToken(): string {
    return sessionStorage.getItem('authorization') || '';
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

}
