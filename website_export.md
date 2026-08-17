
============================================================
DATEI: admin\components\sidebar.html
============================================================

<aside class="admin-sidebar" id="adminSidebar">
  <div class="sidebar-header">
    <a
      href="/admin/pages/dashboard.html"
      class="sidebar-logo"
    >
      <span class="sidebar-logo-mark">A</span>
      <span class="sidebar-logo-text">Aufwind</span>
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

  <nav
    class="sidebar-navigation"
    aria-label="Admin-Navigation"
  >
    <a
      href="/admin/pages/dashboard.html"
      class="sidebar-link"
      data-page="dashboard"
    >
      <span
        class="sidebar-icon"
        data-icon="home"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Dashboard
      </span>
    </a>

    <a
      href="/admin/pages/bookings.html"
      class="sidebar-link"
      data-page="bookings"
    >
      <span
        class="sidebar-icon"
        data-icon="calendar"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Termine
      </span>
    </a>

    <a
      href="/admin/pages/availability.html"
      class="sidebar-link"
      data-page="availability"
    >
      <span
        class="sidebar-icon"
        data-icon="clock"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Verfügbarkeit
      </span>
    </a>

    <a
      href="/admin/pages/blocked-times.html"
      class="sidebar-link"
      data-page="blocked-times"
    >
      <span
        class="sidebar-icon"
        data-icon="calendar-off"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Sperrzeiten
      </span>
    </a>

    <a
      href="/admin/pages/services.html"
      class="sidebar-link"
      data-page="services"
    >
      <span
        class="sidebar-icon"
        data-icon="briefcase-business"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Beratungsangebote
      </span>
    </a>

    <a
      href="/admin/pages/settings.html"
      class="sidebar-link"
      data-page="settings"
    >
      <span
        class="sidebar-icon"
        data-icon="settings"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Einstellungen
      </span>
    </a>
  </nav>

  <div class="sidebar-bottom">
    <a
      href="/"
      class="sidebar-link sidebar-public-link"
    >
      <span
        class="sidebar-icon"
        data-icon="external-link"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Zur Website
      </span>
    </a>

    <button
      type="button"
      class="sidebar-link sidebar-logout"
      id="logoutButton"
    >
      <span
        class="sidebar-icon"
        data-icon="log-out"
        aria-hidden="true"
      ></span>

      <span class="sidebar-link-text">
        Abmelden
      </span>
    </button>
  </div>
</aside>

<div
  class="sidebar-overlay"
  id="sidebarOverlay"
></div>


============================================================
DATEI: admin\js\admin-layout.js
============================================================

import { icons } from "../../js/icons.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadSidebar();
  initializeAdminLayout();
});


/* ========================================
   SIDEBAR LADEN
   ======================================== */

async function loadSidebar() {
  const container =
    document.getElementById("adminSidebarContainer");

  if (!container) {
    console.error(
      "Sidebar-Container wurde nicht gefunden.",
    );

    return;
  }

  try {
    const response = await fetch(
      "/admin/sidebar.html",
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(
        `Sidebar konnte nicht geladen werden (${response.status}).`,
      );
    }

    const html = await response.text();

    container.innerHTML = html;

    initializeIcons();

  } catch (error) {
    console.error(
      "Fehler beim Laden der Sidebar:",
      error,
    );
  }
}


/* ========================================
   ICONS
   ======================================== */

function initializeIcons() {
  const iconElements =
    document.querySelectorAll(
      "[data-icon]",
    );

  iconElements.forEach((element) => {
    const iconName =
      element.dataset.icon;

    const iconSvg =
      icons[iconName];

    if (!iconSvg) {
      console.warn(
        `Icon "${iconName}" wurde nicht gefunden.`,
      );

      return;
    }

    element.innerHTML = iconSvg;
  });
}


/* ========================================
   ADMIN LAYOUT
   ======================================== */

