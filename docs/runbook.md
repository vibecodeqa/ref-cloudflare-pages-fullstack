# Runbook

## Local preview

```bash
pnpm install
pnpm pages:dev
```

Then verify:

- `http://127.0.0.1:8788/dashboard` returns the SPA.
- `http://127.0.0.1:8788/api/health` returns JSON from Pages Functions.
- `http://127.0.0.1:8788/api/profile` returns `401` without identity context.

## Environment setup

Store deploy credentials in GitHub and Cloudflare, not in the repo:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- Cloudflare Pages environment variables for production identity provider settings

Browser variables beginning with `VITE_` are public.

## Deploy gate

Production deploys must run type checks, tests, static build, preview smoke checks, and
deploy-shape validation before `wrangler pages deploy web/dist --branch main`.

