package jwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var ErrInvalidToken = errors.New("invalid token")

func GenerateToken(userID uint, secret string) (string, error) {
	claims := jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}

func ValidateToken(
	tokenString string,
	secret string,
) (uint, error) {
	token, err := jwt.Parse(
		tokenString,
		func(token *jwt.Token) (any, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, ErrInvalidToken
			}

			return []byte(secret), nil
		},
	)

	if err != nil || !token.Valid {
		if err == nil {
			err = ErrInvalidToken
		}

		return 0, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return 0, ErrInvalidToken
	}

	rawUserID, ok := claims["user_id"]
	if !ok {
		return 0, ErrInvalidToken
	}

	userIDFloat, ok := rawUserID.(float64)
	if !ok {
		return 0, ErrInvalidToken
	}

	return uint(userIDFloat), nil
}
