package service

import (
	"backend/internal/modules/project/repository"
	projectimpl "backend/internal/modules/project/service/project"

	"gorm.io/gorm"
)

type ProjectService = projectimpl.ProjectService

func NewProjectService(
	db *gorm.DB,
	projectRepo *repository.ProjectRepository,
	detailRepo *repository.ProjectDetailRepository,
	responsibilityRepo *repository.ProjectResponsibilityRepository,
	resultRepo *repository.ProjectResultRepository,
) *ProjectService {
	return projectimpl.NewProjectService(db, projectRepo, detailRepo, responsibilityRepo, resultRepo)
}

func ParseProjectID(rawID string) (uint, error) {
	return projectimpl.ParseProjectID(rawID)
}
