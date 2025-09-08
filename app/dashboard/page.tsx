import TabNav from "@/components/TabNav";
import { Card } from "@/components/Card";
import { getSleeperMatchups } from "@/app/api/mockSleeper";
import { getYahooMatchups } from "@/app/api/mockYahoo";
import { getEspnMatchups } from "@/app/api/mockEspn";
import { Matchup } from "@/types";
import Link from "next/link";

function Row({ m, idx }: { m: Matchup; idx: number }) {
  const [a, b] = m.teams;
  const aheadA = a.score >= b.score;
  const matchupId = `${m.platform}-${idx}`;

  return (
    <Link
      href={`/dashboard/matchup/${matchupId}`}
      className="block p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition"
    >
      <div className="text-xs text-gray-500 mb-1">
        {m.platform} • Week {m.week} • {m.leagueName}
      </div>
      <div className="flex items-center justify-between font-medium">
        <span className={`${aheadA ? "text-gray-900" : "text-gray-500"}`}>
          {a.name} <span className="font-semibold">{a.score}</span>
        </span>
        <span className="text-gray-400">vs</span>
        <span className={`${!aheadA ? "text-gray-900" : "text-gray-500"}`}>
          {b.name} <span className="font-semibold">{b.score}</span>
        </span>
      </div>
    </Link>
  );
}

export default async function Dashboard() {
  const data = await Promise.all([
    getSleeperMatchups("12345"),
    getYahooMatchups("y-987"),
    getEspnMatchups("e-555"),
  ]);
  const matchups = data.flat();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Matchups</h1>
        <TabNav />
      </div>
      <Card subtitle="Click a matchup to see full rosters">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchups.map((m, i) => (
            <Row key={`${m.platform}-${i}`} m={m} idx={i} />
          ))}
        </div>
      </Card>
    </div>
  );
}
