import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRiverRaceComponent } from './current-river-race.component';

describe('CurrentRiverRaceComponent', () => {
  let component: CurrentRiverRaceComponent;
  let fixture: ComponentFixture<CurrentRiverRaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRiverRaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRiverRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
