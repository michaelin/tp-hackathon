package main

const (
	ErrCodeValidation = "VALIDATION_ERROR"
	ErrCodeDuplicate  = "SKILL_NAME_DUPLICATE"
	ErrCodeNotFound   = "SKILL_NOT_FOUND"

	DuplicateSkillMessage = "A skill with this name already exists."
	ValidationMessage     = "Skill name must be 1-80 characters after normalization."
)

func validationError() ErrorResponse {
	return ErrorResponse{Code: ErrCodeValidation, Message: ValidationMessage}
}

func duplicateError() ErrorResponse {
	return ErrorResponse{Code: ErrCodeDuplicate, Message: DuplicateSkillMessage}
}

func notFoundError() ErrorResponse {
	return ErrorResponse{Code: ErrCodeNotFound, Message: "Skill not found."}
}
