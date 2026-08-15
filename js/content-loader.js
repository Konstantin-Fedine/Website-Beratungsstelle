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


async function fetchSheet(sheetId) {
  const url =
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sheet konnte nicht geladen werden: ${sheetId}`);
  }

  return response.text();
}


function parseSheet(csv) {
  const rows = csv
    .trim()
    .split("\n")
    .map(row => {
      // einfacher CSV-Parser für deine Sheet-Struktur
      const result = [];
      let current = "";
      let insideQuotes = false;

      for (let i = 0; i < row.length; i++) {
        const char = row[i];

        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
          result.push(current);
          current = "";
        } else {
          current += char;
        }
      }

      result.push(current);

      return result.map(value =>
        value.trim().replace(/^"|"$/g, "")
      );
    });

  const content = {};

  for (const row of rows.slice(1)) {
    const page = row[0]?.trim();
    const section = row[1]?.trim();
    const field = row[2]?.trim();
    const text = row[3] ?? "";

    if (!page || !section || !field) continue;

    const key = `${page}_${section}_${field}`;

    content[key] = text;
  }

  return content;
}


async function loadSheet(sheetId) {
  const csv = await fetchSheet(sheetId);
  return parseSheet(csv);
}


async function loadContent() {
  try {
    console.log("→ Lade aktuelle Inhalte aus Google Sheets...");

    const content = {};

    // Header
    Object.assign(
      content,
      await loadSheet(headerSheetId)
    );

    // Footer
    Object.assign(
      content,
      await loadSheet(footerSheetId)
    );

    // Aktuelle Seite
    const page = document.body.dataset.page;

    if (page && sheets[page]) {
      Object.assign(
        content,
        await loadSheet(sheets[page])
      );
    }

    console.log(
      `✓ ${Object.keys(content).length} Inhalte geladen`
    );

    // Alle data-text Elemente aktualisieren
    document.querySelectorAll("[data-text]").forEach(element => {
      const key = element.dataset.text;

      if (Object.prototype.hasOwnProperty.call(content, key)) {
        element.textContent = content[key];
      }
    });

    console.log("✓ Website mit aktuellen Google-Sheet-Daten aktualisiert");

  } catch (error) {
    console.error(
      "❌ Fehler beim Laden der Google-Sheet-Inhalte:",
      error
    );
  }
}


// WICHTIG:
// Erst Header/Footer laden.
// Danach deren data-text Elemente aktualisieren.
document.addEventListener("componentsLoaded", () => {
  loadContent();
});