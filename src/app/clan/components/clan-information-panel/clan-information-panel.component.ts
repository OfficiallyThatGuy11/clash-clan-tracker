import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
} from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'clan-information-panel',
  templateUrl: './clan-information-panel.component.html',
  styleUrls: ['./clan-information-panel.component.scss'],
})
export class ClanInformationPanelComponent implements OnChanges {
  @Input() clan: Clan;
  reloadingPanels = false;

  trophiesChartData: Array<ChartDataSets>;
  trophiesChartLabels: string[];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.clan.currentValue &&
      changes.clan.previousValue !== changes.clan.currentValue
    ) {
      //     this.clan = changes.clan.currentValue as Clan;
      //     this.warlogService.getClanWarlog(this.clan.tag).subscribe((res) => {
      //       const chartData = new Array<ChartDataSets>();
      //       const trophiesChartData = {
      //         label: 'Trophies',
      //         data: [],
      //       };
      //       const trophiesChartLabels = [];
      //       res.clanWarlogItems.forEach((warlogItem) => {
      //         trophiesChartLabels.push(
      //           warlogItem.createdDateProcessed.toDateString()
      //         );
      //         trophiesChartData.data.push(warlogItem.trophies);
      //       });
      //       chartData.push(trophiesChartData);
      //       this.trophiesChartData = chartData;
      //       this.trophiesChartLabels = trophiesChartLabels;
      //     });
    }
  }
}
