import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { WarlogService } from '../../services/warlog.service';
import { ClanWarlogStanding } from '../../models/clan-warlog-standing.model';
import { ClanWarlogItem } from '../../models/clan-warlog-item.model';
import { ClanWarParticipant } from '../../models/clan-war-participant.model';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
	selector: 'clan-warlog',
	templateUrl: './clan-warlog.component.html',
	styleUrls: [ './clan-warlog.component.scss' ]
})
export class ClanWarlogComponent implements OnInit, OnChanges {
	@Input() clanTag: string;
	clanWarlogItems: Array<ClanWarlogItem>;
	clanSpecificWarlogItems: Array<ClanSpecificWarlogItem>;
	averageWins: number;
	averageLosses: number;
	averageParticipants: number;

	constructor(private warlogService: WarlogService) {}

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['clanTag']) {
			this.warlogService.getClanWarlog(this.clanTag).subscribe((res) => this.processWarlogData(res));
		}
	}

	processWarlogData(clanWarlogItems: Array<ClanWarlogItem>): void {
		this.clanWarlogItems = clanWarlogItems;

		const wins = [];
		const losses = [];
		const participants = [];
		const clanSpecificWarlogItemsArray = new Array<ClanSpecificWarlogItem>();
		clanWarlogItems.forEach((item) => {
			let clanStanding: ClanWarlogStanding;
			let clanStandingIndex: number;
			item.standings.forEach((standing, index) => {
				if (standing.clan.tag.replace('#', '') === this.clanTag) {
					clanStanding = standing;
					clanStandingIndex = index;
				}
			});
			let clanTrophyChangeTextColor = '';
			if (clanStanding.trophyChange > 0) {
				clanTrophyChangeTextColor = 'green-text';
			} else if (clanStanding.trophyChange < 0) {
				clanTrophyChangeTextColor = 'red-text';
			}
			let rankFormatted: string;
			if (clanStandingIndex + 1 === 1) {
				rankFormatted = '1st';
			} else if (clanStandingIndex + 1 === 2) {
				rankFormatted = '2nd';
			} else if (clanStandingIndex + 1 === 3) {
				rankFormatted = '3rd';
			} else {
				rankFormatted = `${clanStandingIndex + 1}th`;
			}
			const clanSpecificWarlogItem = {
				badgeId: clanStanding.clan.badgeId,
				battlesPlayed: clanStanding.clan.battlesPlayed,
				clanScore: clanStanding.clan.clanScore,
				rank: clanStandingIndex + 1,
				rankFormatted: rankFormatted,
				crowns: clanStanding.clan.crowns,
				name: clanStanding.clan.name,
				wins: clanStanding.clan.wins,
				losses: clanStanding.clan.battlesPlayed - clanStanding.clan.wins,
				trophyChange: clanStanding.trophyChange,
				trophyChangeTextColorClass: clanTrophyChangeTextColor,
				createdDate: item.createdDate,
				participants: item.participants,
				numberOfParticipants: item.participants.length,
				seasonId: item.seasonId,
				standings: item.standings
			} as ClanSpecificWarlogItem;
			clanSpecificWarlogItemsArray.push(clanSpecificWarlogItem);
			wins.push(clanSpecificWarlogItem.wins);
			losses.push(clanSpecificWarlogItem.losses);
			participants.push(clanSpecificWarlogItem.numberOfParticipants);
		});

		this.averageWins = wins.reduce((a, b) => { return a + b }) / wins.length;
		this.averageLosses = losses.reduce((a, b) => { return a + b }) / losses.length;
		this.averageParticipants = participants.reduce((a, b) => { return a + b }) / participants.length;
		this.clanSpecificWarlogItems = clanSpecificWarlogItemsArray;
	}
}

export interface ClanSpecificWarlogItem {
	badgeId: number;
	battlesPlayed: number;
	clanScore: number;
	rank: number;
	rankFormatted: string;
	crowns: number;
	name: string;
	wins: number;
	losses: number;
	trophyChange: number;
	trophyChangeTextColorClass: 'red-text' | 'green-text' | 'faded-black-text';
	createdDate: string;
	participants: Array<ClanWarParticipant>;
	numberOfParticipants: number;
	seasonId: number;
	standings: Array<ClanWarlogStanding>;
}
