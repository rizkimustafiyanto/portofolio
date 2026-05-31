package server

import (
	"context"
	"errors"
	"net/http"
	"time"

	"backend/internal/config"
	"backend/internal/graphql/generated"
	"backend/internal/middleware"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

func New(env *config.Env, resolvers generated.ResolverRoot) *http.Server {
	cfg := generated.Config{Resolvers: resolvers}
	cfg.Directives.Auth = func(ctx context.Context, obj any, next graphql.Resolver) (any, error) {
		userID, ok := middleware.UserIDFromContext(ctx)
		if !ok || userID == 0 {
			return nil, errors.New("unauthorized")
		}

		return next(ctx)
	}

	gqlServer := handler.NewDefaultServer(generated.NewExecutableSchema(cfg))

	mux := http.NewServeMux()
	mux.Handle("/", playground.Handler("GraphQL", "/query"))
	mux.Handle("/query", middleware.AuthMiddleware(gqlServer, env.JWTSecret))

	return &http.Server{
		Addr:              ":" + env.AppPort,
		Handler:           middleware.ActivityMiddleware(mux),
		ReadHeaderTimeout: 10 * time.Second,
	}
}
