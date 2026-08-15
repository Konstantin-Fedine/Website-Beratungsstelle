
============================================================
DATEI: components\footer.html
============================================================

<footer class="footer">
  <div class="footer-container">
    <div class="footer-brand">
      <h2 data-text="global_Footer_brand_title">
        Aufwind Beratung
      </h2>

      <p data-text="global_Footer_brand_text">
        Psychologische und systemische Beratung in Wiesbaden.
      </p>
    </div>

    <div class="footer-navigation">
      <h3 data-text="global_Footer_navigation_title">
        Navigation
      </h3>

      <ul>
        <li>
          <a href="index.html" data-text="global_Footer_nav_start">
            Start
          </a>
        </li>

        <li>
          <a href="services.html" data-text="global_Footer_nav_services">
            Angebote
          </a>
        </li>

        <li>
          <a href="booking.html" data-text="global_Footer_nav_booking">
            Termin buchen
          </a>
        </li>

        <li>
          <a href="about.html" data-text="global_Footer_nav_about">
            Über mich
          </a>
        </li>

        <li>
          <a href="faq.html" data-text="global_Footer_nav_faq">
            Häufige Fragen
          </a>
        </li>

        <li>
          <a href="contact.html" data-text="global_Footer_nav_contact">
            Kontakt
          </a>
        </li>
      </ul>
    </div>

    <div class="footer-contact">
      <h3 data-text="global_Footer_contact_title">
        Kontakt
      </h3>

      <p>
        <a
          href="mailto:beratung.aufwind@gmail.com"
          data-text="global_Footer_email"
        >
          beratung.aufwind@gmail.com
        </a>
      </p>

      <p>
        <span data-text="global_Footer_location">Wiesbaden</span><br />

        <span data-text="global_Footer_availability">
          Beratung vor Ort oder online
        </span>
      </p>
    </div>
  </div>

  <div class="footer-bottom">
    <p data-text="global_Footer_copyright">
      © 2026 Aufwind Beratung
    </p>

    <div class="footer-legal">
      <a
        href="impressum.html"
        data-text="global_Footer_legal_imprint"
      >
        Impressum
      </a>

      <a
        href="datenschutz.html"
        data-text="global_Footer_legal_privacy"
      >
        Datenschutz
      </a>
    </div>
  </div>
</footer>


============================================================
DATEI: components\header.html
============================================================

<header class="main-header">
  <div class="header-container">
    <div class="logo">
      <h1 data-text="global_Header_logo">Aufwind Beratung</h1>
    </div>

    <button
      class="menu-toggle"
      aria-label="Menü öffnen"
      aria-expanded="false"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="navigation">
      <ul>
        <li>
          <a href="index.html" data-text="global_Header_nav_start">
            Start
          </a>
        </li>

        <li>
          <a href="services.html" data-text="global_Header_nav_services">Angebote</a>
        </li>

        <li>
          <a href="about.html" data-text="global_Header_nav_about">
            Über mich
          </a>
        </li>

        <li>
          <a href="faq.html" data-text="global_Header_nav_faq">
            FAQ
          </a>
        </li>

        <li>
          <a href="booking.html" data-text="global_Header_nav_booking">
            Termin buchen
          </a>
        </li>

        <li>
          <a href="contact.html" data-text="global_Header_nav_contact">
            Kontakt
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>


============================================================
DATEI: js\load-components.js
============================================================

async function loadComponent(file, position) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(
        `Komponente konnte nicht geladen werden: ${file} (${response.status})`
      );
    }

    const html = await response.text();

    const template = document.createElement("template");
    template.innerHTML = html.trim();

    const component = template.content.firstElementChild;

    if (!component) {
      throw new Error(`Keine gültige Komponente in ${file} gefunden.`);
    }

    if (position === "before-main") {
      document.body.insertBefore(component, document.body.querySelector("main"));
    }

    if (position === "after-main") {
      document.body.appendChild(component);
    }

    console.log(`✓ Komponente geladen: ${file}`);
  } catch (error) {
    console.error(`❌ Fehler beim Laden von ${file}:`, error);
  }
}

async function loadComponents() {
  const basePath = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf("/") + 1
  );

  await loadComponent(`${basePath}components/header.html`, "before-main");
  await loadComponent(`${basePath}components/footer.html`, "after-main");

  // Content-Loader informieren, dass Header und Footer jetzt vorhanden sind
  document.dispatchEvent(new Event("componentsLoaded"));
}

loadComponents();


============================================================
DATEI: js\update-content.js
============================================================

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


