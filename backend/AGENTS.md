# Backend

Go, using the standard library `net/http` for routing and handlers.

## Database

SQLite via `modernc.org/sqlite` (pure Go, no CGO). Use `database/sql` for all DB access.

## Structure

Flat package layout: `main.go`, `handlers.go`, `models.go`, `db.go`, etc. Only split into packages when complexity demands it.

## Code quality

- Formatter: `gofmt`
- Linter: `golangci-lint`

## Testing

Go `testing` package with `github.com/stretchr/testify` for assertions and mocks. Mock the database layer to isolate business logic in unit tests.
