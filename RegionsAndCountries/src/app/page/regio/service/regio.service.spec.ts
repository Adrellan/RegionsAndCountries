import { TestBed } from '@angular/core/testing';

import { RegioService } from './regio.service';

describe('RegioService', () => {
  let service: RegioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
