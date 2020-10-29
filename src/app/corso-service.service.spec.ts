import { TestBed } from '@angular/core/testing';

import { CorsoServiceService } from './corso-service.service';

describe('CorsoServiceService', () => {
  let service: CorsoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorsoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
