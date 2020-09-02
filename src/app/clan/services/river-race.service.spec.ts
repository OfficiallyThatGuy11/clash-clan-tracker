import { TestBed } from '@angular/core/testing';

import { RiverRaceService } from './river-race.service';

describe('RiverRaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RiverRaceService = TestBed.get(RiverRaceService);
    expect(service).toBeTruthy();
  });
});