============================================================
DATEI: about.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Über mich | Aufwind Beratung</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/about-page.css" />
  </head>
  <body data-page="about">
    <main>
      <section class="about-hero">
        <div class="about-hero-content">
          <h1 data-text="about_Hero_title">Willkommen bei Aufwind.</h1>
          <p data-text="about_Hero_text">Hier beginnt Ihre Reise zu mehr Leichtigkeit, Klarheit und neuer Lebensqualität.</p>
        </div>
      </section>

      <section class="about-introduction">
        <div class="about-container about-grid">
          <div class="about-image">
            <img src="images/portrait2.jpg" alt="Portrait" />
          </div>

          <div class="about-text">
            <h2 data-text="about_Einleitung_title">Wer ich bin</h2>
            <p data-text="about_Einleitung_text1">Manchmal geraten wir im Leben an einen Punkt, an dem alles zu viel wird, Entscheidungen schwerfallen oder Krisen den Blick auf die eigenen Stärken verdecken. Genau dort müssen Sie nicht allein hindurch.</p>
            <p data-text="about_Einleitung_text2">Ich begleite Menschen mit Wertschätzung, Offenheit und einem Blick auf ihre individuellen Ressourcen. Gemeinsam schaffen wir Raum, Belastendes zu sortieren, neue Perspektiven zu entdecken und Wege zu finden, die zu Ihnen und Ihrer Lebenssituation passen.</p>
            <p data-text="about_Einleitung_text3">Vertrauen, Empathie und Respekt bilden die Grundlage meiner Arbeit.</p>
          </div>
        </div>
      </section>

      <section class="about-values">
        <div class="about-container">
          <h2 data-text="about_Beratungsansatz_title">Mein Beratungsansatz</h2>

          <div class="about-cards">
            <div class="about-card">
              <h3 data-text="about_Beratungsansatz_Karte_1_title">🤝 Wertschätzend</h3>
              <p data-text="about_Beratungsansatz_Karte_1_text">Ich begegne jedem Menschen mit Offenheit, Respekt und einem geschützten Raum für persönliche Anliegen.</p>
            </div>

            <div class="about-card">
              <h3 data-text="about_Beratungsansatz_Karte_2_title">🌱 Lösungsorientiert</h3>
              <p data-text="about_Beratungsansatz_Karte_2_text">Gemeinsam entdecken wir vorhandene Ressourcen und entwickeln neue Perspektiven.</p>
            </div>

            <div class="about-card">
              <h3 data-text="about_Beratungsansatz_Karte_3_title">💬 Individuell</h3>
              <p data-text="about_Beratungsansatz_Karte_3_text">Jede Beratung richtet sich nach Ihrer persönlichen Situation und Ihrem eigenen Tempo.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="about-target">
        <div class="about-container">
          <h2 data-text="about_Zielgruppe_title">Für wen ich da bin</h2>

          <div class="about-cards">
            <div class="about-card">
              <h3 data-text="about_Zielgruppe_Karte_1_title">👩 Frauen</h3>
              <p data-text="about_Zielgruppe_Karte_1_text">Begleitung bei persönlichen Krisen, belastenden Lebensphasen und Entscheidungen.</p>
            </div>

            <div class="about-card">
              <h3 data-text="about_Zielgruppe_Karte_2_title">👨‍👩‍👧 Familien</h3>
              <p data-text="about_Zielgruppe_Karte_2_text">Unterstützung bei familiären Veränderungen, Krisenzeiten und schulischen Herausforderungen bei schulischen Herausforderungen, Übergängen oder Schulwechsel</p>
            </div>

            <div class="about-card">
              <h3 data-text="about_Zielgruppe_Karte_3_title">🎓 Kinder und Jugendliche</h3>
              <p data-text="about_Zielgruppe_Karte_3_text">Beratung bei Lern- und Motivationsproblemen, Konflikten</p>
            </div>

            <div class="about-card">
              <h3 data-text="about_Zielgruppe_Karte_4_title">💻 Online-Beratung</h3>
              <p data-text="about_Zielgruppe_Karte_4_text">Flexibel, ortsunabhängig und vertraulich.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="about-school">
        <div class="about-container about-grid">
          <div class="about-school-image">
            <img src="images/portrait.jpg" alt="Beratung" />
          </div>

          <div>
            <h2 data-text="about_Schule_title">Schulische Herausforderungen gemeinsam meistern</h2>
            <p data-text="about_Schule_text1">Schule ist ein wichtiger Lebensbereich und kann Kinder, Jugendliche und Familien gleichzeitig vor große Herausforderungen stellen.</p>
            <p data-text="about_Schule_text2">In der Beratung erhalten Familien einen geschützten Raum, um Belastungen zu besprechen, Zusammenhänge zu verstehen und neue Handlungsmöglichkeiten zu entdecken.</p>
          </div>
        </div>
      </section>

      <section class="about-qualification">
        <div class="about-container">
          <h2 data-text="about_Qualifikationen_title">Qualifikationen &amp; Erfahrung</h2>

          <div class="qualification-grid">
            <div>
              <h3 data-text="about_Qualifikationen_Ausbildung_title">🎓 Ausbildung</h3>
              <ul>
                <li data-text="about_Qualifikationen_Ausbildung_1">Lehramtsstudium, Erste Staatsprüfung 2002, Kassel</li>
                <li data-text="about_Qualifikationen_Ausbildung_2">Zweite Staatsprüfung 2004, Frankfurt am Main</li>
                <li data-text="about_Qualifikationen_Ausbildung_3">Ausbildung zur psychologischen und systemischen Beraterin, Zertifikat 2022, Remscheid</li>
              </ul>
            </div>

            <div>
              <h3 data-text="about_Qualifikationen_Berufserfahrung_title">💼 Berufserfahrung</h3>
              <ul>
                <li data-text="about_Qualifikationen_Berufserfahrung_1">Lehrerin an 5 verschiedenen Grundschulen in Frankfurt und Wiesbaden seit 2004</li>
                <li data-text="about_Qualifikationen_Berufserfahrung_2">Mentorin für Praktikanten und Referendare</li>
                <li data-text="about_Qualifikationen_Berufserfahrung_3">Ausbildungsbeauftragte für die Lehrerausbildung in Offenbach und Wiesbaden</li>
              </ul>
            </div>

            <div>
              <h3 data-text="about_Qualifikationen_Beratung_title">📜 Beraterin mit staatlicher Zulassung seit 2022</h3>
              <ul>
                <li data-text="about_Qualifikationen_Beratung_1">Psychologische Beratung</li>
                <li data-text="about_Qualifikationen_Beratung_2">Systemische Beratung</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="about-quote">
        <div class="about-container">
          <blockquote data-text="about_Zitat_text">„Aufwind entsteht, wenn Menschen ihre eigenen Stärken wiederentdecken und den Mut finden, neue Wege zu gehen.“</blockquote>

          <p data-text="about_Zitat_untertitel">Dieser Leitsatz beschreibt meine Haltung als Beraterin.</p>
        </div>
      </section>

      <section class="about-cta">
        <h2 data-text="about_CTA_title">Ich freue mich darauf, Sie ein Stück Ihres Weges zu begleiten.</h2>

        <a
          href="contact.html"
          class="btn btn-primary"
          data-text="about_CTA_button"
        >Kontakt aufnehmen</a>
      </section>
    </main>
    
    <script src="js/load-components.js"></script>
    <script src="js/header.js"></script>
    <script src="js/content-loader.js"></script>

  </body>
</html>



