import { TestBed, inject } from '@angular/core/testing';

import { StreamService } from './stream.service';

describe('RaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamService]
    });
  });

  it('should be created', inject([StreamService], (service: StreamService) => {
    expect(service).toBeTruthy();
  }));
});
