# Copilot Instructions

## Commands (run from apps/cloud-dashboard)
- npm install
- npm run dev
- npm run build
- npm run start

## Architecture overview
- Monorepo with a single Next.js 14 app in apps/cloud-dashboard using the App Router (app/).
- Landing page in app/page.tsx routes users to /dashboard; dashboard UI is composed of client components in components/ and hooks/use-pusher.ts.
- Real-time incident flow: app/api/incident/route.ts validates x-agent-secret (AGENT_SECRET_TOKEN) and triggers Pusher on channel "critical-alert" event "threat-detected"; the dashboard subscribes to the same channel/event to drive alert state and audio.
- Simulation data flow: /api/simulation/train writes entropy samples to Postgres (file_history) via @vercel/postgres; /api/simulation/history returns the latest 50 points for the seismograph; /api/simulation/attack triggers a synthetic incident via Pusher.
- Database schema for file_history is documented in README and used by scripts/setup-db.mjs (Neon).

## Project conventions
- Client components are marked with 'use client'; API routes live under app/api/**/route.ts and return NextResponse JSON.
- Tailwind CSS is used throughout; prefer the cn() helper from lib/utils.ts for conditional classNames.
- Keep Pusher channel/event names in sync between server routes and hooks (critical-alert / threat-detected).
- Shared cross-app types and constants live in shared/ (types.ts, constants.ts) instead of duplicating literals.
- Environment variables required for runtime: NEXT_PUBLIC_PUSHER_KEY, PUSHER_APP_ID, PUSHER_SECRET, PUSHER_CLUSTER, POSTGRES_URL, AGENT_SECRET_TOKEN (see README for details).