============================================================
DATEI: admin.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Admin — Aufwind Beratung</title>
    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/admin.css" />
  </head>
  <body>
    <main class="admin">
      <section class="admin-card">
        <h1>Admin Bereich</h1>

        <div id="auth-area">
          <form id="login-form" class="admin-form">
            <label for="admin-email">E‑Mail</label>
            <input id="admin-email" type="email" required />

            <label for="admin-password">Passwort</label>
            <input id="admin-password" type="password" required />

            <div class="form-actions">
              <button id="login-button" class="btn btn-primary" type="button">Anmelden</button>
            </div>
          </form>
        </div>

        <div id="admin-status" style="margin-top:12px; color:#b33"></div>

        <div id="admin-tools" hidden>
          <div class="admin-top">
            <div id="admin-user" style="margin-right:auto; font-size:0.95rem; color:#333"></div>
            <button id="signout-button" class="btn btn-secondary">Abmelden</button>
          </div>

          <h2>Buchungen</h2>
          <div id="bookings-container">Lade Buchungen…</div>

          <div id="policy-help" class="policy-help" hidden>
            <h3>DB-Policy fehlt</h3>
            <p>
              Falls Abfragen mit RLS fehlschlagen, führe diese SQL im lokalen
              Supabase Studio aus (oder passe sie für Produktion an):
            </p>
            <pre>
-- Temporär: erlauben, dass angemeldete Nutzer Buchungen lesen/ändern
CREATE POLICY "Authenticated can select bookings"
  ON public.bookings
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated can update bookings"
  ON public.bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
            </pre>
          </div>
        </div>
      </section>
    </main>

    <script type="module" src="js/admin.js"></script>
  </body>
</html>



============================================================
DATEI: booking.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Termin buchen | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/booking-page.css" />
  </head>

  <body data-page="booking">
    <main>
      <section class="booking-hero">
        <div class="booking-container">
          <h1 data-text="booking_Hero_title">Termin buchen</h1>

          <p data-text="booking_Hero_text">
            Wählen Sie Schritt für Schritt Ihren passenden Termin.
          </p>
        </div>
      </section>

      <section class="booking-process">
        <div class="booking-container">

          <!-- Fortschritt -->

          <div class="booking-progress">
            <div class="progress-step active" data-text="booking_Fortschritt_step_1">
              1. Beratung
            </div>

            <div class="progress-step" data-text="booking_Fortschritt_step_2">
              2. Termin
            </div>

            <div class="progress-step" data-text="booking_Fortschritt_step_3">
              3. Daten
            </div>

            <div class="progress-step" data-text="booking_Fortschritt_step_4">
              4. Bestätigung
            </div>
          </div>

          <!-- Schritt 1 -->

          <div class="booking-step active" id="booking-step-service">
            <h2 data-text="booking_Beratung_title">
              Ihre Beratung
            </h2>

            <div id="services-list">
              <p data-text="booking_Beratung_loading">
                Beratungsangebote werden geladen...
              </p>
            </div>

            <div class="booking-step-actions">
              <button class="btn btn-primary next-step" data-text="booking_Beratung_next_button">
                Weiter zu Datum &amp; Uhrzeit
              </button>
            </div>
          </div>

          <!-- Schritt 2 -->

          <div class="booking-step" id="booking-step-date">
            <h2 data-text="booking_Datum_title">
              Datum &amp; Uhrzeit auswählen
            </h2>

            <div class="booking-datetime-layout">
              <div id="calendar-container">
                <div class="calendar-header">
                  <button
                    type="button"
                    id="previous-month"
                    aria-label="Vorheriger Monat"
                  >
                    ←
                  </button>

                  <h3 id="current-month">Monat Jahr</h3>

                  <button
                    type="button"
                    id="next-month"
                    aria-label="Nächster Monat"
                  >
                    →
                  </button>
                </div>

                <div class="calendar-weekdays">
                  <div data-text="booking_Datum_weekday_monday">Mo</div>
                  <div data-text="booking_Datum_weekday_tuesday">Di</div>
                  <div data-text="booking_Datum_weekday_wednesday">Mi</div>
                  <div data-text="booking_Datum_weekday_thursday">Do</div>
                  <div data-text="booking_Datum_weekday_friday">Fr</div>
                  <div data-text="booking_Datum_weekday_saturday">Sa</div>
                  <div data-text="booking_Datum_weekday_sunday">So</div>
                </div>

                <div id="calendar-days"></div>
              </div>

              <div id="times-panel">
                <p
                  id="times-placeholder"
                  data-text="booking_Datum_date_placeholder"
                >
                  Bitte wählen Sie zuerst ein Datum aus.
                </p>

                <div id="times-content" hidden>
                  <h3 id="selected-date-label"></h3>

                  <p
                    class="times-heading"
                    data-text="booking_Datum_available_times"
                  >
                    Freie Zeiten
                  </p>

                  <div id="time-slots"></div>
                </div>
              </div>
            </div>

            <div class="booking-step-actions is-backward">
              <button
                class="btn btn-secondary previous-step"
                data-text="booking_Datum_previous_button"
              >
                Zurück
              </button>

              <button
                class="btn btn-primary next-step"
                data-text="booking_Datum_next_button"
              >
                Weiter zu Ihren Daten
              </button>
            </div>
          </div>

          <!-- Schritt 3 -->

          <div class="booking-step" id="booking-step-data">
            <h2 data-text="booking_Daten_title">
              Ihre Daten
            </h2>

            <div id="booking-form-container">
              <form id="booking-form" class="booking-form" novalidate>

                <div class="form-row">
                  <label
                    for="first-name"
                    data-text="booking_Daten_first_name_label"
                  >
                    Vorname *
                  </label>

                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    required
                  />
                </div>

                <div class="form-row">
                  <label
                    for="last-name"
                    data-text="booking_Daten_last_name_label"
                  >
                    Nachname *
                  </label>

                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    required
                  />
                </div>

                <div class="form-row">
                  <label
                    for="email"
                    data-text="booking_Daten_email_label"
                  >
                    E-Mail *
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>

                <div class="form-row">
                  <label
                    for="phone"
                    data-text="booking_Daten_phone_label"
                  >
                    Telefon
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                  />
                </div>

                <div class="form-row">
                  <label
                    for="message"
                    data-text="booking_Daten_message_label"
                  >
                    Nachricht
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    maxlength="2000"
                  ></textarea>

                  <div class="message-counter">
                    <span id="message-counter">0</span>

                    <span
                      class="muted"
                      data-text="booking_Daten_message_counter"
                    >
                      / 2000
                    </span>
                  </div>

                  <p
                    id="message-warning"
                    class="form-error"
                    role="alert"
                    aria-live="polite"
                    hidden
                    data-text="booking_Daten_message_too_long"
                  >Die Nachricht ist zu lang. Bitte kürzen Sie auf maximal 2000 Zeichen.</p>
                </div>

                <p
                  class="form-note"
                  data-text="booking_Daten_required_note"
                >
                  * Pflichtfelder
                </p>

                <p
                  id="booking-form-error"
                  class="form-error"
                  role="alert"
                  aria-live="assertive"
                  hidden
                  data-text="booking_Daten_form_error"
                >
                  Bitte füllen Sie alle Pflichtfelder korrekt aus.
                </p>
              </form>
            </div>

            <div class="booking-step-actions is-backward">
              <button
                class="btn btn-secondary previous-step"
                data-text="booking_Daten_previous_button"
              >
                Zurück
              </button>

              <button
                class="btn btn-primary next-step"
                data-text="booking_Daten_next_button"
              >
                Weiter zur Zusammenfassung
              </button>
            </div>
          </div>

          <!-- Schritt 4 -->

          <div class="booking-step" id="booking-step-summary">
            <h2 data-text="booking_Zusammenfassung_title">
              Zusammenfassung
            </h2>

            <div id="booking-summary">
              <p data-text="booking_Zusammenfassung_loading">
                Zusammenfassung wird später angezeigt.
              </p>
            </div>

            <p
              id="booking-summary-error"
              class="form-error"
              role="alert"
              aria-live="assertive"
              hidden
              data-text="booking_Zusammenfassung_booking_error"
            >Die Buchung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es erneut.</p>

            <div class="booking-step-actions is-backward">
              <button
                class="btn btn-secondary previous-step"
                data-text="booking_Zusammenfassung_previous_button"
              >
                Zurück
              </button>

              <button
                id="booking-confirm-button"
                class="btn btn-primary"
                type="button"
                data-text="booking_Zusammenfassung_confirm_button"
              >
                Termin bestätigen
              </button>
            </div>
          </div>

        </div>
      </section>
    </main>

    <script src="js/load-components.js"></script>#
    <script src="js/header.js"></script>
    <script type="module" src="js/booking.js"></script>
  </body>
