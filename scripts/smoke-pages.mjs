import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = 8788;
const baseUrl = `http://127.0.0.1:${port}`;

const server = spawn(
  "pnpm",
  [
    "exec",
    "wrangler",
    "pages",
    "dev",
    "web/dist",
    "--port",
    String(port),
    "--compatibility-date=2026-07-25",
    "--binding",
    "ALLOW_LOCAL_AUTH_HEADER=true",
    "--binding",
    "PUBLIC_API_BASE=/api",
    "--binding",
    "AUTH_PROVIDER=local-preview"
  ],
  {
    env: {
      ...process.env,
      ALLOW_LOCAL_AUTH_HEADER: "true",
      PUBLIC_API_BASE: "/api"
    },
    stdio: ["ignore", "pipe", "pipe"]
  }
);

let output = "";
server.stdout.on("data", (chunk) => { output += chunk.toString(); });
server.stderr.on("data", (chunk) => { output += chunk.toString(); });

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // keep waiting
    }
    await delay(500);
  }
  throw new Error(`Timed out waiting for wrangler pages dev\n${output}`);
}

async function expectStatus(path, expected, init) {
  const response = await fetch(`${baseUrl}${path}`, init);
  if (response.status !== expected) {
    throw new Error(`${path} returned ${response.status}, expected ${expected}`);
  }
  return response;
}

try {
  await waitForServer();

  await expectStatus("/api/health", 200);
  await expectStatus("/api/profile", 401);
  await expectStatus("/api/profile", 200, { headers: { "x-vcqa-user": "demo-user" } });

  const deepLink = await expectStatus("/dashboard", 200);
  const html = await deepLink.text();
  if (!html.includes("id=\"root\"")) throw new Error("SPA deep link did not return index.html");

  console.log("Pages preview smoke passed");
} finally {
  server.kill("SIGTERM");
}
