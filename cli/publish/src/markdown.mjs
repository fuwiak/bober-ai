/**
 * Zero-dep Markdown → HTML (common subset).
 * Good enough for site HTML + Medium paste fallback.
 */

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inline(text) {
  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "<em>$1</em>");
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  return s;
}

export function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let inUl = false;
  let inOl = false;
  let inP = false;

  const closeLists = () => {
    if (inUl) {
      out.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      out.push("</ol>");
      inOl = false;
    }
  };
  const closeP = () => {
    if (inP) {
      out.push("</p>");
      inP = false;
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      closeP();
      closeLists();
      const lang = line.slice(3).trim();
      const buf = [];
      i += 1;
      while (i < lines.length && !lines[i].startsWith("```")) {
        buf.push(lines[i]);
        i += 1;
      }
      const code = escapeHtml(buf.join("\n"));
      out.push(lang ? `<pre><code class="language-${escapeHtml(lang)}">${code}</code></pre>` : `<pre><code>${code}</code></pre>`);
      i += 1;
      continue;
    }

    if (/^#{1,3}\s+/.test(line)) {
      closeP();
      closeLists();
      const level = line.match(/^#+/)[0].length;
      out.push(`<h${level}>${inline(line.replace(/^#{1,3}\s+/, ""))}</h${level}>`);
      i += 1;
      continue;
    }

    if (/^[-*+]\s+/.test(line)) {
      closeP();
      if (!inUl) {
        closeLists();
        out.push("<ul>");
        inUl = true;
      }
      out.push(`<li>${inline(line.replace(/^[-*+]\s+/, ""))}</li>`);
      i += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      closeP();
      if (!inOl) {
        closeLists();
        out.push("<ol>");
        inOl = true;
      }
      out.push(`<li>${inline(line.replace(/^\d+\.\s+/, ""))}</li>`);
      i += 1;
      continue;
    }

    if (/^>\s?/.test(line)) {
      closeP();
      closeLists();
      out.push(`<blockquote><p>${inline(line.replace(/^>\s?/, ""))}</p></blockquote>`);
      i += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      closeP();
      closeLists();
      out.push("<hr />");
      i += 1;
      continue;
    }

    if (!line.trim()) {
      closeP();
      closeLists();
      i += 1;
      continue;
    }

    closeLists();
    if (!inP) {
      out.push("<p>");
      inP = true;
      out.push(inline(line));
    } else {
      out.push(` ${inline(line)}`);
    }
    i += 1;
  }

  closeP();
  closeLists();
  return out.join("\n");
}

/** Strip leading H1 if it duplicates the title (common in MD articles). */
export function stripDuplicateTitle(body, title) {
  const t = title.trim();
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  if (lines[0] && lines[0].startsWith("# ")) {
    const h = lines[0].replace(/^#\s+/, "").trim();
    if (h === t) {
      let i = 1;
      while (i < lines.length && !lines[i].trim()) i += 1;
      return lines.slice(i).join("\n");
    }
  }
  return body;
}
