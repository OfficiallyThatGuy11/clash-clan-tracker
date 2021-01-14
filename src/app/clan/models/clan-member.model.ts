interface ClanMember {
  arena: Arena;
  clanChestPoints: number;
  lastSeen: string;
  lastSeenProcessed: Date;
  lastSeenTimeAgo: Array<string>;
  tag: string;
  name: string;
  role: string;
  roleFormatted: string;
  expLevel: number;
  trophies: number;
  clanRank: number;
  previousClanRank: number;
  donations: number;
  donationsReceived: number;
}
