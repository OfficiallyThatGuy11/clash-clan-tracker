import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-player-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss'],
})
export class PlayerOverviewComponent implements OnInit {
  player: Player;

  constructor(
    private activatedRoute: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const tag = params.get('tag');
      if (tag) {
        if (this.player) {
          this.player = undefined;
          this.changeDetector.detectChanges();
        }
        this.playerService.getPlayer(tag).subscribe((res) => {
          this.player = res;
        });
      }
    });
  }
}