</html>


============================================================
DATEI: contact.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Aufwind Beratung</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/contact.css" />
  </head>
  <body data-page="contact">
    <main>
      <section class="contact-hero">
        <div class="contact-hero-content">
          <h1 data-text="contact_Hero_title">Ihr erster Schritt zu mehr Klarheit</h1>
          <p data-text="contact_Hero_text">Sie möchten mehr erfahren oder den ersten Schritt gehen? Kontaktieren Sie mich gerne für ein unverbindliches Erstgespräch.</p>
        </div>
      </section>

      <section class="contact-cost">
        <div class="contact-container">
          <div class="contact-cost-card">
            <h2 data-text="contact_Kosten_title">Kosten</h2>

            <div class="contact-price-row">
              <span data-text="contact_Kosten_erstgespraech">Erstgespräch (30 Minuten)</span>
              <strong data-text="contact_Kosten_erstgespraech_preis">kostenlos</strong>
            </div>

            <div class="contact-price-row">
              <span data-text="contact_Kosten_beratung">Beratung (50 Minuten)</span>
              <strong data-text="contact_Kosten_beratung_preis">80€</strong>
            </div>

            <p data-text="contact_Kosten_info">Die Kosten meiner Angebote werden nicht von den Krankenkassen übernommen und sind daher Selbstzahlerleistungen. In vielen Fällen sind die Kosten steuerlich absetzbar. Die Anzahl und Häufigkeit der Termine stimmen wir individuell nach Ihrem Bedarf ab. Die Termine können wir sowohl vor Ort als auch online durchführen.

