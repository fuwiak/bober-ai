type TokenKind =
  | "plain"
  | "comment"
  | "string"
  | "command"
  | "subcommand"
  | "flag"
  | "url"
  | "path"
  | "placeholder"
  | "env"
  | "operator";

type Token = { kind: TokenKind; text: string };

const SHELL_COMMANDS = new Set([
  "npm",
  "npx",
  "node",
  "yaga",
  "curl",
  "git",
  "go",
  "docker",
  "ssh",
  "cd",
  "ls",
  "cat",
  "export",
  "echo",
]);

function tokenizeLine(line: string): Token[] {
  if (!line.trim()) return [{ kind: "plain", text: line }];
  if (/^\s*#/.test(line)) return [{ kind: "comment", text: line }];

  const tokens: Token[] = [];
  let i = 0;
  let firstWord = true;
  let afterCommand = false;

  const push = (kind: TokenKind, text: string) => {
    if (!text) return;
    tokens.push({ kind, text });
  };

  while (i < line.length) {
    const rest = line.slice(i);

    if (/^\s+/.test(rest)) {
      const m = rest.match(/^\s+/)![0];
      push("plain", m);
      i += m.length;
      continue;
    }

    if (rest.startsWith("#")) {
      push("comment", rest);
      break;
    }

    if (rest[0] === '"' || rest[0] === "'") {
      const quote = rest[0];
      let end = 1;
      while (end < rest.length && rest[end] !== quote) {
        if (rest[end] === "\\" && end + 1 < rest.length) end += 2;
        else end += 1;
      }
      if (end < rest.length) end += 1;
      push("string", rest.slice(0, end));
      i += end;
      firstWord = false;
      continue;
    }

    if (/^[<>|&;]+/.test(rest)) {
      const m = rest.match(/^[<>|&;]+/)![0];
      push("operator", m);
      i += m.length;
      firstWord = true;
      afterCommand = false;
      continue;
    }

    const wordMatch = rest.match(/^[^\s#<>|&;'"]+/);
    if (!wordMatch) {
      push("plain", rest[0]);
      i += 1;
      continue;
    }

    const word = wordMatch[0];
    let kind: TokenKind = "plain";

    if (/^https?:\/\//.test(word)) kind = "url";
    else if (/^<[A-Za-z0-9_-]+>$/.test(word)) kind = "placeholder";
    else if (/^\$[A-Z_][A-Z0-9_]*$/.test(word) || /^[A-Z_][A-Z0-9_]*=/.test(word)) kind = "env";
    else if (/^--?[A-Za-z0-9][\w-]*/.test(word)) kind = "flag";
    else if (/^[.~/]/.test(word) || word.includes("/")) kind = "path";
    else if (firstWord && SHELL_COMMANDS.has(word)) {
      kind = "command";
      afterCommand = true;
    } else if (afterCommand && /^[a-z][\w:-]*$/i.test(word)) {
      kind = "subcommand";
      afterCommand = false;
    }

    push(kind, word);
    i += word.length;
    firstWord = false;
  }

  return tokens;
}

function highlightShell(code: string): Token[][] {
  return code.replace(/\n$/, "").split("\n").map(tokenizeLine);
}

type ShellCodeBlockProps = {
  code: string;
  label?: string;
  language?: string;
};

export function ShellCodeBlock({ code, label = "shell", language = "bash" }: ShellCodeBlockProps) {
  const lines = highlightShell(code);

  return (
    <div className="shell-code" data-language={language}>
      <div className="shell-code__chrome">
        <span className="shell-code__dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="shell-code__label">{label}</span>
      </div>
      <pre className="shell-code__pre">
        <code>
          {lines.map((tokens, lineIndex) => (
            <span key={`L${lineIndex}`} className="shell-code__line">
              <span className="shell-code__gutter" aria-hidden>
                {lineIndex + 1}
              </span>
              <span className="shell-code__content">
                {tokens.map((token, tokenIndex) =>
                  token.kind === "plain" ? (
                    <span key={`${lineIndex}-${tokenIndex}`}>{token.text}</span>
                  ) : (
                    <span key={`${lineIndex}-${tokenIndex}`} className={`tok tok--${token.kind}`}>
                      {token.text}
                    </span>
                  ),
                )}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
