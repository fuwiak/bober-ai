package main

import (
	"fmt"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type mode int

const (
	modeStatus mode = iota
	modeLogs
	modeHealth
	modeBuild
	modeHelp
)

type snapshotMsg struct {
	snap StatusSnapshot
}

type logsMsg struct {
	text string
	err  string
}

type buildLogMsg struct {
	text string
	err  string
}

type tickMsg time.Time

type model struct {
	cfg           Config
	width, height int
	mode          mode
	flash         string
	loading       bool
	snap          StatusSnapshot
	logs          string
	buildLog      string
	vp            viewport.Model
	ready         bool
}

func newModel(cfg Config) model {
	return model{
		cfg:     cfg,
		mode:    modeStatus,
		flash:   "loading…",
		loading: true,
		vp:      viewport.New(80, 20),
	}
}

func (m model) Init() tea.Cmd {
	return tea.Batch(loadSnapshotCmd(m.cfg), tickCmd())
}

func tickCmd() tea.Cmd {
	return tea.Tick(time.Second, func(t time.Time) tea.Msg { return tickMsg(t) })
}

func loadSnapshotCmd(cfg Config) tea.Cmd {
	return func() tea.Msg {
		return snapshotMsg{snap: fetchStatus(cfg)}
	}
}

func loadLogsCmd(cfg Config) tea.Cmd {
	return func() tea.Msg {
		out, err := sshRun(cfg, fmt.Sprintf("docker logs --tail 120 %q 2>&1", cfg.Container))
		if err != nil {
			return logsMsg{err: err.Error()}
		}
		return logsMsg{text: out}
	}
}

func loadBuildLogCmd(cfg Config) tea.Cmd {
	return func() tea.Msg {
		out, err := fetchDeployLog(cfg, 80)
		if err != nil {
			return buildLogMsg{err: err.Error()}
		}
		return buildLogMsg{text: out}
	}
}

func (m model) pageNo() int {
	switch m.mode {
	case modeStatus:
		return 100
	case modeHealth:
		return 200
	case modeLogs:
		return 300
	case modeBuild:
		return 400
	case modeHelp:
		return 600
	default:
		return 100
	}
}

func (m model) pageTitle() string {
	switch m.mode {
	case modeStatus:
		return "STATUS"
	case modeHealth:
		return "HEALTH"
	case modeLogs:
		return "LOGS"
	case modeBuild:
		return "BUILD"
	case modeHelp:
		return "HELP"
	default:
		return "BOBER"
	}
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width, m.height = msg.Width, msg.Height
		m.layout()
		m.ready = true
		m.refreshViewport()
		return m, nil

	case tickMsg:
		return m, tickCmd()

	case snapshotMsg:
		m.snap = msg.snap
		m.loading = false
		ok := 0
		for _, h := range msg.snap.Health {
			if h.OK {
				ok++
			}
		}
		state := "DOWN"
		if msg.snap.Container.Running {
			state = "UP"
		}
		m.flash = fmt.Sprintf("%s · health %d/%d · %s", state, ok, len(msg.snap.Health), msg.snap.FetchedAt.Format("15:04:05"))
		m.refreshViewport()
		return m, nil

	case logsMsg:
		m.loading = false
		if msg.err != "" {
			m.logs = "ERR " + msg.err
			m.flash = "logs failed"
		} else {
			m.logs = msg.text
			m.flash = "logs OK"
		}
		m.refreshViewport()
		return m, nil

	case buildLogMsg:
		m.loading = false
		if msg.err != "" {
			m.buildLog = "ERR " + msg.err
			m.flash = "build log failed"
		} else {
			m.buildLog = msg.text
			m.flash = "build log OK"
		}
		m.refreshViewport()
		return m, nil

	case tea.KeyMsg:
		return m.handleKey(msg)
	}
	return m, nil
}

func (m *model) layout() {
	m.vp.Width = max(20, m.width)
	m.vp.Height = max(3, m.height-2)
}

func (m *model) refreshViewport() {
	m.vp.SetContent(m.body())
	if m.mode == modeLogs || m.mode == modeBuild {
		m.vp.GotoBottom()
	} else {
		m.vp.GotoTop()
	}
}

func (m model) handleKey(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "q", "ctrl+c":
		return m, tea.Quit
	case "r":
		m.loading = true
		m.flash = "refresh…"
		switch m.mode {
		case modeLogs:
			return m, loadLogsCmd(m.cfg)
		case modeBuild:
			return m, loadBuildLogCmd(m.cfg)
		default:
			return m, loadSnapshotCmd(m.cfg)
		}
	case "1", "s":
		m.mode = modeStatus
		m.refreshViewport()
		return m, nil
	case "2", "h":
		m.mode = modeHealth
		m.refreshViewport()
		return m, nil
	case "3", "l":
		m.mode = modeLogs
		m.loading = true
		m.flash = "fetch logs…"
		m.refreshViewport()
		return m, loadLogsCmd(m.cfg)
	case "4", "b":
		m.mode = modeBuild
		m.loading = true
		m.flash = "fetch build…"
		m.refreshViewport()
		return m, loadBuildLogCmd(m.cfg)
	case "?", "6":
		m.mode = modeHelp
		m.refreshViewport()
		return m, nil
	case "up", "k":
		m.vp.LineUp(1)
	case "down", "j":
		m.vp.LineDown(1)
	case "pgup":
		m.vp.ViewUp()
	case "pgdown", " ":
		m.vp.ViewDown()
	case "home":
		m.vp.GotoTop()
	case "end":
		m.vp.GotoBottom()
	}
	return m, nil
}

func (m model) View() string {
	if !m.ready {
		return "…"
	}
	return lipgloss.JoinVertical(lipgloss.Left, m.header(), m.vp.View(), m.footer())
}

