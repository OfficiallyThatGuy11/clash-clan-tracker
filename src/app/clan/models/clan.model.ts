interface Clan {
  memberList: Array<ClanMember>;
  tag: string;
  clanWarTrophies: number;
  requiredTrophies: number;
  averagePlayerTrophies: number;
  donationsPerWeek: number;
  donationsPerWeekFromCurrentMembers: number;
  averageDonationsFromCurrentMembers: number;
  clanChestMaxLevel: number;
  clanChestStatus: string;
  clanChestLevel: number;
  clanScore: number;
  badgeId: number;
  name: string;
  location: Location;
  type: string;
  members: number;
  description: string;
  clanChestPoints: number;
  badgeUrls: object;
}