function initializeAdminLayout() {
  const layout =
    document.getElementById("adminLayout");

  const sidebar =
    document.getElementById("adminSidebar");

  const sidebarToggle =
    document.getElementById("sidebarToggle");

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");

  const overlay =
    document.getElementById("sidebarOverlay");

  if (!layout || !sidebar) {
    console.error(
      "Admin-Layout oder Sidebar wurde nicht gefunden.",
    );

    return;
  }


  /* ========================================
     DESKTOP SIDEBAR
     ======================================== */

  if (sidebarToggle) {
    sidebarToggle.addEventListener(
      "click",
      () => {
        layout.classList.toggle(
          "sidebar-collapsed",
        );

        const collapsed =
          layout.classList.contains(
            "sidebar-collapsed",
          );

        sidebarToggle.setAttribute(
          "aria-expanded",
          String(!collapsed),
        );

        localStorage.setItem(
          "admin-sidebar-collapsed",
          String(collapsed),
        );
      },
    );
  }


  /* ========================================
     GESPEICHERTEN ZUSTAND LADEN
     ======================================== */

  const savedState =
    localStorage.getItem(
      "admin-sidebar-collapsed",
    );

  if (
    savedState === "true" &&
    window.innerWidth > 800
  ) {
    layout.classList.add(
      "sidebar-collapsed",
    );

    if (sidebarToggle) {
      sidebarToggle.setAttribute(
        "aria-expanded",
        "false",
      );
    }
  }


  /* ========================================
     MOBILE SIDEBAR
     ======================================== */

  function openMobileSidebar() {
    sidebar.classList.add(
      "mobile-open",
    );

    if (overlay) {
      overlay.classList.add(
        "is-visible",
      );
    }

    if (mobileMenuButton) {
      mobileMenuButton.setAttribute(
        "aria-expanded",
        "true",
      );
    }
  }


  function closeMobileSidebar() {
    sidebar.classList.remove(
      "mobile-open",
    );

    if (overlay) {
      overlay.classList.remove(
        "is-visible",
      );
    }

    if (mobileMenuButton) {
      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false",
      );
    }
  }


  if (mobileMenuButton) {
    mobileMenuButton.addEventListener(
      "click",
      () => {
        const isOpen =
          sidebar.classList.contains(
            "mobile-open",
          );

        if (isOpen) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      },
    );
  }


  /* ========================================
     OVERLAY
     ======================================== */

  if (overlay) {
    overlay.addEventListener(
      "click",
      closeMobileSidebar,
    );
  }


  /* ========================================
     NAVIGATION
     ======================================== */

  const navigationLinks =
    document.querySelectorAll(
      ".sidebar-link[href]",
    );

  navigationLinks.forEach((link) => {
    link.addEventListener(
      "click",
      () => {
        if (window.innerWidth <= 800) {
          closeMobileSidebar();
        }
      },
    );
  });


  /* ========================================
     AKTIVE SEITE
     ======================================== */

  const currentPath =
    window.location.pathname
      .replace(/\/+$/, "");

  navigationLinks.forEach((link) => {
    if (
      link.classList.contains(
        "sidebar-public-link",
      )
    ) {
      return;
    }

    const linkPath =
      new URL(link.href)
        .pathname
        .replace(/\/+$/, "");

    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });


  /* ========================================
     ESC
     ======================================== */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMobileSidebar();
      }
    },
  );


  /* ========================================
     WINDOW RESIZE
     ======================================== */

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 800) {
        closeMobileSidebar();
      }
    },
  );
}


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

            <div
              id="availability-message"
              class="availability-message"
              hidden
              role="status"
              aria-live="polite"
            ></div>

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

    <script type="module" src="../js/admin-layout.js"></script>

    <script
      type="module"
      src="../js/availability.js"
    ></script>

  </body>
</html>


