package main

import (
	"strings"
	"unicode/utf8"
)

func normalizeSkillName(name string) string {
	parts := strings.Fields(name)
	return strings.Join(parts, " ")
}

func validateSkillName(name string) bool {
	normalized := normalizeSkillName(name)
	runes := utf8.RuneCountInString(normalized)
	return runes >= 1 && runes <= 80
}
