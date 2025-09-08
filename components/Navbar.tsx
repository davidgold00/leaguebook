import Link from "next/link";
import { Trophy, Users2, LayoutGrid, Sparkles } from "lucide-react";

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="px-3 py-2 rounded-xl hover:bg-gray-100 transition text-sm font-medium">
    {label}
  </Link>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b border-gray-100">
      <div className="container-max h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-emerald-400 to-blue-500 grid place-items-center text-white shadow-soft">
            <Sparkles size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight">LeagueBook</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink href="/dashboard" label="Matchups" />
          <NavLink href="/dashboard/friends" label="Friends" />
          <NavLink href="/dashboard/leaderboard" label="Leaderboard" />
        </nav>
        <div className="flex items-center gap-2">
          <span className="badge"><LayoutGrid size={14}/> Multi‑League</span>
          <span className="badge hidden sm:inline-flex"><Users2 size={14}/> Social</span>
          <span className="badge hidden sm:inline-flex"><Trophy size={14}/> Rankings</span>
        </div>
      </div>
    </header>
  );
}
