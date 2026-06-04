package main

import "testing"

func newTestDB(t *testing.T) *testDB {
	t.Helper()
	db, err := openDB(":memory:")
	if err != nil {
		t.Fatalf("openDB: %v", err)
	}
	if err := resetSchema(db); err != nil {
		t.Fatalf("resetSchema: %v", err)
	}
	if err := seedFoundationalSkills(db); err != nil {
		t.Fatalf("seedFoundationalSkills: %v", err)
	}
	return &testDB{db: db}
}

type testDB struct {
	db closer
}

type closer interface {
	Close() error
}

func TestSeedIsIdempotent(t *testing.T) {
	db, err := openDB(":memory:")
	if err != nil {
		t.Fatalf("openDB: %v", err)
	}
	defer db.Close()

	if err := resetSchema(db); err != nil {
		t.Fatalf("resetSchema: %v", err)
	}
	if err := seedFoundationalSkills(db); err != nil {
		t.Fatalf("seed #1: %v", err)
	}
	if err := seedFoundationalSkills(db); err != nil {
		t.Fatalf("seed #2: %v", err)
	}

	skills, err := listSkills(db)
	if err != nil {
		t.Fatalf("listSkills: %v", err)
	}
	if len(skills) != 3 {
		t.Fatalf("expected 3 seeded skills, got %d", len(skills))
	}
}
