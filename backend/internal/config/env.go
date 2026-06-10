package config

import (
	"log"

	backendEnv "backend/pkg/env"

	"github.com/joho/godotenv"
)

type Env struct {
	AppPort        string
	DBHost         string
	DBPort         string
	DBUser         string
	DBPassword     string
	DBName         string
	DBSSLMode      string
	JWTSecret      string
	Timezone       string
	DBMaxOpenConns int
	DBMaxIdleConns int
	CORSOrigins    []string
}

func LoadEnv() *Env {
	err := godotenv.Load()

	if err != nil {
		log.Println("No .env file found")
	}

	return &Env{
		AppPort:        backendEnv.GetString("APP_PORT", "8080"),
		DBHost:         backendEnv.GetString("DB_HOST", "localhost"),
		DBPort:         backendEnv.GetString("DB_PORT", "5432"),
		DBUser:         backendEnv.GetString("DB_USER", "postgres"),
		DBPassword:     backendEnv.GetString("DB_PASSWORD", "password"),
		DBName:         backendEnv.GetString("DB_NAME", "mydb"),
		DBSSLMode:      backendEnv.GetString("DB_SSLMODE", "disable"),
		JWTSecret:      backendEnv.GetString("JWT_SECRET", "secret"),
		Timezone:       backendEnv.GetString("DB_TIMEZONE", "UTC"),
		DBMaxOpenConns: backendEnv.GetInt("DB_MAX_OPEN_CONNS", 10),
		DBMaxIdleConns: backendEnv.GetInt("DB_MAX_IDLE_CONNS", 10),
		CORSOrigins:     backendEnv.GetStringSlice("CORS_ORIGINS", []string{}),
	}
}
