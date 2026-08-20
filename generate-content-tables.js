const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const sheets = {
  index: "1sPaDWJYZ6_7JlKYdlbT7SOMAk-0v9VXGdYz_GXch3eM",
  about: "1Cq4gFvYquYbyCl-4k1w57_kcdlU1brnu2VH0ycig-p4",
  contact: "1sR_GcKTrGrD35taUbTsC1y4kX84v9n7Sb0GdvB4ch68",
  faq: "1T4w2k_bK5prNJadxsWkR8cbnA2aNNwMLvDA2n9WeU14",
  services: "1Gkkq7kKnleeYDUPWWSmZwZ21KNCEIFMziOCdJFRCUvI",
  booking: "1d7xHLj_mBdo2gNKTIO8usA4TfW8JGSzhhmXE7XBgN9s",
  success: "1MZlEgrHoFcXlth5IdI9zCfQDA1vl0I--sy36vM4lLQw",
  global: "1pAkXKo_ILhaqjQ_z1Qjtw0ZyO7CDTpuqzQiVA7WfstA",
};

const rootDir = __dirname;
const pages = Object.keys(sheets).filter((page) => page !== "global");

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

async function uploadSheet(sheetsApi, page, rows) {
  const spreadsheetId = sheets[page];
  const spreadsheet = await sheetsApi.spreadsheets.get({ spreadsheetId });
  const sheetTitle = spreadsheet.data.sheets[0].properties.title;
  const range = `'${sheetTitle.replace(/'/g, "''")}'!A:D`;

  await sheetsApi.spreadsheets.values.clear({ spreadsheetId, range });
  await sheetsApi.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: rows },
  });

  console.log(`${page}: ${rows.length - 1} Felder hochgeladen`);
}

async function main() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      "GOOGLE_APPLICATION_CREDENTIALS ist nicht gesetzt. " +
      "Bitte zuerst den Pfad zur Google-Service-Account-Datei setzen.",
    );
  }

  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheetsApi = google.sheets({ version: "v4", auth });

  for (const page of pages) {
    const html = fs.readFileSync(path.join(rootDir, `${page}.html`), "utf8");
    await uploadSheet(sheetsApi, page, extractRows(page, html));
  }

  await uploadSheet(sheetsApi, "global", extractGlobalRows());
}

main().catch((error) => {
  console.error(`Upload fehlgeschlagen: ${error.message}`);
  process.exitCode = 1;
});
