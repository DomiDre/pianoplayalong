import { TestBed } from '@angular/core/testing';

import { MusicNotationService } from './music-notation.service';

describe('MusicNotationService', () => {
  let service: MusicNotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicNotationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
