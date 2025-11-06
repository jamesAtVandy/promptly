# promptlyV1

Full‑stack TypeScript monorepo with:
- Frontend: React + Vite (TypeScript)
- Backend: Node.js + Express (TypeScript)
- Database: MongoDB (official driver)
- Tooling: npm workspaces, ESLint (flat config), Prettier, GitHub Actions

This repo is set up for fast local development: the Vite dev server proxies API calls to the Express server, and the backend includes a simple MongoDB‑backed CRUD example.

## Tech Stack

- Frontend: React 18, Vite 5, TypeScript
- Backend: Node 20+, Express 4, TypeScript, tsx for dev
- Database: MongoDB (Atlas or local), `mongodb` driver
- Tooling: npm workspaces, ESLint v9 (flat config), Prettier 3, concurrently, GitHub Actions CI (lint + build)

## Project Structure

```
promptlyV1/
  apps/
    client/                 # React + Vite + TypeScript
      src/
        App.tsx             # Simple UI incl. items CRUD
        api.ts              # API helpers (fetch/create/update/delete)
        main.tsx
      index.html
      vite.config.ts        # Dev proxy: /api -> http://localhost:4000
      .env.example          # VITE_API_BASE=/api (optional override)
    server/                 # Express + TypeScript + MongoDB
      src/
        index.ts            # Server, routes, CORS, JSON, health/hello
        db.ts               # Mongo connection helper
        routes/
          items.ts          # CRUD: /api/items
      .env.example          # MONGODB_URI, MONGODB_DB_NAME, PORT
  .github/workflows/ci.yml  # Lint + build on push/PR
  eslint.config.js          # ESLint flat config
  package.json              # Workspaces + root scripts
```

## Prerequisites

- Node.js 20+ (22.x is fine) and npm
- A MongoDB connection string (Atlas or local)

## First‑Time Setup

1. Install dependencies
   - `npm install`
2. Configure backend environment
   - Copy `apps/server/.env.example` to `apps/server/.env`
   - Set `MONGODB_URI` and `MONGODB_DB_NAME` (optionally `PORT`, default 4000)
3. Optional: client environment
   - Copy `apps/client/.env.example` to `apps/client/.env` to override `VITE_API_BASE` (default `/api`)

## Running Locally

- Dev mode (runs both servers):
  - `npm run dev`
  - Frontend: http://localhost:5173
  - Backend:  http://localhost:4000
  - Vite dev proxy forwards `/api/*` to the backend.

- Build:
  - `npm run build` (builds backend and frontend)

- Start backend (after build):
  - `npm run start` (runs compiled Express server from `apps/server/dist`)
  - Note: the backend does not serve the built frontend yet; deploy the client separately or add static hosting later.

## How It Works (Today)

- `GET /api/health` — quick server check
- `GET /api/hello` — simple message; touches the DB to validate connectivity
- Items CRUD (MongoDB collection `items`):
  - `GET /api/items` — list latest 100 items
  - `POST /api/items` — create `{ title: string, description?: string }`
  - `PUT /api/items/:id` — update `title`/`description`
  - `DELETE /api/items/:id` — delete by id

The React app:
- Displays a message from `/api/hello`
- Provides a form to create items and a list with delete actions

## Testing The API (manual)

- Health:
  - `curl http://localhost:4000/api/health`
- Hello (requires valid Mongo env):
  - `curl http://localhost:4000/api/hello`
- List items:
  - `curl http://localhost:4000/api/items`
- Create item:
  - `curl -X POST http://localhost:4000/api/items -H "Content-Type: application/json" -d '{"title":"Test","description":"Desc"}'`
- Update item:
  - `curl -X PUT http://localhost:4000/api/items/<id> -H "Content-Type: application/json" -d '{"title":"Updated"}'`
- Delete item:
  - `curl -X DELETE http://localhost:4000/api/items/<id>`

## Scripts

- `npm run dev` — run server and client concurrently
- `npm run build` — build backend (tsc) and client (vite)
- `npm run start` — start compiled backend
- `npm run lint` — ESLint (flat config)
- `npm run lint:fix` — ESLint with `--fix`
- `npm run format` — Prettier write
- `npm run format:check` — Prettier check

Workspace‑specific (optional):
- `npm run -w @promptlyV1/server dev|build|start`
- `npm run -w @promptlyV1/client dev|build|preview`

## Environment Variables

Backend (`apps/server/.env`):
```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
MONGODB_DB_NAME=promptlyV1
PORT=4000
```

Client (`apps/client/.env`, optional):
```
VITE_API_BASE=/api
```

## CI

- GitHub Actions at `.github/workflows/ci.yml` runs on push/PR to `main`:
  - Node 20, `npm ci`, `npm run lint`, `npm run build`.

## Notes & Tips

- CORS allows `http://localhost:5173` in dev; adjust in `apps/server/src/index.ts` if needed.
- If `/api/hello` fails, check your MongoDB env variables.
- The backend uses a lazy DB connection on first use via `getDb()`.
- For Windows line ending warnings (CRLF vs LF), this is harmless.

## Roadmap Ideas

- Serve client build from Express in production
- Add auth, validation, and testing (Jest/Vitest)
- Containerize with Docker and add Mongo via Compose
