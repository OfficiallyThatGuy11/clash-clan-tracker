import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedScatterChartComponent } from './shared-scatter-chart.component';

describe('SharedScatterChartComponent', () => {
  let component: SharedScatterChartComponent;
  let fixture: ComponentFixture<SharedScatterChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedScatterChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedScatterChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
