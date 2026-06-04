package main

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"strings"
)

type app struct {
	db *sql.DB
}

func (a *app) routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/skills", a.handleSkills)
	mux.HandleFunc("/api/skills/", a.handleSkillByID)
	return mux
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func (a *app) handleSkills(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		a.listSkillsHandler(w)
	case http.MethodPost:
		a.createSkillHandler(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func (a *app) handleSkillByID(w http.ResponseWriter, r *http.Request) {
	id, ok := parseSkillID(r.URL.Path)
	if !ok {
		writeJSON(w, http.StatusBadRequest, validationError())
		return
	}

	switch r.Method {
	case http.MethodPatch:
		a.renameSkillHandler(w, r, id)
	case http.MethodDelete:
		a.deleteSkillHandler(w, id)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}

func parseSkillID(path string) (int64, bool) {
	part := strings.TrimPrefix(path, "/api/skills/")
	if part == "" || strings.Contains(part, "/") {
		return 0, false
	}
	id, err := strconv.ParseInt(part, 10, 64)
	if err != nil || id < 1 {
		return 0, false
	}
	return id, true
}

func (a *app) listSkillsHandler(w http.ResponseWriter) {
	skills, err := listSkills(a.db)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, ErrorResponse{Code: "INTERNAL", Message: "Internal server error."})
		return
	}
	writeJSON(w, http.StatusOK, skills)
}

func decodeSkillInput(r *http.Request) (SkillInput, bool) {
	var in SkillInput
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		return SkillInput{}, false
	}
	return in, true
}

func (a *app) createSkillHandler(w http.ResponseWriter, r *http.Request) {
	in, ok := decodeSkillInput(r)
	if !ok {
		writeJSON(w, http.StatusBadRequest, validationError())
		return
	}
	normalized := normalizeSkillName(in.Name)
	if !validateSkillName(normalized) {
		writeJSON(w, http.StatusBadRequest, validationError())
		return
	}
	exists, err := skillExistsByName(a.db, normalized, nil)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, ErrorResponse{Code: "INTERNAL", Message: "Internal server error."})
		return
	}
	if exists {
		writeJSON(w, http.StatusConflict, duplicateError())
		return
	}
	skill, err := createSkill(a.db, normalized)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, ErrorResponse{Code: "INTERNAL", Message: "Internal server error."})
		return
	}
	writeJSON(w, http.StatusCreated, skill)
}

func (a *app) renameSkillHandler(w http.ResponseWriter, r *http.Request, id int64) {
	in, ok := decodeSkillInput(r)
	if !ok {
		writeJSON(w, http.StatusBadRequest, validationError())
		return
	}
	normalized := normalizeSkillName(in.Name)
	if !validateSkillName(normalized) {
		writeJSON(w, http.StatusBadRequest, validationError())
		return
	}
	exists, err := skillExistsByName(a.db, normalized, &id)
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, ErrorResponse{Code: "INTERNAL", Message: "Internal server error."})
		return
	}
	if exists {
		writeJSON(w, http.StatusConflict, duplicateError())
		return
	}
	skill, err := renameSkill(a.db, id, normalized)
	if errors.Is(err, sql.ErrNoRows) {
		writeJSON(w, http.StatusNotFound, notFoundError())
		return
	}
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, ErrorResponse{Code: "INTERNAL", Message: "Internal server error."})
		return
	}
	writeJSON(w, http.StatusOK, skill)
}

func (a *app) deleteSkillHandler(w http.ResponseWriter, id int64) {
	err := deleteSkill(a.db, id)
	if errors.Is(err, sql.ErrNoRows) {
		writeJSON(w, http.StatusNotFound, notFoundError())
		return
	}
	if err != nil {
		writeJSON(w, http.StatusInternalServerError, ErrorResponse{Code: "INTERNAL", Message: "Internal server error."})
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
