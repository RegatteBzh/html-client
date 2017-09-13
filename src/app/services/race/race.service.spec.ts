import { TestBed, inject } from '@angular/core/testing';

import { RaceService } from './race.service';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceService]
    });
  });

  it('should be created', inject([RaceService], (service: RaceService) => {
    expect(service).toBeTruthy();
  }));
});