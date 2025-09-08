'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/dashboard", label: "Matchups" },
  { href: "/dashboard/friends", label: "Friends" },
  { href: "/dashboard/leaderboard", label: "Leaderboard" },
  { href: "/dashboard/settings", label: "Settings" },
];

export default function TabNav() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 bg-white border border-gray-100 rounded-xl p-1 shadow-soft">
      {tabs.map(t => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${active ? "bg-gray-900 text-white" : "hover:bg-gray-100"}`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
