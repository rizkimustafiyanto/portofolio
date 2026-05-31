package database

import (
	"fmt"
	"log"
	"time"

	"backend/internal/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func ConnectDB(env *config.Env) *gorm.DB {

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		env.DBHost,
		env.DBUser,
		env.DBPassword,
		env.DBName,
		env.DBPort,
		env.DBSSLMode,
		env.Timezone,
	)

	db, err := gorm.Open(
		postgres.Open(dsn),
		&gorm.Config{
			Logger: logger.Default.LogMode(
				logger.Info,
			),
		},
	)

	if err != nil {
		log.Fatal("Failed connect database: ", err)
	}

	sqlDB, err := db.DB()

	if err != nil {
		log.Fatal("Failed get sql db: ", err)
	}

	sqlDB.SetMaxOpenConns(env.DBMaxOpenConns)

	sqlDB.SetMaxIdleConns(env.DBMaxIdleConns)

	sqlDB.SetConnMaxLifetime(
		time.Hour,
	)

	log.Println("Database connected")

	return db
}