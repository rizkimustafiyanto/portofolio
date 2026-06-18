package repository

import (
	"context"

	projectDTO "backend/internal/modules/project/dto"
	projectModel "backend/internal/modules/project/model"
	backendtext "backend/pkg/text"

	"gorm.io/gorm"
)

type ProjectRepository struct {
	DB *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository {
	return &ProjectRepository{DB: db}
}

func (r *ProjectRepository) CreateProject(
	ctx context.Context,
	project *projectModel.Project,
) error {
	return r.DB.WithContext(ctx).Create(project).Error
}

func (r *ProjectRepository) UpdateProject(
	ctx context.Context,
	project *projectModel.Project,
) error {
	return r.DB.WithContext(ctx).Save(project).Error
}

func (r *ProjectRepository) DeleteProjectByID(
	ctx context.Context,
	id uint,
) error {
	return r.DB.WithContext(ctx).Delete(&projectModel.Project{}, id).Error
}

func (r *ProjectRepository) GetProjectByID(
	ctx context.Context,
	id uint,
) (*projectModel.Project, error) {
	var project projectModel.Project

	err := r.DB.WithContext(ctx).
		Preload("User").
		First(&project, id).Error
	if err != nil {
		return nil, err
	}

	return &project, nil
}

func (r *ProjectRepository) GetProjects(
	ctx context.Context,
	filter projectDTO.ProjectFilterInput,
) ([]projectModel.Project, int64, error) {
	var projects []projectModel.Project

	// Ensure limit and offset are valid
	limit := filter.Limit
	if limit <= 0 {
		limit = 10 // default limit
	}
	offset := filter.Offset()
	if offset < 0 {
		offset = 0
	}

	baseQuery := r.DB.WithContext(ctx).Model(&projectModel.Project{})
	baseQuery = applyProjectFilters(baseQuery, filter)

	var total int64
	if err := baseQuery.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	query := r.DB.WithContext(ctx).
		Model(&projectModel.Project{}).
		Preload("User")
	query = applyProjectFilters(query, filter)

	err := query.
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&projects).Error
	if err != nil {
		return nil, 0, err
	}

	return projects, total, nil
}

func applyProjectFilters(
	query *gorm.DB,
	filter projectDTO.ProjectFilterInput,
) *gorm.DB {
	if filter.ProjectName != nil {
		if value, ok := backendtext.NonEmpty(*filter.ProjectName); ok {
			query = query.Where("project_name ILIKE ?", "%"+value+"%")
		}
	}

	return query
}
