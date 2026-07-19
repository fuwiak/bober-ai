package main

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"
)

type CommitInfo struct {
	Hash    string
	Date    string
	Subject string
}

type LogsBundle struct {
	Commits []CommitInfo
	Raw     string
	Text    string
	Err     string
}

func fetchCommits(cfg Config, n int) []CommitInfo {
	if n <= 0 {
		n = 8
	}
	script := fmt.Sprintf(`
SRC=%q/src
if [ -d "$SRC/.git" ]; then
  git -C "$SRC" log -n %d --format='%%h|%%ci|%%s' 2>/dev/null || true
elif [ -d %q/.git ]; then
  git -C %q log -n %d --format='%%h|%%ci|%%s' 2>/dev/null || true
fi
`, cfg.RemoteRoot, n, cfg.RemoteRoot, cfg.RemoteRoot, n)

	out, err := sshRun(cfg, script)
	if err != nil || strings.TrimSpace(out) == "" {
		return nil
	}
	var commits []CommitInfo
	for _, line := range strings.Split(out, "\n") {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		parts := strings.SplitN(line, "|", 3)
		if len(parts) < 3 {
			continue
		}
		commits = append(commits, CommitInfo{
			Hash:    parts[0],
			Date:    formatCommitDate(parts[1]),
			Subject: parts[2],
		})
	}
	return commits
}

func formatCommitDate(s string) string {
	s = strings.TrimSpace(s)
	layouts := []string{
		"2006-01-02 15:04:05 -0700",
		"2006-01-02 15:04:05 +0000",
		time.RFC3339,
	}
	for _, layout := range layouts {
		if t, err := time.Parse(layout, s); err == nil {
			return t.Local().Format("2006-01-02 15:04")
		}
	}
	if len(s) >= 16 {
		return s[:16]
	}
	return s
}

func fetchLogsBundle(cfg Config, tail int) LogsBundle {
	commits := fetchCommits(cfg, 8)
	out, err := sshRun(cfg, fmt.Sprintf("docker logs --timestamps --tail %d %q 2>&1", tail, cfg.Container))
	b := LogsBundle{Commits: commits, Raw: out}
	if err != nil {
		b.Err = err.Error()
		b.Text = formatLogsView(commits, "ERR "+err.Error())
		return b
	}
	b.Text = formatLogsView(commits, formatDockerLogs(out))
	return b
}

func formatLogsView(commits []CommitInfo, body string) string {
	var b strings.Builder
	b.WriteString("── commits")
	if len(commits) == 0 {
		b.WriteString(" (none on server) ──\n")
	} else {
		b.WriteString(" ──\n")
		for _, c := range commits {
			b.WriteString(fmt.Sprintf("%s  %s  %s\n", c.Hash, c.Date, c.Subject))
		}
	}
	b.WriteString("\n── container logs ──\n")
	b.WriteString(strings.TrimRight(body, "\n"))
	b.WriteString("\n")
	return b.String()
}

func formatDockerLogs(raw string) string {
	lines := strings.Split(raw, "\n")
	out := make([]string, 0, len(lines))
	for _, line := range lines {
		line = strings.TrimRight(line, "\r")
		if line == "" {
			continue
		}
		out = append(out, formatDockerLogLine(line))
	}
	return strings.Join(out, "\n")
}

func formatDockerLogLine(line string) string {
	// docker --timestamps prefix: 2026-07-19T23:26:55.123456789Z message
	tsPrefix := ""
	msg := line
	if len(line) > 30 && line[4] == '-' && (line[10] == 'T' || line[10] == ' ') {
		if i := strings.IndexByte(line, ' '); i > 0 {
			tsPrefix = shortenTime(line[:i])
			msg = strings.TrimSpace(line[i+1:])
		}
	}

	pretty := formatCaddyJSON(msg, tsPrefix == "")
	if tsPrefix != "" {
		return tsPrefix + "  " + pretty
	}
	return pretty
}

func formatCaddyJSON(msg string, includeTS bool) string {
	msg = strings.TrimSpace(msg)
	if !strings.HasPrefix(msg, "{") {
		return msg
	}
	var m map[string]any
	if err := json.Unmarshal([]byte(msg), &m); err != nil {
		return msg
	}

	var parts []string
	if includeTS {
		if ts, ok := m["ts"]; ok {
			parts = append(parts, formatAnyTS(ts))
		}
	}
	if lvl, ok := m["level"].(string); ok && lvl != "" {
		parts = append(parts, strings.ToUpper(lvl))
	}
	if logger, ok := m["logger"].(string); ok && logger != "" {
		parts = append(parts, logger)
	}
	if text, ok := m["msg"].(string); ok && text != "" {
		parts = append(parts, text)
	}
	for _, key := range []string{"server_name", "address", "file", "error"} {
		if v, ok := m[key]; ok {
			parts = append(parts, fmt.Sprintf("%s=%v", key, v))
		}
	}
	if len(parts) == 0 {
		return msg
	}
	return strings.Join(parts, "  ")
}

func formatAnyTS(v any) string {
	switch t := v.(type) {
	case float64:
		sec := int64(t)
		nsec := int64((t - float64(sec)) * 1e9)
		return time.Unix(sec, nsec).Local().Format("2006-01-02 15:04:05")
	case json.Number:
		f, err := t.Float64()
		if err != nil {
			return t.String()
		}
		return formatAnyTS(f)
	case string:
		if f, err := strconv.ParseFloat(t, 64); err == nil {
			return formatAnyTS(f)
		}
		return shortenTime(t)
	default:
		return fmt.Sprintf("%v", v)
	}
}
