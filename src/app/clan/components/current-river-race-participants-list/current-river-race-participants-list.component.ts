import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { RiverRaceClan } from '../../models/river-race-clan.model';
import { Router } from '@angular/router';
import { ClanService } from '../../services/clan.service';
import { Subscription } from 'rxjs';
import { fadeExpandHeight } from 'src/app/animations/fadeExpandHeight.animation';

@Component({
  selector: 'current-river-race-participants-list',
  templateUrl: './current-river-race-participants-list.component.html',
  styleUrls: ['./current-river-race-participants-list.component.scss'],
  animations: [fadeExpandHeight],
})
export class CurrentRiverRaceParticipantsListComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() clan: RiverRaceClan;
  expandedPlayerTag: string;
  clanMembersIndexedByTag: Array<ClanMember>;
  clanDetail: Clan;

  clanMembersSubscription: Subscription;

  constructor(private router: Router, private clanService: ClanService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const clanChange = changes.clan;
    if (clanChange && clanChange.currentValue !== clanChange.previousValue) {
      this.getClan();
    }
  }

  ngOnDestroy(): void {
    if (this.clanMembersSubscription && !this.clanMembersSubscription.closed) {
      this.clanMembersSubscription.unsubscribe();
    }
  }

  navigateToPlayer(playerTag: string): void {
    this.router.navigateByUrl(`player/${playerTag}`);
  }

  getClan(): void {
    this.clanMembersSubscription = this.clanService
      .getClan(this.clan.tag)
      .subscribe((res) => {
        const memberListIndexedByTag = [];
        this.clanDetail = res;
        res.memberList.forEach(
          (member) => (memberListIndexedByTag[member.tag] = member)
        );
        this.clanMembersIndexedByTag = memberListIndexedByTag;
      });
  }

  toggleExpandedPlayer(playerTag: string): void {
    if (this.expandedPlayerTag !== playerTag) {
      this.expandedPlayerTag = playerTag;
    } else {
      this.expandedPlayerTag = undefined;
    }
  }
}
