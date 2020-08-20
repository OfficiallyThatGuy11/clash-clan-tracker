import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClanService } from 'src/app/clan/services/clan.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'clan-overview',
	templateUrl: './clan-overview.component.html',
	styleUrls: [ './clan-overview.component.scss' ]
})
export class ClanOverviewComponent implements OnInit {
	clan: Clan;

	constructor(private clanService: ClanService, private activatedRoute: ActivatedRoute, private changeDetector: ChangeDetectorRef) {
		activatedRoute.paramMap.subscribe(params => {
			const tag = params.get('tag');
			if (tag) {
				if (this.clan) {
					this.clan = undefined;
					changeDetector.detectChanges();
				}
				clanService.getClanDetail(tag).subscribe(
					(res) => {
						this.clan = res;
					}
				);
			}
		});
	}

	ngOnInit() {}
}
