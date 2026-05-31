package service

import (
	"context"
	"errors"

	"backend/internal/modules/project/dto"
	"backend/internal/modules/project/model"
	"backend/internal/modules/project/repository"
	"backend/pkg/convert"
	"backend/pkg/formatter"
	"backend/pkg/pagination"
)

type ProjectService struct {
	Repo *repository.ProjectRepository
}

func NewProjectService(repo *repository.ProjectRepository) *ProjectService {
	return &ProjectService{Repo: repo}
}

func (s *ProjectService) CreateProject(
	ctx context.Context,
	userID uint,
	input dto.CreateProjectInput,
) (*dto.Project, error) {
	project := &model.Project{
		UserID:      userID,
		ProjectName: input.ProjectName,
		Description: input.Description,
		DemoUrl:     input.DemoUrl,
	}

	if err := s.Repo.CreateProject(ctx, project); err != nil {
		return nil, err
	}

	return toProjectDTO(project), nil
}

func (s *ProjectService) UpdateProject(
	ctx context.Context,
	userID uint,
	id uint,
	input dto.UpdateProjectInput,
) (*dto.Project, error) {
	project, err := s.Repo.GetProjectByID(ctx, id)
	if err != nil {
		return nil, errors.New("project not found")
	}

	if project.UserID != userID {
		return nil, errors.New("forbidden")
	}

	if input.ProjectName != nil {
		project.ProjectName = *input.ProjectName
	}
	if input.Description != nil {
		project.Description = *input.Description
	}
	if input.DemoUrl != nil {
		project.DemoUrl = input.DemoUrl
	}

	if err := s.Repo.UpdateProject(ctx, project); err != nil {
		return nil, err
	}

	return toProjectDTO(project), nil
}

func (s *ProjectService) DeleteProject(
	ctx context.Context,
	userID uint,
	id uint,
) error {
	project, err := s.Repo.GetProjectByID(ctx, id)
	if err != nil {
		return errors.New("project not found")
	}

	if project.UserID != userID {
		return errors.New("forbidden")
	}

	return s.Repo.DeleteProjectByID(ctx, id)
}

func (s *ProjectService) GetProjectByID(
	ctx context.Context,
	id uint,
) (*dto.Project, error) {
	project, err := s.Repo.GetProjectByID(ctx, id)
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

	projects, total, err := s.Repo.GetProjects(ctx, filter)
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

func toProjectDTO(project *model.Project) *dto.Project {
	if project == nil {
		return nil
	}

	return &dto.Project{
		ID:          project.ID,
		ProjectName: project.ProjectName,
		Description: project.Description,
		DemoUrl:     project.DemoUrl,
		CreatedAt:   formatter.FormatTime(project.CreatedAt),
		UpdatedAt:   formatter.FormatTime(project.UpdatedAt),
	}
}

func ParseProjectID(rawID string) (uint, error) {
	return convert.ParseUint(rawID)
}
