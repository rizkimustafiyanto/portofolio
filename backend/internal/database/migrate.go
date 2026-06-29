package database

import (
	"log"

	"backend/internal/config"

	auditlogModel "backend/internal/modules/audit/model"
	authModel "backend/internal/modules/auth/model"
	projectModel "backend/internal/modules/project/model"

	"gorm.io/gorm"
)

func Migrate(db *gorm.DB) {
	env := config.LoadEnv()

	if env.Environtment == "development" &&
		env.DBStartReset {

		log.Println("⚠ Development mode - dropping tables...")

		err := db.Migrator().DropTable(
			&auditlogModel.AuditLog{},
			&projectModel.Project{},
			&authModel.User{},
		)

		if err != nil {
			panic(err)
		}

		log.Println("✅ Tables dropped successfully")
	}

	err := db.AutoMigrate(
		&authModel.User{},
		&projectModel.Project{},
		&auditlogModel.AuditLog{},
	)

	if err != nil {
		panic(err)
	}

	log.Println("✅ Database migrated successfully")
}