# Team Skills Matrix Platform

Monorepo for a skills inventory platform with:

- Backend: Go (`net/http`) + SQLite (`modernc.org/sqlite`)
- Frontend: React + TypeScript + Vite
- Contract: OpenAPI in `api/openapi.yaml`

## Repository Layout

- `backend/`: Go API service
- `frontend/`: React web app
- `api/`: OpenAPI contract
- `openspec/`: change proposals and task tracking
- `docs/adr/`: architectural decision records

## Prerequisites

- `mise`
- `just`
- Go (current module targets `go 1.24.0`)
- Node.js 20+

The repository includes `.mise.toml` for tool versions.

## Initial Setup

From the repository root:

```bash
mise trust .mise.toml
mise install

cd frontend && npm install
cd ..
```

Optional (for browser tests):

```bash
cd frontend && npx playwright install chromium
cd ..
```

## Development Guide

### 1) Reset and Seed Local Database

```bash
just db-reset
```

This recreates schema and seeds foundational skills:

- Go
- TypeScript
- Automated Testing

### 2) Run Backend and Frontend Together

```bash
just dev
```

- Backend API: `http://localhost:8080`
- Frontend app: `http://localhost:5173`

### 3) Run Services Manually (Alternative)

Backend:

```bash
cd backend
go run .
```

Backend with custom DB path:

```bash
cd backend
go run . -db-path /path/to/skills.db
```

Frontend:

```bash
cd frontend
npm run dev
```

## Test Guide

### Run Full Test Suite

```bash
just test
```

This runs:

- Backend unit tests (`go test ./...`)
- Frontend unit tests (Vitest)
- Browser flows (Playwright)

### Run Test Targets Individually

```bash
just test-backend
just test-frontend
just test-e2e
```

### Frontend Test Watch Mode

```bash
cd frontend
npm run test:watch
```

## Quality Gates

Format all code:

```bash
just fmt
```

Run lint checks:

```bash
just lint
```

Notes:

- Backend formatting uses `gofmt`
- Frontend formatting uses `prettier`
- Frontend linting uses `eslint`

## Build Guide

Build everything from root:

```bash
just build
```

The build flow performs:

1. `just db-reset`
2. Backend build (`go build ./...`)
3. Frontend production build (`npm run build`)

Frontend build output is in `frontend/dist/`.

## Deployment Guide

This repository currently supports a local-first deployment model.

### Backend Deployment

1. Build backend binary:

```bash
cd backend
go build -o skill-inventory-backend .
```

1. Initialize database once on target host:

```bash
./skill-inventory-backend -reset-db -db-path /var/lib/skill-inventory/skills.db
```

1. Run service:

```bash
./skill-inventory-backend -db-path /var/lib/skill-inventory/skills.db
```

Default API bind address is `:8080`.

### Frontend Deployment

1. Build static assets:

```bash
cd frontend
npm run build
```

1. Serve `frontend/dist/` behind your static web server or CDN.

2. Ensure frontend can reach the backend API at `http://<backend-host>:8080` (or update client base URL strategy if you proxy requests).

### Suggested Deployment Checklist

Before releasing:

```bash
just fmt
just lint
just test
just build
```

Then deploy backend binary + SQLite data path and frontend static bundle.

## API Contract

OpenAPI source of truth:

- `api/openapi.yaml`

Keep backend and frontend behavior aligned with this contract for each change slice.
