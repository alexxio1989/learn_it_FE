import { TestBed } from '@angular/core/testing';

import { ParagrafoServiceService } from './paragrafo-service.service';

describe('ParagrafoServiceService', () => {
  let service: ParagrafoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParagrafoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
