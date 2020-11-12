import { TestBed } from '@angular/core/testing';

import { DelegateServiceService } from './delegate-service.service';

describe('DelegateServiceService', () => {
  let service: DelegateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelegateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
