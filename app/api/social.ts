import { LeaderboardRow, User } from "@/types";

export async function getFriends(): Promise<User[]> {
  return [
    {
      id: "u1",
      name: "Alex Carter",
      totalLeagues: 6,
      titles: 3,
      winRate: 62,
      avgPoints: 121.4,
      record: { wins: 84, losses: 49, ties: 2 },
      streak: "W3",
    },
    {
      id: "u2",
      name: "Jordan Lee",
      totalLeagues: 4,
      titles: 1,
      winRate: 57,
      avgPoints: 118.2,
      record: { wins: 52, losses: 39, ties: 0 },
      streak: "L1",
    },
    {
      id: "u3",
      name: "Sam Patel",
      totalLeagues: 5,
      titles: 2,
      winRate: 60,
      avgPoints: 119.9,
      record: { wins: 66, losses: 44, ties: 1 },
      streak: "W2",
    }
  ];
}

export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  return [
    { id: "g1", name: "Alex Carter", winRate: 62, titles: 3, leagues: 6, avgPoints: 121.4 },
    { id: "g2", name: "Jamie Nguyen", winRate: 61, titles: 2, leagues: 7, avgPoints: 120.2 },
    { id: "g3", name: "Jordan Lee", winRate: 57, titles: 1, leagues: 4, avgPoints: 118.2 },
    { id: "g4", name: "Sam Patel", winRate: 60, titles: 2, leagues: 5, avgPoints: 119.9 }
  ];
}
