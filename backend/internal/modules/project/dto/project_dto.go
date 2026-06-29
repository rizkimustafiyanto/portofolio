package dto

import globalDTO "backend/pkg/dto"

type Project struct {
	ID          uint
	Slug        string
	Title       string
	Description string
	Role        string
	Duration    string
	DemoURL     string

	Detail *ProjectDetail

	CreatedAt string
	UpdatedAt string
}

type CreateProjectInput struct {
	Slug        string
	Title       string
	Description string
	Role        string
	Duration    string
	DemoURL     string

	Detail *CreateProjectDetailInput
}

type UpdateProjectInput struct {
	Slug        *string
	Title       *string
	Description *string
	Role        *string
	Duration    *string
	DemoURL     *string

	Detail *UpdateProjectDetailInput
}

type ProjectFilterInput struct {
	globalDTO.PaginationDTO
	Search *string
}

type ProjectPaginationMeta struct {
	Page        int32
	Limit       int32
	TotalData   int32
	TotalPage   int32
	HasNext     bool
	HasPrevious bool
}

type ProjectPagination struct {
	Items []*Project
	Meta  *ProjectPaginationMeta
}