Terminabsage Wenn Sie einen vereinbarten Termin nicht einhalten können, bitte ich Sie um eine schriftliche oder telefonische Absage spätestens 24 Stunden vor dem Termin. Ohne Absage berechne ich Ihnen den vollen Preis der gebuchten Stunde. </p>
          </div>
        </div>
      </section>

      <section class="contact-options">
        <div class="contact-container">
          <h2 data-text="contact_Kontaktmöglichkeiten_title">Kontaktmöglichkeiten</h2>
          <div class="contact-cards">
            <article class="contact-card">
              <div class="contact-icon">✉</div>
              <h3 data-text="contact_Kontakt_1_title">E-Mail</h3>
              <p data-text="contact_Kontakt_1_text">beratung.aufwind@gmail.com</p>
              <a
                href="mailto:beratung.aufwind@gmail.com"
                class="btn btn-primary"
                data-text="contact_Kontakt_1_button"
              >E-Mail schreiben</a>
            </article>

            <article class="contact-card">
              <div class="contact-icon">☎</div>
              <h3 data-text="contact_Kontakt_2_title">Telefon</h3>
              <p data-text="contact_Kontakt_2_text">0176 31027082</p>
              <p class="contact-small" data-text="contact_Kontakt_2_zeit">Mo - Fr 9:00 - 14:00 Uhr oder nach Vereinbarung</p>
            </article>

            <article class="contact-card">
              <div class="contact-icon">📍</div>
              <h3 data-text="contact_Kontakt_3_title">Ort</h3>
              <p data-text="contact_Kontakt_3_text">Wiesbaden</p>
              <p
                class="contact-small"
                data-text="contact_Kontakt_3_untertitel"
              >Persönliche Beratung vor Ort oder flexibel online möglich.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="contact-process">
        <div class="contact-container">
          <h2 data-text="contact_Ablauf_title">So einfach funktioniert die Kontaktaufnahme</h2>
          <div class="contact-steps">
            <div class="contact-step">
              <span>1</span>
              <p data-text="contact_Schritt_1_title">Anfrage senden</p>
            </div>

            <div class="contact-step">
              <span>2</span>
              <p data-text="contact_Schritt_2_title">Erstgespräch vereinbaren</p>
            </div>

            <div class="contact-step">
              <span>3</span>
              <p data-text="contact_Schritt_3_title">Gemeinsam starten</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-form-section">
        <div class="contact-form-container">
          <h2 data-text="contact_Formular_title">Lassen Sie uns gemeinsam klären, ob mein Angebot für Ihr Anliegen passend ist. Gerne nehme ich mir Zeit für Ihre Fragen – unverbindlich und in Ruhe.</h2>
          <p class="contact-intro" data-text="contact_Formular_intro">Rufen Sie mich einfach an oder senden Sie mir eine Nachricht über das nachfolgende Kontaktformular.</p>

          <form
            class="contact-form"
            name="kontakt"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/success.html"
          >
            <p hidden>
              <label>
                Nicht ausfüllen:
                <input name="bot-field" />
              </label>
            </p>

            <label for="name" data-text="contact_Formular_label_name">Name</label>
            <input type="text" id="name" name="name" required />

            <label for="email" data-text="contact_Formular_label_email">E-Mail</label>
            <input type="email" id="email" name="email" required />

            <label for="topic" data-text="contact_Formular_label_topic">Thema der Anfrage</label>
            <select id="topic" name="topic">
              <option data-text="contact_Formular_option_1">Familienberatung</option>
              <option data-text="contact_Formular_option_2">Beratung für Frauen</option>
              <option data-text="contact_Formular_option_3">Online-Beratung</option>
              <option data-text="contact_Formular_option_4">Allgemeine Frage</option>
            </select>

            <label
              for="contact-type"
              data-text="contact_Formular_label_contact_type"
            >Bevorzugte Kontaktart</label>
            <select id="contact-type" name="contact-type">
              <option data-text="contact_Formular_option_email">E-Mail</option>
              <option data-text="contact_Formular_option_phone">Telefon</option>
            </select>

            <label
              for="message"
              data-text="contact_Formular_label_message"
            >Nachricht</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <p class="privacy-note" data-text="contact_Formular_privacy">🔒 Ihre Anfrage wird selbstverständlich vertraulich behandelt.</p>

            <button
              type="submit"
              class="btn btn-primary contact-submit"
              data-text="contact_Formular_button"
            >Anfrage senden</button>
          </form>

          <div class="faq-link">
            <p data-text="contact_FAQ_Link_text">Noch Fragen?</p>
            <a href="faq.html" data-text="contact_FAQ_Link_link">Zu den häufig gestellten Fragen</a>
          </div>
        </div>
      </section>
    </main>

    <script src="js/load-components.js"></script>
    <script src="js/header.js"></script>
    <script src="js/content-loader.js"></script>
  </body>
</html>



============================================================
DATEI: faq.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/faq-page.css" />
  </head>

  <body data-page="faq">
    <main>
      <section class="faq-hero">
        <div class="faq-hero-content">
          <h1 data-text="faq_Hero_title">Häufig gestellte Fragen</h1>

          <p data-text="faq_Hero_text">Hier finden Sie Antworten auf häufige Fragen rund um die Beratung und den Ablauf.</p>
        </div>
      </section>

      <section class="faq-section">
        <div class="faq-container">
          <h2 data-text="faq_FAQ_title">Ihre Fragen - meine Antworten</h2>

          <div class="faq-list">
            <div class="faq-item">
              <button
                class="faq-question"
                data-text="faq_FAQ_1_question"
              >Was ist psychologische und systemische Beratung?</button>

              <div class="faq-answer">
                <p data-text="faq_FAQ_1_answer">Manchmal geraten wir im Leben an einen Punkt, an dem wir allein nicht weiterkommen. Psychologische Beratung bietet die Möglichkeit, innezuhalten, neue Perspektiven zu gewinnen und die eigenen Stärken wiederzuentdecken. Gemeinsam entwickeln wir Wege, die zu Ihrer persönlichen Lebenssituation passen – damit Veränderung möglich wird und neuer Aufwind entstehen kann. Systemische Beratung eröffnet neue Perspektiven. Sie richtet den Blick auf Zusammenhänge, Ressourcen und individuelle Lösungen – damit aus Herausforderungen neuer Aufwind für Veränderung und Entwicklung entstehen kann.</p>
              </div>
            </div>

            <div class="faq-item">
              <button
                class="faq-question"
                data-text="faq_FAQ_2_question"
              >Für wen ist die Beratung geeignet?</button>

              <div class="faq-answer">
                <p data-text="faq_FAQ_2_answer">Die Beratung richtet sich an Menschen, die sich Unterstützung bei persönlichen Herausforderungen, Veränderungen, Konflikten oder belastenden Lebenssituationen wünschen.</p>
              </div>
            </div>

            <div class="faq-item">
              <button
                class="faq-question"
                data-text="faq_FAQ_3_question"
              >Welche Themen können besprochen werden?</button>

              <div class="faq-answer">
                <p data-text="faq_FAQ_3_answer">Mögliche Themen sind persönliche Krisen, Stress, Überforderung, Entscheidungen, familiäre Konflikte oder schulische Herausforderungen.</p>
              </div>
            </div>

            <div class="faq-item">
              <button
                class="faq-question"
                data-text="faq_FAQ_4_question"
              >Wie läuft ein Erstgespräch ab?</button>

              <div class="faq-answer">
                <p data-text="faq_FAQ_4_answer">Das Erstgespräch (20 Min) bietet Ihnen die Möglichkeit, mich und meine Arbeitsweise kennenzulernen. In einer ruhigen und vertrauensvollen Atmosphäre schildern Sie Ihr Anliegen und erzählen, was Sie zu mir führt.

Gemeinsam klären wir Ihre aktuelle Situation, Ihre Wünsche und Ziele sowie die Fragen, die Sie beschäftigen. Dabei haben Sie ausreichend Zeit, Ihre Themen einzubringen.

