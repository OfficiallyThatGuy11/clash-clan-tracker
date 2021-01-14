import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('currentRiverRaceContainer') currentRiverRaceElement: ElementRef;

  constructor(private riverRaceService: RiverRaceService) {}

  ngOnInit() {
    this.riverRaceService
      .getCurrentRiverRace(this.clanTag)
      .subscribe((res) => (this.currentRiverRace = res));
  }

  toggleExpandedClan(clanTag: string): void {
    if (this.expandedClan !== clanTag) {
      this.collapseClan();
      this.expandedClan = clanTag;
    } else {
      this.expandedClan = undefined;
    }
  }

  collapseClan(): void {
    this.expandedClan = undefined;

    const clanListContainerClientRect = this.currentRiverRaceElement.nativeElement.getBoundingClientRect();
    if (clanListContainerClientRect.top < 0) {
      scrollBy(0, clanListContainerClientRect.y - 100);
    }
  }
}
