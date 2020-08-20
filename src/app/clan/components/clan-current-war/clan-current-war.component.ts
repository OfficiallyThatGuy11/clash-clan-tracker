import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { CurrentWarService } from '../../services/current-war.service';
import { ClanCurrentWar } from '../../models/clan-current-war.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'clan-current-war',
  templateUrl: './clan-current-war.component.html',
  styleUrls: ['./clan-current-war.component.scss']
})
export class ClanCurrentWarComponent implements OnInit, OnChanges {
  @Input() clanTag: string;
  clanWarData: ClanCurrentWar;
  currentlyNotInWar = false;
  displayWarlog = false;

  constructor(private clanCurrentWarService: CurrentWarService, private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clanTag']) {
      this.clanCurrentWarService.getClanCurrentWar(changes['clanTag'].currentValue).subscribe(res => {
        if (res.state === 'notInWar') {
          this.currentlyNotInWar = true;
        }
        
        this.clanWarData = res;
      });
    }
  }

  navigateToClanWarOverviewPage(clanTag: string): void {
    this.router.navigate(['/clan-war', clanTag]);
  }

}
