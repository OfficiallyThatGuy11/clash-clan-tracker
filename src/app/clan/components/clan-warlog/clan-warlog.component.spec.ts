import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanWarlogComponent } from './clan-warlog.component';

describe('ClanWarlogComponent', () => {
  let component: ClanWarlogComponent;
  let fixture: ComponentFixture<ClanWarlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanWarlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanWarlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
