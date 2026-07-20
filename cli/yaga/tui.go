package main

import (
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/charmbracelet/bubbles/viewport"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

type tab int

const (
	tabBricks tab = iota
	tabDoctor
	tabOutput
	tabHelp
)

type model struct {
	cfg           Config
	width, height int
	tab           tab
	cursor        int
	bricks        []Brick
	flash         string
	output        string
	running       bool
	vp            viewport.Model
	ready         bool
	clock         time.Time
}

type tickMsg time.Time

type runDoneMsg struct {
	title string
	out   string
	err   string
}

func newModel(cfg Config) model {
	bricks := visibleBricks(cfg)
	return model{
		cfg:    cfg,
		tab:    tabBricks,
		bricks: bricks,
		flash:  fmt.Sprintf("profile=%s · %d bricks", cfg.Profile, len(bricks)),
		vp:     viewport.New(80, 20),
		clock:  time.Now(),
		output: "Select a brick and press Enter to run its default action.\nOutput appears on tab 3.",
	}
}

func runTUI(cfg Config) {
	m := newModel(cfg)
	p := tea.NewProgram(m, tea.WithAltScreen())
	if _, err := p.Run(); err != nil {
		fmt.Fprintf(os.Stderr, "yaga: %v\n", err)
		os.Exit(1)
	}
}

func (m model) Init() tea.Cmd {
	return tea.Tick(time.Second, func(t time.Time) tea.Msg { return tickMsg(t) })
}

func (m model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.WindowSizeMsg:
		m.width, m.height = msg.Width, msg.Height
		m.vp.Width = max(20, m.width)
		m.vp.Height = max(3, m.height-3)
		m.ready = true
		m.refreshVP()
		return m, nil

	case tickMsg:
		m.clock = time.Time(msg)
		return m, tea.Tick(time.Second, func(t time.Time) tea.Msg { return tickMsg(t) })

	case runDoneMsg:
		m.running = false
		if msg.err != "" {
			m.output = msg.title + "\n\n" + msg.out + "\n\nERR: " + msg.err
			m.flash = "failed · " + msg.title
		} else {
			m.output = msg.title + "\n\n" + msg.out
			if strings.TrimSpace(msg.out) == "" {
				m.output += "(no capture — command used inherited stdio; run from shell for live output)"
			}
			m.flash = "ok · " + msg.title
		}
		m.tab = tabOutput
		m.refreshVP()
		return m, nil

	case tea.KeyMsg:
		return m.handleKey(msg)
	}
	return m, nil
}

func (m model) handleKey(msg tea.KeyMsg) (tea.Model, tea.Cmd) {
	switch msg.String() {
	case "q", "ctrl+c":
		return m, tea.Quit
	case "tab", "right":
		m.tab = (m.tab + 1) % 4
		m.refreshVP()
		return m, nil
	case "shift+tab", "left":
		m.tab = (m.tab + 3) % 4
		m.refreshVP()
		return m, nil
	case "1":
		m.tab = tabBricks
		m.refreshVP()
		return m, nil
	case "2":
		m.tab = tabDoctor
		m.refreshVP()
		return m, nil
	case "3":
		m.tab = tabOutput
		m.refreshVP()
		return m, nil
	case "4", "?":
		m.tab = tabHelp
		m.refreshVP()
		return m, nil
	case "r":
		m.bricks = visibleBricks(m.cfg)
		m.flash = "refreshed"
		if m.cursor >= len(m.bricks) {
			m.cursor = max(0, len(m.bricks)-1)
		}
		m.refreshVP()
		return m, nil
	case "up", "k":
		if m.tab == tabBricks && m.cursor > 0 {
			m.cursor--
			m.refreshVP()
		} else {
			m.vp.LineUp(1)
		}
		return m, nil
	case "down", "j":
		if m.tab == tabBricks && m.cursor < len(m.bricks)-1 {
			m.cursor++
			m.refreshVP()
		} else {
			m.vp.LineDown(1)
		}
		return m, nil
	case "enter", " ":
		if m.tab == tabBricks && !m.running && len(m.bricks) > 0 {
			b := m.bricks[m.cursor]
			m.running = true
			m.flash = "running " + b.ID + "…"
			return m, runBrickCmd(m.cfg, b)
		}
		return m, nil
	case "pgup":
		m.vp.ViewUp()
		return m, nil
	case "pgdown":
		m.vp.ViewDown()
		return m, nil
	}
	return m, nil
}

func runBrickCmd(cfg Config, b Brick) tea.Cmd {
	return func() tea.Msg {
		args := b.DefaultArgs
		title := "yaga " + b.ID
		if len(args) > 0 {
			title += " " + strings.Join(args, " ")
		}
		out, err := captureBrick(cfg, b, args)
		msg := runDoneMsg{title: title, out: out}
		if err != nil {
			msg.err = err.Error()
		}
		return msg
	}
}

