import { Component, OnInit } from '@angular/core';
import { ClanService } from 'src/app/clan/services/clan.service';

@Component({
	selector: 'clan-overview-layout',
	templateUrl: './clan-overview-layout.component.html',
	styleUrls: [ './clan-overview-layout.component.scss' ]
})
export class ClanOverviewLayoutComponent implements OnInit {
	clan: Clan;

	constructor(private clanService: ClanService) {
		clanService.getClanDetail('8YV88CG0').subscribe(
			(res) => {
				this.clan = res;
			},
			(err) => {
				console.log(err);
			}
		);
	}

	ngOnInit() {}
}