Am Ende des Gesprächs besprechen wir, ob und in welcher Form eine weitere Beratung für Sie sinnvoll ist. Sie entscheiden anschließend ganz in Ruhe, ob Sie den gemeinsamen Weg fortsetzen möchten.</p>
              </div>
            </div>

            <div class="faq-item">
              <button
                class="faq-question"
                data-text="faq_FAQ_5_question"
              >Wie lange dauert eine Beratung?</button>

              <div class="faq-answer">
                <p data-text="faq_FAQ_5_answer">Die Dauer richtet sich nach Ihrem Anliegen und Ihrer individuellen Situation. Jede Beratung wird persönlich angepasst.</p>
              </div>
            </div>

            <div class="faq-item">
              <button
                class="faq-question"
                data-text="faq_FAQ_6_question"
              >Findet die Beratung auch online statt?</button>

              <div class="faq-answer">
                <p data-text="faq_FAQ_6_answer">Ja, die Beratung kann flexibel auch online stattfinden.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="faq-cta">
        <div class="faq-container">
          <h2 data-text="faq_CTA_title">Ihre Frage ist nicht dabei?</h2>

          <p data-text="faq_CTA_text">Kontaktieren Sie mich gerne persönlich. Gemeinsam finden wir heraus, wie ich Sie unterstützen kann.</p>

          <a
            href="contact.html"
            class="btn btn-primary"
            data-text="faq_CTA_button"
          >Kontakt aufnehmen</a>
        </div>
      </section>
    </main>

    <script src="js/load-components.js"></script>
    <script src="js/header.js"></script>
    <script src="js/faq.js"></script>
    <script src="js/content-loader.js"></script>#
    
  </body>
</html>



============================================================
DATEI: index.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/hero.css" />
    <link rel="stylesheet" href="css/services.css" />
    <link rel="stylesheet" href="css/about.css" />
    <link rel="stylesheet" href="css/process.css" />
    <link rel="stylesheet" href="css/faq.css" />
  </head>

  <body data-page="index">
  <main>
    <section class="hero">
      <div class="hero-content">
        <h1 data-text="index_Hero_title">Systemisch. Auf Augenhöhe. Damit Orientierung, Handlungsspielräume und Sicherheit wachsen können.</h1>

        <p data-text="index_Hero_text">Willkommen bei Rückenwind Beratung. Ich begleite Frauen und Familien in Zeiten des Wandels - bei persönlichen und familiären Herausforderungen, rund um Schule und Elternschaft sowie an beruflichen und persnlichen Wendepunkten, neue Perspektiven zu gewinnen, Veränderungen zu gestalten und ihren eigenen Weg zu finden – persönlich in Wiesbaden oder online.</p>

        <div class="hero-buttons">
          <a
            href="booking.html"
            class="btn btn-primary"
            data-text="index_Hero_button1"
          >Termin vereinbaren</a>

          <a
            href="services.html"
            class="btn btn-secondary"
            data-text="index_Hero_button2"
          >Mehr erfahren</a>
        </div>
      </div>
    </section>

    <section class="services-section">
      <div class="services-container">
        <h2 data-text="index_Leistungen_title">Gemeinsam neue Wege entdecken</h2>

        <p class="services-intro" data-text="index_Leistungen_intro">Jeder Mensch steht vor individuellen Herausforderungen. Gemeinsam entwickeln wir neue Perspektiven und finden Wege, die zu Ihrer persönlichen Situation passen.</p>

        <div class="services-grid">
          <article class="service-card">
            <div class="service-content">
              <h3 data-text="index_Leistung_1_title">Familien- &amp; Elternberatung</h3>

              <p data-text="index_Leistung_1_text">Wenn Beziehungen schwierig werden und sich vertraute Dynamiken verändern. Unterstützung bei familiären Konflikten, Elternschaft, Kommunikation und Situationen, in denen Schule, Familie und persönliche Belastungen miteinander verbunden sind.</p>

              <a
                href="services.html"
                class="btn btn-primary"
                data-text="index_Leistung_1_button"
              >Mehr erfahren</a>
            </div>
          </article>

          <article class="service-card">
            <div class="service-content">
              <h3 data-text="index_Leistung_2_title">Beratung für Frauen</h3>

              <p data-text="index_Leistung_2_text">Wenn Sie sich neu orientieren, in einer Veränderung stecken oder wieder mehr bei sich selbst ankommen möchten. Begleitung bei persönlichen und beruflichen Wendepunkten, Selbstzweifeln, Entscheidungsfragen, Grenzen, Rollenveränderungen und neuen Lebensperspektiven.</p>

              <a
                href="services.html"
                class="btn btn-primary"
                data-text="index_Leistung_2_button"
              >Mehr erfahren</a>
            </div>
          </article>

          <article class="service-card">
            <div class="service-content">
              <h3 data-text="index_Leistung_3_title">Schule &amp; Übergänge</h3>

              <p data-text="index_Leistung_3_text">Wenn Schule zur Herausforderung für Ihr Kind oder die ganze Familie wird. Beratung bei schulischen Übergängen, Konflikten, Überforderung, Motivation, Leistungsdruck und schwierigen Situationen zwischen Eltern, Kindern und Schule.</p>

              <a
                href="services.html"
                class="btn btn-primary"
                data-text="index_Leistung_3_button"
              >Mehr erfahren</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="about-section">
      <div class="about-container">
        <div class="about-content">
          <h2 data-text="index_Ueber_mich_title">Über Aufwind Beratung</h2>

          <p data-text="index_Ueber_mich_text1">Mein Name ist Natalie Fedine. Als langjährige Lehrerin kenne ich die Dynamik von Schule nicht nur aus der Theorie. Ich weiß, wie komplex die Beziehung zwischen Kind, Eltern, Lehrkräften und Schule sein kann. In meiner Beratung verbinde ich diese praktische Erfahrung mit psychologischer und systemischer Beratung. Mein besonderer Schwerpunkt liegt deshalb auf Situationen, in denen Schule und Familie ineinandergreifen.</p>

          <p data-text="index_Ueber_mich_text2">Gemeinsam entdecken wir Ressourcen, lösen Blockaden und entwickeln neue Möglichkeiten für nachhaltige Veränderungen.</p>

          <a
            href="about.html"
            class="btn btn-primary"
            data-text="index_Ueber_mich_button"
          >Mehr über mich</a>
        </div>

        <div class="about-image">
          <img
            src="https://placehold.co/800x600?text=Aufwind+Beratung"
            alt="Aufwind Beratung"
          />
        </div>
      </div>
    </section>

    <section class="process-section">
      <div class="process-container">
        <h2 data-text="index_Ablauf_title">So läuft eine Beratung ab</h2>

        <p class="process-intro" data-text="index_Ablauf_intro">Der erste Schritt ist oft der schwerste. Ich begleite Sie Schritt für Schritt – vom ersten Kennenlernen bis zur Entwicklung neuer Perspektiven.</p>

        <div class="process-grid">
          <article class="process-step">
            <div class="step-number">1</div>

            <h3 data-text="index_Schritt_1_title">Erstkontakt</h3>

            <p data-text="index_Schritt_1_text">Kurzes Kennenlernen und Terminvereinbarung.</p>
          </article>

          <article class="process-step">
            <div class="step-number">2</div>

            <h3 data-text="index_Schritt_2_title">Persönliches Gespräch</h3>

            <p data-text="index_Schritt_2_text">Gemeinsam besprechen wir Ihre Situation, Wünsche und Ziele.</p>
          </article>

          <article class="process-step">
            <div class="step-number">3</div>

            <h3 data-text="index_Schritt_3_title">Gemeinsame Lösungen</h3>

            <p data-text="index_Schritt_3_text">Gemeinsam entwickeln wir neue Perspektiven und individuelle Handlungsmöglichkeiten.</p>
          </article>

          <article class="process-step">
            <div class="step-number">4</div>

            <h3 data-text="index_Schritt_4_title">Nachhaltige Begleitung</h3>

            <p data-text="index_Schritt_4_text">Ich begleite Sie dabei, neue Wege Schritt für Schritt in Ihren Alltag zu integrieren.</p>
          </article>
        </div>

        <p class="process-ending" data-text="index_Ablauf_ending">Ich freue mich darauf, Sie auf Ihrem Weg zu begleiten.</p>

        <a
          href="contact.html"
          class="btn btn-primary"
          data-text="index_Ablauf_button"
        >Jetzt Termin vereinbaren</a>
      </div>
    </section>

    <section class="faq-section">
      <div class="faq-container">
        <h2 data-text="index_FAQ_title">Häufige Fragen</h2>

        <p class="faq-intro" data-text="index_FAQ_intro">Hier finden Sie Antworten auf Fragen, die mir häufig gestellt werden.</p>

        <div class="faq">
          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_1_question"
            >Wie läuft eine Beratung ab?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_1_answer">Nach einem ersten Kennenlernen besprechen wir Ihre Anliegen und Ziele. Gemeinsam entwickeln wir passende Lösungsansätze und arbeiten Schritt für Schritt an den Themen, die Ihnen wichtig sind.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_2_question"
            >Wie lange dauert eine Sitzung?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_2_answer">Eine Beratung dauert in der Regel etwa 60 Minuten. Die genaue Dauer kann je nach Anliegen individuell vereinbart werden.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_3_question"
            >Wo findet die Beratung statt?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_3_answer">Die Beratung findet persönlich in Wiesbaden oder bequem online statt – ganz so, wie es am besten zu Ihrer Situation passt.		</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_4_question"
            >Was kostet eine Beratung?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_4_answer">Alle Informationen zu den Kosten finden Sie auf der Seite „Kosten &amp; Terminbuchung“. Gerne beantworte ich Ihre Fragen auch persönlich.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_5_question"
            >Werden meine Gespräche vertraulich behandelt?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_5_answer">Ja. Vertraulichkeit ist eine wichtige Grundlage meiner Arbeit. Alle Gespräche werden selbstverständlich vertraulich behandelt.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_6_question"
            >Wie kann ich einen Termin vereinbaren?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_6_answer">Sie können mich ganz einfach per E-Mail oder telefonisch kontaktieren oder über die Terminseite eine Anfrage stellen.</p>
            </div>
          </div>
        </div>

        <div class="faq-cta">
          <h3 data-text="index_FAQ_CTA_title">Ich freue mich darauf, Sie kennenzulernen.</h3>

          <p data-text="index_FAQ_CTA_text">Haben Sie noch Fragen oder möchten einen Termin vereinbaren? Ich freue mich auf Ihre Nachricht.</p>

          <a
            href="contact.html"
            class="btn btn-primary"
            data-text="index_FAQ_CTA_button"
          >Termin vereinbaren</a>
        </div>
      </div>
    </section>

  </main>
  </body>

  <script src="js/load-components.js"></script>
  <script src="js/header.js"></script>
  <script src="js/faq.js"></script>
  <script src="js/content-loader.js"></script>

