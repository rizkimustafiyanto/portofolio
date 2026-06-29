package projectservice

import (
	"backend/internal/modules/project/repository"

	"gorm.io/gorm"
)

type ProjectService struct {
	db *gorm.DB

	projectRepo        *repository.ProjectRepository
	detailRepo         *repository.ProjectDetailRepository
	responsibilityRepo *repository.ProjectResponsibilityRepository
	resultRepo         *repository.ProjectResultRepository
}

func NewProjectService(
	db *gorm.DB,
	projectRepo *repository.ProjectRepository,
	detailRepo *repository.ProjectDetailRepository,
	responsibilityRepo *repository.ProjectResponsibilityRepository,
	resultRepo *repository.ProjectResultRepository,
) *ProjectService {

	return &ProjectService{
		db:                 db,
		projectRepo:        projectRepo,
		detailRepo:         detailRepo,
		responsibilityRepo: responsibilityRepo,
		resultRepo:         resultRepo,
	}
}
