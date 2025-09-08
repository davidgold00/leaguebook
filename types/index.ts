export type Matchup = {
  leagueId: string;
  week: number;
  teams: { name: string; score: number }[];
  platform: "Yahoo" | "Sleeper" | "ESPN";
  leagueName: string;
};

export type User = {
  id: string;
  name: string;
  totalLeagues: number;
  titles: number;
  winRate: number;
  avgPoints: number;
  record: { wins: number; losses: number; ties: number };
  streak: string;
};

export type LeaderboardRow = {
  id: string;
  name: string;
  winRate: number;
  titles: number;
  leagues: number;
  avgPoints: number;
};
