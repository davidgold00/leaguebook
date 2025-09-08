import TabNav from "@/components/TabNav";
import FriendCard from "@/components/FriendCard";
import { getFriends } from "@/app/api/social";

export default async function FriendsPage() {
  const friends = await getFriends();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Friends</h1>
        <TabNav />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {friends.map(f => <FriendCard key={f.id} friend={f} />)}
      </div>
    </div>
  );
}
