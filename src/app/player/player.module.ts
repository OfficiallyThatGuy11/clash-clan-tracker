import { NgModule } from '@angular/core';
import { PlayerOverviewComponent } from './components/player-overview/player-overview.component';
import { PlayerAcheivementsComponent } from './components/player-acheivements/player-acheivements.component';
import { PlayerInformationPanelComponent } from './components/player-information-panel/player-information-panel.component';
import { SharedModule } from '../shared/shared.module';
import { PlayerDeckComponent } from './components/player-deck/player-deck.component';

@NgModule({
  declarations: [
    PlayerOverviewComponent,
    PlayerAcheivementsComponent,
    PlayerInformationPanelComponent,
    PlayerDeckComponent,
  ],
  imports: [SharedModule],
})
export class PlayerModule {}
