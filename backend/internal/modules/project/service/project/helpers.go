package projectservice

import (
	"backend/internal/modules/project/dto"
	"backend/internal/modules/project/model"
	"gorm.io/gorm"
)

func withTransaction[T any](db *gorm.DB, fn func(tx *gorm.DB) (T, error)) (T, error) {
	tx := db.Begin()
	if tx.Error != nil {
		var zero T
		return zero, tx.Error
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			panic(r)
		}
	}()

	result, err := fn(tx)
	if err != nil {
		tx.Rollback()
		var zero T
		return zero, err
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		var zero T
		return zero, err
	}

	return result, nil
}

func withTransactionVoid(db *gorm.DB, fn func(tx *gorm.DB) error) error {
	_, err := withTransaction(db, func(tx *gorm.DB) (struct{}, error) {
		return struct{}{}, fn(tx)
	})
	return err
}

func buildProjectResponsibilities(
	projectDetailID uint,
	input []*dto.CreateProjectResponsibilityInput,
) []model.ProjectResponsibility {
	if len(input) == 0 {
		return nil
	}

	items := make([]model.ProjectResponsibility, 0, len(input))
	for _, item := range input {
		items = append(items, model.ProjectResponsibility{
			ProjectDetailID: projectDetailID,
			Responsibility:  item.Responsibility,
			SortOrder:       item.SortOrder,
		})
	}

	return items
}

func buildProjectResults(
	projectDetailID uint,
	input []*dto.CreateProjectResultInput,
) []model.ProjectResult {
	if len(input) == 0 {
		return nil
	}

	items := make([]model.ProjectResult, 0, len(input))
	for _, item := range input {
		items = append(items, model.ProjectResult{
			ProjectDetailID: projectDetailID,
			Result:          item.Result,
			SortOrder:       item.SortOrder,
		})
	}

	return items
}

func buildUpdatedProjectResponsibilities(
	projectDetailID uint,
	input []*dto.UpdateProjectResponsibilityInput,
) []model.ProjectResponsibility {
	if len(input) == 0 {
		return nil
	}

	items := make([]model.ProjectResponsibility, 0, len(input))
	for _, item := range input {
		items = append(items, model.ProjectResponsibility{
			ProjectDetailID: projectDetailID,
			Responsibility:  item.Responsibility,
			SortOrder:       item.SortOrder,
		})
	}

	return items
}

func buildUpdatedProjectResults(
	projectDetailID uint,
	input []*dto.UpdateProjectResultInput,
) []model.ProjectResult {
	if len(input) == 0 {
		return nil
	}

	items := make([]model.ProjectResult, 0, len(input))
	for _, item := range input {
		items = append(items, model.ProjectResult{
			ProjectDetailID: projectDetailID,
			Result:          item.Result,
			SortOrder:       item.SortOrder,
		})
	}

	return items
}
