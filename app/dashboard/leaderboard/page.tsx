import TabNav from "@/components/TabNav";
import LeaderboardTable from "@/components/LeaderboardTable";
import { getLeaderboard } from "@/app/api/social";

export default async function LeaderboardPage() {
  const rows = await getLeaderboard();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <TabNav />
      </div>
      <LeaderboardTable rows={rows} />
    </div>
  );
}