</html>



============================================================
DATEI: services.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Beratungsangebote | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/services-page.css" />
  </head>

  <body data-page="services">
    <main>
      <section class="services-hero">
        <div class="services-hero-content">
          <h1 data-text="services_Hero_title">Beratung, die zu Ihrer Situation passt</h1>

          <p data-text="services_Hero_text">Gemeinsam entwickeln wir neue Perspektiven, entdecken Ihre Ressourcen und finden Wege, die zu Ihnen und Ihrem Leben passen.</p>
        </div>
      </section>

      <section class="services-overview">
        <div class="services-container">
          <h2 data-text="services_Uebersicht_title"></h2>

          <div id="services-container" class="services-cards">
            <p class="loading-text">Angebote werden geladen...</p>
          </div>
        </div>
      </section>

      <section class="services-approach">
        <div class="services-container">
          <h2 data-text="services_Beratungsansatz_title">Mein Beratungsansatz</h2>

          <div class="services-cards">
            <article class="service-card">
              <div class="service-content">
                <h3 data-text="services_Ansatz_1_title">Psychologische Beratung</h3>

                <p data-text="services_Ansatz_1_text">Wir betrachten persönliche Belastungen, Gefühle und Herausforderungen. Gemeinsam entwickeln wir neue Sichtweisen und Handlungsmöglichkeiten.</p>
              </div>
            </article>

            <article class="service-card">
              <div class="service-content">
                <h3 data-text="services_Ansatz_2_title">Systemische Beratung</h3>

                <p data-text="services_Ansatz_2_text">Systemisch zu arbeiten bedeutet für mich, Situationen nicht isoliert zu betrachten, sondern im Zusammenhang von Beziehungen, Rollen, Aufgaben und strukturellen Rahmenbedingungen.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="services-form">
        <div class="services-container">
          <h2 data-text="services_Beratungsformen_title">Ich unterstütze dabei, Muster, Dynamiken und Wechselwirkungen sichtbar zu machen, die das eigene Erleben und Handeln beeinflussen. Statt schneller Lösungen geht es mir um ein vertieftes Verstehen dessen, was wirkt, was bindet und wo sich neue Perspektiven eröffnen können.</h2>

          <div class="services-cards">
            <article class="service-card">
              <div class="service-content">
                <h3 data-text="services_Form_1_title">So entstehen Handlungsspielräume, die tragfähig sind und zu stimmigen nächsten Schritten führen – angepasst an Person, Rolle und jeweiligen Kontext.</h3>

                <p data-text="services_Form_1_text">Persönliche Gespräche in einer ruhigen und geschützten Atmosphäre.</p>
              </div>
            </article>

            <article class="service-card">
              <div class="service-content">
                <h3 data-text="services_Form_2_title">Online-Beratung</h3>

                <p data-text="services_Form_2_text"> Online zu arbeiten gehört für mich selbstverständlich zu meiner Praxis. Professionelle Begleitung lässt sich zeitlich und räumlich gut in unterschiedliche Lebens- und Arbeitskontexte integrieren. Ich erlebe den digitalen Rahmen als ebenso tragfähig wie die Arbeit in Präsenz. Nähe und differenzierte Reflexion entstehen online auf eigene Weise – klar, konzentriert und ohne Abstriche bei Tiefe oder Qualität.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="services-cost">
        <div class="services-container">
          <h2 data-text="services_Kosten_title">Kosten</h2>

          <p data-text="services_Kosten_text">Informationen zu den Kosten und möglichen Beratungszeiten erhalten Sie gerne persönlich. Sprechen Sie mich einfach an.</p>
        </div>
      </section>

      <section class="services-process">
        <div class="services-container">
          <h2 data-text="services_Ablauf_title">So läuft eine Beratung ab</h2>

          <div class="services-steps">
            <div class="services-step">
              <span>1</span>

              <h3 data-text="services_Schritt_1_title">Kontakt aufnehmen</h3>

              <p data-text="services_Schritt_1_text">Sie schildern Ihr Anliegen und wir vereinbaren ein erstes Gespräch.</p>
            </div>

            <div class="services-step">
              <span>2</span>

              <h3 data-text="services_Schritt_2_title">Erstgespräch</h3>

              <p data-text="services_Schritt_2_text">Gemeinsam schauen wir auf Ihre Situation und mögliche nächste Schritte.</p>
            </div>

            <div class="services-step">
              <span>3</span>

              <h3 data-text="services_Schritt_3_title">Gemeinsam weitergehen</h3>

              <p data-text="services_Schritt_3_text">Wir entwickeln Lösungen, die zu Ihnen und Ihrer Lebenssituation passen.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="services-cta">
        <div class="services-container">
          <h2 data-text="services_CTA_title">Sie möchten mehr erfahren?</h2>

          <a
            href="booking.html"
            class="btn btn-primary"
            data-text="services_CTA_button"
          >Kontakt aufnehmen</a>
        </div>
      </section>
    </main>

    <script src="js/load-components.js"></script>
    <script src="js/header.js"></script>
    <script src="js/content-loader.js"></script>

    <script type="module" src="js/services.js"></script>
  </body>
