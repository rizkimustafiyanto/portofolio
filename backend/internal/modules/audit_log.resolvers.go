package modules

import (
	"backend/internal/graphql/model"
	auditDTO "backend/internal/modules/audit/dto"
	auditModel "backend/internal/modules/audit/model"
	backendconvert "backend/pkg/convert"
	backendtext "backend/pkg/text"
	"context"
	"fmt"
)

// AuditLogs is the resolver for the auditLogs field.
func (r *queryResolver) AuditLogs(ctx context.Context, filter *model.AuditFilterInput) (*model.AuditLogPagination, error) {
	auditFilter, err := toAuditFilterInput(filter)
	if err != nil {
		return nil, err
	}

	auditFilter.Normalize()

	logs, total, err := r.Resolver.AuditService.GetAuditLogs(ctx, auditFilter)
	if err != nil {
		return nil, err
	}

	items := make([]*model.AuditLog, 0, len(logs))
	for i := range logs {
		items = append(items, toGraphQLAuditLog(&logs[i]))
	}

	meta := buildAuditPaginationMeta(auditFilter.Page, auditFilter.Limit, total)

	return &model.AuditLogPagination{
		Items: items,
		Meta:  meta,
	}, nil
}

func toAuditFilterInput(filter *model.AuditFilterInput) (auditDTO.AuditFilterInput, error) {
	auditFilter := auditDTO.AuditFilterInput{}

	if filter == nil {
		return auditFilter, nil
	}

	if filter.Page != nil {
		auditFilter.Page = int(*filter.Page)
	}
	if filter.Limit != nil {
		auditFilter.Limit = int(*filter.Limit)
	}
	if filter.Action != nil {
		if value, ok := backendtext.NonEmpty(*filter.Action); ok {
			auditFilter.Action = &value
		}
	}
	if filter.Entity != nil {
		if value, ok := backendtext.NonEmpty(*filter.Entity); ok {
			auditFilter.Entity = &value
		}
	}
	if filter.Status != nil {
		if value, ok := backendtext.NonEmpty(*filter.Status); ok {
			auditFilter.Status = &value
		}
	}
	if filter.UserID != nil {
		parsedUserID, err := backendconvert.ParseUint(*filter.UserID)
		if err != nil {
			return auditDTO.AuditFilterInput{}, fmt.Errorf("invalid userId: %w", err)
		}

		userID := uint(parsedUserID)
		auditFilter.UserID = &userID
	}

	return auditFilter, nil
}

func toGraphQLAuditLog(log *auditModel.AuditLog) *model.AuditLog {
	if log == nil {
		return nil
	}

	auditLog := &model.AuditLog{
		ID:        fmt.Sprintf("%d", log.ID),
		Action:    log.Action,
		Entity:    log.Entity,
		CreatedAt: log.CreatedAt,
	}

	if log.UserID != nil {
		userID := fmt.Sprintf("%d", *log.UserID)
		auditLog.UserID = &userID
	}
	if log.EntityID != nil {
		entityID := fmt.Sprintf("%d", *log.EntityID)
		auditLog.EntityID = &entityID
	}
	if value, ok := backendtext.NonEmpty(log.IPAddress); ok {
		auditLog.IPAddress = &value
	}
	if value, ok := backendtext.NonEmpty(log.RequestData); ok {
		auditLog.RequestData = &value
	}
	if value, ok := backendtext.NonEmpty(log.ResponseData); ok {
		auditLog.ResponseData = &value
	}
	if value, ok := backendtext.NonEmpty(log.Status); ok {
		auditLog.Status = &value
	}
	if value, ok := backendtext.NonEmpty(log.ErrorMessage); ok {
		auditLog.ErrorMessage = &value
	}

	return auditLog
}

func buildAuditPaginationMeta(page, limit int, total int64) *model.PaginationMeta {
	totalPage := int32(0)
	if limit > 0 && total > 0 {
		totalPage = int32((total + int64(limit) - 1) / int64(limit))
	}

	return &model.PaginationMeta{
		Page:        int32(page),
		Limit:       int32(limit),
		TotalData:   int32(total),
		TotalPage:   totalPage,
		HasNext:     page > 0 && int32(page) < totalPage,
		HasPrevious: page > 1,
	}
}
