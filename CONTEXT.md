# Team Skills Matrix

This context defines the canonical language for tracking engineering capabilities, target competencies, and growth guidance across teams.

## Language

**Skill**:
A global capability in the shared catalog that teams reference when setting target competency levels.
_Avoid_: Team skill, local skill, custom skill

**Competency Scale**:
The shared ordinal scale used to express proficiency targets across all skills.
_Avoid_: Custom scale, team scale

**Target Level**:
A required proficiency value for a skill selected from the Competency Scale.
_Avoid_: Goal text, free-form target

**Level 1-5 Scale**:
The canonical Competency Scale with integer values from 1 (lowest proficiency) to 5 (highest proficiency).
_Avoid_: Percent score, letter grade

**Initial Team Target State**:
Skills and team targets are initialized independently; creating a skill does not create a team target.
_Avoid_: Auto-created target on skill create, coupled initialization

**Team Skill Target**:
The target level a specific team sets for a specific skill using the shared Competency Scale.
_Avoid_: Global target, universal target

**Skill Deletion**:
The removal of a skill from the catalog by hard delete, which permanently removes the skill record.
_Avoid_: Archive, retire, soft delete

**Unprotected Deletion (Thin Slice)**:
A temporary rule where skill deletion runs without reference checks against team skill targets.
_Avoid_: Safe delete, guarded delete

**Cascade Deletion**:
The deletion behavior where removing a skill also removes all related team skill targets in the same operation.
_Avoid_: Orphaned references, dangling targets

**Skill Name Uniqueness**:
The rule that skill names are globally unique using case-insensitive comparison.
_Avoid_: Case-sensitive uniqueness, duplicate-by-case names

**Skill Name Normalization**:
The rule that skill names are normalized by trimming leading and trailing whitespace and collapsing internal repeated spaces before validation and storage.
_Avoid_: Raw-input comparison, whitespace-sensitive uniqueness

**Skill Name Length Constraint**:
The validation rule that normalized skill names must contain between 1 and 80 characters.
_Avoid_: Unbounded input, whitespace-only names

**Skill Name Character Policy**:
Skill names support full Unicode input without character-set restrictions.
_Avoid_: ASCII-only names, allowlist-only symbols

**Input Sanitization Requirement**:
All user input must be handled safely to prevent injection attacks while preserving valid data.
_Avoid_: Raw query interpolation, unsafe rendering

**Input Sanitization Strategy**:
Use parameterized database queries, apply server-side validation and normalization, escape output in the UI, and avoid destructive character stripping beyond agreed normalization.
_Avoid_: SQL string concatenation, raw HTML rendering, lossy sanitization

**Skill Record (Foundational Slice)**:
The minimal skill representation containing only a name.
_Avoid_: Rich skill profile, categorized skill

**Global Skill Catalog View**:
The inventory view for this feature that shows global skills and supports list, add, rename, and delete operations.
_Avoid_: Team-targeted skills list, team inventory editor

**Seeded Team (Foundational Slice)**:
The predefined team used as the only team context for the initial team skill inventory flow.
_Avoid_: Dynamic team management, multi-team administration

**Unrestricted Inventory Writes (Foundational Slice)**:
The temporary access rule where any caller can add, rename, delete skills, and replace team target levels.
_Avoid_: Role-gated writes, admin-only mutation

**Skill Rename**:
The operation that changes only a skill's name while preserving the skill identity and existing team skill targets.
_Avoid_: Recreate skill, replace skill

**Initial Skill Seed Set**:
The predefined set of software development skills loaded into the global catalog at startup for the foundational flow.
_Avoid_: Empty catalog bootstrap, ad hoc first-run data

**Foundational Seeded Skills**:
The initial global catalog values: Go, TypeScript, and Automated Testing.
_Avoid_: Unspecified seed list, environment-dependent seed list

**Inventory Sort Order**:
The team skill inventory view order sorted by skill name ascending with case-insensitive comparison.
_Avoid_: Insertion-order list, unstable ordering

**Duplicate Skill Name Rejection**:
The validation rule that prevents creating or renaming a skill to a name that already exists under case-insensitive comparison.
_Avoid_: Automatic merge, silent normalization

**Duplicate Validation Parity**:
The rule that skill create and skill rename use the same duplicate-name validation behavior.
_Avoid_: Operation-specific validation rules

**Immediate Hard Delete**:
The delete behavior that executes immediately without confirmation dialogs or pre-delete validation checks.
_Avoid_: Confirmed delete, guarded delete

**Last-Write-Wins**:
The conflict rule where concurrent mutations resolve by persisting the most recent successful write.
_Avoid_: Version-checked update, optimistic locking

**Foundational Seeded Team**:
The initial team context named Platform Engineering used for the foundational inventory flow.
_Avoid_: Unnamed seed team, environment-specific team naming

**Foundational Seeded Team Targets**:
For the initial seeded team, only Go has a Team Skill Target and its value is 3.
_Avoid_: All-skills pre-targeted seed, implicit targets for every skill

**Out Of Scope: Team Target Assignment**:
Creating the first team target for a skill is excluded from the current skill inventory feature and handled in a separate feature.
_Avoid_: In-feature target onboarding, mixed-scope inventory changes

**Out Of Scope: Team Target Mutation**:
Setting, updating, or clearing team targets is excluded from the current skill inventory feature.
_Avoid_: In-feature target editing, mixed command scope

**Skill Inventory Feature Scope (Foundational)**:
The current feature covers global skill catalog operations (list, add, rename, delete), while team target values are contextual read-only data where present.
_Avoid_: Bundled team-target mutation flows, cross-feature scope creep
