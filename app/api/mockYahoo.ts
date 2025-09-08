import { Matchup } from "@/types";
export async function getYahooMatchups(leagueId: string): Promise<Matchup[]> {
  return [
    {
      platform: "Yahoo",
      leagueId,
      leagueName: "Yahoo Platinum 10",
      week: 1,
      teams: [
        { name: "Gridiron Gurus", score: 134.2 },
        { name: "Sunday Storm", score: 109.7 },
      ],
    },
  ];
}
