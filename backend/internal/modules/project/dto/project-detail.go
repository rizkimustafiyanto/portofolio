package dto

type ProjectDetail struct {
	ID uint

	Problem  string
	Solution string

	Responsibilities []*ProjectResponsibility
	Results          []*ProjectResult
}

type CreateProjectDetailInput struct {
	Problem  string
	Solution string

	Responsibilities []*CreateProjectResponsibilityInput
	Results          []*CreateProjectResultInput
}

type UpdateProjectDetailInput struct {
	Problem  *string
	Solution *string

	Responsibilities []*UpdateProjectResponsibilityInput
	Results          []*UpdateProjectResultInput
}