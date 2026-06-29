package bootstrap

import (
	auditrepository "backend/internal/modules/audit/repository"
	auditservice "backend/internal/modules/audit/service"

	"gorm.io/gorm"
)

func NewAuditService(
	db *gorm.DB,
) *auditservice.AuditService {

	auditRepo := auditrepository.NewAuditRepository(db)

	return auditservice.NewAuditService(
		auditRepo,
	)
}