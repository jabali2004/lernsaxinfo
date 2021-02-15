import { TestBed } from '@angular/core/testing';

import { StatusCheckService } from './status-check.service';

describe('StatusCheckService', () => {
  let service: StatusCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
