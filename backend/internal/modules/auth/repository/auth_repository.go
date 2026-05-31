package repository

import (
	"context"

	"backend/internal/modules/auth/model"

	"gorm.io/gorm"
)

type AuthRepository struct {
	DB *gorm.DB
}

func NewAuthRepository(db *gorm.DB) *AuthRepository {
	return &AuthRepository{
		DB: db,
	}
}

func (r *AuthRepository) CreateUser(
	ctx context.Context,
	user *model.User,
) error {
	return r.DB.WithContext(ctx).Create(user).Error
}


func (r *AuthRepository) UpdateUser(
	ctx context.Context,
	user *model.User,
) error {
	return r.DB.WithContext(ctx).Save(user).Error
}

func (r *AuthRepository) FindByEmail(
	ctx context.Context,
	email string,
) (*model.User, error) {
	var user model.User

	err := r.DB.WithContext(ctx).
		Where("email = ?", email).
		First(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}


func (r *AuthRepository) FindByID(
	ctx context.Context,
	id uint,
) (*model.User, error) {
	var user model.User

	err := r.DB.WithContext(ctx).
		Where("id = ?", id).
		First(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}