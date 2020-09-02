import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClanMemberTopLevelInfoComponent } from './clan-member-top-level-info.component';

describe('ClanMemberTopLevelInfoComponent', () => {
  let component: ClanMemberTopLevelInfoComponent;
  let fixture: ComponentFixture<ClanMemberTopLevelInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClanMemberTopLevelInfoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanMemberTopLevelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
