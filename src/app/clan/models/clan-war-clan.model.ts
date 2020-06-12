import { ClanWarParticipant } from './clan-war-participant.model';

export interface ClanWarClan {
  badgeId: number;
	battlesPlayed: number;
	clanScore: number;
	crowns: number;
	name: string;
	participants: number;
	tag: string;
	wins: number;
	rank?: number;
}