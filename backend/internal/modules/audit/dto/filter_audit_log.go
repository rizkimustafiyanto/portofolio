package dto

import globalDTO "backend/pkg/dto"

type AuditFilterInput struct {
	globalDTO.PaginationDTO

	UserID    *uint
	Action    *string
	Entity    *string
	EntityID  *uint
	Status    *string
}