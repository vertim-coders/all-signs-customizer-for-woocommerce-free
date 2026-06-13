/**
 * i18n-wrapper.js (Vue SFC) — WP i18n edition
 *
 * What it does (safe + practical):
 * 1) Wrap plain UI text nodes in <template> with WP i18n:
 *      Text            -> {{ __( "Text", "your-domain" ) }}
 *    - SAFE: does NOT touch attributes (@click, :class, v-if, arrow =>, etc.)
 *    - Works with multi-line text nodes.
 *
 * 2) Migrate existing t("...") calls (literal strings only) to __():
 *      t('Surface')    -> __('Surface', 'your-domain')
 *    - Works in moustaches, bindings, and scripts.
 *    - Skips t(var), t(`Hello ${x}`), concatenations.
 *
 * 3) Update domain later, even after it already worked:
 *    - If you run again with --domain=new-domain, it updates:
 *        __( "text", "old" ) -> __( "text", "new" )
 *        _x/_n/_nx similarly
 *    - Also ensures WP import exists and removes t import.
 *
 * Usage:
 *   node i18n-wrapper.js <path> --domain=all-signs-customizer-for-woocommerce-pro [--dry-run] [--no-backup]
 *
 * Examples:
 *   node i18n-wrapper.js ./src --domain=all-signs-customizer-for-woocommerce-pro --dry-run
 *   node i18n-wrapper.js ./src --domain=all-signs-customizer-for-woocommerce-pro
 *   node i18n-wrapper.js ./src --domain=my-new-domain        (updates domain everywhere)
 */

const fs = require("fs");
const path = require("path");

class I18nWrapper {
  constructor(options = {}) {
    this.dryRun = !!options.dryRun;
    this.backup = options.backup !== false;
    this.domain = options.domain || "all-signs-customizer-for-woocommerce-pro";

    this.stats = {
      filesProcessed: 0,
      filesModified: 0,
      templatesProcessed: 0,
      textsWrapped: 0,
      tCallsMigrated: 0,
      domainsUpdated: 0,
      importsAdded: 0,
      importsRemoved: 0,
      scriptsCreated: 0,
    };

    this.wpImportLine = `import { __, _x, _n, _nx, sprintf, setLocaleData } from "@wordpress/i18n";\n`;
  }

