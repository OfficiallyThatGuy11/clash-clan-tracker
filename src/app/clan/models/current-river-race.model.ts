import { RiverRaceClan } from './river-race-clan.model';

export interface CurrentRiverRace {
  state: number;
  clan: RiverRaceClan;
  clans: Array<RiverRaceClan>;
  collectionEndTime: string;
  warEndTime: string;
  selectionIndex: number;
}
