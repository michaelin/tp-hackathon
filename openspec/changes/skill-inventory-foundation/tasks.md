# Slice 1 - Catalog List Vertical

- [x] 1.1 Add `GET` skill catalog contract to `api/openapi.yaml`.
- [x] 1.2 Implement backend list endpoint with deterministic case-insensitive ascending sort.
- [x] 1.3 Implement local build schema reset + seed for foundational skills.
- [x] 1.4 Implement frontend global catalog list screen with approved token/typography system.
- [x] 1.5 Add backend unit tests for list and seed behavior.
- [x] 1.6 Add frontend tests and at least one browser flow for list view.
- [x] 1.7 Pass quality gates: OpenAPI valid, tests pass, `just fmt`, `just lint`.

## 2. Slice 2 - Add Skill Vertical

- [x] 2.1 Add `POST` skill contract (request/response/errors) to `api/openapi.yaml`.
- [x] 2.2 Implement shared normalization and validation utilities in backend (Unicode, 1-80 length, duplicate check).
- [x] 2.3 Implement add-skill backend endpoint using parameterized queries and shared duplicate error handling.
- [x] 2.4 Implement add-skill frontend flow with mirrored validation, red-border invalid state, dynamic error text, disabled submit on invalid input.
- [x] 2.5 Add backend unit tests for add success, duplicate rejection, and validation failures.
- [x] 2.6 Add frontend tests and at least one browser flow for add success/failure.
- [x] 2.7 Pass quality gates: OpenAPI valid, tests pass, `just fmt`, `just lint`.

## 3. Slice 3 - Rename Skill Vertical

- [x] 3.1 Add `PATCH` skill rename contract to `api/openapi.yaml`.
- [x] 3.2 Implement rename endpoint reusing shared normalization, duplicate check, and error message.
- [x] 3.3 Implement rename UI flow with parity to add validation behavior.
- [x] 3.4 Add backend unit tests for rename success, duplicate rejection, and identity preservation.
- [x] 3.5 Add frontend tests and at least one browser flow for rename success/failure.
- [x] 3.6 Pass quality gates: OpenAPI valid, tests pass, `just fmt`, `just lint`.

## 4. Slice 4 - Delete Skill Vertical

- [x] 4.1 Add `DELETE` skill contract to `api/openapi.yaml`.
- [x] 4.2 Implement immediate hard-delete backend behavior.
- [x] 4.3 Implement delete UI action without confirmation dialog.
- [x] 4.4 Add backend unit tests for delete behavior.
- [x] 4.5 Add frontend tests and at least one browser flow for delete behavior.
- [x] 4.6 Pass quality gates: OpenAPI valid, tests pass, `just fmt`, `just lint`.

## 5. Slice 5 - Hardening Vertical

- [x] 5.1 Consolidate shared validation and duplicate-error handling across all catalog operations.
- [x] 5.2 Add edge-case test coverage for Unicode normalization and case-insensitive uniqueness.
- [x] 5.3 Improve browser-flow coverage for complete catalog CRUD journey.
- [x] 5.4 Confirm final OpenAPI examples/error contracts match implementation.
- [x] 5.5 Pass final quality gates: OpenAPI valid, full tests pass, `just fmt`, `just lint`.
