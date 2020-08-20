import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerOverviewComponent } from './components/player-overview/player-overview.component';
import { PlayerAcheivementsComponent } from './components/player-acheivements/player-acheivements.component';

@NgModule({
  declarations: [PlayerOverviewComponent, PlayerAcheivementsComponent],
  imports: [
    CommonModule
  ]
})
export class PlayerModule { }
