
============================================================
DATEI: admin\css\bookings.css
============================================================

/* ========================================
   BUCHUNGEN – GRUNDLAGEN
   ======================================== */

.bookings-content {
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
}


/* ========================================
   HEADER
   ======================================== */

.bookings-header {
  margin-bottom: 28px;
}

.bookings-header h2 {
  margin: 0;

  color: var(--color-dark);

  font-size: 1.7rem;
  font-weight: 700;
}

.bookings-header p {
  margin: 6px 0 0;

  color: var(--color-text-muted);

  font-size: 0.95rem;
}


/* ========================================
   TOOLBAR
   ======================================== */

.bookings-toolbar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 24px;
  padding: 20px;

  background: var(--admin-surface);

  border: 1px solid var(--admin-border);
  border-radius: var(--radius);

  box-shadow: var(--admin-shadow);
}

.booking-filter {
  display: flex;
  flex-direction: column;

  gap: 7px;
}

.booking-filter label {
  color: var(--color-dark);

  font-size: 0.85rem;
  font-weight: 700;
}

.booking-filter select {
  min-width: 190px;

  padding: 10px 14px;

  border: 1px solid var(--admin-border);
  border-radius: var(--radius);

  background: var(--color-surface);

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.9rem;

  outline: none;

  cursor: pointer;

  transition:
    border-color var(--transition),
    box-shadow var(--transition);
}

.booking-filter select:focus {
  border-color: var(--color-primary);

  box-shadow:
    0 0 0 3px rgba(212, 178, 149, 0.15);
}


/* ========================================
   AKTUALISIEREN
   ======================================== */

.bookings-refresh {
  padding: 11px 18px;

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
    background var(--transition);
}

.bookings-refresh:hover {
  transform: translateY(-1px);

  box-shadow:
    0 5px 12px rgba(212, 178, 149, 0.25);
}

.bookings-refresh:active {
  transform: translateY(0);
}

.bookings-refresh:disabled {
  opacity: 0.6;

  cursor: not-allowed;

  transform: none;
}


/* ========================================
   BUCHUNGEN-LISTE
   ======================================== */

.bookings-list {
  display: flex;
  flex-direction: column;

  gap: 14px;
}


/* ========================================
   BUCHUNG
   ======================================== */

