"use client";

import { useEffect, useState } from "react";
import { getLeagues, addLeague, removeLeague, League } from "@/app/api/leagues";
import { getUsers } from "@/app/api/sleeper";
import TabNav from "@/components/TabNav";

export default function SettingsPage() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [id, setId] = useState("");
  const [platform, setPlatform] = useState<League["platform"]>("Sleeper");
  const [name, setName] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [myUserId, setMyUserId] = useState("");

  useEffect(() => {
    getLeagues().then(setLeagues);
  }, []);

  async function handleLeagueIdBlur() {
    if (platform === "Sleeper" && id) {
      try {
        const u = await getUsers(id);
        setUsers(u);
      } catch {
        setUsers([]);
      }
    }
  }

  async function handleAdd(e: any) {
    e.preventDefault();
    const updated = await addLeague(id, platform, name || `${platform} League`, myUserId);
    setLeagues(updated);
    setId("");
    setName("");
    setUsers([]);
    setMyUserId("");
  }

  async function handleRemove(lid: string) {
    const updated = await removeLeague(lid);
    setLeagues(updated);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <TabNav />
      </div>

      <form onSubmit={handleAdd} className="card p-4 flex gap-2 items-end">
        <div className="flex flex-col flex-1">
          <label className="text-sm">League ID</label>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            onBlur={handleLeagueIdBlur}
            className="border px-2 py-1 rounded"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm">Platform</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="border px-2 py-1 rounded"
          >
            <option>Sleeper</option>
            <option>Yahoo</option>
            <option>ESPN</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        {platform === "Sleeper" && users.length > 0 && (
          <div className="flex flex-col flex-1">
            <label className="text-sm">Select Your Team</label>
            <select
              value={myUserId}
              onChange={(e) => setMyUserId(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="">-- Pick One --</option>
              {users.map((u) => (
                <option key={u.user_id} value={u.user_id}>
                  {u.display_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          className="bg-gray-900 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </form>

      <div className="grid gap-3">
        {leagues.map((l) => (
          <div
            key={l.id}
            className="card p-3 flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{l.name}</div>
              <div className="text-xs text-gray-500">
                {l.platform} • ID {l.id}
              </div>
              {l.platform === "Sleeper" && l.myUserId && (
                <div className="text-xs text-green-600">
                  My Team Linked ✔
                </div>
              )}
            </div>
            <button
              onClick={() => handleRemove(l.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
