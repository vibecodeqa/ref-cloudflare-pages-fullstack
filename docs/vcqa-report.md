# VCQA Report

Score: **92/100**

This reference repo is intentionally small, but it carries the evidence VCQA expects from
a Cloudflare Pages Fullstack project.

## Covered by authored standards

- [Cloudflare Pages Fullstack v1](https://vibecodeqa.online/standards/cloudflare-pages-fullstack/v1/):
  same-origin `/api/*` Functions, SPA fallback, middleware auth, binding separation, typed
  seam contracts, CI gates, and preview smoke checks.
- [React SPA v1](https://vibecodeqa.online/standards/react-spa/v1/): Vite React SPA,
  static build output, React Router deep links, public config discipline, and UI tests.
- [Security v1](https://vibecodeqa.online/standards/security/v1/): server-side auth,
  safe client errors, no committed secrets, least-privilege workflow permissions, and
  explicit environment boundaries.
- [Testing v1](https://vibecodeqa.online/standards/testing/v1/): shared contract tests,
  frontend behavior tests, Functions auth/validation tests, and route smoke checks.
- [TypeScript v1](https://vibecodeqa.online/standards/typescript/v1/): strict TypeScript
  projects for shared contracts, frontend, and Pages Functions.

## Cloudflare Pages evidence

- `functions/api/*` owns the `/api/*` namespace.
- `web/public/_redirects` keeps `/api/*` out of the SPA fallback and sends UI deep links
  to `index.html`.
- `functions/_middleware.ts` rejects unauthenticated protected API requests before route
  logic runs.
- `wrangler.toml` separates preview and production variables.
- `.github/workflows/ci.yml` runs typecheck, tests, build, preview smoke, and deploy-shape
  validation.
- `.github/workflows/deploy.yml` repeats the gates before Pages deploy and publishes with
  `--branch main`.

## Remaining standard gaps

- Dependency Hygiene is still planned, though this repo pins a package manager and lockfile.
- Accessibility is still planned; this fixture keeps semantic landmarks, labels, and status
  regions but does not claim a full WCAG audit.

## Why this is not 100

The repo does not connect to a real Cloudflare Access tenant or production Pages project.
A production app should add real identity-provider verification, protected deployment
environments, alerting, rollback procedures, and retained deployment smoke evidence.

