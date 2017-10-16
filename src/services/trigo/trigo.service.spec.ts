import { TestBed, inject } from '@angular/core/testing';

import { TrigoService } from './trigo.service';

describe('MapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrigoService]
    });
  });

  it('should be created', inject([TrigoService], (service: TrigoService) => {
    expect(service).toBeTruthy();
  }));
});
