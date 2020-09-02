import { Injectable } from '@angular/core';
import { CurrentRiverRace } from '../models/current-river-race.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RiverRaceService {
  constructor(private http: HttpClient) {}

  getCurrentRiverRace(clanTag: string): Observable<CurrentRiverRace> {
    return this.http.get<CurrentRiverRace>(
      `/api/currentRiverRace?clanTag=${clanTag}`
    );
  }
}
