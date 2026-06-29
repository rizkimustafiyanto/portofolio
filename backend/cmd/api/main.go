package main

import (
	"log"

	"backend/internal/bootstrap"
	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/modules"
	"backend/internal/server"
)

func main() {
	env := config.LoadEnv()

	db := database.ConnectDB(env)
	database.Migrate(db)

	authService := bootstrap.NewAuthService(db, env)
	auditService := bootstrap.NewAuditService(db)
	projectService := bootstrap.NewProjectService(db)

	resolver := &modules.Resolver{
		AuthService:    authService,
		ProjectService: projectService,
		AuditService:   auditService,
	}
	httpServer := server.New(env, resolver)

	log.Printf("Server running at :%s", env.AppPort)
	log.Fatal(httpServer.ListenAndServe())
}
