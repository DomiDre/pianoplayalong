import { TestBed } from '@angular/core/testing';

import { KeyboardListenerService } from './keyboard-listener.service';

describe('KeyboardListenerService', () => {
  let service: KeyboardListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
