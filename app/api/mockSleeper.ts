import { Matchup } from "@/types";

export async function getSleeperMatchups(leagueId: string): Promise<Matchup[]> {
  return [
    {
      platform: "Sleeper",
      leagueId,
      leagueName: "Sleeper Superflex 12",
      week: 1,
      teams: [
        { name: "Team Alpha", score: 112.4 },
        { name: "Team Beta", score: 98.1 },
      ],
    },
    {
      platform: "Sleeper",
      leagueId,
      leagueName: "Sleeper Superflex 12",
      week: 2,
      teams: [
        { name: "Team Alpha", score: 124.8 },
        { name: "Team Gamma", score: 120.6 },
      ],
    },
  ];
}
