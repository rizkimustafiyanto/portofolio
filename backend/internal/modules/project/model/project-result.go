package model

import (
	commonModel "backend/internal/common/model"
)

type ProjectResult struct {
    commonModel.BaseModel

		ProjectDetailID uint `gorm:"not null;index"`

		Result    string `gorm:"type:text;not null"`
    SortOrder int    `gorm:"default:0"`
}