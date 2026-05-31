package middleware

import (
	"context"
	"errors"
	"net/http"
	"strings"

	jwtpkg "backend/pkg/jwt"
)

type contextKey string

const userIDKey contextKey = "userID"

func ContextWithUserID(ctx context.Context, userID uint) context.Context {
	return context.WithValue(ctx, userIDKey, userID)
}

func UserIDFromContext(ctx context.Context) (uint, bool) {
	userID, ok := ctx.Value(userIDKey).(uint)
	return userID, ok
}

func RequireUserID(ctx context.Context) (uint, error) {
	userID, ok := UserIDFromContext(ctx)
	if !ok || userID == 0 {
		return 0, errors.New("unauthorized")
	}

	return userID, nil
}

func AuthMiddleware(
	next http.Handler,
	jwtSecret string,
) http.Handler {
	return http.HandlerFunc(func(
		w http.ResponseWriter,
		r *http.Request,
	) {
		authHeader := strings.TrimSpace(r.Header.Get("Authorization"))

		if authHeader == "" {
			next.ServeHTTP(w, r)
			return
		}

		parts := strings.SplitN(authHeader, " ", 2)

		if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
			next.ServeHTTP(w, r)
			return
		}

		tokenString := strings.TrimSpace(parts[1])
		if tokenString == "" {
			next.ServeHTTP(w, r)
			return
		}

		userID, err := jwtpkg.ValidateToken(tokenString, jwtSecret)
		if err != nil {
			next.ServeHTTP(w, r)
			return
		}

		if userID != 0 {
			r = r.WithContext(ContextWithUserID(r.Context(), userID))
		}

		next.ServeHTTP(w, r)
	})
}
