import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import type { Profile } from "@vcqa-ref/shared";
import { loadProfile } from "./api";

function Home() {
  return (
    <main className="page">
      <h1>Pages Fullstack Reference</h1>
      <p>
        Static React routes and same-origin Cloudflare Pages Functions deploy together.
      </p>
      <Link to="/dashboard">Open dashboard</Link>
    </main>
  );
}

function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadProfile()
      .then(setProfile)
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Request failed");
      });
  }, []);

  return (
    <main className="page">
      <h1>Dashboard</h1>
      <p>Protected data is requested from <code>/api/profile</code>.</p>
      {profile ? (
        <p role="status">Signed in as {profile.displayName} on the {profile.plan} plan.</p>
      ) : (
        <p role="status">{error ?? "Loading profile..."}</p>
      )}
      <Link to="/">Back home</Link>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

