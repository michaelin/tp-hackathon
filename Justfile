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

run-backend:
	cd backend && go run .

run-frontend:
	cd frontend && npm run dev

fmt:
	cd backend && gofmt -w *.go
	cd frontend && npm run fmt

lint:
	cd backend && go test ./...
	cd frontend && npm run lint

dev:
	( cd backend && go run . ) &
	cd frontend && npm run dev

db-reset:
	cd backend && go run . -reset-db
