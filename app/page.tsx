import Link from "next/link";
import LeagueTile from "@/components/LeagueTile";
import { Card } from "@/components/Card";

export default function Home() {
  return (
    <main className="container-max py-16">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Your fantasy world, in one feed.</h1>
          <p className="text-lg text-gray-600 mt-4">Aggregate matchups and history across Yahoo, Sleeper, and ESPN. Follow friends. Chase the global leaderboard.</p>
          <div className="mt-8 flex gap-3">
            <Link href="/dashboard" className="px-6 py-3 rounded-xl bg-gray-900 text-white shadow-soft">Open Dashboard</Link>
            <a href="#how-it-works" className="px-6 py-3 rounded-xl border border-gray-300">How it works</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <LeagueTile platform="Sleeper" name="Sleeper Superflex 12" record="1-0-0" rank={2} />
          <LeagueTile platform="Yahoo" name="Yahoo Platinum 10" record="1-0-0" rank={1} />
          <LeagueTile platform="ESPN" name="ESPN Dynasty 14" record="0-1-0" rank={7} />
          <LeagueTile platform="Sleeper" name="Best Ball Bash" record="1-0-0" rank={3} />
        </div>
      </section>

      <section id="how-it-works" className="mt-16 grid md:grid-cols-3 gap-6">
        <Card title="Connect Leagues" subtitle="Paste league IDs or auth per platform">
          <p className="text-sm text-gray-600">We read matchups and history read‑only. No lineup changes, ever.</p>
        </Card>
        <Card title="Unified Matchups" subtitle="All weekly games in one glance">
          <p className="text-sm text-gray-600">Stop hopping between apps. Track everything on a single screen.</p>
        </Card>
        <Card title="Social + Leaderboards" subtitle="Like Strava, but for fantasy">
          <p className="text-sm text-gray-600">Follow friends, compare résumés, and climb the global ranks.</p>
        </Card>
      </section>
    </main>
  );
}