============================================================
DATEI: admin\pages\blocked-times.html
============================================================

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>Sperrzeiten | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="../../css/global.css" />
    <link rel="stylesheet" href="../css/admin.css" />
    <link rel="stylesheet" href="../css/blocked-times.css" />
  </head>

  <body>
    <div class="admin-layout" id="adminLayout">


      <!-- MAIN -->

      <main class="admin-main">

        <!-- TOPBAR -->

        <!-- TOPBAR -->

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
              <h1>Sperrzeiten</h1>
              <p>Zeiten und Tage für Buchungen sperren</p>
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


        <!-- CONTENT -->

        <section class="blocked-times-content">

          <div class="blocked-times-header">

            <div>
              <h2>Sperrzeiten</h2>

              <p>
                Verwalte ganze Tage und einzelne Zeiten,
                an denen keine Buchungen möglich sein sollen.
              </p>
            </div>

            <button
              type="button"
              class="blocked-times-add-button"
              id="add-blocked-time-button"
            >
              + Sperrzeit hinzufügen
            </button>

          </div>


          <!-- MESSAGE -->

          <div
            id="blocked-times-message"
            class="blocked-times-message"
            hidden
            role="status"
            aria-live="polite"
          ></div>


          <!-- LOADING -->

          <div
            id="blocked-times-loading"
            class="blocked-times-state"
          >
            <p>Sperrzeiten werden geladen...</p>
          </div>


          <!-- EMPTY -->

          <div
            id="blocked-times-empty"
            class="blocked-times-state"
            hidden
          >
            <p>Keine Sperrzeiten vorhanden.</p>

            <button
              type="button"
              class="blocked-times-empty-button"
              id="empty-add-blocked-time"
            >
              + Sperrzeit hinzufügen
            </button>
          </div>


          <!-- ERROR -->

          <div
            id="blocked-times-error"
            class="blocked-times-state blocked-times-state-error"
            hidden
          >
            <p>
              Die Sperrzeiten konnten nicht geladen werden.
            </p>

            <button
              type="button"
              class="blocked-times-empty-button"
              id="retry-blocked-times"
            >
              Erneut versuchen
            </button>
          </div>


          <!-- LIST -->

          <div
            id="blocked-times-list"
            class="blocked-times-list"
          ></div>

        </section>

      </main>

    </div>


    <!-- ==================================================
         MODAL
         ================================================== -->

    <div
      class="blocked-time-modal"
      id="blocked-time-modal"
      hidden
    >

      <div
        class="blocked-time-modal-backdrop"
        data-modal-close
      ></div>

      <div
        class="blocked-time-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blocked-time-modal-title"
      >

        <div class="blocked-time-modal-header">

          <div>
            <h2 id="blocked-time-modal-title">
              Neue Sperrzeit hinzufügen
            </h2>

            <p>
              Lege fest, wann keine Termine gebucht werden können.
            </p>
          </div>

          <button
            type="button"
            class="blocked-time-modal-close"
            id="blocked-time-modal-close"
            aria-label="Modal schließen"
          >
            ×
          </button>

        </div>


        <form
          id="blocked-time-form"
          class="blocked-time-form"
        >

          <input
            type="hidden"
            id="blocked-time-edit-id"
          />

          <input
            type="hidden"
            id="blocked-time-edit-type"
          />

          <!-- ART -->

          <fieldset class="blocked-time-fieldset">

            <legend>Art der Sperrzeit</legend>

            <div class="blocked-time-type-options">

              <label class="blocked-time-radio">

                <input
                  type="radio"
                  name="blocked-time-type"
                  value="day"
                  checked
                />

                <span>
                  Ganzer Tag / Zeitraum
                </span>

              </label>

              <label class="blocked-time-radio">

                <input
                  type="radio"
                  name="blocked-time-type"
                  value="time"
                />

                <span>
                  Bestimmte Uhrzeit
                </span>

              </label>

            </div>

          </fieldset>


          <!-- GANZER TAG -->

          <div
            id="blocked-day-fields"
            class="blocked-time-fields"
          >

            <div class="blocked-time-field-row">

              <div class="blocked-time-field">

                <label for="blocked-day-from">
                  Von
                </label>

                <input
                  type="date"
                  id="blocked-day-from"
                  class="blocked-date-input"
                  required
                />

              </div>


              <div class="blocked-time-field">

                <label for="blocked-day-to">
                  Bis
                </label>

                <input
                  type="date"
                  id="blocked-day-to"
                  class="blocked-date-input"
                  required
                />

              </div>

            </div>

          </div>


          <!-- BESTIMMTE UHRZEIT -->

          <div
            id="blocked-time-fields"
            class="blocked-time-fields"
            hidden
          >

            <div class="blocked-time-field">

              <label for="blocked-time-date">
                Datum
              </label>

              <input
                type="date"
                id="blocked-time-date"
                class="blocked-date-input"
              />

            </div>


            <div class="blocked-time-field-row">

              <div class="blocked-time-field">

                <label for="blocked-time-start">
                  Von
                </label>

                <input
                  type="time"
                  id="blocked-time-start"
                  class="blocked-time-input"
                />

              </div>


              <div class="blocked-time-field">

                <label for="blocked-time-end">
                  Bis
                </label>

                <input
                  type="time"
                  id="blocked-time-end"
                  class="blocked-time-input"
                />

              </div>

            </div>

          </div>


          <!-- GRUND -->

          <div class="blocked-time-field">

            <label for="blocked-time-reason">
              Grund
            </label>

            <input
              type="text"
              id="blocked-time-reason"
              maxlength="200"
              placeholder="z. B. Urlaub"
            />

          </div>


          <!-- VALIDATION -->

          <p
            id="blocked-time-form-error"
            class="blocked-time-form-error"
            role="alert"
            aria-live="assertive"
            hidden
          ></p>


          <!-- ACTIONS -->

          <div class="blocked-time-modal-actions">

            <button
              type="button"
              class="blocked-time-secondary-button"
              id="blocked-time-cancel"
            >
              Abbrechen
            </button>

            <button
              type="submit"
              class="blocked-time-primary-button"
              id="blocked-time-save"
            >
              Speichern
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- JAVASCRIPT -->

    <script
      type="module"
      src="../js/auth.js"
    ></script>

    <script type="module" src="../js/admin-layout.js"></script>

    <script
      type="module"
      src="../js/blocked-times.js"
    ></script>

  </body>
