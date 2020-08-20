import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { WarlogService } from '../../services/warlog.service';
import { ClanWarlogStanding } from '../../models/clan-warlog-standing.model';
import { ClanWarlogItem } from '../../models/clan-warlog-item.model';
import { ClanWarParticipant } from '../../models/clan-war-participant.model';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { Subscription } from 'rxjs';

@Component({
	selector: 'clan-warlog',
	templateUrl: './clan-warlog.component.html',
	styleUrls: [ './clan-warlog.component.scss' ]
})
export class ClanWarlogComponent implements OnInit, OnChanges {
	@Input() clanTag: string;
	paginatedWarlogItems = new Array<Array<ClanSpecificWarlogItem>>();
	pageAverages = new Array<{
		averageWins: number,
		averageLosses: number,
		averageParticipants: number,
		averageBattles: number,
		averageUnusedBattles: number,
	}>();

	warlogSubscription: Subscription;
	

	constructor(private warlogService: WarlogService) {}

	ngOnInit() { }
	
	ngOnDestroy(): void {
		if (this.warlogSubscription && !this.warlogSubscription.closed) {
			this.warlogSubscription.unsubscribe();
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['clanTag']) {
			this.getNextPageOfWarlogItems();
		}
	}

	getNextPageOfWarlogItems(): void {
		this.warlogSubscription = this.warlogService.getClanWarlog(this.clanTag, this.paginatedWarlogItems.length + 1).subscribe((res) => {
			this.warlogSubscription = undefined;
			this.processWarlogData(res);
		});
	}

	processWarlogData(clanWarlogItems: Array<ClanWarlogItem>): void {
		const wins = [];
		const losses = [];
		const participants = [];
		const numberOfBattles = [];
		const numberOfUnusedBattles = [];
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
				trophies: clanStanding.clan.clanScore,
				trophyChange: clanStanding.trophyChange,
				trophyChangeTextColorClass: clanTrophyChangeTextColor,
				createdDate: item.createdDate,
				participants: item.participants,
				numberOfParticipants: item.participants.length,
				highestNumberOfParticipants: item.highestNumberOfParticipants,
				seasonId: item.seasonId,
				standings: item.standings
			} as ClanSpecificWarlogItem;
			clanSpecificWarlogItemsArray.push(clanSpecificWarlogItem);
			wins.push(clanSpecificWarlogItem.wins);
			losses.push(clanSpecificWarlogItem.losses);
			participants.push(clanSpecificWarlogItem.numberOfParticipants);
			numberOfBattles.push(clanSpecificWarlogItem.highestNumberOfParticipants);
			numberOfUnusedBattles.push(clanSpecificWarlogItem.highestNumberOfParticipants - clanSpecificWarlogItem.battlesPlayed);
		});

		const pageAverages = {
			averageWins: wins.reduce((a, b) => { return a + b }) / wins.length,
			averageLosses: losses.reduce((a, b) => { return a + b }) / losses.length,
			averageParticipants: participants.reduce((a, b) => { return a + b }) / participants.length,
			averageBattles: numberOfBattles.reduce((a, b) => { return a + b }) / numberOfBattles.length,
			averageUnusedBattles: numberOfUnusedBattles.reduce((a, b) => { return a + b }) / numberOfBattles.length,
		};
		
		this.pageAverages.push(pageAverages);
		this.paginatedWarlogItems.push(clanSpecificWarlogItemsArray);
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
	trophies: number;
	trophyChange: number;
	trophyChangeTextColorClass: 'red-text' | 'green-text' | 'faded-black-text';
	createdDate: string;
	participants: Array<ClanWarParticipant>;
	numberOfParticipants: number;
	highestNumberOfParticipants: number;
	seasonId: number;
	standings: Array<ClanWarlogStanding>;
}
