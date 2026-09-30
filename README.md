# SnapRoll

SnapRoll consists of a React application rendered with the Next.js App Router plus an Express API for the AI assistant. Public marketing routes are pre-rendered as crawlable HTML and hydrated for interactive behavior in the browser.

## Local development

Requires Node.js 20.19 or newer.

```sh
cd backend
cp .env.example .env
npm ci
npm run dev
```

In another terminal:

```sh
cd snaproll
cp .env.example .env
npm ci
npm run dev
```

The Next.js development server runs on port 3000 and proxies `/api` and `/health` to the Express backend on port 5001.

## Verification

```sh
cd snaproll && npm run check
cd ../backend && npm run check
```

These commands run linting, unit/integration tests, syntax checks, and the production frontend build.

## Production configuration

- Set frontend `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin before building so canonical URLs, invite links, `robots.txt`, and `sitemap.xml` do not use localhost.
- Set frontend `BACKEND_URL` to the private Express origin. If the browser calls Express directly instead of the built-in proxy, set `NEXT_PUBLIC_API_BASE_URL` and backend `CLIENT_ORIGINS` to matching HTTPS origins.
- Set `NEXT_PUBLIC_CONTACT_ENDPOINT` to an HTTPS service that validates, rate-limits, and delivers contact messages.
- Configure `OLLAMA_URL` and `OLLAMA_MODEL` for the production AI service. Do not expose that service publicly.
- Route platform health checks to `/health`.
- Add platform-level TLS, CSP/HSTS headers, distributed rate limiting, structured logs, and error monitoring.

After deployment, submit `/sitemap.xml` in Google Search Console. Search visibility is influenced by content quality, competition, links, performance, and time; technical rendering alone cannot guarantee a first-place ranking.

## Current product scope

Authentication, persistent events, guest identities, uploads, galleries, reactions, comments, payments, and notifications are not present in this repository. The event and camera experiences in the frontend are demonstrations. They must not be represented as a complete production application until those server-side systems and their authorization tests exist.