</html>


============================================================
DATEI: admin\pages\bookings.html
============================================================

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Buchungen | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="../../css/global.css" />
    <link rel="stylesheet" href="../css/admin.css" />
    <link rel="stylesheet" href="../css/bookings.css" />
  </head>

  <body>
    <div class="admin-layout" id="adminLayout">


      <!-- MAIN -->

      <main class="admin-main">

        <!-- TOPBAR -->

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
              <h1>Termine</h1>
              <p>Alle Buchungen verwalten</p>
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


        <!-- CONTENT -->

        <section class="bookings-content">

          <!-- HEADER -->

          <div class="bookings-header">

            <div>
              <h2>Buchungen</h2>

              <p>
                Hier kannst du alle eingegangenen Termine verwalten.
              </p>
            </div>

          </div>


          <!-- FILTER -->

          <div class="bookings-toolbar">

            <!-- SUCHE -->

            <div class="booking-search">

              <label for="booking-search">
                Suche
              </label>

              <input
                type="search"
                id="booking-search"
                placeholder="Name oder E-Mail suchen..."
                autocomplete="off"
              />

            </div>


            <!-- STATUS -->

            <div class="booking-filter">

              <label for="status-filter">
                Status
              </label>

              <select id="status-filter">

                <option value="all">
                  Alle
                </option>

                <option value="pending">
                  Ausstehend
                </option>

                <option value="confirmed">
                  Bestätigt
                </option>

                <option value="completed">
                  Abgeschlossen
                </option>

                <option value="cancelled">
                  Storniert
                </option>

                <option value="no_show">
                  Nicht erschienen
                </option>

              </select>

            </div>


            <!-- BERATUNGSART -->

            <div class="booking-filter">

              <label for="service-filter">
                Beratungsart
              </label>

              <select id="service-filter">

                <option value="all">
                  Alle
                </option>

                <!-- Wird später dynamisch aus Supabase geladen -->

              </select>

            </div>


            <!-- ZEITRAUM -->

            <div class="booking-filter">

              <label for="date-filter">
                Zeitraum
              </label>

              <select id="date-filter">

                <option value="all">
                  Alle
                </option>

                <option value="today">
                  Heute
                </option>

                <option value="tomorrow">
                  Morgen
                </option>

                <option value="this_week">
                  Diese Woche
                </option>

                <option value="next_week">
                  Nächste Woche
                </option>

                <option value="this_month">
                  Dieser Monat
                </option>

                <option value="custom">
                  Benutzerdefiniert
                </option>

              </select>

            </div>


            <!-- BENUTZERDEFINIERTER ZEITRAUM -->

            <div
              class="booking-custom-date-filter"
              id="custom-date-filter"
              hidden
            >

              <div class="booking-filter">

                <label for="date-from">
                  Von
                </label>

                <input
                  type="date"
                  id="date-from"
                />

              </div>

              <div class="booking-filter">

                <label for="date-to">
                  Bis
                </label>

                <input
                  type="date"
                  id="date-to"
                />

              </div>

            </div>


            <!-- AKTUALISIEREN -->

            <button
              type="button"
              class="bookings-refresh"
              id="refresh-bookings"
            >
              Aktualisieren
            </button>

          </div>


          <!-- AKTIVE FILTER + TREFFERZAHL -->

          <div class="bookings-meta">

            <div
              class="active-booking-filters"
              id="active-booking-filters"
            >
            </div>

            <p class="booking-count">

              <span id="booking-count">
                0
              </span>

              <span id="booking-count-label">
                Buchungen
              </span>

            </p>

          </div>


          <!-- LISTE -->

          <div
            id="bookings-list"
            class="bookings-list"
          >

            <div class="empty-state">
              <p>
                Buchungen werden geladen...
              </p>
            </div>

          </div>

        </section>

      </main>

    </div>


    <!-- JAVASCRIPT -->

    <script type="module" src="../js/auth.js"></script>
    <script type="module" src="../js/admin-layout.js"></script>
    <script type="module" src="../js/bookings.js"></script>

  </body>

  <!-- BUCHUNGS-MODAL -->

  <div
    class="booking-modal"
    id="booking-modal"
    hidden
    aria-hidden="true"
  >
    <div
      class="booking-modal-backdrop"
      data-modal-close
    ></div>

    <div
      class="booking-modal-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >

      <header class="booking-modal-header">

        <div>
          <h2 id="booking-modal-title">
            Buchung
          </h2>

          <p id="booking-modal-subtitle">
            Buchungsdetails
          </p>
        </div>

        <button
          type="button"
          class="booking-modal-close"
          id="booking-modal-close"
          aria-label="Modal schließen"
        >
          ×
        </button>

      </header>

      <div class="booking-modal-content">

        <div class="booking-details-grid">

          <div class="booking-details-column">

            <section class="booking-details-section">
              <span class="booking-details-label">
                Kunde
              </span>

              <strong
                class="booking-details-value"
                id="booking-modal-customer"
              >
                –
              </strong>

              <span
                class="booking-details-secondary"
                id="booking-modal-email"
              >
                –
              </span>

              <span
                class="booking-details-secondary"
                id="booking-modal-phone"
              >
                –
              </span>
            </section>


            <section class="booking-details-section">

              <span class="booking-details-label">
                Termin
              </span>

              <strong
                class="booking-details-value"
                id="booking-modal-date"
              >
                –
              </strong>

              <span
                class="booking-details-secondary"
                id="booking-modal-time"
              >
                –
              </span>

            </section>


            <section class="booking-details-section">

              <span class="booking-details-label">
                Beratungsangebot
              </span>

              <strong
                class="booking-details-value"
                id="booking-modal-service"
              >
                –
              </strong>

              <span
                class="booking-details-secondary"
                id="booking-modal-duration"
              >
                –
              </span>

            </section>

          </div>


          <div class="booking-details-column">

            <section class="booking-details-section">

              <span class="booking-details-label">
                Status
              </span>

              <span
                class="booking-card-status"
                id="booking-modal-status"
              >
                –
              </span>

            </section>


            <section class="booking-details-section">

              <span class="booking-details-label">
                Notizen
              </span>

              <div
                class="booking-details-notes"
                id="booking-modal-notes"
              >
                Keine Notizen vorhanden.
              </div>

            </section>

          </div>

        </div>


        <div class="booking-details-actions">

          <button
            type="button"
            class="booking-modal-action booking-modal-confirm"
            id="booking-modal-confirm"
            data-action="confirm"
          >
            Buchung bestätigen
          </button>

          <button
            type="button"
            class="booking-modal-action booking-modal-cancel"
            id="booking-modal-cancel"
            data-action="cancel"
          >
            Buchung stornieren
          </button>

        </div>


        <p class="booking-modal-info">
          Die Buchung wurde über die Website eingereicht.
        </p>

      </div>

    </div>
  </div>
