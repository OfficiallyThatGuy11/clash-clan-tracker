import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanInformationPanelComponent } from './clan-information-panel.component';

describe('ClanInformationPanelComponent', () => {
  let component: ClanInformationPanelComponent;
  let fixture: ComponentFixture<ClanInformationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClanInformationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClanInformationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
