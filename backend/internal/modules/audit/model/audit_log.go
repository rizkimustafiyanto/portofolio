package model

import authModel "backend/internal/modules/auth/model"
import commonModel "backend/internal/common/model"

type AuditLog struct {
	commonModel.BaseModel

	UserID       *uint
	User         *authModel.User `gorm:"foreignKey:UserID;references:ID"`
	Action       string          `gorm:"not null"`
	Entity       string          `gorm:"not null"`
	EntityID     *uint
	IPAddress    string
	RequestData  string `gorm:"type:text"`
	ResponseData string `gorm:"type:text"`
	Status       string
	ErrorMessage string `gorm:"type:text"`
}
