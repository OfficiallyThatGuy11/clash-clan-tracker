import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanMemberListTableComponent } from './clan-member-list-table.component';

describe('ClanMemberListTableComponent', () => {
  let component: ClanMemberListTableComponent;
  let fixture: ComponentFixture<ClanMemberListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanMemberListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanMemberListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
