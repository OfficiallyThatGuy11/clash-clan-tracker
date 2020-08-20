import { PlayerClan } from './player-clan.model';
import { PlayerLeagueStatistics } from './player-league-statistics.model';
import { PlayerItemLevel } from './player-item-level.model';
import { PlayerAchievementBadge } from './player-acheivement-badge.model';
import { PlayerAchievementProgress } from './player-acheivement-progress.model';
import { Item } from 'src/app/models/item.model';

export interface Player {
  clan: PlayerClan;
  arena: Arena;
  role: string;
  wins: number;
  losses: number;
  totalDonations: number;
  leagueStatistics: PlayerLeagueStatistics;
  cards: Array<PlayerItemLevel>;
  currentFavouriteCard: Item;
  badges: Array<PlayerAchievementBadge>;
  tag: string;
  name: string;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  donations: number;
  donationsReceived: number;
  achievements: Array<PlayerAchievementProgress>;
  battleCount: number;
  threeCrownWins: number;
  challengeCardsWon: number;
  challengeMaxWins: number;
  tournamentCardsWon: number;
  tournamentBattleCount: number;
  currentDeck: Array<PlayerItemLevel>;
  warDayWins: number;
  clanCardsCollected: number;
  starPoints: number;
}