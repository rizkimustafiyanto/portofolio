package logger

import (
	"context"

	auditDTO "backend/internal/modules/audit/dto"
	backendconvert "backend/pkg/convert"
	backendjsonx "backend/pkg/jsonx"
	backendtext "backend/pkg/text"
)

type Logger interface {
	Log(context.Context, auditDTO.CreateAuditLogInput)
}

func Record(logger Logger, ctx context.Context, payload auditDTO.CreateAuditLogInput) {
	if logger == nil {
		return
	}

	logger.Log(ctx, payload)
}

func EncodeData(value any) string {
	return backendjsonx.String(value)
}

func NormalizeStatus(status string) string {
	return backendtext.NormalizeStatus(status)
}

func ParseUintPointer(rawID string) *uint {
	return backendconvert.ParseUintPointer(rawID)
}
