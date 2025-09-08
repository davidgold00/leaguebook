'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/api/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    await login(username);
    router.push("/dashboard");
  }
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <form onSubmit={handleSubmit} className="card p-8 w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Enter username"
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />
        <button type="submit" className="w-full bg-gray-900 text-white rounded-lg py-2">Login</button>
      </form>
    </div>
  );
}
