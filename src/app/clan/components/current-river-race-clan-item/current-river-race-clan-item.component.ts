import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RiverRaceClan } from '../../models/river-race-clan.model';
import { Router } from '@angular/router';

@Component({
  selector: 'current-river-race-clan-item',
  templateUrl: './current-river-race-clan-item.component.html',
  styleUrls: ['./current-river-race-clan-item.component.scss'],
})
export class CurrentRiverRaceClanItemComponent implements OnInit {
  @Input() disableClanNameLink = true;
  @Input() clan: RiverRaceClan;
  @Input() expand = false;
  @Output() setExpandedClanByTag = new EventEmitter();
  @Output() collapseThisClan = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToClan(): void {
    this.router.navigateByUrl(`clan/${this.clan.tag}`);
  }
}
