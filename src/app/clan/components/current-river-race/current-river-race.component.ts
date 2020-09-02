import { Component, OnInit, Input } from '@angular/core';
import { RiverRaceService } from '../../services/river-race.service';
import { CurrentRiverRace } from '../../models/current-river-race.model';
import { fadeExpandHeight } from 'src/app/animations/fadeExpandHeight.animation';
import { Router } from '@angular/router';

@Component({
  selector: 'clan-current-river-race',
  templateUrl: './current-river-race.component.html',
  styleUrls: ['./current-river-race.component.scss'],
  animations: [fadeExpandHeight],
})
export class CurrentRiverRaceComponent implements OnInit {
  @Input() clanTag: string;
  currentRiverRace: CurrentRiverRace;
  expandedClan: string;

  constructor(
    private riverRaceService: RiverRaceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.riverRaceService
      .getCurrentRiverRace(this.clanTag)
      .subscribe((res) => (this.currentRiverRace = res));
  }

  navigateToClan(clanTag: string): void {
    this.router.navigateByUrl(`clan/${clanTag}`);
  }

  collapseClan(clanTag: string): void {
    this.expandedClan = undefined;
    document
      .getElementById(`current-race-clan-row-${clanTag}`)
      .scrollIntoView({ behavior: 'smooth' });
  }
}
