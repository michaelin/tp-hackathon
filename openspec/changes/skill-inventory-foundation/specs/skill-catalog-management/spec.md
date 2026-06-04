# ADDED Requirements

## Requirement: Global Skill Catalog Listing

The system SHALL provide a global skill catalog listing endpoint and UI that display all global skills sorted by case-insensitive ascending name.

### Scenario: Foundational seeded skills are listed

- **WHEN** a local build resets schema and applies seed data
- **THEN** the catalog listing contains `Go`, `TypeScript`, and `Automated Testing`

### Scenario: Listing order is deterministic

- **WHEN** the catalog listing contains multiple skills
- **THEN** the skills are returned and rendered in case-insensitive ascending name order

## Requirement: Add Skill

The system SHALL allow creating a global skill with full Unicode support, shared normalization rules, and shared duplicate validation.

### Scenario: Add valid Unicode skill name

- **WHEN** a client submits a normalized-unique skill name with Unicode characters and length between 1 and 80
- **THEN** the system creates the skill and returns it in the catalog

### Scenario: Reject duplicate skill name

- **WHEN** a client submits a skill name that matches an existing skill by case-insensitive normalized comparison
- **THEN** the system rejects the request with the standardized duplicate error contract

### Scenario: Reject invalid normalized length

- **WHEN** a client submits a skill name that normalizes outside the 1-80 length constraint
- **THEN** the system rejects the request with a validation error

## Requirement: Rename Skill

The system SHALL allow renaming a skill while preserving skill identity and reusing the same normalization and duplicate validation behavior as add.

### Scenario: Rename skill successfully

- **WHEN** a client renames an existing skill to a valid normalized-unique name
- **THEN** the system updates the skill name and preserves the skill identity

### Scenario: Rename duplicate is rejected with parity

- **WHEN** a client renames a skill to a normalized case-insensitive duplicate of another skill
- **THEN** the system returns the same duplicate error behavior and message used by add

## Requirement: Delete Skill

The system SHALL support immediate hard deletion of a skill from the global catalog without confirmation workflow requirements at the API level.

### Scenario: Delete existing skill

- **WHEN** a client requests deletion for an existing skill id
- **THEN** the skill is removed from the catalog listing

## Requirement: Input Safety

The system SHALL safely process skill input while preserving valid Unicode data.

### Scenario: Backend query safety

- **WHEN** skill input includes characters that could affect query syntax
- **THEN** the backend treats the input as data using parameterized query execution

### Scenario: UI rendering safety

- **WHEN** skill names contain characters with HTML significance
- **THEN** the UI renders them as text and does not execute them as markup

## Requirement: Local Build Reset And Seed

The system SHALL support local build-time schema overwrite and foundational reseed behavior for deterministic development.

### Scenario: Build applies clean schema and seed

- **WHEN** a developer runs the local build flow
- **THEN** schema is recreated and foundational skills are reseeded

### Scenario: Application startup does not trigger reset

- **WHEN** the application starts without running the build flow
- **THEN** schema overwrite and reseed do not run automatically on startup
