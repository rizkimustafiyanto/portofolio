package dto

type RegisterInput struct {
	Name     string
	Email    string
	Password string
}

type LoginInput struct {
	Email    string
	Password string
}

type User struct {
	ID    uint
	Name  string
	Email string
}

type AuthPayload struct {
	Token string `json:"token"`
	User  *User
}
