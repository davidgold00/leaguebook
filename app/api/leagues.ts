'use server';

type League = { id: string; platform: "Yahoo"|"Sleeper"|"ESPN"; name: string };

let leagues: League[] = [
  { id: "12345", platform: "Sleeper", name: "Sleeper Superflex 12" },
  { id: "y-987", platform: "Yahoo", name: "Yahoo Platinum 10" },
  { id: "e-555", platform: "ESPN", name: "ESPN Dynasty 14" },
];

export async function getLeagues(): Promise<League[]> {
  return leagues;
}

export async function addLeague(id: string, platform: League["platform"], name: string) {
  leagues.push({ id, platform, name });
  return leagues;
}

export async function removeLeague(id: string) {
  leagues = leagues.filter(l => l.id !== id);
  return leagues;
}
