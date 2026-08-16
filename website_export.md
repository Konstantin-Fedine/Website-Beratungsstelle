
============================================================
DATEI: admin\css\dashboard.css
============================================================

/* ========================================
   DASHBOARD CONTENT
   ======================================== */

.dashboard-content {
  width: 100%;
  max-width: 1400px;

  margin: 0 auto;

  padding: 35px 40px;
}


/* ========================================
   STATISTICS
   ======================================== */

.dashboard-stats {
  display: grid;

  grid-template-columns:
    repeat(4, minmax(0, 1fr));

  gap: 20px;

  margin-bottom: 30px;
}

.dashboard-stat {
  padding: 24px;

  background: var(--color-surface);

  border: 1px solid var(--color-border);

  border-radius: var(--radius);

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.05);

  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.dashboard-stat:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08);
}

.stat-label {
  display: block;

  color: var(--color-text-muted);

  font-size: 0.9rem;
}

.dashboard-stat strong {
  display: block;

  margin-top: 8px;

  color: var(--color-dark);

  font-size: 1.8rem;
}


/* ========================================
   SECTIONS
   ======================================== */

.dashboard-section {
  margin-bottom: 30px;

  padding: 28px;

  background: var(--color-surface);

  border: 1px solid var(--color-border);

  border-radius: var(--radius);

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.05);
}


/* ========================================
   SECTION HEADER
   ======================================== */

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 20px;

  margin-bottom: 22px;
}

.section-header h2 {
  color: var(--color-dark);

  font-size: 1.25rem;
  font-weight: 700;
}

.section-header p {
  margin-top: 4px;

  color: var(--color-text-muted);

  font-size: 0.9rem;
}


/* ========================================
   LINKS
   ======================================== */

.dashboard-link {
  color: var(--color-dark);

  font-weight: 700;

  text-decoration: none;

  transition:
    color var(--transition);
}

.dashboard-link:hover {
  color: var(--color-primary);
}


/* ========================================
   EMPTY STATE
   ======================================== */

.empty-state {
  padding: 30px;

  text-align: center;

  color: var(--color-text-muted);

  background: var(--color-primary-soft);

  border-radius: var(--radius);
}


/* ========================================
   QUICK ACTIONS
   ======================================== */

.quick-actions {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 16px;
}

.quick-action {
  display: block;

  padding: 20px;

  border: 1px solid var(--color-border);

  border-radius: var(--radius);

  background: var(--color-surface);

  color: var(--color-text);

  text-decoration: none;

  transition:
    transform var(--transition),
    border-color var(--transition),
    box-shadow var(--transition);
}

.quick-action:hover {
  transform: translateY(-2px);

  border-color: var(--color-primary);

  box-shadow:
    0 6px 16px rgba(0, 0, 0, 0.08);
}

.quick-action strong {
  display: block;

  margin-bottom: 6px;

  color: var(--color-dark);
}

.quick-action span {
  color: var(--color-text-muted);

  font-size: 0.9rem;
}


/* ========================================
   BOOKING LIST
   ======================================== */

.booking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.booking-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 16px 18px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  background: var(--color-surface);

  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.booking-item:hover {
  transform: translateY(-1px);

  box-shadow:
    0 5px 14px rgba(0, 0, 0, 0.06);
}

.booking-item-main {
  min-width: 0;
}

.booking-item-name {
  color: var(--color-dark);

  font-weight: 700;
}

.booking-item-service {
  margin-top: 3px;

  color: var(--color-text-muted);

  font-size: 0.9rem;
}

.booking-item-meta {
  display: flex;
  flex-direction: column;

  align-items: flex-end;

  flex-shrink: 0;

  color: var(--color-text-muted);

  font-size: 0.85rem;
}

.booking-status {
  display: inline-flex;
  align-items: center;

  padding: 5px 10px;

  margin-top: 5px;

  border-radius: 999px;

  font-size: 0.75rem;
  font-weight: 700;
}

