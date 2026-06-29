package model

import (
	commonModel "backend/internal/common/model"
	authModel "backend/internal/modules/auth/model"
)

type Project struct {
    commonModel.BaseModel

    UserID uint            `gorm:"not null;index"`
    User   *authModel.User `gorm:"foreignKey:UserID;references:ID"`
    Detail *ProjectDetail  `gorm:"foreignKey:ProjectID;constraint:OnDelete:CASCADE;"`

    Slug        string `gorm:"not null;uniqueIndex"`
    Title       string `gorm:"not null"`
    Description string
    Role        string
    Duration    string
    DemoURL     string
}