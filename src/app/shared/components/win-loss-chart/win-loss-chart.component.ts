import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-win-loss-chart',
  templateUrl: './win-loss-chart.component.html',
  styleUrls: ['./win-loss-chart.component.scss']
})
export class WinLossChartComponent implements OnInit {
  @Input() wins: number;
  @Input() losses: number;
  @Input() totalBattles: number;
  @Input() showKey = false;

  constructor() { }

  ngOnInit() {
  }

}
