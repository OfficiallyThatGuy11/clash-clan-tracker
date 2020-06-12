import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CurrentWarService } from '../../services/current-war.service';
import { ClanCurrentWar } from '../../models/clan-current-war.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'clan-current-war',
  templateUrl: './clan-current-war.component.html',
  styleUrls: ['./clan-current-war.component.scss']
})
export class ClanCurrentWarComponent implements OnInit, OnChanges {
  @Input() clanTag: string;
  clanWarData: ClanCurrentWar;
  currentlyNotInWar = false;

  constructor(private clanCurrentWarService: CurrentWarService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clanTag']) {
      this.clanCurrentWarService.getClanCurrentWar(changes['clanTag'].currentValue).subscribe(res => {
        if (res.state === 'notInWar') {
          this.currentlyNotInWar = true;
        }
        res.state = res.state.replace(/([A-Z])/g, ' $1').toLocaleLowerCase();
        res.state = res.state.charAt(0).toUpperCase() + res.state.slice(1);
        this.clanWarData = res;
      });
    }
  }

}
