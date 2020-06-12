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

	getClanWarlog(clanTag: string): Observable<Array<ClanWarlogItem>> {
		return this.http.get(`/api/warlog?clanTag=${clanTag}`).pipe(
			map((res) => {
				return res['items'];
			})
		);
	}
}
