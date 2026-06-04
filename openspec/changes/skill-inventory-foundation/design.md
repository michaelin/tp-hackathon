# Context

This change establishes the first foundational product surface for skills: a global catalog that is independently useful and releasable. The team requires full vertical slices, TDD per slice, and OpenAPI-first implementation. Current environment assumptions are local-only, and local builds may reset schema and reseed data.

## Goals / Non-Goals

**Goals:**

- Deliver global skill catalog CRUD as releasable vertical slices.
- Keep API, backend, frontend, and tests in lockstep via OpenAPI-first workflow.
- Enforce shared validation and duplicate handling across frontend and backend.
- Support full Unicode skill names while keeping the system safe against injection.
- Provide deterministic behavior for local development with build-time reset + seed.

**Non-Goals:**

- Team-target creation, editing, or clearing flows.
- Multi-environment deployment architecture (beyond local assumptions).
- Soft-delete/history/audit features for skills in this change.

## Decisions

1. OpenAPI-first per slice

- Decision: Each slice starts by updating `api/openapi.yaml`, then backend and frontend are implemented against the contract.
- Rationale: Keeps layers aligned and makes each slice release-ready.
- Alternative considered: Code-first API generation.
- Why not chosen: Higher risk of backend/frontend drift.

1. Global catalog scope only

- Decision: This feature only exposes global skill catalog operations (list/add/rename/delete).
- Rationale: Keeps scope cohesive and avoids cross-feature coupling.
- Alternative considered: Include team-target actions now.
- Why not chosen: Explicitly out of scope.

1. Validation and normalization strategy

- Decision: Validate in both frontend and backend; normalize names by trimming edges and collapsing repeated internal spaces; enforce normalized length 1-80; enforce case-insensitive uniqueness.
- Rationale: Better UX and strong data protection.
- Alternative considered: Backend-only validation.
- Why not chosen: Poor UX and weaker immediate feedback.

1. Unicode and sanitization

- Decision: Accept full Unicode names and secure via parameterized queries, server-side validation, and escaped UI rendering; avoid destructive character stripping beyond normalization.
- Rationale: Preserves valid user data while mitigating injection risk.
- Alternative considered: Character allowlist.
- Why not chosen: Unnecessarily restrictive.

1. Shared duplicate handling

- Decision: Reuse duplicate-check logic and a shared duplicate message across add/rename flows.
- Rationale: Consistency in behavior and lower maintenance cost.
- Alternative considered: Operation-specific handling.
- Why not chosen: Inconsistent UX and duplicated logic.

1. Local build reset and seed policy

- Decision: On local build, overwrite schema and reseed foundational skills.
- Rationale: Deterministic local test loop during early development.
- Alternative considered: Idempotent seed-only startup behavior.
- Why not chosen: Team preference for build-time full reset.

1. Releasable gate per slice

- Decision: Do not advance slices unless all gates pass: OpenAPI updated, backend tests, frontend tests, browser flow, `just fmt`, `just lint`.
- Rationale: Preserves release quality continuously.
- Alternative considered: deferred integration testing.
- Why not chosen: Accumulates quality debt.

## Risks / Trade-offs

- [Risk] Local build reset can hide migration concerns. -> Mitigation: treat this as local-only workflow and document clearly.
- [Risk] Full Unicode with case-insensitive uniqueness can vary by implementation details. -> Mitigation: centralize normalization/comparison utilities and test edge cases.
- [Risk] Hard delete can remove data unexpectedly. -> Mitigation: explicit UI affordances and browser tests around destructive action behavior.

## Migration Plan

1. Create/merge the new OpenAPI paths and schemas for slice 1.
2. Implement slice 1 backend + frontend + tests.
3. Run full quality gates before progressing.
4. Repeat for slices 2-5.
5. Keep local build reset + seed behavior active until full CRUD stabilization is complete.

## Open Questions

- Final HTTP error envelope format and status mapping for duplicate-name conflicts will be implemented consistently and documented in OpenAPI during slice execution.
