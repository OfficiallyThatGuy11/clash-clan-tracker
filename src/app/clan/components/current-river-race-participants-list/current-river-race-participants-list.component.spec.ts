import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRiverRaceParticipantsListComponent } from './current-river-race-participants-list.component';

describe('CurrentRiverRaceParticipantsListComponent', () => {
  let component: CurrentRiverRaceParticipantsListComponent;
  let fixture: ComponentFixture<CurrentRiverRaceParticipantsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRiverRaceParticipantsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRiverRaceParticipantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