</html>


============================================================
DATEI: admin\pages\dashboard.html
============================================================

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Dashboard | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <!-- Gemeinsame Website-Styles -->
    <link rel="stylesheet" href="../../css/global.css" />

    <!-- Admin-Styles -->
    <link rel="stylesheet" href="../css/admin.css" />
    <link rel="stylesheet" href="../css/dashboard.css" />
  </head>

  <body>
    <div class="admin-layout" id="adminLayout">

      
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
              <h1>Dashboard</h1>
              <p>
                Willkommen im Admin-Bereich
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
        DASHBOARD
        ======================================== -->

        <section class="dashboard-content">

          <!-- BEGRÜSSUNG -->

          <div class="dashboard-header">

            <h2>Guten Tag!</h2>

            <p>
              Aktueller Überblick:
            </p>

          </div>


          <!-- KPI-KARTEN -->

          <div class="dashboard-stats">

            <article class="dashboard-stat">

              <div class="dashboard-stat-content">

                <span class="stat-label">
                  Termine heute
                </span>

                <strong id="today-bookings">
                  –
                </strong>

              </div>

              <a
                href="bookings.html"
                class="stat-action"
              >
                Termine ansehen
              </a>

            </article>


            <article class="dashboard-stat">

              <div class="dashboard-stat-content">

                <span class="stat-label">
                  Diese Woche
                </span>

                <strong id="week-bookings">
                  –
                </strong>

              </div>

              <a
                href="bookings.html"
                class="stat-action"
              >
                Termine ansehen
              </a>

            </article>


            <article class="dashboard-stat">

              <div class="dashboard-stat-content">

                <span class="stat-label">
                  Offene Buchungen
                </span>

                <strong id="pending-bookings">
                  –
                </strong>

              </div>

              <a
                href="bookings.html?status=pending"
                class="stat-action"
              >
                Buchungen
              </a>

            </article>

          </div>


          <!-- NÄCHSTER TERMIN -->

          <section class="dashboard-section next-booking-section">

            <div class="section-header">

              <div>
                <h2>Nächster Termin</h2>
              </div>

            </div>


            <div
              id="next-booking"
              class="next-booking"
            >

              <div class="empty-state">
                <p>
                  Termine werden geladen...
                </p>
              </div>

            </div>

          </section>


          <!-- HEUTIGE TERMINE -->

          <section class="dashboard-section">

            <div class="section-header">

              <div>
                <h2>Heute</h2>

                <p>
                  Die nächsten Termine des heutigen Tages.
                </p>
              </div>

              <a
                href="bookings.html"
                class="dashboard-link"
              >
                Alle Termine heute
              </a>

            </div>


            <div
              id="today-bookings-list"
              class="booking-list"
            >

              <div class="empty-state">
                <p>
                  Termine werden geladen...
                </p>
              </div>

            </div>

          </section>

        </section>

      </main>

    </div>


    <!-- ========================================
         JAVASCRIPT
         ======================================== -->

    <script type="module" src="../js/auth.js"></script>
    <script type="module" src="../js/admin-layout.js"></script>
    <script type="module" src="../js/dashboard.js"></script>

  </body>
