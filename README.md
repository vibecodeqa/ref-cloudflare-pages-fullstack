# Cloudflare Pages Fullstack Reference

Reference implementation for the VibeCode QA Cloudflare Pages Fullstack rubric.

This repo demonstrates a small static React app co-deployed with Cloudflare Pages
Functions:

- `web/`: Vite + React + TypeScript SPA
- `functions/`: same-origin Pages Functions under `/api/*`
- `shared/`: shared TypeScript contracts and runtime schemas
- `wrangler.toml`: Pages deploy shape, preview/prod vars, and binding separation
- `.github/workflows/`: CI and deploy gates

## Local workflow

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
pnpm smoke:preview
```

Run a local Pages preview:

```bash
pnpm pages:dev
```

The demo API reserves `/api/*` for Functions. The SPA owns routes such as `/` and
`/dashboard`, while `/api/health` and `/api/profile` are served by Pages Functions.

## Environment policy

`VITE_*` values are public browser configuration. Secrets belong in Cloudflare Pages
environment variables or secrets, not in source and not in Vite variables.

Preview may set `ALLOW_LOCAL_AUTH_HEADER=true` to let smoke tests pass an `x-vcqa-user`
header. Production keeps that disabled and expects Cloudflare Access or another trusted
identity layer to provide authenticated user context.

## VCQA role

This repo is a scanner fixture and template for:

- SPA fallback plus `/api/*` route ownership
- server-side auth enforcement in Functions middleware
- public client config versus server-side bindings
- typed request/response schemas across the SPA/API seam
- local preview smoke evidence
- CI gates before Pages deploy

See [docs/vcqa-report.md](docs/vcqa-report.md).

