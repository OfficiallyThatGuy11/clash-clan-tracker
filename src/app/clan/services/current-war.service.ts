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
				res.clans.forEach((clan, index) => {
					clan.rank = index + 1;
				});

				// res.warEndTime = moment(res.warEndTime);

				return res as ClanCurrentWar;
			})
		);;
	}
}
