import { TestBed } from '@angular/core/testing';

import { PagamentiServiceService } from './pagamenti-service.service';

describe('PagamentiServiceService', () => {
  let service: PagamentiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagamentiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
