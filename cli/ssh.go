package main

import (
	"bytes"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"
)

func sshArgs(cfg Config, remoteCmd string) []string {
	args := []string{
		"-o", "BatchMode=yes",
		"-o", "ConnectTimeout=8",
		"-o", "StrictHostKeyChecking=accept-new",
	}
	if cfg.SSHKey != "" {
		if _, err := os.Stat(cfg.SSHKey); err == nil {
			args = append(args, "-i", cfg.SSHKey)
		}
	}
	args = append(args, fmt.Sprintf("%s@%s", cfg.User, cfg.Host), remoteCmd)
	return args
}

func sshRun(cfg Config, remoteCmd string) (string, error) {
	cmd := exec.Command("ssh", sshArgs(cfg, remoteCmd)...)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr
	err := cmd.Run()
	out := strings.TrimSpace(stdout.String())
	if err != nil {
		msg := strings.TrimSpace(stderr.String())
		if msg == "" {
			msg = err.Error()
		}
		if out != "" {
			return out, fmt.Errorf("%s", msg)
		}
		return "", fmt.Errorf("%s", msg)
	}
	return out, nil
}

func sshStream(cfg Config, remoteCmd string) error {
	cmd := exec.Command("ssh", sshArgs(cfg, remoteCmd)...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Stdin = os.Stdin
	return cmd.Run()
}

type ContainerStatus struct {
	Name      string
	Running   bool
	Status    string
	Image     string
	Created   string
	StartedAt string
	Ports     string
	Raw       string
	Err       string
}

type DeployStatus struct {
	Ready     string
	OutMtime  string
	GitHead   string
	DeployLog string
	Err       string
}

type StatusSnapshot struct {
	FetchedAt time.Time
	Container ContainerStatus
	Deploy    DeployStatus
	Health    []HealthResult
}

func fetchContainerStatus(cfg Config) ContainerStatus {
	script := fmt.Sprintf(`
set -e
C=%q
if ! docker inspect "$C" >/dev/null 2>&1; then
  echo "MISSING"
  exit 0
fi
echo "NAME=$(docker inspect -f '{{.Name}}' "$C" | sed 's#^/##')"
echo "STATUS=$(docker inspect -f '{{.State.Status}}' "$C")"
echo "RUNNING=$(docker inspect -f '{{.State.Running}}' "$C")"
echo "IMAGE=$(docker inspect -f '{{.Config.Image}}' "$C")"
echo "CREATED=$(docker inspect -f '{{.Created}}' "$C")"
echo "STARTED=$(docker inspect -f '{{.State.StartedAt}}' "$C")"
echo "PORTS=$(docker inspect -f '{{range $p, $c := .NetworkSettings.Ports}}{{$p}} {{end}}' "$C")"
`, cfg.Container)

	out, err := sshRun(cfg, script)
	cs := ContainerStatus{Name: cfg.Container, Raw: out}
	if err != nil {
		cs.Err = err.Error()
		return cs
	}
	if strings.TrimSpace(out) == "MISSING" {
		cs.Err = "container not found"
		return cs
	}
	for _, line := range strings.Split(out, "\n") {
		k, v, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		switch k {
		case "NAME":
			cs.Name = v
		case "STATUS":
			cs.Status = v
		case "RUNNING":
			cs.Running = v == "true"
		case "IMAGE":
			cs.Image = v
		case "CREATED":
			cs.Created = v
		case "STARTED":
			cs.StartedAt = v
		case "PORTS":
			cs.Ports = strings.TrimSpace(v)
		}
	}
	return cs
}

func fetchDeployStatus(cfg Config) DeployStatus {
	script := fmt.Sprintf(`
READY=%q
OUT=%q/out
SRC=%q/src
LOG=%q
echo "READY=$(cat "$READY" 2>/dev/null || true)"
echo "OUT_MTIME=$(stat -c '%%y' "$OUT" 2>/dev/null || true)"
if [ -d "$SRC/.git" ]; then
  echo "GIT=$(git -C "$SRC" rev-parse --short HEAD 2>/dev/null || true) $(git -C "$SRC" log -1 --pretty=%%s 2>/dev/null || true)"
else
  echo "GIT=(no git checkout)"
fi
if [ -f "$LOG" ]; then
  echo "LOG_TAIL<<EOF"
  tail -n 40 "$LOG" 2>/dev/null || true
  echo "EOF"
fi
`, cfg.ReadyFile, cfg.RemoteRoot, cfg.RemoteRoot, cfg.DeployLog)

	out, err := sshRun(cfg, script)
	ds := DeployStatus{}
	if err != nil {
		ds.Err = err.Error()
		return ds
	}
	lines := strings.Split(out, "\n")
	inLog := false
	var logBuf []string
	for _, line := range lines {
		if line == "LOG_TAIL<<EOF" {
			inLog = true
			continue
		}
		if inLog {
			if line == "EOF" {
				inLog = false
				continue
			}
			logBuf = append(logBuf, line)
			continue
		}
		k, v, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		switch k {
		case "READY":
			ds.Ready = v
		case "OUT_MTIME":
			ds.OutMtime = v
		case "GIT":
			ds.GitHead = v
		}
	}
	ds.DeployLog = strings.Join(logBuf, "\n")
	return ds
}

func fetchStatus(cfg Config) StatusSnapshot {
	return StatusSnapshot{
		FetchedAt: time.Now(),
		Container: fetchContainerStatus(cfg),
		Deploy:    fetchDeployStatus(cfg),
		Health:    probeAllHealth(cfg),
	}
}

func fetchLogs(cfg Config, tail int, follow bool) error {
	if follow {
		return sshStream(cfg, fmt.Sprintf("docker logs -f --tail %d %q", tail, cfg.Container))
	}
	out, err := sshRun(cfg, fmt.Sprintf("docker logs --tail %d %q 2>&1", tail, cfg.Container))
	if err != nil {
		return err
	}
	fmt.Println(out)
	return nil
}

func fetchDeployLog(cfg Config, tail int) (string, error) {
	return sshRun(cfg, fmt.Sprintf("tail -n %d %q 2>&1 || echo '(no deploy log)'", tail, cfg.DeployLog))
}
