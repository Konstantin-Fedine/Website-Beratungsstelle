// ============================================================
// Content Loader
// Lädt Inhalte aus Google Sheets und aktualisiert
// alle Elemente mit data-text="..."
// ============================================================

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


// ============================================================
// Google Sheet laden
// ============================================================

async function fetchSheet(sheetId) {
  const url =
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Google Sheet konnte nicht geladen werden: ${sheetId} (${response.status})`
    );
  }

  return response.text();
}


// ============================================================
// CSV in Content-Objekt umwandeln
//
// Erwartete Struktur:
// Seite | Section | Field | Text
//
// Daraus entsteht z.B.:
// global_Header_logo
// global_Footer_brand_title
// index_Hero_title
// ============================================================

function parseSheet(csv) {
  const rows = csv
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      // Einfacher CSV-Parser für Google-Sheets-Export
      const result = [];
      let current = "";
      let insideQuotes = false;

      for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
          if (insideQuotes && line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            insideQuotes = !insideQuotes;
          }
        } else if (char === "," && !insideQuotes) {
          result.push(current);
          current = "";
        } else {
          current += char;
        }
      }

      result.push(current);

      return result;
    });

  const content = {};

  // Erste Zeile = Überschriften
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

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


// ============================================================
// Einzelnes Sheet laden
// ============================================================

async function loadSheet(sheetId, name) {
  try {
    console.log(`→ Lade ${name}...`);

    const csv = await fetchSheet(sheetId);
    const content = parseSheet(csv);

    console.log(
      `✓ ${name}: ${Object.keys(content).length} Inhalte geladen`
    );

    return content;
  } catch (error) {
    console.error(`❌ Fehler bei ${name}:`, error);

    return {};
  }
}


// ============================================================
// Alle Google Sheets laden
// ============================================================

async function loadAllContent() {
  const content = {};

  // Header
  Object.assign(
    content,
    await loadSheet(headerSheetId, "Header-Sheet")
  );

  // Footer
  Object.assign(
    content,
    await loadSheet(footerSheetId, "Footer-Sheet")
  );

  // Aktuelle Seite
  const page = document.body.dataset.page;

  if (page && sheets[page]) {
    Object.assign(
      content,
      await loadSheet(sheets[page], `${page}-Sheet`)
    );
  }

  return content;
}


// ============================================================
// Texte auf der Seite aktualisieren
// ============================================================

function updatePageContent(content) {
  const elements = document.querySelectorAll("[data-text]");

  let updated = 0;
  let missing = 0;

  elements.forEach((element) => {
    const key = element.dataset.text;

    if (!key) {
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(content, key)) {
      missing++;
      return;
    }

    const newText = content[key];

    // Nur ändern, wenn der Text tatsächlich anders ist
    if (element.textContent.trim() !== newText.trim()) {
      element.textContent = newText;
      updated++;
    }
  });

  console.log(
    `✓ Content aktualisiert: ${updated} geändert, ${missing} nicht gefunden`
  );
}


// ============================================================
// Hauptfunktion
// ============================================================

async function loadContent() {
  console.log("================================");
  console.log("Content Loader");
  console.log("================================");

  try {
    const content = await loadAllContent();

    console.log(
      `✓ Insgesamt ${Object.keys(content).length} Inhalte geladen`
    );

    updatePageContent(content);
  } catch (error) {
    console.error("❌ Content konnte nicht geladen werden:", error);
  }
}


// ============================================================
// WICHTIG:
//
// Header/Footer werden von load-components.js zuerst geladen.
// Danach wird das Event "componentsLoaded" ausgelöst.
//
// Erst dann laden wir den Content.
// ============================================================

document.addEventListener("componentsLoaded", () => {
  console.log("✓ Header und Footer geladen");

  loadContent();
});


// ============================================================
// Sicherheits-Fallback
//
// Falls content-loader.js irgendwann auf einer Seite benutzt
// wird, auf der load-components.js kein Event auslöst,
// wird der Content trotzdem geladen.
// ============================================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (!document.querySelector("[data-text]")) {
        return;
      }

      // Nur als Fallback, falls componentsLoaded nicht kommt.
      loadContent();
    }, 500);
  });
} else {
  setTimeout(() => {
    if (!document.querySelector("[data-text]")) {
      return;
    }

    loadContent();
  }, 500);
}