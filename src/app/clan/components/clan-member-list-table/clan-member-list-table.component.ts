import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  ChangeDetectorRef,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { fadeExpandHeight } from 'src/app/animations/fadeExpandHeight.animation';
import { Router } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'clan-member-list-table',
  templateUrl: './clan-member-list-table.component.html',
  styleUrls: ['./clan-member-list-table.component.scss'],
  animations: [fadeExpandHeight],
})
export class ClanMemberListTableComponent
  implements OnInit, OnChanges, OnDestroy {
  @Input() clan: Clan;

  numberOfCoLeaders: number;
  numberOfElders: number;
  numberOfMembers: number;

  lowestTrophies = 0;
  highestTrophies = 0;
  minTrophySelectRange: Array<number>;
  maxTrophySelectRange: Array<number>;

  showFiltersLoadedFromSessionStorage = false;
  filtersLoadedFromSessionStorage: any;
  filtersLoadedFromSessionStorageCountdownValue = 0;
  filtersLoadedFromSessionStorageCountdownInterval: any;

  nameSearchValue = '';
  minTrophiesFilterValue: number;
  maxTrophiesFilterValue: number;
  private _roleFilterValue: 'member' | 'elder' | 'coLeader';
  get roleFilterValue(): 'member' | 'elder' | 'coLeader' {
    return this._roleFilterValue;
  }
  set roleFilterValue(value: 'member' | 'elder' | 'coLeader') {
    this._roleFilterValue = value;
  }

  donationsScatterChartData: ChartDataSets[];

  dataSource: MatTableDataSource<ClanMember>;
  columns = [];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.clan) {
      if (changes.clan.currentValue) {
        this.setupDataSource();
        this.loadFiltersFromSessionStorage();
      } else {
        this.dataSource = undefined;
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.filtersLoadedFromSessionStorageCountdownValue);
  }

  onResize(): void {
    this.determineColumnsToShow();
  }

  navigateToPlayer(tag: string): void {
    this.router.navigateByUrl(`player/${tag}`);
  }

  setupDataSource(): void {
    if (!this.clan.memberList) {
      return;
    }
    const processedClanMembers = [...this.clan.memberList];
    let numOfCoLeaders = 0;
    let numOfElders = 0;
    let numOfMembers = 0;
    let lowestTrophies = this.clan.averagePlayerTrophies;
    let highestTrophies = this.clan.averagePlayerTrophies;
    processedClanMembers.forEach((member) => {
      if (
        member.clanRank !== member.previousClanRank ||
        member.previousClanRank !== 0
      ) {
        if (member.clanRank < member.previousClanRank) {
          member['rankChangeIcon'] = 'arrow_upward';
          member['rankChangeDifference'] =
            member.previousClanRank - member.clanRank;
        } else if (member.clanRank > member.previousClanRank) {
          member['rankChangeIcon'] = 'arrow_downward';
          member['rankChangeDifference'] =
            member.clanRank - member.previousClanRank;
        }
      }

      switch (member.role) {
        case 'leader': {
          member['roleIconType'] = '';
          break;
        }
        case 'coLeader': {
          member['roleIconType'] = 'two-tone';
          numOfCoLeaders++;
          break;
        }
        case 'elder': {
          member['roleIconType'] = 'outlined';
          numOfElders++;
          break;
        }
        default: {
          numOfMembers++;
        }
      }
      if (member.trophies < lowestTrophies) {
        lowestTrophies = member.trophies;
      } else if (member.trophies > highestTrophies) {
        highestTrophies = member.trophies;
      }
    });
    this.numberOfCoLeaders = numOfCoLeaders;
    this.numberOfElders = numOfElders;
    this.numberOfMembers = numOfMembers;
    this.minTrophiesFilterValue = this.lowestTrophies = lowestTrophies;
    this.maxTrophiesFilterValue = this.highestTrophies = highestTrophies;
    this.minTrophySelectRange = new Array(
      Math.floor(highestTrophies / 500) - Math.ceil(lowestTrophies / 500) + 1
    )
      .fill(undefined)
      .map((x, i) => (x = Math.ceil(lowestTrophies / 500) * 500 + i * 500));
    this.dataSource = new MatTableDataSource(this.clan.memberList);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
    this.maxTrophySelectRange = [...this.minTrophySelectRange].reverse();
    this.determineColumnsToShow();
  }

  determineColumnsToShow(): void {
    if (document.body.clientWidth < 560) {
      this.columns = [
        'clanRank',
        'lastSeenTimeAgo',
        'name',
        'trophies',
        'donations',
        'donationsReceived',
      ];
    } else if (document.body.clientWidth < 700) {
      this.columns = [
        'clanRank',
        'lastSeenTimeAgo',
        'name',
        'trophies',
        'donations',
        'donationsReceived',
      ];
    } else {
      this.columns = [
        'clanRank',
        'lastSeenTimeAgo',
        'name',
        'trophies',
        'expLevel',
        'donations',
        'donationsReceived',
      ];
    }
  }

  setupChartData(): void {
    const labels: Label[] = [];
    const trophiesData: number[] = [];
    this.clan.memberList.forEach((member) => {
      labels.push(`#${member.clanRank}`);
      trophiesData.push(member.trophies);
    });
  }

  selectRoleFilter(role: 'member' | 'elder' | 'coLeader'): void {
    if (this.roleFilterValue === role) {
      this.roleFilterValue = undefined;
    } else {
      this.roleFilterValue = role;
    }
    this.filterData();
  }

  filterData(): void {
    this.checkIfPreloadedValuesChanged();
    if (
      !this.minTrophiesFilterValue ||
      isNaN(this.minTrophiesFilterValue) ||
      this.minTrophiesFilterValue < this.lowestTrophies
    ) {
      this.minTrophiesFilterValue = this.lowestTrophies;
    }
    if (
      !this.maxTrophiesFilterValue ||
      isNaN(this.maxTrophiesFilterValue) ||
      this.maxTrophiesFilterValue > this.highestTrophies
    ) {
      this.maxTrophiesFilterValue = this.highestTrophies;
    }
    this.dataSource.data = this.clan.memberList.filter((member) => {
      let meetsCriteria = true;
      if (
        this.nameSearchValue &&
        !member.name.toLowerCase().includes(this.nameSearchValue.toLowerCase())
      ) {
        meetsCriteria = false;
      } else if (this.roleFilterValue && member.role !== this.roleFilterValue) {
        meetsCriteria = false;
      } else if (
        this.minTrophiesFilterValue &&
        member.trophies < this.minTrophiesFilterValue
      ) {
        meetsCriteria = false;
      } else if (
        this.maxTrophiesFilterValue &&
        member.trophies > this.maxTrophiesFilterValue
      ) {
        meetsCriteria = false;
      }
      return meetsCriteria;
    });
    if (this.dataSource.data.length === this.clan.memberList.length) {
      this.dataSource.data = this.clan.memberList;
      this.clearFilter();
    } else {
      this.saveFiltersToSessionStorage();
    }
    this.cdr.detectChanges();
  }

  clearFilter(): void {
    this.nameSearchValue = '';
    this.roleFilterValue = null;
    this.minTrophiesFilterValue = this.lowestTrophies;
    this.maxTrophiesFilterValue = this.highestTrophies;
    this.dataSource.data = this.clan.memberList;
    sessionStorage.removeItem(`${this.clan.tag}_filters`);
    this.filtersLoadedFromSessionStorage = undefined;
    this.showFiltersLoadedFromSessionStorage = false;
  }

  parseInt(string: string): number {
    return parseInt(string, 10);
  }

  saveFiltersToSessionStorage(): void {
    sessionStorage.setItem(
      `${this.clan.tag}_filters`,
      JSON.stringify({
        nameSearchValue: this.nameSearchValue,
        roleFilterValue: this.roleFilterValue,
        minTrophiesFilterValue:
          this.minTrophiesFilterValue !== this.lowestTrophies
            ? this.minTrophiesFilterValue
            : undefined,
        maxTrophiesFilterValue:
          this.maxTrophiesFilterValue !== this.highestTrophies
            ? this.maxTrophiesFilterValue
            : undefined,
      })
    );
  }

  loadFiltersFromSessionStorage(): void {
    const filtersJsonString = sessionStorage.getItem(
      `${this.clan.tag}_filters`
    );
    if (filtersJsonString) {
      const filtersObject = JSON.parse(filtersJsonString);
      if (filtersObject.nameSearchValue) {
        this.nameSearchValue = filtersObject.nameSearchValue;
      }
      if (filtersObject.minTrophiesFilterValue) {
        if (
          filtersObject.minTrophiesFilterValue !== this.lowestTrophies &&
          filtersObject.minTrophiesFilterValue % 500 > 0
        ) {
          this.minTrophiesFilterValue = this.lowestTrophies;
        } else {
          this.minTrophiesFilterValue = filtersObject.minTrophiesFilterValue;
        }
      }
      if (filtersObject.maxTrophiesFilterValue) {
        if (
          filtersObject.maxTrophiesFilterValue !== this.highestTrophies &&
          filtersObject.maxTrophiesFilterValue % 500 > 0
        ) {
          this.maxTrophiesFilterValue = this.highestTrophies;
        } else {
          this.maxTrophiesFilterValue = filtersObject.maxTrophiesFilterValue;
        }
      }
      if (filtersObject.roleFilterValue) {
        this.roleFilterValue = filtersObject.roleFilterValue;
      }
      this.filtersLoadedFromSessionStorage = filtersObject;
      this.showFiltersLoadedFromSessionStorage = true;
      this.filterData();
      if (!this.dataSource.data.length) {
        this.clearFilter();
      }
    }
  }

  checkIfPreloadedValuesChanged(): void {
    if (this.filtersLoadedFromSessionStorage) {
      Object.keys(this.filtersLoadedFromSessionStorage).forEach((key) => {
        const savedFilterProperty = this.filtersLoadedFromSessionStorage[key];
        const componentFilterProperty = this[key];
        if (
          savedFilterProperty &&
          savedFilterProperty !== componentFilterProperty
        ) {
          this.filtersLoadedFromSessionStorage[key] = undefined;
        }
      });
    }
  }
}
