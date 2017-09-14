import { TestBed, inject } from '@angular/core/testing';

import { SkipperService } from './skipper.service';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SkipperService]
    });
  });

  it('should be created', inject([SkipperService], (service: SkipperService) => {
    expect(service).toBeTruthy();
  }));
});
