package main

import (
	"log"

	"backend/internal/config"
	"backend/internal/database"
	"backend/internal/modules"
	auditrepository "backend/internal/modules/audit/repository"
	auditservice "backend/internal/modules/audit/service"
	"backend/internal/modules/auth/repository"
	"backend/internal/modules/auth/service"
	projectrepository "backend/internal/modules/project/repository"
	projectservice "backend/internal/modules/project/service"
	"backend/internal/server"
)

func main() {
	env := config.LoadEnv()

	db := database.ConnectDB(env)
	database.Migrate(db)

	authRepo := repository.NewAuthRepository(db)
	authService := service.NewAuthService(authRepo, env)
	auditRepo := auditrepository.NewAuditRepository(db)
	auditService := auditservice.NewAuditService(auditRepo)
	projectRepo := projectrepository.NewProjectRepository(db)
	projectService := projectservice.NewProjectService(projectRepo)

	resolver := &modules.Resolver{
		AuthService:    authService,
		ProjectService: projectService,
		AuditService:   auditService,
	}
	httpServer := server.New(env, resolver)

	log.Printf("Server running at :%s", env.AppPort)
	log.Fatal(httpServer.ListenAndServe())
}
