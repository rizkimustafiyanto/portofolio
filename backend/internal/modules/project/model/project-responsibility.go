package model

import (
	commonModel "backend/internal/common/model"
)

type ProjectResponsibility struct {
    commonModel.BaseModel

		ProjectDetailID uint `gorm:"not null;index"`

		Responsibility    string `gorm:"type:text;not null"`
    SortOrder int    `gorm:"default:0"`
}