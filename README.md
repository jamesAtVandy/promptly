# promptlyV1

Full‑stack TypeScript monorepo with:
- Frontend: React + Vite (TypeScript)
- Backend: Node.js + Express (TypeScript)
- Database: MongoDB (via official driver)
- Package manager: npm (workspaces)

## Getting Started

1. Install dependencies:
   - `npm install`

2. Create a `.env` file for the backend (copy from `apps/server/.env.example`).

3. Run dev servers (concurrently):
   - `npm run dev`
   - Frontend: http://localhost:5173
   - Backend:  http://localhost:4000

The frontend dev server proxies `/api/*` to the backend.

## Scripts

- `npm run dev` – runs server and client concurrently
- `npm run build` – builds backend and frontend
- `npm run start` – starts compiled backend (`apps/server`)

## Structure

```
promptlyV1/
  apps/
    client/   # React + Vite + TS
    server/   # Express + TS + Mongo
  package.json  # npm workspaces and root scripts
```

## Environment

Backend expects:
```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
MONGODB_DB_NAME=promptlyV1
PORT=4000
```

## Notes

- Vite dev server proxies `/api` to `http://localhost:4000`.
- CORS is enabled for `http://localhost:5173` in development.
