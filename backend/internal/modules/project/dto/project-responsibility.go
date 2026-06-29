package dto

type ProjectResponsibility struct {
	ID uint

	Responsibility string
	SortOrder      int
}

type CreateProjectResponsibilityInput struct {
	Responsibility string
	SortOrder      int
}

type UpdateProjectResponsibilityInput struct {
	ID *uint

	Responsibility string
	SortOrder      int
}