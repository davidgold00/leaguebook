import { Matchup } from "@/types";

export type Player = {
  id: string;
  name: string;
  position: string;
  team: string;
  points: number;
};

export type MatchupDetail = Matchup & {
  teamA: { name: string; score: number; players: Player[] };
  teamB: { name: string; score: number; players: Player[] };
};

export async function getMatchupDetail(id: string): Promise<MatchupDetail> {
  return {
    platform: "Sleeper",
    leagueId: "12345",
    leagueName: "Sleeper Superflex 12",
    week: 1,
    teams: [],
    teamA: {
      name: "Team Alpha",
      score: 112.4,
      players: [
        { id: "a1", name: "Patrick Mahomes", position: "QB", team: "KC", points: 28.5 },
        { id: "a2", name: "Justin Jefferson", position: "WR", team: "MIN", points: 22.1 },
        { id: "a3", name: "Derrick Henry", position: "RB", team: "TEN", points: 18.3 },
        { id: "a4", name: "Stefon Diggs", position: "WR", team: "BUF", points: 17.6 },
        { id: "a5", name: "Travis Kelce", position: "TE", team: "KC", points: 15.9 },
        { id: "a6", name: "Tony Pollard", position: "RB", team: "DAL", points: 10.4 },
        { id: "a7", name: "Evan McPherson", position: "K", team: "CIN", points: 8.0 },
        { id: "a8", name: "Cowboys D/ST", position: "DST", team: "DAL", points: 7.6 },
      ],
    },
    teamB: {
      name: "Team Beta",
      score: 98.1,
      players: [
        { id: "b1", name: "Josh Allen", position: "QB", team: "BUF", points: 25.7 },
        { id: "b2", name: "Tyreek Hill", position: "WR", team: "MIA", points: 24.6 },
        { id: "b3", name: "Nick Chubb", position: "RB", team: "CLE", points: 14.2 },
        { id: "b4", name: "A.J. Brown", position: "WR", team: "PHI", points: 13.8 },
        { id: "b5", name: "George Kittle", position: "TE", team: "SF", points: 12.2 },
        { id: "b6", name: "Saquon Barkley", position: "RB", team: "NYG", points: 7.5 },
        { id: "b7", name: "Justin Tucker", position: "K", team: "BAL", points: 9.0 },
        { id: "b8", name: "49ers D/ST", position: "DST", team: "SF", points: 6.1 },
      ],
    },
  };
}
