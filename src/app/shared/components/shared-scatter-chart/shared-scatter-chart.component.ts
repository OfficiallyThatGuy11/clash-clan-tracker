import { OnInit, Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'shared-scatter-chart',
  templateUrl: './shared-scatter-chart.component.html',
  styleUrls: ['./shared-scatter-chart.component.scss'],
})
export class SharedScatterChartComponent implements OnInit {
  @Input() scatterChartData: ChartDataSets[];
  @Input() scatterChartOptions: ChartOptions = {
    responsive: true,
  };
  @Input() scatterChartLegend = false;

  scatterChartType: ChartType = 'scatter';

  constructor() {}

  ngOnInit() {}
}
