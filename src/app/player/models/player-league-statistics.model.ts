import { PlayerLeagueSeasonResult } from './player-league-season-result.model';

export interface PlayerLeagueStatistics {
  currentSeason: PlayerLeagueSeasonResult;
  bestSeason: PlayerLeagueSeasonResult;
  previousSeason: PlayerLeagueSeasonResult;
}