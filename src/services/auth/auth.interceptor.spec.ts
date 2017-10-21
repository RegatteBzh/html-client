import { TestBed, inject } from '@angular/core/testing';
import {} from 'jasmine';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });
  });

  it('should be created', inject([AuthInterceptor], (service: AuthInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
