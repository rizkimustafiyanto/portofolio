package service

import (
	"context"

	auditDTO "backend/internal/modules/audit/dto"
	auditModel "backend/internal/modules/audit/model"
	auditRepository "backend/internal/modules/audit/repository"
)

type AuditService struct {
	Repository *auditRepository.AuditRepository
}

func NewAuditService(
	repo *auditRepository.AuditRepository,
) *AuditService {

	return &AuditService{
		Repository: repo,
	}
}

func (s *AuditService) Log(
	ctx context.Context,
	payload auditDTO.CreateAuditLogInput,
) {

	defer func() {
		recover()
	}()

	log := auditModel.AuditLog{
		UserID: payload.UserID,

		Action: payload.Action,

		Entity: payload.Entity,

		EntityID: payload.EntityID,

		IPAddress: payload.IPAddress,

		RequestData: payload.RequestData,

		ResponseData: payload.ResponseData,

		Status: payload.Status,

		ErrorMessage: payload.ErrorMessage,
	}

	s.Repository.CreateAuditLog(ctx, &log)
}

func (s *AuditService) GetAuditLogs(
	ctx context.Context,
	filter auditDTO.AuditFilterInput,
) ([]auditModel.AuditLog, int64, error) {

	filter.Normalize()

	return s.Repository.GetAuditLogs(ctx, filter)
}
