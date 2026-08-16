import { supabase } from "../../js/supabase.js";


/* ========================================
   ELEMENTE
   ======================================== */

const todayBookingsElement =
  document.getElementById("today-bookings");

const weekBookingsElement =
  document.getElementById("week-bookings");

const pendingBookingsElement =
  document.getElementById("pending-bookings");

const nextBookingElement =
  document.getElementById("next-booking");

const todayBookingsListElement =
  document.getElementById("today-bookings-list");


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


function getCurrentTime() {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
}


function getWeekStart() {
  const now = new Date();

  const day = now.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  const monday = new Date(now);

  monday.setDate(now.getDate() + difference);

  monday.setHours(0, 0, 0, 0);

  return formatDateForDatabase(monday);
}


function getWeekEnd() {
  const now = new Date();

  const day = now.getDay();

  const difference = day === 0 ? 0 : 7 - day;

  const sunday = new Date(now);

  sunday.setDate(now.getDate() + difference);

  sunday.setHours(0, 0, 0, 0);

  return formatDateForDatabase(sunday);
}


function formatDateForDatabase(date) {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function formatDate(dateString) {
  const date = new Date(
    `${dateString}T00:00:00`
  );

  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}


function formatTime(timeString) {
  return String(timeString).slice(0, 5);
}


/* ========================================
   BUCHUNGEN LADEN
   ======================================== */

async function loadBookings() {

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
    .in("status", [
      "pending",
      "confirmed"
    ])
    .order("booking_date", {
      ascending: true
    })
    .order("booking_time", {
      ascending: true
    });


  if (error) {
    console.error(
      "Buchungen konnten nicht geladen werden:",
      error
    );

    throw error;
  }


  const bookings = data ?? [];

  const today = getToday();

  const currentTime = getCurrentTime();

  const weekStart = getWeekStart();

  const weekEnd = getWeekEnd();


  /* ========================================
     HEUTE
     ======================================== */

  const todayBookings = bookings.filter(
    (booking) =>
      booking.booking_date === today
  );


  if (todayBookingsElement) {

    todayBookingsElement.textContent =
      todayBookings.length;

  }


  /* ========================================
     DIESE WOCHE
     ======================================== */

  const weekBookings = bookings.filter(
    (booking) =>
      booking.booking_date >= weekStart &&
      booking.booking_date <= weekEnd
  );


  if (weekBookingsElement) {

    weekBookingsElement.textContent =
      weekBookings.length;

  }


  /* ========================================
     OFFENE BUCHUNGEN
     ======================================== */

  const pendingBookings = bookings.filter(
    (booking) =>
      booking.status === "pending"
  );


  if (pendingBookingsElement) {

    pendingBookingsElement.textContent =
      pendingBookings.length;

  }


  /* ========================================
     NÄCHSTER TERMIN
     ======================================== */

  const nextBooking = bookings.find(
    (booking) => {

      if (booking.booking_date > today) {
        return true;
      }

      if (booking.booking_date === today) {

        return (
          formatTime(booking.booking_time) >=
          currentTime
        );

      }

      return false;
    }
  );


  renderNextBooking(nextBooking);


  /* ========================================
     HEUTIGE TERMINE
     ======================================== */

  renderTodayBookings(
    todayBookings.slice(0, 5)
  );
}


/* ========================================
   NÄCHSTER TERMIN DARSTELLEN
   ======================================== */

function renderNextBooking(booking) {

  if (!nextBookingElement) return;


  if (!booking) {

    nextBookingElement.innerHTML = `
      <div class="empty-state">
        <p>
          Heute stehen keine weiteren Termine an.
        </p>
      </div>
    `;

    return;
  }


  const serviceTitle =
    booking.services?.title ??
    "Beratung";


  const duration =
    booking.services?.duration ??
    60;


  nextBookingElement.innerHTML = `

    <div class="next-booking-card">

      <div class="next-booking-date">

        <strong>
          ${formatDate(booking.booking_date)}
          · ${formatTime(booking.booking_time)} Uhr
        </strong>

        <span>
          ${escapeHtml(serviceTitle)}
          · ${duration} Minuten
        </span>

      </div>


      <div class="next-booking-info">

        <strong>
          ${escapeHtml(
            booking.customer_name
          )}
        </strong>

        <span>
          ${escapeHtml(
            booking.customer_email
          )}
        </span>

      </div>


      <a
        href="bookings.html"
        class="next-booking-button"
      >
        Termin öffnen
      </a>

    </div>

  `;
}


/* ========================================
   HEUTIGE TERMINE DARSTELLEN
   ======================================== */

function renderTodayBookings(bookings) {

  if (!todayBookingsListElement) {
    return;
  }


  if (bookings.length === 0) {

    todayBookingsListElement.innerHTML = `
      <div class="empty-state">
        <p>
          Heute stehen keine Termine an.
        </p>
      </div>
    `;

    return;
  }


  todayBookingsListElement.innerHTML =
    bookings
      .map((booking) => {

        const serviceTitle =
          booking.services?.title ??
          "Beratung";


        const statusLabel =
          booking.status === "pending"
            ? "Ausstehend"
            : "Bestätigt";


        return `

          <article class="booking-item">

            <span class="booking-item-time">
              ${formatTime(
                booking.booking_time
              )}
            </span>


            <strong class="booking-item-name">
              ${escapeHtml(
                booking.customer_name
              )}
            </strong>


            <span class="booking-item-service">
              ${escapeHtml(
                serviceTitle
              )}
            </span>


            <span
              class="
                booking-status
                booking-status-${booking.status}
              "
            >
              ${statusLabel}
            </span>

          </article>

        `;

      })
      .join("");
}


/* ========================================
   HTML SICHER EINFÜGEN
   ======================================== */

function escapeHtml(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );
}


/* ========================================
   DASHBOARD LADEN
   ======================================== */

async function loadDashboard() {

  try {

    await loadBookings();

  } catch (error) {

    console.error(
      "Dashboard konnte nicht geladen werden:",
      error
    );


    if (todayBookingsListElement) {

      todayBookingsListElement.innerHTML = `
        <div class="empty-state">
          <p>
            Die Dashboard-Daten konnten
            nicht geladen werden.
          </p>
        </div>
      `;

    }


    if (nextBookingElement) {

      nextBookingElement.innerHTML = `
        <div class="empty-state">
          <p>
            Die Dashboard-Daten konnten
            nicht geladen werden.
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