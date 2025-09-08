import { Matchup } from "@/types";
export async function getEspnMatchups(leagueId: string): Promise<Matchup[]> {
  return [
    {
      platform: "ESPN",
      leagueId,
      leagueName: "ESPN Dynasty 14",
      week: 1,
      teams: [
        { name: "Dynasty Dons", score: 128.0 },
        { name: "Rookie Rage", score: 121.3 },
      ],
    },
  ];
}
