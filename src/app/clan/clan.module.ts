import { NgModule } from '@angular/core';
import { ClanInformationPanelComponent } from './components/clan-information-panel/clan-information-panel.component';
import { ClanMemberListTableComponent } from './components/clan-member-list-table/clan-member-list-table.component';
import { SharedModule } from '../shared/shared.module';
import { ClanService } from './services/clan.service';
import { ClanOverviewComponent } from './components/clan-overview/clan-overview.component';
import { ClanTrophiesChartComponent } from './components/clan-trophies-chart/clan-trophies-chart.component';
import { RiverRaceService } from './services/river-race.service';
import { CurrentRiverRaceComponent } from './components/current-river-race/current-river-race.component';
import { CurrentRiverRaceParticipantsListComponent } from './components/current-river-race-participants-list/current-river-race-participants-list.component';
import { ClanMemberTopLevelInfoComponent } from './components/clan-member-top-level-info/clan-member-top-level-info.component';
import { CurrentRiverRaceClanItemComponent } from './components/current-river-race-clan-item/current-river-race-clan-item.component';

@NgModule({
  declarations: [
    ClanOverviewComponent,
    ClanInformationPanelComponent,
    ClanMemberListTableComponent,
    ClanTrophiesChartComponent,
    CurrentRiverRaceComponent,
    CurrentRiverRaceParticipantsListComponent,
    ClanMemberTopLevelInfoComponent,
    CurrentRiverRaceClanItemComponent,
  ],
  entryComponents: [CurrentRiverRaceClanItemComponent],
  imports: [SharedModule],
  exports: [ClanOverviewComponent],
  providers: [ClanService, RiverRaceService],
})
export class ClanModule {}