func captureBrick(cfg Config, b Brick, args []string) (string, error) {
	// Prefer script capture when we know the mapping; else run and note.
	switch b.ID {
	case "webmaster":
		sub, rest := splitSub(args, "status")
		switch sub {
		case "status":
			return runScriptCapture(cfg, "yandex-status.mjs", rest)
		case "feed":
			return runScriptCapture(cfg, "yandex-webmaster-feed.mjs", rest)
		}
	case "metrika":
		sub, rest := splitSub(args, "status")
		if sub == "status" {
			return runScriptCapture(cfg, "yandex-metrika-status.mjs", rest)
		}
		if sub == "ytm" {
			return runScriptCapture(cfg, "yandex-ytm-status.mjs", rest)
		}
	case "direct":
		return runScriptCapture(cfg, "yandex-direct-campaigns.mjs", []string{"status"})
	case "cloud":
		return runBinCapture("yc", []string{"version"})
	case "core":
		return brickCore().Help, nil
	case "doctor":
		return renderDoctor(cfg), nil
	}
	// Fallback: help text
	if b.Help != "" {
		return b.Help + "\n\n(Run from shell for full interactive output:\n  yaga " + b.ID + " …)\n", nil
	}
	return "", fmt.Errorf("no capture handler; run: yaga %s", b.ID)
}

func (m *model) refreshVP() {
	m.vp.SetContent(m.body())
	m.vp.GotoTop()
}

func (m model) View() string {
	if !m.ready {
		return "…"
	}
	return lipgloss.JoinVertical(lipgloss.Left, m.header(), m.tabs(), m.vp.View(), m.footer())
}

func (m model) header() string {
	bg := lipgloss.Color("17")
	if m.cfg.Profile == "owner" {
		bg = lipgloss.Color("54")
	} else if m.cfg.Profile == "public" {
		bg = lipgloss.Color("22")
	}
	style := lipgloss.NewStyle().Background(bg).Foreground(lipgloss.Color("15")).Width(max(20, m.width))
	left := fmt.Sprintf(" YAGA · %s ", strings.ToUpper(m.cfg.Profile))
	right := trunc(m.flash, max(8, m.width-lipgloss.Width(left)-1))
	pad := max(0, m.width-lipgloss.Width(left)-lipgloss.Width(right))
	return style.Render(left + strings.Repeat(" ", pad) + right)
}

func (m model) tabs() string {
	inactive := lipgloss.NewStyle().Foreground(lipgloss.Color("245")).Padding(0, 1)
	active := lipgloss.NewStyle().Background(lipgloss.Color("62")).Foreground(lipgloss.Color("15")).Bold(true).Padding(0, 1)
	labels := []string{"1 Bricks", "2 Doctor", "3 Output", "4 Help"}
	parts := make([]string, 0, 4)
	for i, label := range labels {
		if tab(i) == m.tab {
			parts = append(parts, active.Render(label))
		} else {
			parts = append(parts, inactive.Render(label))
		}
	}
	bar := lipgloss.JoinHorizontal(lipgloss.Top, parts...)
	return bar + strings.Repeat(" ", max(0, m.width-lipgloss.Width(bar)))
}

func (m model) footer() string {
	style := lipgloss.NewStyle().Foreground(lipgloss.Color("245")).Width(max(20, m.width))
	return style.Render(" Tab/←→ · ↑↓ select · Enter run · r refresh · q quit ")
}

func (m model) body() string {
	switch m.tab {
	case tabBricks:
		return m.bodyBricks()
	case tabDoctor:
		return "\n" + renderDoctor(m.cfg)
	case tabOutput:
		if m.running {
			return "\n  running…\n"
		}
		return "\n" + m.output + "\n"
	case tabHelp:
		return helpTUI(m.cfg)
	}
	return ""
}

func (m model) bodyBricks() string {
	var b strings.Builder
	b.WriteString(fmt.Sprintf("\n  Bricks for profile=%s (Enter = default action)\n", m.cfg.Profile))
	b.WriteString("  " + strings.Repeat("─", 48) + "\n\n")
	if len(m.bricks) == 0 {
		b.WriteString("  (none visible — try yaga profile owner)\n")
		return b.String()
	}
	for i, br := range m.bricks {
		cursor := "  "
		if i == m.cursor {
			cursor = "▸ "
		}
		b.WriteString(fmt.Sprintf("%s%-12s [%s]  %s\n", cursor, br.ID, br.vis(), br.Title))
		if br.Description != "" {
			b.WriteString(fmt.Sprintf("               %s\n", br.Description))
		}
	}
	if m.cursor >= 0 && m.cursor < len(m.bricks) {
		br := m.bricks[m.cursor]
		b.WriteString("\n  " + strings.Repeat("─", 48) + "\n")
		b.WriteString(fmt.Sprintf("  default: yaga %s %s\n", br.ID, strings.Join(br.DefaultArgs, " ")))
	}
	return b.String()
}

func helpTUI(cfg Config) string {
	return fmt.Sprintf(`
  yaga — Go + Bubble Tea (same stack as bober)

  Tabs
    1 Bricks   pick klocek, Enter runs default
    2 Doctor   tokens / binaries
    3 Output   last captured run
    4 Help

  Shell (any directory after install)
    yaga
    yaga webmaster status
    yaga metrika status
    yaga direct campaigns status
    yaga profile public     # hide owner bricks
    yaga bricks hide gpt

  Config: %s
  Repo:   %s

  Add a brick: edit allBricks() in bricks.go (one klocek = one Brick{}).
`, cfg.Path, cfg.RepoRoot)
}

func trunc(s string, n int) string {
	r := []rune(s)
	if n <= 0 {
		return ""
	}
	if len(r) <= n {
		return s
	}
	if n <= 1 {
		return string(r[:n])
	}
	return string(r[:n-1]) + "…"
}