</html>



============================================================
DATEI: success.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vielen Dank | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/success.css" />
  </head>

  <body data-page="success">
    <main>
      <section class="success">
        <div class="success-card">
          <div class="success-icon" data-text="success_Hero_icon">
            ✅
          </div>

          <h1 data-text="success_Hero_title">
            Termin erfolgreich gebucht
          </h1>

          <p
            id="success-intro"
            data-text="success_Hero_intro"
          >
            Vielen Dank — Ihre Buchung wurde gespeichert.
          </p>

          <div class="booking-details">
            <p>
              <strong data-text="success_Buchungsdetails_booking_id_label">
                Buchungsnummer:
              </strong>

              <span id="booking-id">—</span>
            </p>

            <p>
              <strong data-text="success_Buchungsdetails_service_label">
                Leistung:
              </strong>

              <span id="booking-service">—</span>
            </p>

            <p>
              <strong data-text="success_Buchungsdetails_datetime_label">
                Datum &amp; Uhrzeit:
              </strong>

              <span id="booking-datetime">—</span>
            </p>
          </div>

          <p
            id="success-note"
            data-text="success_Bestätigung_note"
          >
            Sie erhalten in Kürze eine Bestätigung per E-Mail.
          </p>

          <a
            href="index.html"
            class="btn btn-primary"
            data-text="success_CTA_button"
          >
            Zur Startseite
          </a>
        </div>
      </section>
    </main>

    <script src="js/load-components.js"></script>
    <script src="js/load-components.js"></script>

    <script>
      // Parse query params und fülle die Erfolgseite
      (function () {
        const params = new URLSearchParams(window.location.search);

        const id = params.get("id");
        const service = params.get("service");
        const date = params.get("date");
        const time = params.get("time");
        const createdAt = params.get("created_at");

        if (id) {
          document.getElementById("booking-id").textContent = id;
        }

        if (service) {
          document.getElementById("booking-service").textContent =
            decodeURIComponent(service);
        }

        if (date || time) {
          const parts = [];

          if (date) parts.push(date);
          if (time) parts.push(time);

          document.getElementById("booking-datetime").textContent =
            parts.join(" um ");
        }

        if (createdAt) {
          try {
            const d = new Date(createdAt);

            const formatted = d.toLocaleString(undefined, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            const p = document.createElement("p");

            const strong = document.createElement("strong");

            // Der Text kommt später ebenfalls aus Google Sheets
            strong.dataset.text = "success_Buchungsdetails_created_at_label";
            strong.textContent = "Erfasst am:";

            p.appendChild(strong);
            p.appendChild(document.createTextNode(` ${formatted}`));

            document
              .querySelector(".booking-details")
              .appendChild(p);
          } catch (e) {
            // ignore parse errors
          }
        }

        // If no params, show a generic message
        if (!id && !service && !date && !time) {
          document.getElementById("success-intro").textContent =
            "Ihre Buchung wurde verarbeitet. Weitere Details finden Sie in Ihrem Posteingang.";
        }
      })();
    </script>
  </body>
</html>

