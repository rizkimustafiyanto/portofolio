package bootstrap

import (
	"backend/internal/config"
	"backend/internal/modules/auth/repository"
	"backend/internal/modules/auth/service"

	"gorm.io/gorm"
)

func NewAuthService(
	db *gorm.DB,
	env *config.Env,
) *service.AuthService {

	authRepo := repository.NewAuthRepository(db)

	return service.NewAuthService(
		authRepo,
		env,
	)
}