.booking-card {
  display: grid;

  grid-template-columns:
    minmax(170px, 0.8fr)
    minmax(200px, 1fr)
    minmax(160px, 0.8fr)
    auto;

  align-items: center;

  gap: 24px;

  padding: 22px 24px;

  background: var(--admin-surface);

  border: 1px solid var(--admin-border);
  border-radius: var(--radius);

  box-shadow:
    0 4px 14px rgba(42, 36, 33, 0.04);

  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.booking-card:hover {
  transform: translateY(-1px);

  box-shadow:
    0 7px 20px rgba(42, 36, 33, 0.07);
}


/* ========================================
   DATUM / ZEIT
   ======================================== */

.booking-date {
  display: flex;
  flex-direction: column;

  gap: 4px;
}

.booking-date strong {
  color: var(--color-dark);

  font-size: 0.95rem;
  font-weight: 700;
}

.booking-date span {
  color: var(--color-text-muted);

  font-size: 0.85rem;
}


/* ========================================
   KUNDE
   ======================================== */

.booking-customer {
  display: flex;
  flex-direction: column;

  gap: 4px;

  min-width: 0;
}

.booking-customer strong {
  overflow: hidden;

  color: var(--color-dark);

  font-size: 0.95rem;
  font-weight: 700;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.booking-customer span {
  overflow: hidden;

  color: var(--color-text-muted);

  font-size: 0.82rem;

  text-overflow: ellipsis;
  white-space: nowrap;
}


/* ========================================
   BERATUNG
   ======================================== */

.booking-service {
  display: flex;
  flex-direction: column;

  gap: 4px;

  min-width: 0;
}

.booking-service strong {
  overflow: hidden;

  color: var(--color-dark);

  font-size: 0.9rem;
  font-weight: 600;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.booking-service span {
  color: var(--color-text-muted);

  font-size: 0.8rem;
}


/* ========================================
   STATUS
   ======================================== */

.booking-status {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;

  padding: 6px 10px;

  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 700;

  white-space: nowrap;
}

.booking-status-pending {
  background: rgba(212, 178, 149, 0.18);

  color: var(--color-dark);
}

.booking-status-confirmed {
  background: rgba(80, 140, 100, 0.12);

  color: #3d704d;
}

.booking-status-completed {
  background: rgba(80, 110, 150, 0.12);

  color: #3d5e82;
}

.booking-status-cancelled {
  background: rgba(180, 80, 80, 0.12);

  color: #8a3d3d;
}

.booking-status-no_show {
  background: rgba(100, 100, 100, 0.12);

  color: #555;
}


/* ========================================
   AKTIONEN
   ======================================== */

.booking-actions {
  display: flex;
  align-items: center;

  justify-content: flex-end;

  gap: 8px;
}

.booking-action {
  padding: 8px 12px;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  background: transparent;

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    background var(--transition),
    border-color var(--transition),
    transform var(--transition);
}

.booking-action:hover {
  background: rgba(42, 36, 33, 0.04);

  transform: translateY(-1px);
}

.booking-action-confirm {
  border-color: rgba(80, 140, 100, 0.25);

  color: #3d704d;
}

.booking-action-confirm:hover {
  background: rgba(80, 140, 100, 0.08);
}

.booking-action-cancel {
  border-color: rgba(180, 80, 80, 0.25);

  color: #8a3d3d;
}

.booking-action-cancel:hover {
  background: rgba(180, 80, 80, 0.08);
}


/* ========================================
   LEERER ZUSTAND
   ======================================== */

.bookings-list .empty-state {
  padding: 50px 20px;

  background: var(--admin-surface);

  border: 1px solid var(--admin-border);
  border-radius: var(--radius);

  text-align: center;

  color: var(--color-text-muted);
}

.bookings-list .empty-state p {
  margin: 0;
}


/* ========================================
   FEHLER
   ======================================== */

.bookings-error {
  padding: 18px 20px;

  background: rgba(180, 80, 80, 0.08);

  border: 1px solid rgba(180, 80, 80, 0.2);
  border-radius: var(--radius);

  color: #8a3d3d;

  font-size: 0.9rem;
}


/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 1050px) {
  .booking-card {
    grid-template-columns:
      1fr
      1fr;

    align-items: start;
  }

  .booking-actions {
    justify-content: flex-start;
  }
}


@media (max-width: 800px) {
  .bookings-content {
    padding: 24px 18px;
  }

  .bookings-toolbar {
    align-items: stretch;

    flex-direction: column;
  }

  .booking-filter select {
    width: 100%;
  }

  .bookings-refresh {
    width: 100%;
  }

  .booking-card {
    grid-template-columns: 1fr;

    gap: 16px;

    padding: 18px;
  }

  .booking-actions {
    flex-wrap: wrap;
  }
}


============================================================
DATEI: admin\js\bookings.js
============================================================

import { supabase } from "../../js/supabase.js";

/* ========================================
   ELEMENTE
   ======================================== */

const bookingsList = document.getElementById("bookings-list");
const bookingCount = document.getElementById("booking-count");
const statusFilter = document.getElementById("status-filter");


/* ========================================
   HILFSFUNKTIONEN
   ======================================== */

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function formatDate(dateString) {
  if (!dateString) return "–";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}


function formatTime(timeString) {
  if (!timeString) return "–";

  return timeString.slice(0, 5);
}


function getStatusLabel(status) {
  const labels = {
    pending: "Offen",
    confirmed: "Bestätigt",
    cancelled: "Storniert",
    completed: "Abgeschlossen",
    no_show: "Nicht erschienen",
  };

  return labels[status] ?? status;
}


/* ========================================
   BUCHUNGEN LADEN
   ======================================== */

async function loadBookings() {
  if (!bookingsList) return;

  bookingsList.innerHTML = `
    <div class="empty-state">
      <p>Buchungen werden geladen...</p>
    </div>
  `;

  let query = supabase
    .from("bookings")
    .select(`
      id,
      created_at,
      service_id,
      customer_name,
      customer_email,
      customer_phone,
      booking_date,
      booking_time,
      notes,
      status,
      services (
        title,
        duration,
        price
      )
    `)
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  const selectedStatus = statusFilter?.value;

  if (selectedStatus && selectedStatus !== "all") {
    query = query.eq("status", selectedStatus);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Buchungen konnten nicht geladen werden:", error);

    bookingsList.innerHTML = `
      <div class="empty-state">
        <p>Buchungen konnten nicht geladen werden.</p>
      </div>
    `;

    if (bookingCount) {
      bookingCount.textContent = "–";
    }

    return;
  }

  renderBookings(data ?? []);
}


/* ========================================
   BUCHUNGEN DARSTELLEN
   ======================================== */

function renderBookings(bookings) {
  if (bookingCount) {
    bookingCount.textContent = bookings.length;
  }

  if (!bookings.length) {
    bookingsList.innerHTML = `
      <div class="empty-state">
        <p>Keine Buchungen gefunden.</p>
      </div>
    `;

    return;
  }

  bookingsList.innerHTML = bookings
    .map((booking) => {
      const service = booking.services;

      return `
        <article class="booking-card" data-booking-id="${booking.id}">

          <div class="booking-card-main">

            <div class="booking-card-date">
              <strong>
                ${formatDate(booking.booking_date)}
              </strong>

              <span>
                ${formatTime(booking.booking_time)} Uhr
              </span>
            </div>

            <div class="booking-card-customer">

              <strong>
                ${escapeHtml(booking.customer_name)}
              </strong>

              <span>
                ${escapeHtml(booking.customer_email)}
              </span>

              ${
                booking.customer_phone
                  ? `<span>${escapeHtml(booking.customer_phone)}</span>`
                  : ""
              }

            </div>

            <div class="booking-card-service">

              <strong>
                ${escapeHtml(service?.title ?? "Beratung")}
              </strong>

              <span>
                ${service?.duration ?? "–"} Minuten
              </span>

            </div>

            <div class="booking-card-status status-${escapeHtml(
              booking.status
            )}">
              ${getStatusLabel(booking.status)}
            </div>

          </div>

          <div class="booking-card-actions">

            ${
              booking.status === "pending"
                ? `
                  <button
                    type="button"
                    class="booking-action booking-confirm"
                    data-action="confirm"
                    data-id="${booking.id}"
                  >
                    Bestätigen
                  </button>

                  <button
                    type="button"
                    class="booking-action booking-cancel"
                    data-action="cancel"
                    data-id="${booking.id}"
                  >
                    Stornieren
                  </button>
                `
                : ""
            }

            ${
              booking.status === "confirmed"
                ? `
                  <button
                    type="button"
                    class="booking-action booking-complete"
                    data-action="complete"
                    data-id="${booking.id}"
                  >
                    Abschließen
                  </button>

                  <button
                    type="button"
                    class="booking-action booking-cancel"
                    data-action="cancel"
                    data-id="${booking.id}"
                  >
                    Stornieren
                  </button>
                `
                : ""
            }

          </div>

        </article>
      `;
    })
    .join("");
}


/* ========================================
   STATUS ÄNDERN
   ======================================== */

async function updateBookingStatus(bookingId, newStatus) {
  const { error } = await supabase
    .from("bookings")
    .update({
      status: newStatus,
    })
    .eq("id", bookingId);

  if (error) {
    console.error(
      "Buchungsstatus konnte nicht geändert werden:",
      error
    );

    alert("Der Status konnte nicht geändert werden.");
    return false;
  }

  return true;
}


/* ========================================
   AKTIONEN
   ======================================== */

bookingsList?.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) return;

  const bookingId = button.dataset.id;
  const action = button.dataset.action;

  if (!bookingId || !action) return;

  let newStatus;
  let confirmationMessage;

  switch (action) {
    case "confirm":
      newStatus = "confirmed";
      confirmationMessage = "Buchung wirklich bestätigen?";
      break;

    case "cancel":
      newStatus = "cancelled";
      confirmationMessage = "Buchung wirklich stornieren?";
      break;

    case "complete":
      newStatus = "completed";
      confirmationMessage = "Buchung als abgeschlossen markieren?";
      break;

    default:
      return;
  }

  if (!confirm(confirmationMessage)) {
    return;
  }

  button.disabled = true;

  const success = await updateBookingStatus(
    bookingId,
    newStatus
  );

  if (success) {
    await loadBookings();
  } else {
    button.disabled = false;
  }
});


/* ========================================
   FILTER
   ======================================== */

statusFilter?.addEventListener("change", () => {
  loadBookings();
});


/* ========================================
   START
   ======================================== */

loadBookings();


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
</html>

