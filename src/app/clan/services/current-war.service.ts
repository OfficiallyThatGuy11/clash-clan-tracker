import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ClanCurrentWar } from '../models/clan-current-war.model';
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})
export class CurrentWarService {
	constructor(private http: HttpClient) {}

	getClanCurrentWar(clanTag: string): Observable<ClanCurrentWar> {
		return this.http.get<ClanCurrentWar>(`/api/currentwar?clanTag=${clanTag}`).pipe(
			map((res) => {
				res.clan.losses = res.clan.battlesPlayed - res.clan.wins;

				if (res.state === 'warDay') {
					let highestClanParticipants = 0;
					res.clans.sort((a, b) => {
						if (a.wins > b.wins) {
							return -1;
						}
						if (a.crowns > b.crowns) {
							return -1;
						}
						return 1;
					});
					res.clans.forEach((clan, index) => {
						clan.rank = index + 1;
						clan.losses = clan.battlesPlayed - clan.wins;
						if (clan.participants > highestClanParticipants) {
							highestClanParticipants = clan.participants;
						}
					});
					res.highestNumberOfParticipants = highestClanParticipants;
				}
				res.participants.sort((a, b) => b.cardsEarned - a.cardsEarned);
				res.participants.forEach(participant => {
					participant.losses = participant.battlesPlayed - participant.wins;
				})

				res.stateFormatted = res.state.replace(/([A-Z])/g, ' $1').toLocaleLowerCase();
        res.stateFormatted = res.stateFormatted.charAt(0).toUpperCase() + res.stateFormatted.slice(1);

				// res.warEndTime = moment(res.warEndTime);

				return res as ClanCurrentWar;
			})
		);;
	}
}
