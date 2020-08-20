import { Component, OnInit, Input, ViewChild, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MergeMapSubscriber } from 'rxjs/internal/operators/mergeMap';
import { filter } from 'rxjs/operators';
import { fadeExpandHeight } from 'src/app/animations/fadeExpandHeight.animation';
import { animation, trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'clan-member-list-table',
	templateUrl: './clan-member-list-table.component.html',
	styleUrls: ['./clan-member-list-table.component.scss'],
	animations: [fadeExpandHeight]
})
export class ClanMemberListTableComponent implements OnInit {
	@Input() clanMembers: Array<ClanMember>;
	numberOfCoLeaders: number;
	numberOfElders: number;
	numberOfMembers: number;

	dataSource: MatTableDataSource<ClanMember>;
	columns = [];
	private _nameSearchValue = '';
    get nameSearchValue() {
        return this._nameSearchValue;
    }
    set nameSearchValue(value) {
        this._nameSearchValue = value;
    }

	private _roleFilterValue: 'Member' | 'Elder' | 'Co-leader';
    get roleFilterValue(): 'Member' | 'Elder' | 'Co-leader' {
        return this._roleFilterValue;
    }
    set roleFilterValue(value: 'Member' | 'Elder' | 'Co-leader') {
        this._roleFilterValue = value;
    }
	@ViewChild(MatSort) sort: MatSort;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['clanMembers']) {
			if (changes['clanMembers'].currentValue) {
				this.setupDataSource();
			} else {
				this.dataSource = undefined;
			}
		}
	}

	onResize(): void {
		this.determineColumnsToShow();
	}

	setupDataSource(): void {
		if (!this.clanMembers) {
			return;
		}
		let processedClanMembers = [...this.clanMembers];
		let numOfCoLeaders = 0;
		let numOfElders = 0;
		let numOfMembers = 0;
		processedClanMembers.forEach((member) => {
			member.role = member.role.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
			member.role = member.role.charAt(0).toUpperCase() + member.role.slice(1);

			if (member.clanRank === member.previousClanRank || member.previousClanRank === 0) {
			} else if (member.clanRank < member.previousClanRank) {
				member['rankChangeIcon'] = 'arrow_upward';
				member['rankChangeDifference'] = member.previousClanRank - member.clanRank;
			} else if (member.clanRank > member.previousClanRank) {
				member['rankChangeIcon'] = 'arrow_downward';
				member['rankChangeDifference'] = member.clanRank - member.previousClanRank;
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
		});
		this.numberOfCoLeaders = numOfCoLeaders;
		this.numberOfElders = numOfElders;
		this.numberOfMembers = numOfMembers;
		this.dataSource = new MatTableDataSource(this.clanMembers);
		setTimeout(() => {
			this.dataSource.sort = this.sort;
		});
		this.determineColumnsToShow();
	}

	determineColumnsToShow(): void {
		if (document.body.clientWidth < 560) {
			this.columns = [ 'clanRank', 'name', 'trophies', 'donations' ];
		} else if (document.body.clientWidth < 700) {
			this.columns = [ 'clanRank', 'name', 'trophies', 'role', 'donations' ];
		} else {
			this.columns = [ 'clanRank', 'name', 'trophies', 'role', 'expLevel', 'donations', 'donationsReceived' ];
		}
	}

	filterData(): void {
		this.dataSource.data = this.clanMembers.filter(member => {
			let meetsCriteria = true;
			if (this.nameSearchValue && !member.name.toLowerCase().includes(this.nameSearchValue.toLowerCase())) {
				meetsCriteria = false;
			} else if (this.roleFilterValue && member.role !== this.roleFilterValue) {
				meetsCriteria = false;
			}
			return meetsCriteria;
		});
		this.cdr.detectChanges();
	}

	clearFilter(): void {
		this.nameSearchValue = '';
		this.roleFilterValue = undefined;
		this.dataSource.data = this.clanMembers;
	}
}
