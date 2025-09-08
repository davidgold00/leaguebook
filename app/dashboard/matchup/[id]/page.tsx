import { getMatchupDetail } from "@/app/api/mockMatchupDetails";

const positionColors: Record<string, string> = {
  QB: "bg-red-500",
  RB: "bg-green-500",
  WR: "bg-blue-500",
  TE: "bg-purple-500",
  K: "bg-orange-500",
  DST: "bg-gray-600",
};

export default async function MatchupPage({ params }: { params: { id: string } }) {
  const matchup = await getMatchupDetail(params.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-emerald-500 to-slate-700 text-white rounded-2xl p-6 shadow-lg">
        <div className="text-center md:text-left">
          <h1 className="text-xl font-semibold">{matchup.teamA.name}</h1>
          <p className="text-3xl font-bold">{matchup.teamA.score.toFixed(2)}</p>
          <p className="text-sm opacity-80">Proj: 109.92 • Win% 72%</p>
        </div>

        <div className="text-center text-lg font-semibold">vs</div>

        <div className="text-center md:text-right">
          <h1 className="text-xl font-semibold">{matchup.teamB.name}</h1>
          <p className="text-3xl font-bold">{matchup.teamB.score.toFixed(2)}</p>
          <p className="text-sm opacity-80">Proj: 104.40 • Win% 28%</p>
        </div>
      </div>

      {/* Roster Section */}
      <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
        <div className="py-2 text-center font-semibold text-gray-600 border-b">
          Starters
        </div>

        {matchup.teamA.players.map((p, i) => {
          const opp = matchup.teamB.players[i];
          const pos = p.position;

          return (
            <div
              key={p.id}
              className="flex items-center border-b last:border-0 h-12"
            >
              {/* Left player */}
              <div className="flex items-center justify-between px-3 w-[45%]">
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className="text-xs text-gray-500">{p.team}</span>
                </div>
                <div className="text-sm font-bold">{p.points}</div>
              </div>

              {/* Position badge */}
              <div className="w-[10%] flex justify-center">
                <span
                  className={`text-[10px] font-bold text-white px-2 py-1 rounded-full ${positionColors[pos]}`}
                >
                  {pos}
                </span>
              </div>

              {/* Right player */}
              <div className="flex items-center justify-between px-3 w-[45%]">
                <div className="text-sm font-bold">{opp.points}</div>
                <div className="flex flex-col text-right leading-tight">
                  <span className="text-sm font-medium">{opp.name}</span>
                  <span className="text-xs text-gray-500">{opp.team}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
