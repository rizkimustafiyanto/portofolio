package projectservice

import (
	"context"
	"errors"

	"gorm.io/gorm"
)

func (s *ProjectService) DeleteProject(
	ctx context.Context,
	userID uint,
	id uint,
) error {
	project, err := s.projectRepo.GetByID(ctx, id)
	if err != nil {
		return errors.New("project not found")
	}

	if project.UserID != userID {
		return errors.New("forbidden")
	}

	return withTransactionVoid(s.db, func(tx *gorm.DB) error {
		return s.projectRepo.DeleteByID(ctx, tx, id)
	})
}
