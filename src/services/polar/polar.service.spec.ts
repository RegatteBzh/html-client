import { TestBed, inject } from '@angular/core/testing';

import { PolarService } from './polar.service';

describe('RaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolarService]
    });
  });

  it('should be created', inject([PolarService], (service: PolarService) => {
    expect(service).toBeTruthy();
  }));
});