</html>


============================================================
DATEI: admin\pages\services.html
============================================================

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>Beratungsangebote | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="../../css/global.css" />
    <link rel="stylesheet" href="../css/admin.css" />
    <link rel="stylesheet" href="../css/services.css" />
  </head>

  <body>
    <div class="admin-layout" id="adminLayout">

      
      <!-- MAIN -->

      <main class="admin-main">

        <!-- TOPBAR -->

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
              <h1>Beratungsangebote</h1>
              <p>Beratungsangebote verwalten</p>
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

        <!-- CONTENT -->

        <section class="services-content">

          <div class="services-header">

            <div>
              <h2>Beratungsangebote</h2>

              <p>
                Verwalte die Angebote, die auf der Website
                zur Buchung angeboten werden.
              </p>
            </div>

            <button
              type="button"
              class="services-add-button"
              id="add-service-button"
            >
              + Neues Angebot
            </button>

          </div>

          <!-- MESSAGE -->

          <div
            id="services-message"
            class="services-message"
            hidden
            role="status"
            aria-live="polite"
          ></div>

          <!-- LOADING -->

          <div
            id="services-loading"
            class="services-state"
          >
            <p>Beratungsangebote werden geladen...</p>
          </div>

          <!-- EMPTY -->

          <div
            id="services-empty"
            class="services-state"
            hidden
          >
            <p>Noch keine Beratungsangebote vorhanden.</p>

            <button
              type="button"
              class="services-empty-button"
              id="empty-add-service"
            >
              + Neues Angebot
            </button>
          </div>

          <!-- ERROR -->

          <div
            id="services-error"
            class="services-state services-state-error"
            hidden
          >
            <p>
              Die Beratungsangebote konnten nicht geladen werden.
            </p>

            <button
              type="button"
              class="services-empty-button"
              id="retry-services"
            >
              Erneut versuchen
            </button>
          </div>

          <!-- LIST -->

          <div
            id="services-list"
            class="services-list"
          ></div>

        </section>

      </main>
    </div>

    <!-- SERVICE MODAL -->

    <div
      class="service-modal"
      id="service-modal"
      hidden
    >

      <div
        class="service-modal-backdrop"
        data-modal-close
      ></div>

      <div
        class="service-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
      >

        <div class="service-modal-header">

          <div>
            <h2 id="service-modal-title">
              Neues Beratungsangebot
            </h2>

            <p>
              Bearbeite die Angaben des Beratungsangebots.
            </p>
          </div>

          <button
            type="button"
            class="service-modal-close"
            id="service-modal-close"
            aria-label="Modal schließen"
          >
            ×
          </button>

        </div>

        <form
          id="service-form"
          class="service-form"
        >

          <input
            type="hidden"
            id="service-edit-id"
          />

          <!-- TITEL -->

          <div class="service-field">
            <label for="service-title">
              Titel *
            </label>

            <input
              type="text"
              id="service-title"
              maxlength="150"
              required
            />
          </div>

          <!-- BESCHREIBUNG -->

          <div class="service-field">
            <label for="service-description">
              Beschreibung *
            </label>

            <textarea
              id="service-description"
              rows="5"
              maxlength="2000"
              required
            ></textarea>
          </div>

          <!-- DAUER -->

          <div class="service-field-row">

            <div class="service-field">
              <label for="service-duration">
                Dauer *
              </label>

              <div class="service-input-with-unit">
                <input
                  type="number"
                  id="service-duration"
                  min="1"
                  step="1"
                  required
                />

                <span>Minuten</span>
              </div>
            </div>

            <!-- PREIS -->

            <div class="service-field">
              <label for="service-price">
                Preis *
              </label>

              <div class="service-input-with-unit">
                <input
                  type="number"
                  id="service-price"
                  min="0"
                  step="0.01"
                  required
                />

                <span>€</span>
              </div>
            </div>

          </div>

          <!-- STATUS -->

          <div class="service-field">
            <label for="service-active">
              Status
            </label>

            <select id="service-active">
              <option value="true">Aktiv</option>
              <option value="false">Inaktiv</option>
            </select>
          </div>

          <!-- ERROR -->

          <p
            id="service-form-error"
            class="service-form-error"
            role="alert"
            aria-live="assertive"
            hidden
          ></p>

          <!-- ACTIONS -->

          <div class="service-modal-actions">

            <button
              type="button"
              class="service-secondary-button"
              id="service-cancel"
            >
              Abbrechen
            </button>

            <button
              type="submit"
              class="service-primary-button"
              id="service-save"
            >
              Änderungen speichern
            </button>

          </div>

        </form>

      </div>
    </div>

    <!-- JAVASCRIPT -->

    <script
      type="module"
      src="../js/auth.js"
    ></script>

    <script type="module" src="../js/admin-layout.js"></script>

    <script
      type="module"
      src="../js/services.js"
    ></script>

  </body>
