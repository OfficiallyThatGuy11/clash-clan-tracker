import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'shared-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @Input() loadingMessage: string;
  @Input() data: ChartDataSets[];
  @Input() chartLabels: string[];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: object[] /*Color[]*/ = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
  ];

  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor() {}

  ngOnInit() {
    console.log('s');
  }

  ngAfterViewInit(): void {
    // this.calculateChartSize();
  }

  // calculateChartSize() {
  //   this.view = [this.chartsContainerElement.nativeElement.clientWidth, 400];
  // }
}
