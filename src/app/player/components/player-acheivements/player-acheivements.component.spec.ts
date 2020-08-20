import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAcheivementsComponent } from './player-acheivements.component';

describe('PlayerAcheivementsComponent', () => {
  let component: PlayerAcheivementsComponent;
  let fixture: ComponentFixture<PlayerAcheivementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerAcheivementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerAcheivementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
