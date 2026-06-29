package dto

type ProjectResult struct {
	ID uint

	Result    string
	SortOrder int
}

type CreateProjectResultInput struct {
	Result    string
	SortOrder int
}

type UpdateProjectResultInput struct {
	ID *uint

	Result    string
	SortOrder int
}