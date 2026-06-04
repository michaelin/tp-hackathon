# Why

The project needs a foundational, releasable skill inventory feature that establishes the architecture pattern for future capabilities. Building this in thin, full vertical slices (contract, backend, frontend, tests, quality gates) creates immediate user value and enforces strong engineering discipline.

## What Changes

- Introduce a global skill catalog feature with list, add, rename, and delete operations.
- Implement OpenAPI-first development for each vertical slice.
- Enforce shared validation behavior in frontend and backend:
  - Full Unicode support for skill names
  - Name normalization (trim edges, collapse repeated internal spaces)
  - Length constraint (1-80 after normalization)
  - Case-insensitive uniqueness
- Standardize duplicate handling with reusable logic and reusable error messaging.
- Add local build behavior that overwrites schema and reseeds foundational data.
- Seed foundational skills: Go, TypeScript, Automated Testing.
- Deliver a non-generic frontend aligned to approved design direction and tokens.

## Capabilities

### New Capabilities

- `skill-catalog-management`: Manage the global skill catalog through releasable vertical slices with consistent validation and error handling.

### Modified Capabilities

- None.

## Impact

- API contract in `api/openapi.yaml`
- Backend service, repository, and validation layers in Go
- Frontend catalog screen and validation UX in React + TypeScript
- Browser flow coverage for each slice
- Build workflow updates for local schema reset and seed behavior
