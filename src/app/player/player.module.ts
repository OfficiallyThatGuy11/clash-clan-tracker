import { NgModule } from '@angular/core';
import { PlayerOverviewComponent } from './components/player-overview/player-overview.component';
import { PlayerAcheivementsComponent } from './components/player-acheivements/player-acheivements.component';
import { PlayerInformationPanelComponent } from './components/player-information-panel/player-information-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PlayerOverviewComponent,
    PlayerAcheivementsComponent,
    PlayerInformationPanelComponent,
  ],
  imports: [SharedModule],
})
export class PlayerModule {}
