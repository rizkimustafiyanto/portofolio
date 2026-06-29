package repository

import (
	"context"

	projectModel "backend/internal/modules/project/model"

	"gorm.io/gorm"
)

type ProjectResponsibilityRepository struct {
	db *gorm.DB
}

func NewProjectResponsibilityRepository(
	db *gorm.DB,
) *ProjectResponsibilityRepository {

	return &ProjectResponsibilityRepository{
		db: db,
	}
}

func (r *ProjectResponsibilityRepository) executor(tx *gorm.DB) *gorm.DB {
	if tx != nil {
		return tx
	}
	return r.db
}

func (r *ProjectResponsibilityRepository) BulkCreate(
	ctx context.Context,
	tx *gorm.DB,
	items []projectModel.ProjectResponsibility,
) error {

	if len(items) == 0 {
		return nil
	}

	return r.executor(tx).
		WithContext(ctx).
		CreateInBatches(items, 100).
		Error
}

func (r *ProjectResponsibilityRepository) DeleteByProjectDetailID(
	ctx context.Context,
	tx *gorm.DB,
	projectDetailID uint,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Where("project_detail_id = ?", projectDetailID).
		Delete(&projectModel.ProjectResponsibility{}).
		Error
}

func (r *ProjectResponsibilityRepository) GetByProjectDetailID(
	ctx context.Context,
	projectDetailID uint,
) ([]projectModel.ProjectResponsibility, error) {
	var items []projectModel.ProjectResponsibility

	err := r.db.
		WithContext(ctx).
		Where("project_detail_id = ?", projectDetailID).
		Order("sort_order ASC").
		Order("id ASC").
		Find(&items).
		Error

	if err != nil {
		return nil, err
	}

	return items, nil
}
