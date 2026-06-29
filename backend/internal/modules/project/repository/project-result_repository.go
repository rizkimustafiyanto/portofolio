package repository

import (
	"context"

	projectModel "backend/internal/modules/project/model"

	"gorm.io/gorm"
)

type ProjectResultRepository struct {
	db *gorm.DB
}

func NewProjectResultRepository(
	db *gorm.DB,
) *ProjectResultRepository {

	return &ProjectResultRepository{
		db: db,
	}
}

func (r *ProjectResultRepository) executor(tx *gorm.DB) *gorm.DB {
	if tx != nil {
		return tx
	}
	return r.db
}

func (r *ProjectResultRepository) BulkCreate(
	ctx context.Context,
	tx *gorm.DB,
	items []projectModel.ProjectResult,
) error {

	if len(items) == 0 {
		return nil
	}

	return r.executor(tx).
		WithContext(ctx).
		CreateInBatches(items, 100).
		Error
}

func (r *ProjectResultRepository) DeleteByProjectDetailID(
	ctx context.Context,
	tx *gorm.DB,
	projectDetailID uint,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Where("project_detail_id = ?", projectDetailID).
		Delete(&projectModel.ProjectResult{}).
		Error
}

func (r *ProjectResultRepository) GetByProjectDetailID(
	ctx context.Context,
	projectDetailID uint,
) ([]projectModel.ProjectResult, error) {
	var items []projectModel.ProjectResult

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
