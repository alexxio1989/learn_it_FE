import { TestBed } from '@angular/core/testing';

import { LezioneServiceService } from './lezione-service.service';

describe('LezioneServiceService', () => {
  let service: LezioneServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LezioneServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
