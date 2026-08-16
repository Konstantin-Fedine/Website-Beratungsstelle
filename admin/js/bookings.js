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