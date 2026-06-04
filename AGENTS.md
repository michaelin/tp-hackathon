# Team Skills Matrix Platform

A platform that tracks skills across engineering teams, giving engineering leaders visibility into the current capabilities of their organization, highlighting gaps against target competency levels, and guiding individual development through training recommendations.

## Structure

Monorepo: `backend/` (Go), `frontend/` (React + TypeScript).

## Tooling

- **Task runner:** Justfile. All tasks (build, test, lint, fmt, dev) must be defined as `just` recipes.
- **Dependencies:** mise installs all tool versions (.mise.toml).
- **Pre-commit:** lefthook runs `just fmt` then `just lint` before every commit.
- **API contract:** OpenAPI spec lives in `api/openapi.yaml`. Backend and frontend must stay in sync with this spec.

## RTK

- Use `rtk` for shell commands to reduce token usage and keep output concise.
- Examples: `rtk git status`, `rtk git log -10`, `rtk just test`.
- Meta commands: `rtk gain`, `rtk gain --history`, `rtk discover`, `rtk proxy <cmd>`.

## Decisions

- ADRs live in `docs/adr/`.
- Create one when a decision is hard to reverse, surprising without context, and a real trade-off.

## Feature development

- Design and deliver features with [OpenSpec](https://github.com/Fission-AI/OpenSpec/) as separate change proposals.
- Review the design document before applying changes.

## Quality

- All backend functionality must be covered by unit tests with mocking to isolate business logic from the database.
- All major user flows must be covered by browser tests.
- Formatters and linters run on all code and markdown before every commit.
- Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Agent commit workflow

- Before an agent attempts any commit, it must run `rtk just fmt` then `rtk just lint`.
- If automation changes files or reports errors, the agent must include automation-driven edits and then fix any remaining non-automated issues before committing.
