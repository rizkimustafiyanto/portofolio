package repository

import (
	"context"

	projectModel "backend/internal/modules/project/model"

	"gorm.io/gorm"
)

type ProjectDetailRepository struct {
	db *gorm.DB
}

func NewProjectDetailRepository(db *gorm.DB) *ProjectDetailRepository {
	return &ProjectDetailRepository{
		db: db,
	}
}

func (r *ProjectDetailRepository) executor(tx *gorm.DB) *gorm.DB {
	if tx != nil {
		return tx
	}

	return r.db
}

func (r *ProjectDetailRepository) Create(
	ctx context.Context,
	tx *gorm.DB,
	detail *projectModel.ProjectDetail,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Create(detail).
		Error
}

func (r *ProjectDetailRepository) Update(
	ctx context.Context,
	tx *gorm.DB,
	detail *projectModel.ProjectDetail,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Model(detail).
		Updates(detail).
		Error
}

func (r *ProjectDetailRepository) GetByProjectID(
	ctx context.Context,
	projectID uint,
) (*projectModel.ProjectDetail, error) {

	var detail projectModel.ProjectDetail

	err := r.db.
		WithContext(ctx).
		Preload("Responsibilities", func(db *gorm.DB) *gorm.DB {
			return db.Order("sort_order ASC").Order("id ASC")
		}).
		Preload("Results", func(db *gorm.DB) *gorm.DB {
			return db.Order("sort_order ASC").Order("id ASC")
		}).
		Where("project_id = ?", projectID).
		First(&detail).
		Error

	if err != nil {
		return nil, err
	}

	return &detail, nil
}

func (r *ProjectDetailRepository) DeleteByProjectID(
	ctx context.Context,
	tx *gorm.DB,
	projectID uint,
) error {
	return r.executor(tx).
		WithContext(ctx).
		Where("project_id = ?", projectID).
		Delete(&projectModel.ProjectDetail{}).
		Error
}
