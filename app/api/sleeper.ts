// app/api/sleeper.ts
export async function getLeague(leagueId: string) {
  const res = await fetch(`https://api.sleeper.app/v1/league/${leagueId}`);
  if (!res.ok) throw new Error("Failed to fetch league");
  return res.json();
}

export async function getMatchups(leagueId: string, week: number) {
  const res = await fetch(
    `https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`
  );
  if (!res.ok) throw new Error("Failed to fetch matchups");
  return res.json();
}

export async function getUsers(leagueId: string) {
  const res = await fetch(`https://api.sleeper.app/v1/league/${leagueId}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function getRosters(leagueId: string) {
  const res = await fetch(
    `https://api.sleeper.app/v1/league/${leagueId}/rosters`
  );
  if (!res.ok) throw new Error("Failed to fetch rosters");
  return res.json();
}

let playersCache: Record<string, any> | null = null;

export async function getPlayers() {
  if (playersCache) return playersCache;

  const res = await fetch("https://api.sleeper.app/v1/players/nfl");
  if (!res.ok) throw new Error("Failed to fetch players");
  playersCache = await res.json();
  return playersCache;
}
