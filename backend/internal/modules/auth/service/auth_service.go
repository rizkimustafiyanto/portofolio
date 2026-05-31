package service

import (
	"context"
	"errors"

	"backend/internal/config"
	"backend/internal/modules/auth/dto"
	"backend/internal/modules/auth/model"
	"backend/internal/modules/auth/repository"
	jwtpkg "backend/pkg/jwt"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	Repo *repository.AuthRepository
	Env  *config.Env
}

func NewAuthService(
	repo *repository.AuthRepository,
	env *config.Env,
) *AuthService {
	return &AuthService{
		Repo: repo,
		Env:  env,
	}
}

func (s *AuthService) Register(
	ctx context.Context,
	input dto.RegisterInput,
) (*dto.User, error) {

	_, err := s.Repo.FindByEmail(ctx, input.Email)

	if err == nil {
		return nil, errors.New("email already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(input.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return nil, err
	}

	user := &model.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	err = s.Repo.CreateUser(ctx, user)

	if err != nil {
		return nil, err
	}

	return toUserDTO(user), nil
}

func (s *AuthService) Login(
	ctx context.Context,
	input dto.LoginInput,
) (*dto.AuthPayload, error) {

	user, err := s.Repo.FindByEmail(ctx, input.Email)

	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(input.Password),
	)

	if err != nil {
		return nil, errors.New("invalid credentials")
	}

	token, err := jwtpkg.GenerateToken(
		user.ID,
		s.Env.JWTSecret,
	)

	if err != nil {
		return nil, err
	}

	return &dto.AuthPayload{
		Token: token,
		User:  toUserDTO(user),
	}, nil
}

func (s *AuthService) Me(
	ctx context.Context,
	userID uint,
) (*dto.User, error) {
	user, err := s.Repo.FindByID(ctx, userID)

	if err != nil {
		return nil, err
	}

	return toUserDTO(user), nil
}

func toUserDTO(user *model.User) *dto.User {
	if user == nil {
		return nil
	}

	return &dto.User{
		ID:    user.ID,
		Name:  user.Name,
		Email: user.Email,
	}
}
