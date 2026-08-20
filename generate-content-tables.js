const fs = require("fs");
const path = require("path");

const rootDir = __dirname;
const outputDir = path.join(rootDir, "google-sheets");
const pages = ["index", "about", "booking", "contact", "faq", "services", "success"];

const entities = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
};

function decodeHtml(text) {
  return text.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, (entity) => entities[entity]);
}

function csvValue(value) {
  return `"${value.replace(/"/g, '""')}"`;
}

function extractRows(page, html) {
  const rows = [["Seite", "Bereich", "Feld", "Text"]];
  const pattern = /data-text=["']([^"']+)["'][^>]*>([\s\S]*?)<\//g;

  for (const match of html.matchAll(pattern)) {
    const key = match[1];

    if (!key.startsWith(`${page}_`)) {
      continue;
    }

    const parts = key.slice(page.length + 1).split("_");
    const field = parts.pop();
    const section = parts.join("_");
    const text = decodeHtml(match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

    rows.push([page, section, field, text]);
  }

  return rows;
}

function extractGlobalRows() {
  const rows = [["Seite", "Bereich", "Feld", "Text"]];
  const pattern = /data-text=["']([^"']+)["'][^>]*>([\s\S]*?)<\//g;

  for (const component of ["header", "footer"]) {
    const html = fs.readFileSync(path.join(rootDir, "components", `${component}.html`), "utf8");

    for (const match of html.matchAll(pattern)) {
      const key = match[1];

      if (!key.startsWith("global_")) {
        continue;
      }

      const parts = key.slice("global_".length).split("_");
      const field = parts.pop();
      const section = parts.join("_");
      const text = decodeHtml(match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());

      rows.push(["global", section, field, text]);
    }
  }

  return rows;
}

function writeTable(name, rows) {
  const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n") + "\n";
  fs.writeFileSync(path.join(outputDir, `${name}.csv`), csv, "utf8");
  console.log(`${name}.csv: ${rows.length - 1} Felder exportiert`);
}

fs.mkdirSync(outputDir, { recursive: true });

for (const page of pages) {
  const html = fs.readFileSync(path.join(rootDir, `${page}.html`), "utf8");
  writeTable(page, extractRows(page, html));
}

writeTable("global", extractGlobalRows());
