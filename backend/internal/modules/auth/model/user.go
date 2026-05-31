package model

import commonModel "backend/internal/common/model"

type User struct {
	commonModel.BaseModel

	Name      string    `gorm:"not null"`
	Email     string    `gorm:"unique;not null"`
	Password  string    `gorm:"not null"`
}
