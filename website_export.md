
============================================================
DATEI: admin\css\availability.css
============================================================

/* ========================================
   AVAILABILITY CONTENT
   ======================================== */

.availability-content {
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;

  padding: 35px 40px;
}


/* ========================================
   HEADER
   ======================================== */

.availability-header {
  margin-bottom: 28px;
}

.availability-header h2 {
  margin: 0;

  color: var(--color-dark);

  font-size: 1.7rem;
  font-weight: 700;
}

.availability-header p {
  margin: 6px 0 0;

  color: var(--color-text-muted);

  font-size: 0.95rem;
}


/* ========================================
   WOCHENTAGE
   ======================================== */

.availability-days {
  display: flex;
  flex-direction: column;

  gap: 14px;
}


/* ========================================
   WOCHENTAG-KARTE
   ======================================== */

.availability-day {
  padding: 22px 24px;

  background: var(--admin-surface);

  border: 1px solid var(--admin-border);
  border-radius: var(--radius);

  box-shadow:
    0 4px 14px rgba(42, 36, 33, 0.04);
}


/* ========================================
   TAG HEADER
   ======================================== */

.availability-day-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 18px;
}

.availability-day-name {
  margin: 0;

  color: var(--color-dark);

  font-size: 1rem;
  font-weight: 700;
}


/* ========================================
   VERFÜGBAR CHECKBOX
   ======================================== */

.availability-checkbox {
  display: inline-flex;
  align-items: center;

  gap: 9px;

  color: var(--color-dark);

  font-size: 0.85rem;
  font-weight: 600;

  cursor: pointer;

  user-select: none;
}

.availability-checkbox input {
  width: 17px;
  height: 17px;

  margin: 0;

  accent-color: var(--color-primary);

  cursor: pointer;
}


/* ========================================
   ZEITRÄUME
   ======================================== */

.availability-slots {
  display: flex;
  flex-direction: column;

  gap: 9px;

  margin-bottom: 14px;
}

.availability-slot {
  display: flex;
  align-items: center;

  gap: 10px;
}

.availability-time-input {
  min-height: 40px;

  padding: 8px 11px;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  background: var(--color-surface);
  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.88rem;

  outline: none;

  transition:
    border-color var(--transition),
    box-shadow var(--transition);
}

.availability-time-input:focus {
  border-color: var(--color-primary);

  box-shadow:
    0 0 0 3px rgba(212, 178, 149, 0.15);
}

.availability-time-separator {
  color: var(--color-text-muted);

  font-size: 0.85rem;
}


/* ========================================
   ZEITRAUM LÖSCHEN
   ======================================== */

.availability-delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 36px;
  height: 36px;

  flex-shrink: 0;

  padding: 0;

  border: 1px solid rgba(180, 80, 80, 0.25);
  border-radius: 8px;

  background: transparent;

  color: #8a3d3d;

  font-family: inherit;
  font-size: 1rem;

  cursor: pointer;

  transition:
    background var(--transition),
    border-color var(--transition);
}

.availability-delete:hover {
  background: rgba(180, 80, 80, 0.08);

  border-color: rgba(180, 80, 80, 0.4);
}


/* ========================================
   ZEITRAUM HINZUFÜGEN
   ======================================== */

.availability-add-slot {
  display: inline-flex;
  align-items: center;

  gap: 6px;

  padding: 7px 0;

  border: none;

  background: transparent;

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    color var(--transition);
}

.availability-add-slot:hover {
  color: var(--color-primary);
}


/* ========================================
   NICHT VERFÜGBAR
   ======================================== */

.availability-day-unavailable
  .availability-slots,
.availability-day-unavailable
  .availability-add-slot {
  opacity: 0.45;
}

.availability-day-unavailable
  .availability-time-input,
.availability-day-unavailable
  .availability-delete,
.availability-day-unavailable
  .availability-add-slot {
  pointer-events: none;
}


/* ========================================
   VALIDIERUNGSFEHLER
   ======================================== */

.availability-slot-error {
  border-color: rgba(180, 80, 80, 0.55);

  background: rgba(180, 80, 80, 0.04);
}

.availability-validation-error {
  margin-top: 10px;

  padding: 10px 12px;

  border: 1px solid rgba(180, 80, 80, 0.2);
  border-radius: 8px;

  background: rgba(180, 80, 80, 0.06);

  color: #8a3d3d;

  font-size: 0.82rem;
}


