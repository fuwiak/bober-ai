import { listArticleSlugs, loadArticle } from "./article.mjs";
import { articleCanonicalUrl, repoRoot, SITE_URL } from "./config.mjs";
import { exportHabr, openHabrDraft, tryPlaywrightOpen } from "./habr.mjs";
import { exportMedium, openMediumImport } from "./medium.mjs";
import { HABR_CREATE_URL, MEDIUM_IMPORT_URL } from "./config.mjs";
import { publishSite, publishSiteAll, rebuildIndex } from "./site.mjs";

function printHelp() {
  console.log(`publish — site-first CLI (bober-ai.dev → Medium / Habr)

Repo articles/: Markdown + YAML frontmatter
Site URL:     ${SITE_URL}

Usage:
  publish list
  publish site <slug> [--dry-run]
  publish site --all [--dry-run]
  publish preview <slug>          # печатает canonical URL
  publish export-medium <slug>
  publish open-medium-import <slug>
  publish habr export <slug>
  publish habr open-draft [slug]
  publish habr open-sandbox [slug]
  publish medium playwright <slug>   # OPTIONAL / fragile
  publish help

npm:
  npm run publish -- <args…>
  npm run publish:install

Secrets: не нужны для основного workflow (import URL / copy-paste).
Не коммитьте MEDIUM_* / HABR_* токены — они не являются supported path.
`);
}

export async function main(argv) {
  const root = repoRoot();
  const args = [...argv];
  const dryRun = takeFlag(args, "--dry-run");

  if (args.length === 0 || args[0] === "help" || args[0] === "-h" || args[0] === "--help") {
    printHelp();
    return;
  }

  const cmd = args[0];

  switch (cmd) {
    case "list":
    case "ls": {
      const slugs = listArticleSlugs(root);
      if (slugs.length === 0) {
        console.log("articles/ пусто — см. articles/README.md");
        return;
      }
      for (const slug of slugs) {
        const a = loadArticle(slug, root);
        console.log(
          `${pad(a.status, 9)}  ${slug}  ·  ${a.title}  ·  ${articleCanonicalUrl(slug)}`,
        );
      }
      return;
    }

    case "site":
    case "publish-site": {
      if (args[1] === "--all" || args[1] === "all") {
        publishSiteAll(root, { dryRun });
        return;
      }
      const slug = args[1];
      if (!slug) throw new Error("usage: publish site <slug>|--all");
      publishSite(slug, root, { dryRun });
      return;
    }

    case "rebuild-index": {
      rebuildIndex(root, { includeDrafts: takeFlag(args, "--drafts") });
      return;
    }

    case "preview": {
      const slug = args[1];
      if (!slug) throw new Error("usage: publish preview <slug>");
      const a = loadArticle(slug, root);
      console.log(articleCanonicalUrl(a.slug));
      console.log(`title:  ${a.title}`);
      console.log(`status: ${a.status}`);
      console.log(`source: ${a.sourcePath}`);
      return;
    }

    case "export-medium": {
      const slug = args[1];
      if (!slug) throw new Error("usage: publish export-medium <slug>");
      exportMedium(slug, root);
      return;
    }

    case "open-medium-import": {
      const slug = args[1];
      if (!slug) throw new Error("usage: publish open-medium-import <slug>");
      await openMediumImport(slug, root);
      return;
    }

    case "medium": {
      const sub = args[1];
      if (sub === "export") {
        const slug = args[2];
        if (!slug) throw new Error("usage: publish medium export <slug>");
        exportMedium(slug, root);
        return;
      }
      if (sub === "open-import" || sub === "import") {
        const slug = args[2];
        if (!slug) throw new Error("usage: publish medium open-import <slug>");
        await openMediumImport(slug, root);
        return;
      }
      if (sub === "playwright") {
        const slug = args[2];
        if (!slug) throw new Error("usage: publish medium playwright <slug>");
        const canonical = articleCanonicalUrl(slug);
        console.warn(
          "Last resort: открываем Import UI + статью. Логин/submit — только вручную.",
        );
        await tryPlaywrightOpen([MEDIUM_IMPORT_URL, canonical]);
        return;
      }
      throw new Error("usage: publish medium export|open-import|playwright <slug>");
    }

    case "habr": {
      const sub = args[1];
      if (sub === "export") {
        const slug = args[2];
        if (!slug) throw new Error("usage: publish habr export <slug>");
        exportHabr(slug, root);
        return;
      }
      if (sub === "open-draft" || sub === "draft") {
        const slug = args[2] || inferSingleSlug(root);
        if (!slug) throw new Error("usage: publish habr open-draft <slug>");
        await openHabrDraft(slug, root, { sandbox: false });
        return;
      }
      if (sub === "open-sandbox" || sub === "sandbox" || sub === "open-import") {
        const slug = args[2] || inferSingleSlug(root);
        if (!slug) throw new Error("usage: publish habr open-sandbox <slug>");
        await openHabrDraft(slug, root, { sandbox: true });
        return;
      }
      if (sub === "playwright") {
        const slug = args[2] || inferSingleSlug(root);
        if (!slug) throw new Error("usage: publish habr playwright <slug>");
        exportHabr(slug, root);
        console.warn("Last resort: только открытие редактора; paste вручную.");
        await tryPlaywrightOpen([HABR_CREATE_URL]);
        return;
      }
      throw new Error(
        "usage: publish habr export|open-draft|open-sandbox|playwright <slug>",
      );
    }

    case "version":
    case "-V":
    case "--version":
      console.log("publish 0.1.0");
      return;

    default:
      throw new Error(`unknown command: ${cmd}\nTry: publish help`);
  }
}

function takeFlag(args, flag) {
  const i = args.indexOf(flag);
  if (i === -1) return false;
  args.splice(i, 1);
  return true;
}

function pad(s, n) {
  return String(s).padEnd(n);
}

function inferSingleSlug(root) {
  const slugs = listArticleSlugs(root);
  return slugs.length === 1 ? slugs[0] : null;
}
