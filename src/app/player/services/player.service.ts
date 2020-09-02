import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private http: HttpClient) {}

  getPlayer(tag: string): Observable<Player> {
    let url = `/api/player?playerTag=${tag}`;

    return this.http.get(url).pipe(
      map((res: Player) => {
        return res;
      })
    );
  }
}
