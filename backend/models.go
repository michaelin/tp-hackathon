package main

type Skill struct {
	ID   int64  `json:"id"`
	Name string `json:"name"`
}

type SkillInput struct {
	Name string `json:"name"`
}

type ErrorResponse struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}
