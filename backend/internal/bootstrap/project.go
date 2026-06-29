package bootstrap

import (
	"backend/internal/modules/project/repository"
	"backend/internal/modules/project/service"

	"gorm.io/gorm"
)

func NewProjectService(db *gorm.DB) *service.ProjectService {
	projectRepo, detailRepo, responsibilityRepo, resultRepo := newProjectRepositories(db)

	return service.NewProjectService(
		db,
		projectRepo,
		detailRepo,
		responsibilityRepo,
		resultRepo,
	)
}

func newProjectRepositories(db *gorm.DB) (
	*repository.ProjectRepository,
	*repository.ProjectDetailRepository,
	*repository.ProjectResponsibilityRepository,
	*repository.ProjectResultRepository,
) {
	return repository.NewProjectRepository(db),
		repository.NewProjectDetailRepository(db),
		repository.NewProjectResponsibilityRepository(db),
		repository.NewProjectResultRepository(db)
}
