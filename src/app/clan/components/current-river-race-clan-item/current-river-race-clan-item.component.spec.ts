import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentRiverRaceClanItemComponent } from './current-river-race-clan-item.component';

describe('CurrentRiverRaceClanItemComponent', () => {
  let component: CurrentRiverRaceClanItemComponent;
  let fixture: ComponentFixture<CurrentRiverRaceClanItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentRiverRaceClanItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentRiverRaceClanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
