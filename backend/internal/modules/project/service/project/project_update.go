package projectservice

import (
	"context"
	"errors"

	"backend/internal/modules/project/dto"
	"backend/internal/modules/project/model"

	"gorm.io/gorm"
)

func (s *ProjectService) UpdateProject(
	ctx context.Context,
	userID uint,
	id uint,
	input dto.UpdateProjectInput,
) (*dto.Project, error) {
	project, err := s.projectRepo.GetByID(ctx, id)
	if err != nil {
		return nil, errors.New("project not found")
	}

	if project.UserID != userID {
		return nil, errors.New("forbidden")
	}

	if _, err := withTransaction(s.db, func(tx *gorm.DB) (struct{}, error) {
		updateProjectModel(project, input)

		if err := s.projectRepo.Update(ctx, tx, project); err != nil {
			return struct{}{}, err
		}

		if input.Detail != nil {
			if err := s.updateProjectDetail(ctx, tx, project, input.Detail); err != nil {
				return struct{}{}, err
			}
		}

		return struct{}{}, nil
	}); err != nil {
		return nil, err
	}

	return s.GetProjectByID(ctx, id)
}

func updateProjectModel(
	project *model.Project,
	input dto.UpdateProjectInput,
) {

	if input.Slug != nil {
		project.Slug = *input.Slug
	}

	if input.Title != nil {
		project.Title = *input.Title
	}

	if input.Description != nil {
		project.Description = *input.Description
	}

	if input.Role != nil {
		project.Role = *input.Role
	}

	if input.Duration != nil {
		project.Duration = *input.Duration
	}

	if input.DemoURL != nil {
		project.DemoURL = *input.DemoURL
	}
}

func (s *ProjectService) updateProjectDetail(
	ctx context.Context,
	tx *gorm.DB,
	project *model.Project,
	input *dto.UpdateProjectDetailInput,
) error {

	if project.Detail == nil {
		return nil
	}

	detail := project.Detail

	if input.Problem != nil {
		detail.Problem = *input.Problem
	}

	if input.Solution != nil {
		detail.Solution = *input.Solution
	}

	if err := s.detailRepo.Update(ctx, tx, detail); err != nil {
		return err
	}

	if err := s.replaceResponsibilities(
		ctx,
		tx,
		detail.ID,
		input.Responsibilities,
	); err != nil {
		return err
	}

	if err := s.replaceResults(
		ctx,
		tx,
		detail.ID,
		input.Results,
	); err != nil {
		return err
	}

	return nil
}

func (s *ProjectService) replaceResponsibilities(
	ctx context.Context,
	tx *gorm.DB,
	projectDetailID uint,
	input []*dto.UpdateProjectResponsibilityInput,
) error {

	if err := s.responsibilityRepo.DeleteByProjectDetailID(
		ctx,
		tx,
		projectDetailID,
	); err != nil {
		return err
	}

	if len(input) == 0 {
		return nil
	}

	return s.responsibilityRepo.BulkCreate(ctx, tx, buildUpdatedProjectResponsibilities(projectDetailID, input))
}

func (s *ProjectService) replaceResults(
	ctx context.Context,
	tx *gorm.DB,
	projectDetailID uint,
	input []*dto.UpdateProjectResultInput,
) error {

	if err := s.resultRepo.DeleteByProjectDetailID(
		ctx,
		tx,
		projectDetailID,
	); err != nil {
		return err
	}

	if len(input) == 0 {
		return nil
	}

	return s.resultRepo.BulkCreate(ctx, tx, buildUpdatedProjectResults(projectDetailID, input))
}
