type Props = {
  platform: "Yahoo" | "Sleeper" | "ESPN";
  name: string;
  record: string;
  rank: number;
};

const platformColors = {
  Yahoo: "from-purple-500 to-indigo-500",
  Sleeper: "from-slate-900 to-slate-700",
  ESPN: "from-red-500 to-orange-500",
};

export default function LeagueTile({ platform, name, record, rank }: Props) {
  return (
    <div className="card p-4 hover:shadow-lg transition shadow-soft">
      <div className="flex items-center justify-between">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${platformColors[platform]} text-white grid place-items-center font-bold`}>
          {platform[0]}
        </div>
        <div className="text-right text-xs text-gray-500">Rank</div>
      </div>
      <div className="mt-3">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{platform} • {record}</p>
      </div>
      <div className="mt-4 text-sm">
        <span className="badge">#{rank}</span>
      </div>
    </div>
  );
}
