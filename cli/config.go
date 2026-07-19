package main

import (
	"os"
	"path/filepath"
)

type Config struct {
	Host          string
	User          string
	SSHKey        string
	Container     string
	RemoteRoot    string
	HealthPath    string
	PublicURL     string
	DeployLog     string
	ReadyFile     string
}

func loadConfig() Config {
	home, _ := os.UserHomeDir()
	key := envOr("BOBER_SSH_KEY", filepath.Join(home, ".ssh", "bober_selectel"))
	return Config{
		Host:       envOr("BOBER_HOST", "45.80.131.136"),
		User:       envOr("BOBER_SSH_USER", "root"),
		SSHKey:     key,
		Container:  envOr("BOBER_CONTAINER", "bober-ai"),
		RemoteRoot: envOr("BOBER_REMOTE_ROOT", "/opt/bober-ai"),
		HealthPath: envOr("BOBER_HEALTH_PATH", "/api/health"),
		PublicURL:  envOr("BOBER_PUBLIC_URL", "https://www.bober-ai.dev"),
		DeployLog:  envOr("BOBER_DEPLOY_LOG", "/var/log/bober-deploy.log"),
		ReadyFile:  envOr("BOBER_READY_FILE", "/opt/bober-ai/READY"),
	}
}

func envOr(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
