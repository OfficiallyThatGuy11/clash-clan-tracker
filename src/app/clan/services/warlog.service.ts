import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ClanWarlogItem } from '../models/clan-warlog-item.model';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class WarlogService {
	constructor(private http: HttpClient) {}

	getClanWarlog(clanTag: string, pageNumber?: number): Observable<Array<ClanWarlogItem>> {
		let url = `/api/warlog?clanTag=${clanTag}`;

		if (pageNumber) {
			url = url + `&pageNumber=${pageNumber}`;
		}
		
		return this.http.get(url).pipe(
			map((res) => {
				const warlogEntries: Array<ClanWarlogItem> = res['items'];

				warlogEntries.forEach(warlog => {
					warlog.standings.sort((a, b) => {
						if (a.clan.wins > b.clan.wins) {
							return -1;
						}
						if (a.clan.crowns > b.clan.crowns) {
							return -1;
						}
						return 1;
					});
					let highestClanParticipants = 0;
					warlog.standings.forEach((standing, index) => {
						standing.clan.rank = index + 1;
						standing.clan.losses = standing.clan.battlesPlayed - standing.clan.wins;
						if (standing.clan.participants > highestClanParticipants) {
							highestClanParticipants = standing.clan.participants;
						}
					});
					warlog.highestNumberOfParticipants = highestClanParticipants;
				});

				return warlogEntries;
			})
		);
	}
}
