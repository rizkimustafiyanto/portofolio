package repository

import (
	"context"

	projectDTO "backend/internal/modules/project/dto"
	projectModel "backend/internal/modules/project/model"
	backendtext "backend/pkg/text"

	"gorm.io/gorm"
)

type ProjectRepository struct {
	db *gorm.DB
}

func NewProjectRepository(db *gorm.DB) *ProjectRepository {
	return &ProjectRepository{
		db: db,
	}
}

func (r *ProjectRepository) executor(tx *gorm.DB) *gorm.DB {
	if tx != nil {
		return tx
	}
	return r.db
}

func (r *ProjectRepository) Create(
	ctx context.Context,
	tx *gorm.DB,
	project *projectModel.Project,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Create(project).
		Error
}

func (r *ProjectRepository) Update(
	ctx context.Context,
	tx *gorm.DB,
	project *projectModel.Project,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Model(project).
		Updates(project).
		Error
}

func (r *ProjectRepository) DeleteByID(
	ctx context.Context,
	tx *gorm.DB,
	id uint,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Delete(&projectModel.Project{}, id).
		Error
}

func (r *ProjectRepository) GetByID(
	ctx context.Context,
	id uint,
) (*projectModel.Project, error) {

	var project projectModel.Project

	err := preloadProject(
		r.db.WithContext(ctx),
	).
		First(&project, id).
		Error

	if err != nil {
		return nil, err
	}

	return &project, nil
}

func (r *ProjectRepository) GetAll(
	ctx context.Context,
	filter projectDTO.ProjectFilterInput,
) ([]projectModel.Project, int64, error) {

	var (
		projects []projectModel.Project
		total    int64
	)

	limit := filter.Limit
	if limit <= 0 {
		limit = 10
	}

	offset := filter.Offset()
	if offset < 0 {
		offset = 0
	}

	query := applyProjectFilters(
		r.db.WithContext(ctx).Model(&projectModel.Project{}),
		filter,
	)

	if err := query.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	err := preloadProject(query).
		Order("created_at DESC").
		Limit(limit).
		Offset(offset).
		Find(&projects).
		Error

	if err != nil {
		return nil, 0, err
	}

	return projects, total, nil
}

func preloadProject(db *gorm.DB) *gorm.DB {
	return db.
		Preload("User").
		Preload("Detail").
		Preload("Detail.Responsibilities").
		Preload("Detail.Results")
}

func applyProjectFilters(
	query *gorm.DB,
	filter projectDTO.ProjectFilterInput,
) *gorm.DB {

	if filter.Search != nil {
		if value, ok := backendtext.NonEmpty(*filter.Search); ok {

			keyword := "%" + value + "%"

			query = query.Where(
				"slug ILIKE ? OR title ILIKE ? OR role ILIKE ?",
				keyword,
				keyword,
				keyword,
			)
		}
	}

	return query
}
