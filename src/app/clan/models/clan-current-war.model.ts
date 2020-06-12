import { ClanWarParticipant } from './clan-war-participant.model';
import { ClanWarClan } from './clan-war-clan.model';

export interface ClanCurrentWar {
  state: string;
  clan: ClanWarClan;
  participants: Array<ClanWarParticipant>,
  clans: Array<ClanWarClan>,
  collectionEndTime: string,
  warEndTime: string,
}