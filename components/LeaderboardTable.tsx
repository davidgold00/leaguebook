import { LeaderboardRow } from "@/types";
import { Card } from "./Card";

export default function LeaderboardTable({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <Card title="Global Leaderboard" subtitle="Top managers across connected platforms, ranked by win rate and titles">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-3 pr-4">#</th>
              <th className="py-3 pr-4">Manager</th>
              <th className="py-3 pr-4">Win Rate</th>
              <th className="py-3 pr-4">Titles</th>
              <th className="py-3 pr-4">Leagues</th>
              <th className="py-3 pr-4">Avg Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 pr-4 font-semibold">{i + 1}</td>
                <td className="py-3 pr-4">{r.name}</td>
                <td className="py-3 pr-4">{r.winRate}%</td>
                <td className="py-3 pr-4">{r.titles}</td>
                <td className="py-3 pr-4">{r.leagues}</td>
                <td className="py-3 pr-4">{r.avgPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
