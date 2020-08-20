import { NgModule } from '@angular/core';
import { ClanMemberListComponent } from './components/clan-member-list/clan-member-list.component';
import { ClanMemberListItemComponent } from './components/clan-member-list-item/clan-member-list-item.component';
import { ClanInformationPanelComponent } from './components/clan-information-panel/clan-information-panel.component';
import { ClanMemberListTableComponent } from './components/clan-member-list-table/clan-member-list-table.component';
import { SharedModule } from '../shared/shared.module';
import { ClanService } from './services/clan.service';
import { WarlogService } from './services/warlog.service';
import { ClanWarlogComponent } from './components/clan-warlog/clan-warlog.component';
import { ClanCurrentWarComponent } from './components/clan-current-war/clan-current-war.component';
import { ClanOverviewComponent } from './components/clan-overview/clan-overview.component';

@NgModule({
	declarations: [
		ClanMemberListComponent,
		ClanMemberListItemComponent,
		ClanOverviewComponent,
		ClanInformationPanelComponent,
		ClanMemberListTableComponent,
		ClanWarlogComponent,
		ClanCurrentWarComponent
	],
	imports: [ SharedModule ],
	exports: [ ClanOverviewComponent ],
	providers: [ ClanService, WarlogService ]
})
export class ClanModule {}