/* ========================================
   MESSAGE
   ======================================== */

.availability-message {
  margin-bottom: 20px;

  padding: 13px 16px;

  border-radius: var(--radius);

  font-size: 0.88rem;
  font-weight: 600;
}

.availability-message.success {
  border: 1px solid rgba(80, 140, 100, 0.22);

  background: rgba(80, 140, 100, 0.08);

  color: #3d704d;
}

.availability-message.error {
  border: 1px solid rgba(180, 80, 80, 0.22);

  background: rgba(180, 80, 80, 0.08);

  color: #8a3d3d;
}


/* ========================================
   SPEICHERN
   ======================================== */

.availability-actions {
  display: flex;
  justify-content: flex-end;

  margin-top: 22px;

  padding-bottom: 30px;
}

.availability-save {
  min-height: 44px;

  padding: 11px 20px;

  border: none;
  border-radius: var(--radius);

  background: var(--color-primary);

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform var(--transition),
    box-shadow var(--transition),
    opacity var(--transition);
}

.availability-save:hover {
  transform: translateY(-1px);

  box-shadow:
    0 5px 12px rgba(212, 178, 149, 0.25);
}

.availability-save:active {
  transform: translateY(0);
}

.availability-save:disabled {
  opacity: 0.6;

  cursor: not-allowed;

  transform: none;

  box-shadow: none;
}


/* ========================================
   TABLET
   ======================================== */

@media (max-width: 800px) {

  .availability-content {
    padding: 28px 24px;
  }

  .availability-day {
    padding: 20px;
  }
}


/* ========================================
   MOBILE
   ======================================== */

