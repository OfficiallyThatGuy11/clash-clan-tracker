import { Component, OnInit, Input } from '@angular/core';
import { PlayerCard } from '../../models/player-card';

@Component({
  selector: 'player-deck',
  templateUrl: './player-deck.component.html',
  styleUrls: ['./player-deck.component.scss'],
})
export class PlayerDeckComponent implements OnInit {
  @Input() playerDeck: Array<PlayerCard>;

  constructor() {}

  ngOnInit() {}
}
