import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ClanService } from 'src/app/clan/services/clan.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'clan-overview',
  templateUrl: './clan-overview.component.html',
  styleUrls: ['./clan-overview.component.scss'],
})
export class ClanOverviewComponent implements OnInit {
  clan: Clan;
  failedToLoadClanData = false;

  unloadComponents = false;

  constructor(
    private clanService: ClanService,
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const tag = params.get('tag');
      if (tag) {
        if (this.clan) {
          this.clan = undefined;
          this.unloadComponents = true;
          this.changeDetector.detectChanges();
        }
        setTimeout(() => {
          this.unloadComponents = false;
          this.clanService.getClan(tag).subscribe(
            (res) => {
              this.clan = res;
              this.changeDetector.detectChanges();
              this.clanService.addClanToRecentlyVisitedClans(this.clan);
            },
            (err) => {
              this.failedToLoadClanData = true;
            }
          );
        });
      }
    });
  }
}
