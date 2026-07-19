package main

import (
	"flag"
	"fmt"
	"os"
	"strings"

	tea "github.com/charmbracelet/bubbletea"
)

func main() {
	cfg := loadConfig()
	args := os.Args[1:]
	if len(args) == 0 {
		runTUI(cfg)
		return
	}

	switch args[0] {
	case "tui", "ui", "dashboard":
		runTUI(cfg)
	case "status", "st":
		printStatus(cfg)
	case "health", "hc", "check":
		printHealth(cfg)
	case "logs", "log":
		runLogs(cfg, args[1:])
	case "build", "deploy-log":
		printBuild(cfg, args[1:])
	case "help", "-h", "--help":
		printUsage()
	default:
		fmt.Fprintf(os.Stderr, "unknown command: %s\n\n", args[0])
		printUsage()
		os.Exit(2)
	}
}

func runTUI(cfg Config) {
	m := newModel(cfg)
	p := tea.NewProgram(m, tea.WithAltScreen())
	if _, err := p.Run(); err != nil {
		fmt.Fprintf(os.Stderr, "bober-ops: %v\n", err)
		os.Exit(1)
	}
}

func printStatus(cfg Config) {
	snap := fetchStatus(cfg)
	fmt.Println(strings.TrimSpace(renderStatus(snap, cfg)))
	fail := false
	if !snap.Container.Running || snap.Container.Err != "" {
		fail = true
	}
	for _, h := range snap.Health {
		if !h.OK {
			fail = true
			break
		}
	}
	if fail {
		os.Exit(1)
	}
}

func printHealth(cfg Config) {
	results := probeAllHealth(cfg)
	fmt.Println(formatHealth(results))
	for _, r := range results {
		if !r.OK {
			os.Exit(1)
		}
	}
}

func runLogs(cfg Config, args []string) {
	fs := flag.NewFlagSet("logs", flag.ExitOnError)
	follow := fs.Bool("f", false, "follow")
	tail := fs.Int("tail", 100, "number of lines")
	_ = fs.Parse(args)
	if err := fetchLogs(cfg, *tail, *follow); err != nil {
		fmt.Fprintf(os.Stderr, "logs: %v\n", err)
		os.Exit(1)
	}
}

func printBuild(cfg Config, args []string) {
	fs := flag.NewFlagSet("build", flag.ExitOnError)
	tail := fs.Int("tail", 80, "number of lines")
	_ = fs.Parse(args)
	out, err := fetchDeployLog(cfg, *tail)
	if err != nil {
		fmt.Fprintf(os.Stderr, "build: %v\n", err)
		os.Exit(1)
	}
	fmt.Println(out)
}

func printUsage() {
	fmt.Print(`bober-ops — Selectel VDS ops (Railway analog: status / logs / healthcheck)

Usage:
  bober-ops                 interactive TUI
  bober-ops status          container + deploy + health snapshot
  bober-ops health          Network › Healthcheck probes
  bober-ops logs [-f] [--tail N]
  bober-ops build           last deploy/build log from VPS
  bober-ops help

Env:
  BOBER_HOST          default 45.80.131.136
  BOBER_SSH_USER      default root
  BOBER_SSH_KEY       default ~/.ssh/bober_selectel
  BOBER_CONTAINER     default bober-ai
  BOBER_PUBLIC_URL    default https://www.bober-ai.dev
  BOBER_HEALTH_PATH   default /api/health
`)
}
