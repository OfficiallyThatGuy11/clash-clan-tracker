import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanCurrentWarComponent } from './clan-current-war.component';

describe('ClanCurrentWarComponent', () => {
  let component: ClanCurrentWarComponent;
  let fixture: ComponentFixture<ClanCurrentWarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanCurrentWarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanCurrentWarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
