import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'clan-member-top-level-info',
  templateUrl: './clan-member-top-level-info.component.html',
  styleUrls: ['./clan-member-top-level-info.component.scss'],
})
export class ClanMemberTopLevelInfoComponent implements OnInit, OnChanges {
  @Input() clanMember: ClanMember;

  playerSubscription: Subscription;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.clanMember &&
      changes.clanMember.currentValue !== changes.clanMember.previousValue
    ) {
      if (this.clanMember.role === 'coLeader') {
        this.clanMember.role = 'Co-leader';
      } else {
        this.clanMember.role =
          this.clanMember.role.slice(0, 1).toUpperCase() +
          this.clanMember.role.slice(1);
      }
    }
  }
}
