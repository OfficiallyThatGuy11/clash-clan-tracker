import { ClanWarParticipant } from './clan-war-participant.model';
import { ClanWarlogStanding } from './clan-warlog-standing.model';

export interface ClanWarlogItem {
	createdDate: string;
	participants: Array<ClanWarParticipant>;
	seasonId: number;
	standings: Array<ClanWarlogStanding>;
	highestNumberOfParticipants: number;
}
