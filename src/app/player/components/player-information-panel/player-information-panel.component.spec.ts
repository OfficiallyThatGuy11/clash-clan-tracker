import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInformationPanelComponent } from './player-information-panel.component';

describe('PlayerInformationPanelComponent', () => {
  let component: PlayerInformationPanelComponent;
  let fixture: ComponentFixture<PlayerInformationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerInformationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerInformationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
