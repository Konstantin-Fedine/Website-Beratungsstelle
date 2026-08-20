const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

const sheets = {
  index: "1sPaDWJYZ6_7JlKYdlbT7SOMAk-0v9VXGdYz_GXch3eM",
  about: "1Cq4gFvYquYbyCl-4k1w57_kcdlU1brnu2VH0ycig-p4",
  contact: "1sR_GcKTrGrD35taUbTsC1y4kX84v9n7Sb0GdvB4ch68",
  faq: "1T4w2k_bK5prNJadxsWkR8cbnA2aNNwMLvDA2n9WeU14",
  services: "1Gkkq7kKnleeYDUPWWSmZwZ21KNCEIFMziOCdJFRCUvI",
  booking: "1d7xHLj_mBdo2gNKTIO8usA4TfW8JGSzhhmXE7XBgN9s",
  success: "1MZlEgrHoFcXlth5IdI9zCfQDA1vl0I--sy36vM4lLQw",
};

const headerSheetId =
  "1pAkXKo_ILhaqjQ_z1Qjtw0ZyO7CDTpuqzQiVA7WfstA";

const footerSheetId =
  "1g-lHCrP_qf7u2P8F_uxmGNuiS3Q4-xfmVD0jiKjGM64";

const rootDir = path.join(__dirname, "..");

async function fetchSheet(sheetId) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sheet konnte nicht geladen werden: ${sheetId}`);
  }

  return response.text();
}

function parseSheet(csv) {
  const rows = parse(csv, {
    skip_empty_lines: true,
    relax_column_count: true,
  });

  const content = {};

  for (const row of rows.slice(1)) {
    const page = row[0]?.trim();
    const section = row[1]?.trim();
    const field = row[2]?.trim();
    const text = row[3] ?? "";

    if (!page || !section || !field) {
      continue;
    }

    const key = `${page}_${section}_${field}`;

    content[key] = text;
  }

  return content;
}

async function loadSheet(sheetId, name) {
  console.log(`→ Lade ${name}...`);

  const csv = await fetchSheet(sheetId);
  const content = parseSheet(csv);

  console.log(`  ✓ ${Object.keys(content).length} Inhalte geladen`);

  return content;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function updateHtmlFile(filePath, content, dryRun = false) {
  let html = fs.readFileSync(filePath, "utf8");
  const originalHtml = html;

  html = html.replace(
    /(<([a-zA-Z][\w-]*)[^>]*data-text=["']([^"']+)["'][^>]*>)([\s\S]*?)(<\/\2>)/g,
    (match, openingTag, tagName, key, oldText, closingTag) => {
      if (!Object.prototype.hasOwnProperty.call(content, key)) {
        return match;
      }

      const newText = escapeHtml(content[key]);

      if (oldText.trim() === newText.trim()) {
        return match;
      }

      console.log(`  ↳ ${key}`);
      console.log(`     ALT: ${oldText.trim()}`);
      console.log(`     NEU: ${newText.trim()}`);

      return `${openingTag}${newText}${closingTag}`;
    },
  );

  if (html === originalHtml) {
    return false;
  }

  if (!dryRun) {
    fs.writeFileSync(filePath, html, "utf8");
  }

  return true;
}

async function main() {
  console.log("================================");
  console.log("Content Update");
  console.log("================================\n");

  const content = {};

  // Header
  Object.assign(
    content,
    await loadSheet(headerSheetId, "Header-Sheet"),
  );

  // Footer
  Object.assign(
    content,
    await loadSheet(footerSheetId, "Footer-Sheet"),
  );

  // Seiten
  for (const [page, sheetId] of Object.entries(sheets)) {
    Object.assign(
      content,
      await loadSheet(sheetId, `${page}-Sheet`),
    );
  }

  console.log(
    `\n✓ Insgesamt ${Object.keys(content).length} Inhalte geladen.\n`,
  );

  const files = [
    "index.html",
    "about.html",
    "contact.html",
    "faq.html",
    "services.html",
    "booking.html",
    "success.html",
    "contact-success.html",
    "components/header.html",
    "components/footer.html",
  ];

  console.log("Prüfe HTML-Dateien...\n");

  const changedFiles = [];

  for (const file of files) {
    const filePath = path.join(rootDir, file);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠ Nicht gefunden: ${file}`);
      continue;
    }

    console.log(`${file}:`);

    const changed = updateHtmlFile(filePath, content, false);

    if (changed) {
      changedFiles.push(file);
      console.log("  ✓ Änderungen gefunden\n");
    } else {
      console.log("  – Keine Änderungen\n");
    }
  }

  console.log("================================");
  console.log("Testlauf abgeschlossen");
  console.log("================================\n");

  if (changedFiles.length === 0) {
    console.log("Keine Änderungen gefunden.");
  } else {
    console.log("Diese Dateien würden geändert:");

    for (const file of changedFiles) {
      console.log(`  • ${file}`);
    }

    console.log(
      "\nDies war nur ein Testlauf. Es wurde noch nichts verändert.",
    );
  }
}

main().catch((error) => {
  console.error("\n❌ Fehler:");
  console.error(error);
  process.exit(1);
});