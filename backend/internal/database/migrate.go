package database

import (
	authModel "backend/internal/modules/auth/model"
	projectModel "backend/internal/modules/project/model"
	auditlogModel "backend/internal/modules/audit/model"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	err := db.AutoMigrate(
		&authModel.User{},
		&projectModel.Project{},
		&auditlogModel.AuditLog{},
	)
	if err != nil {
		panic(err)
	}
}