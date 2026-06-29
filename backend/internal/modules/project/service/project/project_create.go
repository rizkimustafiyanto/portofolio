package projectservice

import (
	"context"

	"backend/internal/modules/project/dto"
	"backend/internal/modules/project/model"

	"gorm.io/gorm"
)

func (s *ProjectService) CreateProject(
	ctx context.Context,
	userID uint,
	input dto.CreateProjectInput,
) (*dto.Project, error) {
	project, err := withTransaction(s.db, func(tx *gorm.DB) (*model.Project, error) {
		project, err := s.createProject(ctx, tx, userID, input)
		if err != nil {
			return nil, err
		}

		if input.Detail != nil {
			detail, err := s.createProjectDetail(ctx, tx, project.ID, input.Detail)
			if err != nil {
				return nil, err
			}

			if err := s.createResponsibilities(ctx, tx, detail.ID, input.Detail.Responsibilities); err != nil {
				return nil, err
			}

			if err := s.createResults(ctx, tx, detail.ID, input.Detail.Results); err != nil {
				return nil, err
			}
		}

		return project, nil
	})
	if err != nil {
		return nil, err
	}

	return s.GetProjectByID(ctx, project.ID)
}

func (s *ProjectService) createProject(
	ctx context.Context,
	tx *gorm.DB,
	userID uint,
	input dto.CreateProjectInput,
) (*model.Project, error) {

	project := &model.Project{
		UserID:      userID,
		Slug:        input.Slug,
		Title:       input.Title,
		Description: input.Description,
		Role:        input.Role,
		Duration:    input.Duration,
		DemoURL:     input.DemoURL,
	}

	if err := s.projectRepo.Create(ctx, tx, project); err != nil {
		return nil, err
	}

	return project, nil
}

func (s *ProjectService) createProjectDetail(
	ctx context.Context,
	tx *gorm.DB,
	projectID uint,
	input *dto.CreateProjectDetailInput,
) (*model.ProjectDetail, error) {

	detail := &model.ProjectDetail{
		ProjectID: projectID,

		Problem: input.Problem,
		Solution: input.Solution,
	}

	if err := s.detailRepo.Create(ctx, tx, detail); err != nil {
		return nil, err
	}

	return detail, nil
}

func (s *ProjectService) createResponsibilities(
	ctx context.Context,
	tx *gorm.DB,
	projectDetailID uint,
	input []*dto.CreateProjectResponsibilityInput,
) error {
	return s.responsibilityRepo.BulkCreate(ctx, tx, buildProjectResponsibilities(projectDetailID, input))
}

func (s *ProjectService) createResults(
	ctx context.Context,
	tx *gorm.DB,
	projectDetailID uint,
	input []*dto.CreateProjectResultInput,
) error {
	return s.resultRepo.BulkCreate(ctx, tx, buildProjectResults(projectDetailID, input))
}
