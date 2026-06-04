set shell := ["bash", "-cu"]

build:
	just db-reset
	cd backend && go build ./...
	cd frontend && npm run build

test: test-backend test-frontend test-e2e

test-backend:
	cd backend && go test ./...

test-frontend:
	cd frontend && npm run test

test-e2e:
	cd frontend && npm run test:e2e

[env("SLOWMO", "500")]
test-e2e-headed:
	cd frontend && npm run test:e2e -- --headed --workers=1

run-backend:
	just db-reset
	cd backend && go run .

run-frontend:
	cd frontend && npm run dev

fmt:
	cd backend && gofmt -w *.go
	cd frontend && npm run fmt
	git ls-files '*.md' | tr '\n' '\0' | xargs -0 npx --prefix frontend markdownlint-cli2 --fix

lint:
	cd backend && go test ./...
	cd frontend && npm run lint
	git ls-files '*.md' | tr '\n' '\0' | xargs -0 npx --prefix frontend markdownlint-cli2

dev:
	( just run-backend ) &
	just run-frontend

db-reset:
	cd backend && go run . -reset-db
