import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClanService {
  constructor(private http: HttpClient) {}

  searchClansByName(name: string): Observable<Array<Clan>> {
    return this.http
      .get<ClanSearchResponse>(`/api/clanSearch?name=${name}`)
      .pipe(
        map((response) => {
          const clans = [];
          response.items.forEach((clan) => {
            clan.tag = clan.tag.replace('#', '');
            clans.push(clan);
          });
          return clans;
        })
      );
  }

  getClan(clanTag: string): Observable<Clan> {
    return this.http.get<Clan>(`/api/clan?clanTag=${clanTag}`).pipe(
      map((clan) => {
        clan.memberList.forEach((member) => {
          member.lastSeenProcessed = new Date(
            member.lastSeenProcessed.toString()
          );

          member.lastSeenProcessed = new Date(
            member.lastSeenProcessed.getTime() +
              member.lastSeenProcessed.getTimezoneOffset() * 60000
          );
        });
        clan.tag = clan.tag.replace('#', '');
        return clan;
      })
    );
  }

  getRecentlyVisitedClans(): Array<Clan> {
    const recentlyVisitedClans: Array<Clan> = JSON.parse(
      localStorage.getItem('recentlyVisitedClans')
    );

    return recentlyVisitedClans ? recentlyVisitedClans : [];
  }

  addClanToRecentlyVisitedClans(clan: Clan): void {
    const recentlyVisitedClans: Array<Clan> = this.getRecentlyVisitedClans();

    let clanFoundInCookieIndex: number;
    const clanFoundInCookie = recentlyVisitedClans.find((recentClan, index) => {
      if (recentClan.tag === clan.tag) {
        clanFoundInCookieIndex = index;
        return true;
      } else {
        return false;
      }
    });

    if (clanFoundInCookie) {
      recentlyVisitedClans[clanFoundInCookieIndex] = clan;
    } else {
      recentlyVisitedClans.push(clan);
    }

    localStorage.setItem(
      'recentlyVisitedClans',
      JSON.stringify(recentlyVisitedClans)
    );
  }

  removeClanFromRecentlyVisitedClans(clan: Clan): void {
    const recentlyVisitedClans: Array<Clan> = this.getRecentlyVisitedClans();

    localStorage.setItem(
      'recentlyVisitedClans',
      JSON.stringify(
        recentlyVisitedClans.filter((recentClan) => recentClan.tag !== clan.tag)
      )
    );
  }
}

export class ClanSearchResponse {
  items: Array<Clan>;
  paging: object;
}
