import { RiverRaceParticipant } from './river-race-participant.model';

export interface RiverRaceClan {
  tag: string;
  clanScore: number;
  badgeId: number;
  name: string;
  fame: number;
  rankFormatted: string;
  repairPoints: number;
  finishTime: string;
  participants: Array<RiverRaceParticipant>;
}
