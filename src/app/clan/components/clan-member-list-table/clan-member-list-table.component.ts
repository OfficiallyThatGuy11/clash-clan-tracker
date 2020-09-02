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

  filtersLoadedFromSessionStorage = false;
  filtersLoadedFromSessionStorageCountdownValue = 0;
  filtersLoadedFromSessionStorageCountdownInterval: any;

  dataSource: MatTableDataSource<ClanMember>;
  columns = [];

  minTrophiesFilterValue: number;
  maxTrophiesFilterValue: number;
  nameSearchValue = '';

  private _roleFilterValue: 'Member' | 'Elder' | 'Co-leader';
  get roleFilterValue(): 'Member' | 'Elder' | 'Co-leader' {
    return this._roleFilterValue;
  }
  set roleFilterValue(value: 'Member' | 'Elder' | 'Co-leader') {
    this._roleFilterValue = value;
  }
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
      member.role = member.role.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
      member.role = member.role.charAt(0).toUpperCase() + member.role.slice(1);

      if (
        member.clanRank === member.previousClanRank ||
        member.previousClanRank === 0
      ) {
      } else if (member.clanRank < member.previousClanRank) {
        member['rankChangeIcon'] = 'arrow_upward';
        member['rankChangeDifference'] =
          member.previousClanRank - member.clanRank;
      } else if (member.clanRank > member.previousClanRank) {
        member['rankChangeIcon'] = 'arrow_downward';
        member['rankChangeDifference'] =
          member.clanRank - member.previousClanRank;
      }

      switch (member.role) {
        case 'Leader': {
          member['roleIconType'] = '';
          break;
        }
        case 'Co-leader': {
          member['roleIconType'] = 'two-tone';
          numOfCoLeaders++;
          break;
        }
        case 'Elder': {
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
      ];
    } else if (document.body.clientWidth < 700) {
      this.columns = [
        'clanRank',
        'lastSeenTimeAgo',
        'name',
        'trophies',
        'role',
        'donations',
      ];
    } else {
      this.columns = [
        'clanRank',
        'lastSeenTimeAgo',
        'name',
        'trophies',
        'role',
        'expLevel',
        'donations',
        'donationsReceived',
      ];
    }
  }

  selectRoleFilter(role: 'Member' | 'Elder' | 'Co-leader'): void {
    if (this.roleFilterValue === role) {
      this.roleFilterValue = undefined;
    } else {
      this.roleFilterValue = role;
    }
    this.filterData();
  }

  filterData(): void {
    if (
      !this.minTrophiesFilterValue ||
      isNaN(this.minTrophiesFilterValue) ||
      this.minTrophiesFilterValue < this.lowestTrophies
    ) {
      this.minTrophiesFilterValue = this.lowestTrophies;
    } else if (this.minTrophiesFilterValue > this.maxTrophiesFilterValue) {
      this.minTrophiesFilterValue = this.maxTrophiesFilterValue;
    }
    if (
      !this.maxTrophiesFilterValue ||
      isNaN(this.maxTrophiesFilterValue) ||
      this.maxTrophiesFilterValue > this.highestTrophies
    ) {
      this.maxTrophiesFilterValue = this.highestTrophies;
    } else if (this.maxTrophiesFilterValue < this.minTrophiesFilterValue) {
      this.maxTrophiesFilterValue = this.minTrophiesFilterValue;
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
    this.filtersLoadedFromSessionStorage = false;
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
        minTrophiesFilterValue: this.minTrophiesFilterValue,
        maxTrophiesFilterValue: this.maxTrophiesFilterValue,
      })
    );
  }

  loadFiltersFromSessionStorage(): void {
    const filtersJsonString = sessionStorage.getItem(
      `${this.clan.tag}_filters`
    );
    if (filtersJsonString) {
      const filtersObject = JSON.parse(filtersJsonString);
      this.nameSearchValue = filtersObject.nameSearchValue;
      this.roleFilterValue = filtersObject.roleFilterValue;
      this.minTrophiesFilterValue = filtersObject.minTrophiesFilterValue;
      this.maxTrophiesFilterValue = filtersObject.maxTrophiesFilterValue;
      this.filterData();
      this.filtersLoadedFromSessionStorage = true;

      // this.filtersLoadedFromSessionStorageCountdownValue = 10;
      // this.filtersLoadedFromSessionStorageCountdownInterval = setInterval(
      //   () => {
      //     this.filtersLoadedFromSessionStorageCountdownValue--;
      //     if (this.filtersLoadedFromSessionStorageCountdownValue === 0) {
      //       this.filtersLoadedFromSessionStorage = false;
      //       clearInterval(
      //         this.filtersLoadedFromSessionStorageCountdownInterval
      //       );
      //     }
      //   },
      //   1000
      // );
    }
  }
}