@media (max-width: 600px) {

  .availability-content {
    padding: 24px 18px;
  }

  .availability-header {
    margin-bottom: 22px;
  }

  .availability-header h2 {
    font-size: 1.45rem;
  }

  .availability-day {
    padding: 18px;
  }

  .availability-day-header {
    align-items: flex-start;

    flex-direction: column;

    gap: 12px;
  }

  .availability-slot {
    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      auto
      minmax(0, 1fr)
      36px;

    gap: 7px;
  }

  .availability-time-input {
    width: 100%;
  }

  .availability-time-separator {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .availability-actions {
    justify-content: stretch;
  }

  .availability-save {
    width: 100%;
  }
}


/* ========================================
   SEHR KLEINE HANDYS
   ======================================== */

@media (max-width: 400px) {

  .availability-content {
    padding: 20px 14px;
  }

  .availability-day {
    padding: 16px;
  }

  .availability-slot {
    grid-template-columns:
      minmax(0, 1fr)
      auto
      minmax(0, 1fr);

    gap: 6px;
  }

  .availability-delete {
    grid-column: 1 / -1;

    width: 100%;
  }
}


============================================================
DATEI: admin\js\availability.js
============================================================

import { supabase } from "../../js/supabase.js";

/* ========================================
   KONFIGURATION
   ======================================== */

const weekdays = [
  { id: 1, name: "Montag" },
  { id: 2, name: "Dienstag" },
  { id: 3, name: "Mittwoch" },
  { id: 4, name: "Donnerstag" },
  { id: 5, name: "Freitag" },
  { id: 6, name: "Samstag" },
  { id: 7, name: "Sonntag" },
];


/* ========================================
   ELEMENTE
   ======================================== */

const daysContainer =
  document.getElementById("availability-days");

const messageElement =
  document.getElementById("availability-message");

const saveButton =
  document.getElementById("save-availability");


/* ========================================
   NACHRICHTEN
   ======================================== */

function showMessage(message, type) {
  if (!messageElement) return;

  messageElement.textContent = message;

  messageElement.className =
    `availability-message availability-message-${type}`;

  messageElement.hidden = false;
}


function hideMessage() {
  if (!messageElement) return;

  messageElement.hidden = true;
  messageElement.textContent = "";
}


/* ========================================
   ZEITBLOCK HTML
   ======================================== */

function createTimeBlock(start = "09:00", end = "17:00") {
  const block = document.createElement("div");

  block.className = "availability-time-block";

  block.innerHTML = `
    <input
      type="time"
      class="availability-time-start"
      value="${start}"
      aria-label="Startzeit"
    />

    <span class="availability-time-separator">
      –
    </span>

    <input
      type="time"
      class="availability-time-end"
      value="${end}"
      aria-label="Endzeit"
    />

    <button
      type="button"
      class="availability-delete"
      aria-label="Zeitraum löschen"
      title="Zeitraum löschen"
    >
      🗑
    </button>
  `;

  const deleteButton =
    block.querySelector(".availability-delete");

  deleteButton.addEventListener("click", () => {
    block.remove();
  });

  return block;
}


/* ========================================
   WOCHENTAG HTML
   ======================================== */

function createWeekday(day, availabilityRows) {
  const dayElement = document.createElement("article");

  dayElement.className = "availability-day";

  const activeRows = availabilityRows.filter(
    (row) =>
      row.weekday === day.id &&
      row.active === true
  );

  const isActive = activeRows.length > 0;

  dayElement.innerHTML = `
    <div class="availability-day-header">

      <div>
        <h3>${day.name}</h3>
      </div>

      <label class="availability-toggle">

        <input
          type="checkbox"
          class="availability-day-active"
          ${isActive ? "checked" : ""}
        />

        <span>
          Verfügbar
        </span>

      </label>

    </div>

    <div class="availability-time-blocks"></div>

    <button
      type="button"
      class="availability-add"
    >
      + Zeitraum hinzufügen
    </button>
  `;

  const blocksContainer =
    dayElement.querySelector(
      ".availability-time-blocks"
    );

  const activeCheckbox =
    dayElement.querySelector(
      ".availability-day-active"
    );

  const addButton =
    dayElement.querySelector(
      ".availability-add"
    );


  /* ========================================
     VORHANDENE ZEITBLÖCKE
     ======================================== */

  activeRows.forEach((row) => {
    blocksContainer.appendChild(
      createTimeBlock(
        row.start_time.slice(0, 5),
        row.end_time.slice(0, 5)
      )
    );
  });


  /*
   * Wenn der Tag aktiviert ist,
   * aber noch keinen Zeitraum besitzt,
   * erstellen wir einen Standardblock.
   */

  if (isActive && activeRows.length === 0) {
    blocksContainer.appendChild(
      createTimeBlock()
    );
  }


  /* ========================================
     ZEITRAUM HINZUFÜGEN
     ======================================== */

  addButton.addEventListener("click", () => {
    blocksContainer.appendChild(
      createTimeBlock()
    );
  });


  /* ========================================
     AKTIV / INAKTIV
     ======================================== */

  activeCheckbox.addEventListener("change", () => {
    const blocks =
      blocksContainer.querySelectorAll(
        ".availability-time-block"
      );

    if (activeCheckbox.checked && blocks.length === 0) {
      blocksContainer.appendChild(
        createTimeBlock()
      );
    }
  });


  return dayElement;
}


/* ========================================
   VERFÜGBARKEIT LADEN
   ======================================== */

async function loadAvailability() {
  hideMessage();

  const { data, error } = await supabase
    .from("availability")
    .select(`
      id,
      weekday,
      start_time,
      end_time,
      active
    `)
    .order("weekday", { ascending: true })
    .order("start_time", { ascending: true });


  if (error) {
    console.error(
      "Verfügbarkeit konnte nicht geladen werden:",
      error
    );

    showMessage(
      "Die Verfügbarkeit konnte nicht geladen werden.",
      "error"
    );

    return;
  }


  const availabilityRows = data ?? [];

  daysContainer.innerHTML = "";


  weekdays.forEach((day) => {
    daysContainer.appendChild(
      createWeekday(
        day,
        availabilityRows
      )
    );
  });
}


/* ========================================
   ZEIT IN MINUTEN UMWANDELN
   ======================================== */

function timeToMinutes(time) {
  const [hours, minutes] =
    time.split(":").map(Number);

  return hours * 60 + minutes;
}


/* ========================================
   FORMULAR AUSLESEN
   ======================================== */

function collectAvailability() {
  const result = [];

  const dayElements =
    daysContainer.querySelectorAll(
      ".availability-day"
    );


  dayElements.forEach((dayElement, index) => {
    const weekday = index + 1;

    const activeCheckbox =
      dayElement.querySelector(
        ".availability-day-active"
      );

    const active =
      activeCheckbox.checked;

    const blocks =
      dayElement.querySelectorAll(
        ".availability-time-block"
      );


    blocks.forEach((block) => {
      const startInput =
        block.querySelector(
          ".availability-time-start"
        );

      const endInput =
        block.querySelector(
          ".availability-time-end"
        );

      result.push({
        weekday,
        start_time: startInput.value,
        end_time: endInput.value,
        active,
      });
    });
  });


  return result;
}


/* ========================================
   VALIDIERUNG
   ======================================== */

function validateAvailability(rows) {

  /*
   * Jeden einzelnen Zeitraum prüfen
   */

  for (const row of rows) {

    if (!row.active) {
      continue;
    }

    if (!row.start_time || !row.end_time) {
      return {
        valid: false,
        message:
          "Bitte fülle alle Zeiträume vollständig aus.",
      };
    }


    const start =
      timeToMinutes(row.start_time);

    const end =
      timeToMinutes(row.end_time);


    if (start >= end) {
      return {
        valid: false,
        message:
          "Die Startzeit muss vor der Endzeit liegen.",
      };
    }
  }


  /*
   * Überschneidungen pro Wochentag prüfen
   */

  for (const day of weekdays) {

    const dayRows = rows
      .filter(
        (row) =>
          row.weekday === day.id &&
          row.active
      )
      .sort(
        (a, b) =>
          timeToMinutes(a.start_time) -
          timeToMinutes(b.start_time)
      );


    for (let i = 0; i < dayRows.length - 1; i++) {

      const current =
        dayRows[i];

      const next =
        dayRows[i + 1];


      const currentEnd =
        timeToMinutes(
          current.end_time
        );

      const nextStart =
        timeToMinutes(
          next.start_time
        );


      if (currentEnd > nextStart) {
        return {
          valid: false,
          message:
            "Die Zeiträume überschneiden sich.",
        };
      }
    }
  }


  return {
    valid: true,
  };
}


/* ========================================
   SPEICHERN
   ======================================== */

async function saveAvailability() {

  hideMessage();

  const rows =
    collectAvailability();


  /*
   * Eingaben prüfen
   */

  const validation =
    validateAvailability(rows);


  if (!validation.valid) {
    showMessage(
      validation.message,
      "error"
    );

    return;
  }


  /*
   * Button sperren
   */

  saveButton.disabled = true;
  saveButton.textContent =
    "Wird gespeichert...";


  try {

    /*
     * Alte Verfügbarkeit löschen
     */

    const { error: deleteError } =
      await supabase
        .from("availability")
        .delete()
        .neq(
          "id",
          "00000000-0000-0000-0000-000000000000"
        );


    if (deleteError) {
      throw deleteError;
    }


    /*
     * Nur aktive Zeiträume speichern
     */

    const activeRows =
      rows.filter(
        (row) => row.active
      );


    if (activeRows.length > 0) {

      const { error: insertError } =
        await supabase
          .from("availability")
          .insert(
            activeRows.map((row) => ({
              weekday: row.weekday,
              start_time: row.start_time,
              end_time: row.end_time,
              active: true,
            }))
          );


      if (insertError) {
        throw insertError;
      }
    }


    /*
     * Erfolg
     */

    showMessage(
      "✓ Verfügbarkeit gespeichert.",
      "success"
    );

  } catch (error) {

    console.error(
      "Verfügbarkeit konnte nicht gespeichert werden:",
      error
    );

    showMessage(
      "Die Änderungen konnten nicht gespeichert werden.",
      "error"
    );

  } finally {

    saveButton.disabled = false;

    saveButton.textContent =
      "Änderungen speichern";
  }
}


/* ========================================
   EVENTS
   ======================================== */

if (saveButton) {
  saveButton.addEventListener(
    "click",
    saveAvailability
  );
}


/* ========================================
   START
   ======================================== */

loadAvailability();


============================================================
DATEI: admin\pages\availability.html
============================================================

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>Verfügbarkeit | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="../../css/global.css" />
    <link rel="stylesheet" href="../css/admin.css" />
    <link rel="stylesheet" href="../css/availability.css" />
  </head>

  <body>
    <div class="admin-layout" id="adminLayout">

      <!-- ========================================
           SIDEBAR
           ======================================== -->

      <aside class="admin-sidebar" id="adminSidebar">

        <div class="sidebar-header">

          <a
            href="dashboard.html"
            class="sidebar-logo"
          >
            <span class="sidebar-logo-mark">A</span>

            <span class="sidebar-logo-text">
              Aufwind
            </span>
          </a>

          <button
            type="button"
            class="sidebar-toggle"
            id="sidebarToggle"
            aria-label="Sidebar einklappen"
            aria-expanded="true"
          >
            <span></span>
            <span></span>
          </button>

        </div>


        <!-- ========================================
             NAVIGATION
             ======================================== -->

        <nav
          class="sidebar-navigation"
          aria-label="Admin-Navigation"
        >

          <a
            href="dashboard.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">⌂</span>

            <span class="sidebar-link-text">
              Dashboard
            </span>
          </a>


          <a
            href="bookings.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">▣</span>

            <span class="sidebar-link-text">
              Termine
            </span>
          </a>


          <a
            href="availability.html"
            class="sidebar-link active"
          >
            <span class="sidebar-icon">◷</span>

            <span class="sidebar-link-text">
              Verfügbarkeit
            </span>
          </a>


          <a
            href="services.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">◇</span>

            <span class="sidebar-link-text">
              Beratungsangebote
            </span>
          </a>


          <a
            href="settings.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">⚙</span>

            <span class="sidebar-link-text">
              Einstellungen
            </span>
          </a>

        </nav>


        <!-- ========================================
             SIDEBAR UNTEN
             ======================================== -->

        <div class="sidebar-bottom">

          <a
            href="/"
            class="sidebar-link sidebar-public-link"
          >
            <span class="sidebar-icon">↗</span>

            <span class="sidebar-link-text">
              Zur Website
            </span>
          </a>


          <button
            type="button"
            class="sidebar-link sidebar-logout"
            id="logoutButton"
          >
            <span class="sidebar-icon">↪</span>

            <span class="sidebar-link-text">
              Abmelden
            </span>
          </button>

        </div>

      </aside>


      <!-- ========================================
           MOBILE SIDEBAR OVERLAY
           ======================================== -->

      <div
        class="sidebar-overlay"
        id="sidebarOverlay"
      ></div>


      <!-- ========================================
           MAIN
           ======================================== -->

      <main class="admin-main">

        <!-- ========================================
             TOPBAR
             ======================================== -->

        <header class="admin-topbar">

          <div class="topbar-left">

            <button
              type="button"
              class="mobile-menu-button"
              id="mobileMenuButton"
              aria-label="Menü öffnen"
              aria-expanded="false"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>


            <div class="topbar-title">

              <h1>
                Verfügbarkeit
              </h1>

              <p>
                Reguläre Arbeitszeiten verwalten
              </p>

            </div>

          </div>


          <div class="topbar-right">

            <div class="admin-user">

              <div class="admin-user-avatar">
                A
              </div>


              <div class="admin-user-info">

                <span
                  class="admin-user-name"
                  id="adminUserName"
                >
                  Administrator
                </span>

                <span class="admin-user-role">
                  Admin
                </span>

              </div>

            </div>

          </div>

        </header>


        <!-- ========================================
             CONTENT
             ======================================== -->

        <section class="availability-content">

          <!-- ========================================
               HEADER
               ======================================== -->

          <div class="availability-header">

            <div>

              <h2>
                Reguläre Arbeitszeiten
              </h2>

              <p>
                Lege fest, wann Termine regulär
                gebucht werden können.
              </p>

            </div>

          </div>


          <!-- ========================================
               FEHLER / ERFOLG
               ======================================== -->

          <div
            id="availability-message"
            class="availability-message"
            hidden
            role="status"
            aria-live="polite"
          ></div>


          <!-- ========================================
               WOCHENTAGE
               ======================================== -->

          <div
            id="availability-days"
            class="availability-days"
          >

            <!-- Wird per JavaScript eingefügt -->

          </div>


          <!-- ========================================
               SPEICHERN
               ======================================== -->

          <div class="availability-actions">

            <button
              type="button"
              class="availability-save"
              id="save-availability"
            >
              Änderungen speichern
            </button>

          </div>

        </section>

      </main>

    </div>


    <!-- ========================================
         JAVASCRIPT
         ======================================== -->

    <script
      type="module"
      src="../js/auth.js"
    ></script>

    <script
      src="../js/admin-layout.js"
    ></script>

    <script
      type="module"
      src="../js/availability.js"
    ></script>

  </body>
</html>

