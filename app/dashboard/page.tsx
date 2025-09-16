"use client";

import { useEffect, useState } from "react";
import { getLeagues } from "@/app/api/leagues";
import { getMatchups, getUsers, getRosters } from "@/app/api/sleeper";
import Link from "next/link";

type League = { id: string; platform: "Yahoo" | "Sleeper" | "ESPN"; name: string };

export default function DashboardPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [matchups, setMatchups] = useState<any[]>([]);
  const [week, setWeek] = useState(1);

  useEffect(() => {
    getLeagues().then(setLeagues);
  }, []);

  useEffect(() => {
    if (!leagues.length) return;

    const load = async () => {
      const all: any[] = [];

      for (const league of leagues) {
        if (league.platform === "Sleeper") {
          try {
            const [users, rosters, matchups] = await Promise.all([
              getUsers(league.id),
              getRosters(league.id),
              getMatchups(league.id, week),
            ]);

            // map roster_id → user display_name
            const rosterToUser: Record<number, string> = {};
            rosters.forEach((r: any) => {
              const u = users.find((u: any) => u.user_id === r.owner_id);
              if (u) rosterToUser[r.roster_id] = u.display_name;
            });

            // group by matchup_id
            const grouped: Record<number, any[]> = {};
            matchups.forEach((m: any) => {
              if (!grouped[m.matchup_id]) grouped[m.matchup_id] = [];
              grouped[m.matchup_id].push(m);
            });

            Object.values(grouped).forEach((pair: any) => {
              if (pair.length === 2) {
                const [a, b] = pair;
                all.push({
                  league,
                  teamA: { name: rosterToUser[a.roster_id], score: a.points },
                  teamB: { name: rosterToUser[b.roster_id], score: b.points },
                  matchupId: a.matchup_id,
                });
              }
            });
          } catch (err) {
            console.error("Sleeper fetch failed", err);
          }
        } else {
          // Placeholder for Yahoo / ESPN
          all.push({
            league,
            teamA: { name: "Demo Team A", score: 100 },
            teamB: { name: "Demo Team B", score: 95 },
            matchupId: "demo",
          });
        }
      }

      setMatchups(all);
    };

    load();
  }, [leagues, week]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Matchups</h1>
      <p className="text-sm text-gray-500">Click a matchup to see full rosters</p>

      <div className="grid md:grid-cols-2 gap-4">
        {matchups.map((m, i) => (
          <Link
            key={i}
            href={`/dashboard/matchup/${m.league.id}?week=${week}&matchup=${m.matchupId}`}
            className="card p-4 flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <div className="text-xs text-gray-500">
                {m.league.platform} • Week {week} • {m.league.name}
              </div>
              <div className="flex gap-2 mt-1">
                <span className="font-semibold">{m.teamA.name}</span>
                <span className="font-bold">{m.teamA.score.toFixed(1)}</span>
                <span className="mx-2">vs</span>
                <span className="font-semibold">{m.teamB.name}</span>
                <span className="font-bold">{m.teamB.score.toFixed(1)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