.booking-status.pending {
  background: rgba(212, 178, 149, 0.2);
  color: var(--color-dark);
}

.booking-status.confirmed {
  background: rgba(70, 130, 90, 0.12);
  color: #356b47;
}

.booking-status.cancelled {
  background: rgba(180, 70, 70, 0.12);
  color: #8a3535;
}


/* ========================================
   RESPONSIVE
   ======================================== */

@media (max-width: 1000px) {

  .dashboard-stats {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .quick-actions {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }
}


@media (max-width: 700px) {

  .dashboard-content {
    padding: 25px 20px;
  }

  .dashboard-stats {
    grid-template-columns: 1fr;
  }

  .quick-actions {
    grid-template-columns: 1fr;
  }

  .dashboard-section {
    padding: 20px;
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .booking-item {
    align-items: flex-start;
    flex-direction: column;
  }

  .booking-item-meta {
    align-items: flex-start;
  }
}


============================================================
DATEI: admin\js\dashboard.js
============================================================

import { supabase } from "../../js/supabase.js";

/* ========================================
   ELEMENTE
   ======================================== */

const todayBookingsElement = document.getElementById("today-bookings");
const pendingBookingsElement =
  document.getElementById("pending-bookings");
const totalServicesElement =
  document.getElementById("total-services");
const nextBookingElement =
  document.getElementById("next-booking");
const upcomingBookingsElement =
  document.getElementById("upcoming-bookings");


/* ========================================
   DATUM / ZEIT
   ======================================== */

function getToday() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}


function formatTime(timeString) {
  return timeString.slice(0, 5);
}


/* ========================================
   BUCHUNGEN LADEN
   ======================================== */

async function loadBookings() {
  const today = getToday();

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      id,
      customer_name,
      customer_email,
      booking_date,
      booking_time,
      status,
      services (
        title,
        duration
      )
    `)
    .in("status", ["pending", "confirmed"])
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  if (error) {
    console.error("Buchungen konnten nicht geladen werden:", error);
    throw error;
  }

  const bookings = data ?? [];


  /* ========================================
     HEUTIGE TERMINE
     ======================================== */

  const todayBookings = bookings.filter(
    (booking) => booking.booking_date === today
  );

  if (todayBookingsElement) {
    todayBookingsElement.textContent = todayBookings.length;
  }


  /* ========================================
     OFFENE BUCHUNGEN
     ======================================== */

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  );

  if (pendingBookingsElement) {
    pendingBookingsElement.textContent = pendingBookings.length;
  }


  /* ========================================
     NÄCHSTER TERMIN
     ======================================== */

  if (nextBookingElement) {
    const nextBooking = bookings.find(
      (booking) => booking.booking_date >= today
    );

    if (!nextBooking) {
      nextBookingElement.textContent = "–";
    } else {
      nextBookingElement.textContent =
        `${formatDate(nextBooking.booking_date)}, ${formatTime(
          nextBooking.booking_time
        )}`;
    }
  }


  /* ========================================
     NÄCHSTE TERMINE
     ======================================== */

  renderUpcomingBookings(bookings.slice(0, 5));
}


/* ========================================
   NÄCHSTE TERMINE DARSTELLEN
   ======================================== */

function renderUpcomingBookings(bookings) {
  if (!upcomingBookingsElement) return;

  if (bookings.length === 0) {
    upcomingBookingsElement.innerHTML = `
      <div class="empty-state">
        <p>Keine kommenden Termine vorhanden.</p>
      </div>
    `;

    return;
  }

  upcomingBookingsElement.innerHTML = bookings
    .map((booking) => {
      const serviceTitle =
        booking.services?.title ?? "Beratung";

      const statusLabel =
        booking.status === "pending"
          ? "Offen"
          : "Bestätigt";

      return `
        <article class="booking-item">

          <div class="booking-item-date">
            <strong>
              ${formatDate(booking.booking_date)}
            </strong>

            <span>
              ${formatTime(booking.booking_time)}
            </span>
          </div>

          <div class="booking-item-info">

            <strong>
              ${escapeHtml(booking.customer_name)}
            </strong>

            <span>
              ${escapeHtml(serviceTitle)}
            </span>

          </div>

          <span class="booking-status booking-status-${booking.status}">
            ${statusLabel}
          </span>

        </article>
      `;
    })
    .join("");
}


/* ========================================
   BERATUNGSANGEBOTE LADEN
   ======================================== */

async function loadServices() {
  const { count, error } = await supabase
    .from("services")
    .select("id", {
      count: "exact",
      head: true,
    })
    .eq("active", true);

  if (error) {
    console.error(
      "Beratungsangebote konnten nicht geladen werden:",
      error
    );

    throw error;
  }

  if (totalServicesElement) {
    totalServicesElement.textContent = count ?? 0;
  }
}


/* ========================================
   HTML SICHER EINFÜGEN
   ======================================== */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


/* ========================================
   DASHBOARD LADEN
   ======================================== */

async function loadDashboard() {
  try {
    await Promise.all([
      loadBookings(),
      loadServices(),
    ]);
  } catch (error) {
    console.error(
      "Dashboard konnte nicht vollständig geladen werden:",
      error
    );

    if (upcomingBookingsElement) {
      upcomingBookingsElement.innerHTML = `
        <div class="empty-state">
          <p>
            Die Dashboard-Daten konnten nicht geladen werden.
          </p>
        </div>
      `;
    }
  }
}


/* ========================================
   START
   ======================================== */

loadDashboard();


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

          <div class="dashboard-stats">

            <article class="dashboard-stat">
              <span class="stat-label">
                Heutige Termine
              </span>

              <strong id="today-bookings">
                –
              </strong>
            </article>


            <article class="dashboard-stat">
              <span class="stat-label">
                Offene Buchungen
              </span>

              <strong id="pending-bookings">
                –
              </strong>
            </article>


            <article class="dashboard-stat">
              <span class="stat-label">
                Beratungsangebote
              </span>

              <strong id="total-services">
                –
              </strong>
            </article>


            <article class="dashboard-stat">
              <span class="stat-label">
                Nächster Termin
              </span>

              <strong id="next-booking">
                –
              </strong>
            </article>

          </div>


          <!-- NÄCHSTE TERMINE -->

          <section class="dashboard-section">

            <div class="section-header">

              <div>
                <h2>Nächste Termine</h2>

                <p>
                  Die nächsten gebuchten Beratungen.
                </p>
              </div>

              <a
                href="bookings.html"
                class="dashboard-link"
              >
                Alle Buchungen
              </a>

            </div>


            <div
              id="upcoming-bookings"
              class="booking-list"
            >

              <div class="empty-state">
                <p>
                  Termine werden geladen...
                </p>
              </div>

            </div>

          </section>


          <!-- SCHNELLZUGRIFF -->

          <section class="dashboard-section">

            <div class="section-header">

              <div>
                <h2>Schnellzugriff</h2>

                <p>
                  Häufig benötigte Bereiche.
                </p>
              </div>

            </div>


            <div class="quick-actions">

              <a
                href="bookings.html"
                class="quick-action"
              >
                <strong>
                  Buchungen verwalten
                </strong>

                <span>
                  Termine ansehen und bearbeiten
                </span>
              </a>


              <a
                href="availability.html"
                class="quick-action"
              >
                <strong>
                  Verfügbarkeit bearbeiten
                </strong>

                <span>
                  Arbeitszeiten und Ausnahmen verwalten
                </span>
              </a>


              <a
                href="services.html"
                class="quick-action"
              >
                <strong>
                  Beratungsangebote
                </strong>

                <span>
                  Preise, Dauer und Angebote verwalten
                </span>
              </a>

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

