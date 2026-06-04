package main

import (
	"database/sql"
	"fmt"

	_ "modernc.org/sqlite"
)

func openDB(dataSource string) (*sql.DB, error) {
	db, err := sql.Open("sqlite", dataSource)
	if err != nil {
		return nil, err
	}
	if err := db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}

func resetSchema(db *sql.DB) error {
	queries := []string{
		"DROP TABLE IF EXISTS skills;",
		"CREATE TABLE skills (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL);",
		"CREATE UNIQUE INDEX skills_name_unique_ci ON skills(name COLLATE NOCASE);",
	}
	for _, q := range queries {
		if _, err := db.Exec(q); err != nil {
			return fmt.Errorf("reset schema: %w", err)
		}
	}
	return nil
}

func seedFoundationalSkills(db *sql.DB) error {
	seedSkills := []string{"Go", "TypeScript", "Automated Testing"}
	for _, skill := range seedSkills {
		if _, err := db.Exec("INSERT OR IGNORE INTO skills(name) VALUES (?)", skill); err != nil {
			return fmt.Errorf("seed skills: %w", err)
		}
	}
	return nil
}

func listSkills(db *sql.DB) ([]Skill, error) {
	rows, err := db.Query("SELECT id, name FROM skills ORDER BY lower(name) ASC, name ASC")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	skills := make([]Skill, 0)
	for rows.Next() {
		var s Skill
		if err := rows.Scan(&s.ID, &s.Name); err != nil {
			return nil, err
		}
		skills = append(skills, s)
	}
	return skills, rows.Err()
}

func createSkill(db *sql.DB, name string) (Skill, error) {
	result, err := db.Exec("INSERT INTO skills(name) VALUES (?)", name)
	if err != nil {
		return Skill{}, err
	}
	id, err := result.LastInsertId()
	if err != nil {
		return Skill{}, err
	}
	return Skill{ID: id, Name: name}, nil
}

func renameSkill(db *sql.DB, id int64, name string) (Skill, error) {
	result, err := db.Exec("UPDATE skills SET name = ? WHERE id = ?", name, id)
	if err != nil {
		return Skill{}, err
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return Skill{}, err
	}
	if rowsAffected == 0 {
		return Skill{}, sql.ErrNoRows
	}
	return Skill{ID: id, Name: name}, nil
}

func deleteSkill(db *sql.DB, id int64) error {
	result, err := db.Exec("DELETE FROM skills WHERE id = ?", id)
	if err != nil {
		return err
	}
	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rowsAffected == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func skillExistsByName(db *sql.DB, name string, excludeID *int64) (bool, error) {
	baseQuery := "SELECT EXISTS(SELECT 1 FROM skills WHERE lower(name) = lower(?)"
	args := []any{name}
	if excludeID != nil {
		baseQuery += " AND id != ?"
		args = append(args, *excludeID)
	}
	baseQuery += ")"

	var exists bool
	err := db.QueryRow(baseQuery, args...).Scan(&exists)
	return exists, err
}
