package modules

import (
	auditservice "backend/internal/modules/audit/service"
	authservice "backend/internal/modules/auth/service"
	projectservice "backend/internal/modules/project/service"
)

type Resolver struct {
	AuthService    *authservice.AuthService
	ProjectService *projectservice.ProjectService
	AuditService   *auditservice.AuditService
}
