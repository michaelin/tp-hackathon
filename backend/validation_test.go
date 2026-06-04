package main

import "testing"

func TestNormalizeSkillName(t *testing.T) {
	tests := []struct {
		name string
		in   string
		want string
	}{
		{"trim and collapse", "   Go    Lang  ", "Go Lang"},
		{"unicode", "  Cafe\u0301   Skill  ", "Cafe\u0301 Skill"},
		{"emoji", "  Testing 😀  ", "Testing 😀"},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := normalizeSkillName(tc.in)
			if got != tc.want {
				t.Fatalf("normalizeSkillName(%q) = %q, want %q", tc.in, got, tc.want)
			}
		})
	}
}

func TestValidateSkillName(t *testing.T) {
	if validateSkillName(" ") {
		t.Fatal("expected whitespace-only name to be invalid")
	}
	if !validateSkillName("Go") {
		t.Fatal("expected Go to be valid")
	}
	tooLong := ""
	for i := 0; i < 81; i++ {
		tooLong += "a"
	}
	if validateSkillName(tooLong) {
		t.Fatal("expected 81-char name to be invalid")
	}
}
