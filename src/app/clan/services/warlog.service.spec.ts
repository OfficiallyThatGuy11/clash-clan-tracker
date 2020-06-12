import { TestBed } from '@angular/core/testing';

import { WarlogService } from './warlog.service';

describe('WarlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarlogService = TestBed.get(WarlogService);
    expect(service).toBeTruthy();
  });
});
