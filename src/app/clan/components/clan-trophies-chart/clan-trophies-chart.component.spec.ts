import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanTrophiesChartComponent } from './clan-trophies-chart.component';

describe('ClanTrophiesChartComponent', () => {
  let component: ClanTrophiesChartComponent;
  let fixture: ComponentFixture<ClanTrophiesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanTrophiesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanTrophiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
