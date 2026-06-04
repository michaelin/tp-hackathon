package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func setupApp(t *testing.T) *app {
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
	return &app{db: db}
}

func request(t *testing.T, h http.Handler, method, path string, body any) *httptest.ResponseRecorder {
	t.Helper()
	var buf bytes.Buffer
	if body != nil {
		if err := json.NewEncoder(&buf).Encode(body); err != nil {
			t.Fatalf("encode body: %v", err)
		}
	}
	req := httptest.NewRequest(method, path, &buf)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	rr := httptest.NewRecorder()
	h.ServeHTTP(rr, req)
	return rr
}

func TestListSkillsSeededAndSorted(t *testing.T) {
	a := setupApp(t)
	rr := request(t, a.routes(), http.MethodGet, "/api/skills", nil)
	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
	var got []Skill
	if err := json.NewDecoder(rr.Body).Decode(&got); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if len(got) != 3 {
		t.Fatalf("expected 3 skills, got %d", len(got))
	}
	if got[0].Name != "Automated Testing" || got[1].Name != "Go" || got[2].Name != "TypeScript" {
		t.Fatalf("unexpected sort order: %#v", got)
	}
}

func TestCreateSkill(t *testing.T) {
	a := setupApp(t)
	rr := request(t, a.routes(), http.MethodPost, "/api/skills", SkillInput{Name: "Rust"})
	if rr.Code != http.StatusCreated {
		t.Fatalf("expected 201, got %d: %s", rr.Code, rr.Body.String())
	}

	rrDup := request(t, a.routes(), http.MethodPost, "/api/skills", SkillInput{Name: " rust "})
	if rrDup.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d", rrDup.Code)
	}
	var dup ErrorResponse
	_ = json.NewDecoder(rrDup.Body).Decode(&dup)
	if dup.Message != DuplicateSkillMessage {
		t.Fatalf("expected duplicate message parity, got %q", dup.Message)
	}
}

func TestCreateSkillValidation(t *testing.T) {
	a := setupApp(t)
	rr := request(t, a.routes(), http.MethodPost, "/api/skills", SkillInput{Name: "    "})
	if rr.Code != http.StatusBadRequest {
		t.Fatalf("expected 400, got %d", rr.Code)
	}
}

func TestRenameSkill(t *testing.T) {
	a := setupApp(t)
	rr := request(t, a.routes(), http.MethodPatch, "/api/skills/1", SkillInput{Name: "Golang"})
	if rr.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", rr.Code)
	}
	var skill Skill
	_ = json.NewDecoder(rr.Body).Decode(&skill)
	if skill.ID != 1 || skill.Name != "Golang" {
		t.Fatalf("unexpected rename response: %#v", skill)
	}

	_ = request(t, a.routes(), http.MethodPost, "/api/skills", SkillInput{Name: "Rust"})
	rrDup := request(t, a.routes(), http.MethodPatch, "/api/skills/1", SkillInput{Name: "RUST"})
	if rrDup.Code != http.StatusConflict {
		t.Fatalf("expected 409, got %d", rrDup.Code)
	}
}

func TestDeleteSkill(t *testing.T) {
	a := setupApp(t)
	rr := request(t, a.routes(), http.MethodDelete, "/api/skills/1", nil)
	if rr.Code != http.StatusNoContent {
		t.Fatalf("expected 204, got %d", rr.Code)
	}
	list := request(t, a.routes(), http.MethodGet, "/api/skills", nil)
	var skills []Skill
	_ = json.NewDecoder(list.Body).Decode(&skills)
	if len(skills) != 2 {
		t.Fatalf("expected 2 skills after delete, got %d", len(skills))
	}
}
