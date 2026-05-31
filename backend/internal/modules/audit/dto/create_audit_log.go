package dto

type CreateAuditLogInput struct {
	UserID      *uint
	Action      string
	Entity			string
	EntityID		*uint
	IPAddress   string
	RequestData string
	ResponseData string
	Status			string
	ErrorMessage string
}