  // ---------- helpers ----------
  escapeForDoubleQuotes(text) {
    return String(text).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  escapeForQuote(text, quote) {
    let t = String(text).replace(/\\/g, "\\\\");
    if (quote === "'") t = t.replace(/'/g, "\\'");
    if (quote === '"') t = t.replace(/"/g, '\\"');
    if (quote === "`") t = t.replace(/`/g, "\\`");
    return t;
  }

  normalizeInnerText(text) {
    return String(text).replace(/\s+/g, " ").trim();
  }

  shouldWrapText(rawText) {
    const trimmed = String(rawText).trim();
    return !(
      trimmed === "" ||
      trimmed.includes("{{") ||
      trimmed.includes("}}") ||
      // already wrapped wp i18n moustache
      /\b__\s*\(/.test(trimmed) ||
      /\b_x\s*\(/.test(trimmed) ||
      /\b_n\s*\(/.test(trimmed) ||
      /\b_nx\s*\(/.test(trimmed) ||
      /^[\d.,\s]+$/.test(trimmed) ||
      !/\p{L}/u.test(trimmed) ||
      /^https?:\/\//i.test(trimmed) ||
      trimmed.startsWith("/") ||
      trimmed.length > 300
    );
  }

  // ---------- (A) SAFE wrap plain text nodes in <template> ----------
  wrapTextNodesInTemplate(templateInner) {
    let out = "";
    let i = 0;

    let inTag = false;
    let quote = null;

    let textBuffer = "";

    const flushTextBuffer = () => {
      if (!textBuffer) return;

      const lead = textBuffer.match(/^\s*/)?.[0] ?? "";
      const trail = textBuffer.match(/\s*$/)?.[0] ?? "";
      const core = textBuffer.slice(
        lead.length,
        textBuffer.length - trail.length,
      );

      const normalized = this.normalizeInnerText(core);

      if (this.shouldWrapText(normalized)) {
        const escaped = this.escapeForDoubleQuotes(normalized);
        const domainEsc = this.escapeForDoubleQuotes(this.domain);
        out += `${lead}{{ __( "${escaped}", "${domainEsc}" ) }}${trail}`;
        this.stats.textsWrapped += 1;
      } else {
        out += textBuffer;
      }

      textBuffer = "";
    };

    while (i < templateInner.length) {
      const ch = templateInner[i];

      if (!inTag) {
        if (ch === "<") {
          flushTextBuffer();
          inTag = true;
          out += ch;
          i++;
          continue;
        }
        textBuffer += ch;
        i++;
        continue;
      }

      // in tag <...>
      if (quote) {
        out += ch;
        if (ch === quote) quote = null;
        else if (ch === "\\" && i + 1 < templateInner.length) {
          out += templateInner[i + 1];
          i += 2;
          continue;
        }
        i++;
        continue;
      }

      out += ch;
      if (ch === '"' || ch === "'") quote = ch;
      else if (ch === ">") inTag = false;

      i++;
    }

    flushTextBuffer();
    return out;
  }

  // ---------- (B) migrate t("literal") -> __("literal","domain") ----------
  migrateTCallsAnywhere(content) {
    let modified = false;

    // matches t("...") or t('...') or t(`...`)
    const re = /\bt\s*\(\s*(["'`])([\s\S]*?)\1\s*\)/g;

    const out = content.replace(re, (match, quote, text) => {
      // skip template strings with interpolation
      if (quote === "`" && /\$\{/.test(text)) return match;

      // only literal string is safe; for backticks with no interpolation, convert using double quotes
      const q = quote === "`" ? '"' : quote;
      const escapedText = this.escapeForQuote(text, q);
      const escapedDomain = this.escapeForQuote(this.domain, q);

      this.stats.tCallsMigrated += 1;
      modified = true;
      return `__(${q}${escapedText}${q}, ${q}${escapedDomain}${q})`;
    });

    return { modified, out };
  }

  // ---------- (C) update existing domain in __/_x/_n/_nx calls ----------
  updateExistingDomains(content) {
    let modified = false;

    // Replace second arg when it is a string literal:
    // __( "x", "old" ) -> __( "x", "new" )
    // _x/_n/_nx same.
    // Keep quote style.
    const fnNames = ["__", "_x", "_n", "_nx"];
    for (const fn of fnNames) {
      const re = new RegExp(
        `\\b${fn}\\s*\\(\\s*([^,]+?)\\s*,\\s*(["'])([^"']*)\\2`,
        "g",
      );

      content = content.replace(re, (m, firstArg, q, oldDomain) => {
        if (oldDomain === this.domain) return m;
        const newDomain = this.escapeForQuote(this.domain, q);
        this.stats.domainsUpdated += 1;
        modified = true;
        return `${fn}(${firstArg}, ${q}${newDomain}${q}`;
      });
    }

    return { modified, out: content };
  }

  // ---------- (D) imports management ----------
  hasWpImport(scriptBlock) {
    return /from\s+["']@wordpress\/i18n["']/.test(scriptBlock);
  }

  removeTImport(scriptBlock) {
    // import { t } from '@/admin/utils/i18n';
    const re =
      /^\s*import\s*\{\s*t\s*\}\s*from\s*(['"])@\/admin\/utils\/i18n\1\s*;\s*\n?/m;
    if (!re.test(scriptBlock)) return { modified: false, out: scriptBlock };
    this.stats.importsRemoved += 1;
    return { modified: true, out: scriptBlock.replace(re, "") };
  }

  ensureWpImport(scriptBlock) {
    if (this.hasWpImport(scriptBlock))
      return { modified: false, out: scriptBlock };

    let out = scriptBlock;
    const importBlockMatch = out.match(/^(?:\s*import[\s\S]*?;\s*)+/m);
    if (importBlockMatch) {
      out = out.replace(
        importBlockMatch[0],
        importBlockMatch[0] + this.wpImportLine,
      );
    } else {
      out = out.replace(
        /<script\b[^>]*>\s*/m,
        (m) => m + "\n" + this.wpImportLine,
      );
    }

    this.stats.importsAdded += 1;
    return { modified: true, out };
  }

  ensureScriptExistsWithWpImport(fileContent) {
    const scriptRe = /<script\b[^>]*>[\s\S]*?<\/script>/m;

    if (scriptRe.test(fileContent)) {
      return fileContent.replace(
        /<script\b[^>]*>[\s\S]*?<\/script>/gm,
        (block) => {
          let changed = false;

          const rm = this.removeTImport(block);
          if (rm.modified) changed = true;
          block = rm.out;

          const add = this.ensureWpImport(block);
          if (add.modified) changed = true;
          block = add.out;

          return block;
        },
      );
    }

    // no script block -> create <script setup> with wp import
    this.stats.scriptsCreated += 1;
    this.stats.importsAdded += 1;

    const newScript = `<script setup>\n${this.wpImportLine}</script>\n`;
    const idx = fileContent.indexOf("</template>");
    if (idx !== -1) {
      const insertAt = idx + "</template>".length;
      return (
        fileContent.slice(0, insertAt) +
        "\n\n" +
        newScript +
        fileContent.slice(insertAt)
      );
    }
    return newScript + fileContent;
  }

  // ---------- file processing ----------
  processVueSFC(content) {
    let modified = false;
    let out = content;

    // 1) Wrap plain template text nodes
    const templateRe = /<template\b[^>]*>([\s\S]*?)<\/template>/g;
    out = out.replace(templateRe, (full, inner) => {
      this.stats.templatesProcessed += 1;
      const wrapped = this.wrapTextNodesInTemplate(inner);
      if (wrapped !== inner) {
        modified = true;
        return full.replace(inner, wrapped);
      }
      return full;
    });

    // 2) Migrate t("literal") -> __("literal","domain") across file
    {
      const res = this.migrateTCallsAnywhere(out);
      if (res.modified) modified = true;
      out = res.out;
    }

    // 3) Update existing domains for __/_x/_n/_nx to current --domain
    {
      const res = this.updateExistingDomains(out);
      if (res.modified) modified = true;
      out = res.out;
    }

    // 4) If file uses __/_x/_n/_nx now, ensure WP import and remove t import
    if (/\b(__|_x|_n|_nx)\s*\(/.test(out)) {
      const before = out;
      out = this.ensureScriptExistsWithWpImport(out);
      if (out !== before) modified = true;
    }

    return { modified, out };
  }

  processFile(filePath) {
    try {
      const original = fs.readFileSync(filePath, "utf8");
      const res = this.processVueSFC(original);

      this.stats.filesProcessed += 1;

      if (!res.modified) return;

      this.stats.filesModified += 1;

      if (this.dryRun) {
        console.log(`[DRY RUN] Serait modifié: ${filePath}`);
        return;
      }

      if (this.backup) {
        fs.writeFileSync(filePath + ".backup", original, "utf8");
      }

      fs.writeFileSync(filePath, res.out, "utf8");
      console.log(`✓ Modifié: ${filePath}`);
    } catch (err) {
      console.error(`✗ Erreur sur ${filePath}: ${err.message}`);
    }
  }

  processDirectory(dirPath) {
    try {
      const entries = fs.readdirSync(dirPath, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);

        if (entry.isDirectory()) {
          if (
            [
              "node_modules",
              "dist",
              "build",
              ".git",
              ".nuxt",
              ".output",
            ].includes(entry.name)
          )
            continue;
          this.processDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".vue")) {
          this.processFile(fullPath);
        }
      }
    } catch (err) {
      console.error(`✗ Erreur lors du parcours de ${dirPath}: ${err.message}`);
    }
  }

  printStats() {
    console.log("\n" + "=".repeat(60));
    console.log("STATISTIQUES i18n-wrapper (WP i18n)");
    console.log("=".repeat(60));
    console.log(`Domaine cible:        ${this.domain}`);
    console.log(`Fichiers traités:     ${this.stats.filesProcessed}`);
    console.log(`Fichiers modifiés:    ${this.stats.filesModified}`);
    console.log(`Templates traités:    ${this.stats.templatesProcessed}`);
    console.log(`Textes encapsulés:    ${this.stats.textsWrapped}`);
    console.log(`t() migrés:           ${this.stats.tCallsMigrated}`);
    console.log(`Domaines mis à jour:  ${this.stats.domainsUpdated}`);
    console.log(`Imports ajoutés:      ${this.stats.importsAdded}`);
    console.log(`Imports retirés:      ${this.stats.importsRemoved}`);
    console.log(`Scripts créés:        ${this.stats.scriptsCreated}`);

    if (this.dryRun) {
      console.log("\nMode DRY RUN: aucun fichier n'a été modifié.");
    } else if (this.backup) {
      console.log("\nBackups: fichiers originaux sauvegardés en .backup");
    } else {
      console.log("\nBackups désactivés (--no-backup).");
    }
  }
}

// ---------- CLI ----------
function parseArgs(argv) {
  const opts = { dryRun: false, noBackup: false, domain: null };

  for (const a of argv) {
    if (a === "--dry-run") opts.dryRun = true;
    if (a === "--no-backup") opts.noBackup = true;
    if (a.startsWith("--domain="))
      opts.domain = a.split("=").slice(1).join("=");
  }
  return opts;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help")) {
    console.log(`
Usage:
  node i18n-wrapper.js <chemin-dossier-ou-fichier> --domain=your-text-domain [--dry-run] [--no-backup]

Options:
  --domain=xxx   Text-domain WordPress (ex: all-signs-customizer-for-woocommerce-pro)
  --dry-run      Afficher les changements sans modifier les fichiers
  --no-backup    Ne pas créer de .backup

Notes:
  - Vous pouvez relancer le script avec un nouveau --domain pour mettre à jour le domaine partout.
`);
    process.exit(0);
  }

  const targetPath = args[0];
  const opts = parseArgs(args.slice(1));

  if (!opts.domain) {
    console.error("✗ Option requise: --domain=your-text-domain");
    process.exit(1);
  }

  if (!fs.existsSync(targetPath)) {
    console.error(`✗ Le chemin "${targetPath}" n'existe pas`);
    process.exit(1);
  }

  console.log("🚀 Démarrage i18n-wrapper (WP i18n)...");
  console.log(`📁 Chemin:  ${targetPath}`);
  console.log(`🌐 Domaine: ${opts.domain}`);
  console.log(`🔍 Mode:    ${opts.dryRun ? "DRY RUN" : "PRODUCTION"}`);
  console.log(`💾 Backup:  ${opts.noBackup ? "NON" : "OUI"}\n`);

  const wrapper = new I18nWrapper({
    dryRun: opts.dryRun,
    backup: !opts.noBackup,
    domain: opts.domain,
  });

  const stat = fs.statSync(targetPath);
  if (stat.isDirectory()) {
    wrapper.processDirectory(targetPath);
  } else if (stat.isFile() && targetPath.endsWith(".vue")) {
    wrapper.processFile(targetPath);
  } else {
    console.error(
      "✗ Le chemin doit pointer vers un fichier .vue ou un dossier",
    );
    process.exit(1);
  }

  wrapper.printStats();
}

if (require.main === module) {
  main();
}

module.exports = I18nWrapper;
