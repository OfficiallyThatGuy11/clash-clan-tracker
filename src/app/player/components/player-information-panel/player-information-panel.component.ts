import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Player } from '../../models/player.model';
import { Router } from '@angular/router';

@Component({
  selector: 'player-information-panel',
  templateUrl: './player-information-panel.component.html',
  styleUrls: ['./player-information-panel.component.scss'],
})
export class PlayerInformationPanelComponent implements OnInit, OnChanges {
  @Input() player: Player;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.player.previousValue !== changes.player.currentValue) {
    }
  }

  navigateToClan(clanTag: string): void {
    this.router.navigateByUrl(`clan/${clanTag}`);
  }
}
