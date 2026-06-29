package projectservice

import (
	"backend/internal/modules/project/dto"
	"backend/pkg/pagination"
	"context"
)

func (s *ProjectService) GetProjectByID(
	ctx context.Context,
	id uint,
) (*dto.Project, error) {
	project, err := s.projectRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return toProjectDTO(project), nil
}

func (s *ProjectService) GetAllProjects(
	ctx context.Context,
	filter dto.ProjectFilterInput,
) (*dto.ProjectPagination, error) {
	filter.Normalize()

	projects, total, err := s.projectRepo.GetAll(ctx, filter)
	if err != nil {
		return nil, err
	}

	projectDTOs := make([]*dto.Project, 0, len(projects))
	for i := range projects {
		projectDTOs = append(projectDTOs, toProjectDTO(&projects[i]))
	}

	paginationMeta := pagination.BuildMeta(filter.Page, filter.Limit, total)

	meta := &dto.ProjectPaginationMeta{
		Page:        int32(paginationMeta.Page),
		Limit:       int32(paginationMeta.Limit),
		TotalData:   int32(paginationMeta.TotalData),
		TotalPage:   int32(paginationMeta.TotalPage),
		HasNext:     paginationMeta.HasNext,
		HasPrevious: paginationMeta.HasPrevious,
	}

	return &dto.ProjectPagination{
		Items: projectDTOs,
		Meta:  meta,
	}, nil
}

func (s *ProjectService) GetProjectDetailByProjectID(
	ctx context.Context,
	projectID uint,
) (*dto.ProjectDetail, error) {
	detail, err := s.detailRepo.GetByProjectID(ctx, projectID)
	if err != nil {
		return nil, err
	}

	return toProjectDetailDTO(detail), nil
}

func (s *ProjectService) GetProjectResponsibilitiesByDetailID(
	ctx context.Context,
	projectDetailID uint,
) ([]*dto.ProjectResponsibility, error) {
	items, err := s.responsibilityRepo.GetByProjectDetailID(ctx, projectDetailID)
	if err != nil {
		return nil, err
	}

	return toProjectResponsibilityDTOs(items), nil
}

func (s *ProjectService) GetProjectResultsByDetailID(
	ctx context.Context,
	projectDetailID uint,
) ([]*dto.ProjectResult, error) {
	items, err := s.resultRepo.GetByProjectDetailID(ctx, projectDetailID)
	if err != nil {
		return nil, err
	}

	return toProjectResultDTOs(items), nil
}