func (m model) header() string {
	bg := lipgloss.Color("17")
	fg := lipgloss.Color("15")
	if m.snap.Container.Running {
		allOK := true
		for _, h := range m.snap.Health {
			if !h.OK {
				allOK = false
				break
			}
		}
		if allOK && len(m.snap.Health) > 0 {
			bg = lipgloss.Color("22")
		} else {
			bg = lipgloss.Color("58")
		}
	} else if !m.loading {
		bg = lipgloss.Color("52")
	}

	style := lipgloss.NewStyle().Background(bg).Foreground(fg).Width(max(20, m.width))
	left := fmt.Sprintf(" BOBER OPS  P%d %s ", m.pageNo(), m.pageTitle())
	right := trunc(m.flash, max(10, m.width-len(left)-2))
	pad := max(0, m.width-len(left)-len(right))
	return style.Render(left + strings.Repeat(" ", pad) + right)
}

func (m model) footer() string {
	style := lipgloss.NewStyle().Foreground(lipgloss.Color("245")).Width(max(20, m.width))
	return style.Render(" 1/s status · 2/h health · 3/l logs · 4/b build · r refresh · q quit ")
}

func (m model) body() string {
	if m.loading && m.mode != modeHelp {
		return "\n  loading…\n"
	}
	switch m.mode {
	case modeStatus:
		return renderStatus(m.snap, m.cfg)
	case modeHealth:
		return "\n" + formatHealth(m.snap.Health) + "\n"
	case modeLogs:
		if m.logs == "" {
			return "\n  (no logs yet — press r)\n"
		}
		return m.logs
	case modeBuild:
		if m.buildLog == "" {
			return "\n  (no build log yet — press r)\n"
		}
		return m.buildLog
	case modeHelp:
		return helpText(m.cfg)
	default:
		return ""
	}
}

func renderStatus(s StatusSnapshot, cfg Config) string {
	var b strings.Builder
	c := s.Container
	d := s.Deploy

	b.WriteString("\n  Selectel VDS  (Railway analog)\n")
	b.WriteString("  " + strings.Repeat("─", 42) + "\n\n")
	b.WriteString(fmt.Sprintf("  host:        %s@%s\n", cfg.User, cfg.Host))
	b.WriteString(fmt.Sprintf("  container:   %s\n", c.Name))
	if c.Err != "" {
		b.WriteString(fmt.Sprintf("  state:       ERR %s\n", c.Err))
	} else {
		state := "stopped"
		if c.Running {
			state = "running"
		}
		b.WriteString(fmt.Sprintf("  state:       %s (%s)\n", state, c.Status))
		b.WriteString(fmt.Sprintf("  image:       %s\n", c.Image))
		b.WriteString(fmt.Sprintf("  started:     %s\n", shortenTime(c.StartedAt)))
		b.WriteString(fmt.Sprintf("  ports:       %s\n", c.Ports))
	}
	b.WriteString("\n")
	b.WriteString(fmt.Sprintf("  ready file:  %s\n", emptyDash(d.Ready)))
	b.WriteString(fmt.Sprintf("  out mtime:   %s\n", emptyDash(shortenTime(d.OutMtime))))
	b.WriteString(fmt.Sprintf("  git:         %s\n", emptyDash(d.GitHead)))
	if d.Err != "" {
		b.WriteString(fmt.Sprintf("  deploy err:  %s\n", d.Err))
	}

	b.WriteString("\n  Network › Healthcheck\n")
	b.WriteString("  " + strings.Repeat("─", 42) + "\n")
	for _, h := range s.Health {
		mark := "✗"
		if h.OK {
			mark = "✓"
		}
		if h.Err != "" {
			b.WriteString(fmt.Sprintf("  %s %-8s  %s\n", mark, h.Name, h.Err))
		} else {
			b.WriteString(fmt.Sprintf("  %s %-8s  %d  %q  %s\n", mark, h.Name, h.StatusCode, h.Body, h.Latency.Round(time.Millisecond)))
		}
	}
	b.WriteString(fmt.Sprintf("\n  fetched %s\n", s.FetchedAt.Format(time.RFC3339)))
	return b.String()
}

func helpText(cfg Config) string {
	return fmt.Sprintf(`
  bober-ops — Selectel ops CLI (Railway-like)

  Pages
    P100  status   container + deploy snapshot
    P200  health   Network › Healthcheck probes
    P300  logs     docker logs (container)
    P400  build    /var/log/bober-deploy.log
    P600  help

  CLI (non-TUI)
    go run . status
    go run . health
    go run . logs [-f] [--tail N]
    go run . build

  Config (env)
    BOBER_HOST=%s
    BOBER_SSH_KEY=%s
    BOBER_CONTAINER=%s
    BOBER_PUBLIC_URL=%s
    BOBER_HEALTH_PATH=%s
`, cfg.Host, cfg.SSHKey, cfg.Container, cfg.PublicURL, cfg.HealthPath)
}

func shortenTime(s string) string {
	s = strings.TrimSpace(s)
	if s == "" {
		return ""
	}
	// 2026-07-19T23:26:54.893313696Z → 2026-07-19 23:26:54Z
	if t, err := time.Parse(time.RFC3339Nano, s); err == nil {
		return t.UTC().Format("2006-01-02 15:04:05Z")
	}
	if len(s) > 19 {
		return s[:19]
	}
	return s
}

func emptyDash(s string) string {
	if strings.TrimSpace(s) == "" {
		return "—"
	}
	return s
}

func trunc(s string, n int) string {
	if n <= 0 {
		return ""
	}
	if len(s) <= n {
		return s
	}
	if n <= 1 {
		return s[:n]
	}
	return s[:n-1] + "…"
}
