
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

    <script
      src="../js/admin-layout.js"
    ></script>

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

      <!-- SIDEBAR -->

      <aside class="admin-sidebar" id="adminSidebar">

        <div class="sidebar-header">

          <a
            href="dashboard.html"
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
            href="dashboard.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">⌂</span>
            <span class="sidebar-link-text">Dashboard</span>
          </a>

          <a
            href="bookings.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">▣</span>
            <span class="sidebar-link-text">Termine</span>
          </a>

          <a
            href="availability.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">◷</span>
            <span class="sidebar-link-text">Verfügbarkeit</span>
          </a>

          <a
            href="blocked-times.html"
            class="sidebar-link active"
          >
            <span class="sidebar-icon">⊘</span>
            <span class="sidebar-link-text">Sperrzeiten</span>
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
            <span class="sidebar-link-text">Einstellungen</span>
          </a>

        </nav>


        <div class="sidebar-bottom">

          <a
            href="/"
            class="sidebar-link sidebar-public-link"
          >
            <span class="sidebar-icon">↗</span>
            <span class="sidebar-link-text">Zur Website</span>
          </a>

          <button
            type="button"
            class="sidebar-link sidebar-logout"
            id="logoutButton"
          >
            <span class="sidebar-icon">↪</span>
            <span class="sidebar-link-text">Abmelden</span>
          </button>

        </div>

      </aside>


      <!-- MOBILE OVERLAY -->

      <div
        class="sidebar-overlay"
        id="sidebarOverlay"
      ></div>


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
                />

              </div>


              <div class="blocked-time-field">

                <label for="blocked-time-end">
                  Bis
                </label>

                <input
                  type="time"
                  id="blocked-time-end"
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

    <script src="../js/admin-layout.js"></script>

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

      <!-- SIDEBAR -->

      <aside class="admin-sidebar" id="adminSidebar">

        <div class="sidebar-header">
          <a href="dashboard.html" class="sidebar-logo">
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

        <nav class="sidebar-navigation" aria-label="Admin-Navigation">

          <a href="dashboard.html" class="sidebar-link">
            <span class="sidebar-icon">⌂</span>
            <span class="sidebar-link-text">Dashboard</span>
          </a>

          <a href="bookings.html" class="sidebar-link active">
            <span class="sidebar-icon">▣</span>
            <span class="sidebar-link-text">Termine</span>
          </a>

          <a href="availability.html" class="sidebar-link">
            <span class="sidebar-icon">◷</span>
            <span class="sidebar-link-text">Verfügbarkeit</span>
          </a>

          <a href="services.html" class="sidebar-link">
            <span class="sidebar-icon">◇</span>
            <span class="sidebar-link-text">Beratungsangebote</span>
          </a>

          <a href="settings.html" class="sidebar-link">
            <span class="sidebar-icon">⚙</span>
            <span class="sidebar-link-text">Einstellungen</span>
          </a>

        </nav>

        <div class="sidebar-bottom">

          <a href="/" class="sidebar-link sidebar-public-link">
            <span class="sidebar-icon">↗</span>
            <span class="sidebar-link-text">Zur Website</span>
          </a>

          <button
            type="button"
            class="sidebar-link sidebar-logout"
            id="logoutButton"
          >
            <span class="sidebar-icon">↪</span>
            <span class="sidebar-link-text">Abmelden</span>
          </button>

        </div>

      </aside>


      <!-- MOBILE OVERLAY -->

      <div
        class="sidebar-overlay"
        id="sidebarOverlay"
      ></div>


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
    <script src="../js/admin-layout.js"></script>
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
           SIDEBAR
           ======================================== -->

      <aside class="admin-sidebar" id="adminSidebar">

        <div class="sidebar-header">

          <a href="dashboard.html" class="sidebar-logo">
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
            class="sidebar-link active"
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
            class="sidebar-link"
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
           MOBILE OVERLAY
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
    <script src="../js/admin-layout.js"></script>
    <script type="module" src="../js/dashboard.js"></script>

  </body>
</html>


============================================================
DATEI: admin\pages\services.html
============================================================




============================================================
DATEI: admin\pages\settings.html
============================================================



