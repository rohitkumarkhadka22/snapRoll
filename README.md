# SnapRoll

SnapRoll currently consists of a React/Vite marketing and interactive prototype frontend plus an Express API for the AI assistant.

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

The Vite development server proxies `/api` and `/health` to the backend on port 5001.

## Verification

```sh
cd snaproll && npm run check
cd ../backend && npm run check
```

These commands run linting, unit/integration tests, syntax checks, and the production frontend build.

## Production configuration

- Serve the frontend and API from the same HTTPS origin when possible. Otherwise set backend `CLIENT_ORIGINS` and frontend `VITE_API_BASE_URL` to matching HTTPS origins.
- Set `VITE_PUBLIC_APP_URL` to the public frontend origin.
- Set `VITE_CONTACT_ENDPOINT` to an HTTPS service that validates, rate-limits, and delivers contact messages.
- Configure `OLLAMA_URL` and `OLLAMA_MODEL` for the production AI service. Do not expose that service publicly.
- Route platform health checks to `/health`.
- Add platform-level TLS, CSP/HSTS headers, distributed rate limiting, structured logs, and error monitoring.

## Current product scope

Authentication, persistent events, guest identities, uploads, galleries, reactions, comments, payments, and notifications are not present in this repository. The event and camera experiences in the frontend are demonstrations. They must not be represented as a complete production application until those server-side systems and their authorization tests exist.
