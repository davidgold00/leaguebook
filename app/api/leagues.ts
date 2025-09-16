"use client";

export type League = {
  id: string;
  platform: "Yahoo" | "Sleeper" | "ESPN";
  name: string;
  myUserId?: string; // NEW
};

export async function getLeagues(): Promise<League[]> {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("leagues");
  return raw ? JSON.parse(raw) : [];
}

export async function addLeague(
  id: string,
  platform: League["platform"],
  name: string,
  myUserId?: string
): Promise<League[]> {
  const leagues = await getLeagues();
  const updated = [...leagues, { id, platform, name, myUserId }];
  localStorage.setItem("leagues", JSON.stringify(updated));

  if (platform === "Sleeper") {
    localStorage.setItem("activeSleeperLeague", id);
  }

  return updated;
}

export async function removeLeague(id: string): Promise<League[]> {
  const leagues = await getLeagues();
  const updated = leagues.filter((l) => l.id !== id);
  localStorage.setItem("leagues", JSON.stringify(updated));

  if (id === localStorage.getItem("activeSleeperLeague")) {
    localStorage.removeItem("activeSleeperLeague");
  }

  return updated;
}
