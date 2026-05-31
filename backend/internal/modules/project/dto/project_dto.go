package dto

import globalDTO "backend/pkg/dto"

type Project struct {
	ID          uint
	ProjectName string
	Description string
	DemoUrl     *string
	CreatedAt   string
	UpdatedAt   string
}

type CreateProjectInput struct {
	ProjectName string
	Description string
	DemoUrl     *string
}

type UpdateProjectInput struct {
	ProjectName *string
	Description *string
	DemoUrl     *string
}

type ProjectFilterInput struct {
	globalDTO.PaginationDTO
	ProjectName *string
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
