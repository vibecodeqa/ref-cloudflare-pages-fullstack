import { readFileSync } from "node:fs";

const workflow = readFileSync(".github/workflows/deploy.yml", "utf8");
const wrangler = readFileSync("wrangler.toml", "utf8");

const requiredWorkflowSnippets = [
  "pnpm run ci",
  "wrangler pages deploy web/dist",
  "--branch main",
  "CLOUDFLARE_API_TOKEN",
  "CLOUDFLARE_ACCOUNT_ID"
];

const requiredWranglerSnippets = [
  'pages_build_output_dir = "web/dist"',
  "[env.preview.vars]",
  "[env.production.vars]",
  'ALLOW_LOCAL_AUTH_HEADER = "false"'
];

const missing = [
  ...requiredWorkflowSnippets.filter((snippet) => !workflow.includes(snippet)),
  ...requiredWranglerSnippets.filter((snippet) => !wrangler.includes(snippet))
];

if (missing.length) {
  console.error("Deploy shape check failed. Missing:");
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log("Deploy shape check passed");