</html>


============================================================
DATEI: admin\pages\settings.html
============================================================

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>Einstellungen | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="../../css/global.css" />
    <link rel="stylesheet" href="../css/admin.css" />
    <link rel="stylesheet" href="../css/settings.css" />
  </head>

  <body>
    <div class="admin-layout" id="adminLayout">

      
      <!-- MAIN -->

      <main class="admin-main">

        <!-- TOPBAR -->

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
              <h1>Einstellungen</h1>
              <p>Buchungssystem und allgemeine Informationen</p>
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

        <!-- CONTENT -->

        <section class="settings-content">

          <!-- MESSAGE -->

          <div
            id="settings-message"
            class="settings-message"
            hidden
            role="status"
            aria-live="polite"
          ></div>

          <!-- LOADING -->

          <div
            id="settings-loading"
            class="settings-state"
          >
            <p>Einstellungen werden geladen...</p>
          </div>

          <!-- FORM -->

          <form
            id="settings-form"
            class="settings-form"
            hidden
          >

            <!-- BUCHUNGSEINSTELLUNGEN -->

            <section class="settings-section">

              <div class="settings-section-header">
                <div>
                  <h2>Buchungseinstellungen</h2>
                  <p>
                    Regeln für mögliche Buchungstermine.
                  </p>
                </div>
              </div>

              <div class="settings-grid">

                <div class="settings-field">
                  <label for="booking-interval">
                    Zeitraster
                  </label>

                  <select id="booking-interval">
                    <option value="30">30 Minuten</option>
                    <option value="60">60 Minuten</option>
                  </select>

                  <p class="settings-help">
                    Bestimmt, in welchen Abständen mögliche
                    Startzeiten angeboten werden.
                  </p>
                </div>

                <div class="settings-field">
                  <label for="minimum-notice-hours">
                    Mindestvorlauf
                  </label>

                  <div class="settings-input-with-suffix">
                    <input
                      type="number"
                      id="minimum-notice-hours"
                      min="0"
                      step="1"
                      required
                    />
                    <span>Stunden</span>
                  </div>

                  <p class="settings-help">
                    Wie viel Zeit mindestens zwischen Buchung
                    und Termin liegen muss.
                  </p>
                </div>

                <div class="settings-field">
                  <label for="booking-advance-days">
                    Maximale Vorausbuchung
                  </label>

                  <div class="settings-input-with-suffix">
                    <input
                      type="number"
                      id="booking-advance-days"
                      min="1"
                      step="1"
                      required
                    />
                    <span>Tage</span>
                  </div>

                  <p class="settings-help">
                    Wie weit im Voraus Termine gebucht werden
                    können.
                  </p>
                </div>

              </div>

            </section>

            <!-- BENACHRICHTIGUNGEN -->

            <section class="settings-section">

              <div class="settings-section-header">
                <div>
                  <h2>Benachrichtigungen</h2>
                  <p>
                    Lege fest, welche E-Mail-Benachrichtigungen
                    später versendet werden sollen.
                  </p>
                </div>
              </div>

              <div class="settings-notification-groups">

                <div class="settings-notification-group">

                  <h3>E-Mails an Beratungsstelle</h3>

                  <label class="settings-toggle-row">
                    <span>
                      <strong>Neue Buchung</strong>
                      <small>
                        Benachrichtigung bei einer neuen Buchung
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      id="notify-provider-new-booking"
                    />
                  </label>

                  <label class="settings-toggle-row">
                    <span>
                      <strong>Stornierung</strong>
                      <small>
                        Benachrichtigung bei einer Stornierung
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      id="notify-provider-cancellation"
                    />
                  </label>

                  <label class="settings-toggle-row">
                    <span>
                      <strong>Terminänderung</strong>
                      <small>
                        Benachrichtigung bei einer Änderung
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      id="notify-provider-reschedule"
                    />
                  </label>

                </div>

                <div class="settings-notification-group">

                  <h3>E-Mails an Kunden</h3>

                  <label class="settings-toggle-row">
                    <span>
                      <strong>Buchungsbestätigung</strong>
                      <small>
                        Bestätigung nach erfolgreicher Buchung
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      id="notify-customer-confirmation"
                    />
                  </label>

                  <label class="settings-toggle-row">
                    <span>
                      <strong>Stornierungsbestätigung</strong>
                      <small>
                        Nachricht nach einer Stornierung
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      id="notify-customer-cancellation"
                    />
                  </label>

                  <label class="settings-toggle-row">
                    <span>
                      <strong>Terminänderung</strong>
                      <small>
                        Nachricht bei einer Terminänderung
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      id="notify-customer-reschedule"
                    />
                  </label>

                  <label class="settings-toggle-row">
                    <span>
                      <strong>Erinnerung vor Termin</strong>
                      <small>
                        Automatische Erinnerung vor dem Termin
                      </small>
                    </span>

                    <input
                      type="checkbox"
                      id="notify-customer-reminder"
                    />
                  </label>

                  <div class="settings-field settings-reminder-field">
                    <label for="reminder-hours">
                      Erinnerung
                    </label>

                    <div class="settings-input-with-suffix">
                      <input
                        type="number"
                        id="reminder-hours"
                        min="1"
                        step="1"
                        required
                      />
                      <span>Stunden vorher</span>
                    </div>
                  </div>

                </div>

              </div>

            </section>

            <!-- ALLGEMEINE INFORMATIONEN -->

            <section class="settings-section">

              <div class="settings-section-header">
                <div>
                  <h2>Allgemeine Informationen</h2>
                  <p>
                    Diese Informationen werden vom System
                    verwendet.
                  </p>
                </div>
              </div>

              <div class="settings-grid">

                <div class="settings-field">
                  <label for="organization-name">
                    Name der Beratungsstelle
                  </label>

                  <input
                    type="text"
                    id="organization-name"
                    maxlength="200"
                    required
                  />
                </div>

                <div class="settings-field">
                  <label for="contact-email">
                    Kontakt-E-Mail
                  </label>

                  <input
                    type="email"
                    id="contact-email"
                    maxlength="320"
                    placeholder="name@beispiel.de"
                  />
                </div>

                <div class="settings-field">
                  <label for="timezone">
                    Zeitzone
                  </label>

                  <input
                    type="text"
                    id="timezone"
                    value="Europe/Berlin"
                    required
                  />

                  <p class="settings-help">
                    Die Zeitzone muss eindeutig sein.
                  </p>
                </div>

              </div>

            </section>

            <!-- SPEICHERN -->

            <div class="settings-actions">

              <button
                type="submit"
                class="settings-save-button"
                id="settings-save"
              >
                Änderungen speichern
              </button>

            </div>

          </form>

          <!-- ADMIN-KONTO -->

          <section
            class="settings-section settings-account-section"
            id="admin-account-section"
            hidden
          >

            <div class="settings-section-header">
              <div>
                <h2>Admin-Konto</h2>
                <p>
                  Verwalte dein angemeldetes Supabase-Konto.
                </p>
              </div>
            </div>

            <div class="settings-account">

              <div class="settings-account-info">
                <span class="settings-account-label">
                  Angemeldet als
                </span>

                <strong id="admin-email">
                  –
                </strong>
              </div>

              <div class="settings-account-password">

                <label for="new-password">
                  Neues Passwort
                </label>

                <div class="settings-password-row">

                  <input
                    type="password"
                    id="new-password"
                    minlength="8"
                    placeholder="Mindestens 8 Zeichen"
                    autocomplete="new-password"
                  />

                  <button
                    type="button"
                    class="settings-secondary-button"
                    id="change-password"
                  >
                    Passwort ändern
                  </button>

                </div>

                <p
                  id="password-message"
                  class="settings-help"
                  hidden
                ></p>

              </div>

            </div>

          </section>

        </section>

      </main>
    </div>

    <script
      type="module"
      src="../js/auth.js"
    ></script>

    <script type="module" src="../js/admin-layout.js"></script>

    <script
      type="module"
      src="../js/settings.js"
    ></script>
  </body>
</html>

