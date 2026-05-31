package repository

import (
	"context"

	auditDTO "backend/internal/modules/audit/dto"
	auditModel "backend/internal/modules/audit/model"
	backendtext "backend/pkg/text"

	"gorm.io/gorm"
)

type AuditRepository struct {
	DB *gorm.DB
}

func NewAuditRepository(db *gorm.DB) *AuditRepository {
	return &AuditRepository{DB: db}
}

func (r *AuditRepository) CreateAuditLog(
	ctx context.Context,
	log *auditModel.AuditLog,
) error {
	return r.DB.WithContext(ctx).Create(log).Error
}

func (r *AuditRepository) GetAuditLogs(
	ctx context.Context,
	filter auditDTO.AuditFilterInput,
) ([]auditModel.AuditLog, int64, error) {
	var logs []auditModel.AuditLog
	baseQuery := r.DB.WithContext(ctx).Model(&auditModel.AuditLog{})
	baseQuery = applyAuditFilters(baseQuery, filter)

	var total int64
	if err := baseQuery.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	query := r.DB.WithContext(ctx).Model(&auditModel.AuditLog{})
	query = applyAuditFilters(query, filter)
	query = query.Order("created_at DESC")
	query = query.Limit(filter.Limit)
	query = query.Offset(filter.Offset())

	err := query.Find(&logs).Error
	return logs, total, err
}

func applyAuditFilters(query *gorm.DB, filter auditDTO.AuditFilterInput) *gorm.DB {
	if filter.UserID != nil {
		query = query.Where("user_id = ?", *filter.UserID)
	}
	if filter.Action != nil {
		if value, ok := backendtext.NonEmpty(*filter.Action); ok {
			query = query.Where("action = ?", value)
		}
	}
	if filter.Entity != nil {
		if value, ok := backendtext.NonEmpty(*filter.Entity); ok {
			query = query.Where("entity = ?", value)
		}
	}
	if filter.EntityID != nil {
		query = query.Where("entity_id = ?", *filter.EntityID)
	}
	if filter.Status != nil {
		if value, ok := backendtext.NonEmpty(*filter.Status); ok {
			query = query.Where("status = ?", value)
		}
	}

	return query
}
