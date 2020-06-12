import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ClanService {
	constructor(private http: HttpClient) {}

	getClanDetail(clanTag: string): Observable<Clan> {
		return this.http.get<Clan>(`/api/clans?clanTag=${clanTag}`).pipe(
			map((clan) => {
				// clan.memberList.forEach((member) => {
				// 	member.lastSeen = new Date(
				// 		member.lastSeen.slice(0, 4),
				// 		member.lastSeen.slice(4, 6) - 1,
				// 		member.lastSeen.slice(6, 8),
				// 		member.lastSeen.slice(9, 11),
				// 		member.lastSeen.slice(11, 13),
				// 		member.lastSeen.slice(13, 15),
				// 		0
				// 	);
				// });
				clan.tag = clan.tag.replace('#', '');
				return clan;
			})
		);
	}
}
