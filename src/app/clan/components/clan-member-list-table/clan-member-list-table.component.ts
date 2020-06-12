import { Component, OnInit, Input, ViewChild, SimpleChanges } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { MergeMapSubscriber } from 'rxjs/internal/operators/mergeMap';

@Component({
	selector: 'clan-member-list-table',
	templateUrl: './clan-member-list-table.component.html',
	styleUrls: [ './clan-member-list-table.component.scss' ]
})
export class ClanMemberListTableComponent implements OnInit {
	@Input() clanMembers: Array<ClanMember>;
	dataSource: MatTableDataSource<ClanMember>;
	columns = [ 'clanRank', 'name', 'role', 'expLevel', 'trophies', 'lastSeen', 'donationsRatio' ];

	@ViewChild(MatSort) sort: MatSort;

	constructor() {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['clanMembers']) {
			this.setupDataSource();
		}
	}

	onResize(): void {
		this.determineColumnsToShow();
	}

	setupDataSource(): void {
		let processedClanMembers = [ ...this.clanMembers ];
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
					break;
				}
				case 'Elder': {
					member['roleIconType'] = 'outlined';
					break;
				}
			}
			const donationRatio = Math.floor(Math.round(member.donations / member.donationsReceived * 100)) / 100;
			if (Number.isNaN(donationRatio)) {
				member['donationsRatio'] = 'N/A';
				member['donationsRatioColor'] = 'faded-black-text';
			} else if (donationRatio === Infinity ) { 
				member['donationsRatio'] = member.donations;
				member['donationsRatioColor'] = 'green-text';
			}else {
				member['donationsRatio'] = donationRatio;
				member['donationsRatioColor'] = member['donationsRatio'] >= 1 ? 'green-text' : 'red-text';
			}
		});
		this.dataSource = new MatTableDataSource(this.clanMembers);
		this.determineColumnsToShow();
		this.dataSource.sort = this.sort;
	}

	determineColumnsToShow(): void {
		if (document.body.clientWidth < 560) {
			this.columns = [ 'clanRank', 'name', 'trophies', 'lastSeen' ];
		} else if (document.body.clientWidth < 700) {
			this.columns = [ 'clanRank', 'name', 'role', 'trophies', 'lastSeen', 'donationsRatio' ];
		} else {
			this.columns = [ 'clanRank', 'name', 'role', 'expLevel', 'trophies', 'lastSeen', 'donationsRatio' ];
		}
	}

	filterDataSource(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
