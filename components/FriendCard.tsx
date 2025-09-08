import { User } from "@/types";
import { Card } from "./Card";

export default function FriendCard({ friend }: { friend: User }) {
  return (
    <Card title={friend.name} subtitle={`${friend.totalLeagues} leagues • ${friend.titles} titles`}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div className="p-3 bg-grad rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500">All‑time Record</div>
          <div className="font-semibold">{friend.record.wins}-{friend.record.losses}-{friend.record.ties}</div>
        </div>
        <div className="p-3 bg-grad rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500">Win Rate</div>
          <div className="font-semibold">{friend.winRate}%</div>
        </div>
        <div className="p-3 bg-grad rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500">Avg Pts</div>
          <div className="font-semibold">{friend.avgPoints}</div>
        </div>
        <div className="p-3 bg-grad rounded-xl border border-gray-100">
          <div className="text-xs text-gray-500">Streak</div>
          <div className="font-semibold">{friend.streak}</div>
        </div>
      </div>
    </Card>
  );
}
