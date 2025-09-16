"use client";

import { useEffect, useState } from "react";
import { getMatchups, getUsers, getRosters, getPlayers } from "@/app/api/sleeper";
import { getLeagues, League } from "@/app/api/leagues";
import { useSearchParams } from "next/navigation";

const positionColors: Record<string, string> = {
  QB: "bg-red-500",
  RB: "bg-green-500",
  WR: "bg-blue-500",
  TE: "bg-purple-500",
  K: "bg-orange-500",
  DEF: "bg-gray-600",
};

export default function MatchupPage({ params }: { params: { id: string } }) {
  const [matchup, setMatchup] = useState<any | null>(null);
  const [league, setLeague] = useState<League | null>(null);
  const [week, setWeek] = useState<number>(1);

  const searchParams = useSearchParams();
  const matchupId = searchParams.get("matchup");

  useEffect(() => {
    const load = async () => {
      const leagues = await getLeagues();
      const l = leagues.find((x) => x.id === params.id);
      if (!l) return;
      setLeague(l);

      if (l.platform !== "Sleeper") return; // only Sleeper for now

      const [users, rosters, matchups, players] = await Promise.all([
        getUsers(l.id),
        getRosters(l.id),
        getMatchups(l.id, week),
        getPlayers(),
      ]);

      // Filter to just this matchup
      const pair = matchups.filter((m: any) => m.matchup_id == matchupId);
      if (pair.length < 2) return;

      const rosterToUser: Record<number, any> = {};
      rosters.forEach((r: any) => {
        const u = users.find((u: any) => u.user_id === r.owner_id);
        if (u) rosterToUser[r.roster_id] = u;
      });

      function resolvePlayer(id: string, points: number) {
        const p = players[id];
        if (!p) return { id, name: "Unknown", position: "FLEX", team: "", points };
        return {
          id,
          name: p.full_name || `${p.first_name} ${p.last_name}`,
          position: p.position || "FLEX",
          team: p.team || "",
          points,
        };
      }

      const [a, b] = pair;

      const teamAUser = rosterToUser[a.roster_id];
      const teamBUser = rosterToUser[b.roster_id];

      const formatTeam = (m: any, user: any) => ({
        name: user?.display_name || "Unknown",
        score: m.points,
        players: m.starters?.map((pid: string) =>
          resolvePlayer(m.players_points?.[pid] ? pid : pid, m.players_points?.[pid] ?? 0)
        ),
      });

      setMatchup({
        teamA: formatTeam(a, teamAUser),
        teamB: formatTeam(b, teamBUser),
      });
    };

    load();
  }, [params.id, matchupId, week]);

  if (!league) {
    return <div className="p-6">League not found</div>;
  }

  if (!matchup) {
    return <div className="p-6">Loading matchup…</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-500 to-slate-700 text-white rounded-2xl p-6 shadow-lg">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-semibold">{matchup.teamA.name}</h1>
          <p className="text-3xl font-bold">{matchup.teamA.score.toFixed(2)}</p>
        </div>
        <div className="text-center text-lg font-semibold">vs</div>
        <div className="text-center md:text-right">
          <h1 className="text-xl font-semibold">{matchup.teamB.name}</h1>
          <p className="text-3xl font-bold">{matchup.teamB.score.toFixed(2)}</p>
        </div>
      </div>

      {/* Starters */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="py-2 text-center font-semibold text-gray-600 border-b">
          Starters
        </div>

        {matchup.teamA.players.map((p: any, i: number) => {
          const opp = matchup.teamB.players[i];
          const pos = p.position;

          return (
            <div
              key={p.id + i}
              className="flex items-center border-b last:border-0 h-12"
            >
              {/* Left player */}
              <div className="flex items-center justify-between px-3 w-[45%]">
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-xs text-gray-500">{p.team}</span>
                </div>
                <div className="text-sm font-bold">{p.points.toFixed(1)}</div>
              </div>

              {/* Position badge */}
              <div className="w-[10%] flex justify-center">
                <span
                  className={`text-[10px] font-bold text-white px-2 py-1 rounded-full ${
                    positionColors[pos] || "bg-gray-400"
                  }`}
                >
                  {pos}
                </span>
              </div>

              {/* Right player */}
              <div className="flex items-center justify-between px-3 w-[45%]">
                <div className="text-sm font-bold">
                  {opp?.points?.toFixed(1) ?? "-"}
                </div>
                <div className="flex flex-col text-right leading-tight">
                  <span className="text-sm font-medium">{opp?.name}</span>
                  <span className="text-xs text-gray-500">{opp?.team}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
