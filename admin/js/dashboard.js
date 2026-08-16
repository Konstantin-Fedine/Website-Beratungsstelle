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