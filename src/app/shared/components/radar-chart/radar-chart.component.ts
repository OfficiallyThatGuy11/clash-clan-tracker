import { Component, OnInit, Input } from '@angular/core';
import { ChartType, RadialChartOptions, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'shared-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
})
export class RadarChartComponent implements OnInit {
  @Input() radarChartLabels: Label[];
  @Input() radarChartData: ChartDataSets[];
  @Input() radarChartOptions: RadialChartOptions = {
    responsive: true,
  };

  radarChartType: ChartType = 'radar';

  constructor() {}

  ngOnInit() {}
}
