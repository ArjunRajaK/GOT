import { TestBed } from '@angular/core/testing';

import { GOTService } from './got.service';

describe('GOTService', () => {
  let service: GOTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GOTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
