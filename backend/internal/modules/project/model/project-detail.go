package model

import (
	commonModel "backend/internal/common/model"
)

type ProjectDetail struct {
    commonModel.BaseModel

    ProjectID uint
    Project   *Project  `gorm:"foreignKey:ProjectID;references:ID"`

    Responsibilities []ProjectResponsibility `gorm:"foreignKey:ProjectDetailID;constraint:OnDelete:CASCADE;"`
    Results          []ProjectResult         `gorm:"foreignKey:ProjectDetailID;constraint:OnDelete:CASCADE;"`

    Problem  string
    Solution string
}