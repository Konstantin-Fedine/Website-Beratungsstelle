
============================================================
DATEI: js\booking-api.js
============================================================

import { supabase } from "./supabase.js";

// Geladene Buchungsdaten (einmal beim Start, blocked_days pro Monat)
let bookingSettings = null;
let availabilityRules = [];
const blockedDaysSet = new Set();

const DEFAULT_SETTINGS = {
  booking_interval: 60,
  booking_buffer_before: 0,
  booking_buffer_after: 0,
  booking_advance_days: 180,
  minimum_notice_hours: 24,
};

export function formatDateISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Datenbank: 1=Montag … 7=Sonntag
export function getWeekdayDb(date) {
  const jsDay = date.getDay();
  return jsDay === 0 ? 7 : jsDay;
}

function timeToMinutes(timeStr) {
  const parts = timeStr.split(":");
  return Number(parts[0]) * 60 + Number(parts[1]);
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
}

function rangesOverlap(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

async function loadSettings() {
  const { data, error } = await supabase.from("settings").select("*").limit(1);

  if (error) {
    console.error("Fehler beim Laden der Einstellungen:", error);
    return DEFAULT_SETTINGS;
  }

  return data?.[0] ?? DEFAULT_SETTINGS;
}

async function loadAvailability() {
  const { data, error } = await supabase
    .from("availability")
    .select("weekday, start_time, end_time, active")
    .eq("active", true);

  if (error) {
    console.error("Fehler beim Laden der Verfügbarkeiten:", error);
    return [];
  }

  return data ?? [];
}

export async function loadBlockedDaysForMonth(year, month) {
  const monthStart = formatDateISO(new Date(year, month, 1));
  const lastDay = new Date(year, month + 1, 0).getDate();
  const monthEnd = formatDateISO(new Date(year, month, lastDay));

  const { data, error } = await supabase
    .from("blocked_days")
    .select("date")
    .gte("date", monthStart)
    .lte("date", monthEnd);

  if (error) {
    console.error("Fehler beim Laden gesperrter Tage:", error);
    return;
  }

  blockedDaysSet.clear();

  data?.forEach((row) => {
    blockedDaysSet.add(row.date);
  });
}

export async function initBookingData() {
  const [settings, availability] = await Promise.all([
    loadSettings(),
    loadAvailability(),
  ]);

  bookingSettings = settings;
  availabilityRules = availability;

  if (!availabilityRules.length) {
    console.warn(
      "Keine aktiven Verfügbarkeiten gefunden. Verwende Platzhalter Mo–Fr 09:00–17:00.",
    );

    availabilityRules = [
      { weekday: 1, start_time: "09:00", end_time: "17:00", active: true },
      { weekday: 2, start_time: "09:00", end_time: "17:00", active: true },
      { weekday: 3, start_time: "09:00", end_time: "17:00", active: true },
      { weekday: 4, start_time: "09:00", end_time: "17:00", active: true },
      { weekday: 5, start_time: "09:00", end_time: "17:00", active: true },
    ];
  }

  const now = new Date();
  await loadBlockedDaysForMonth(now.getFullYear(), now.getMonth());
}

export function isDateSelectable(date, today) {
  if (!bookingSettings) {
    return false;
  }

  if (date < today) {
    return false;
  }

  if (blockedDaysSet.has(formatDateISO(date))) {
    return false;
  }

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + bookingSettings.booking_advance_days);

  if (date > maxDate) {
    return false;
  }

  const weekday = getWeekdayDb(date);
  const hasAvailability = availabilityRules.some(
    (rule) => rule.weekday === weekday,
  );

  return hasAvailability;
}

function generateRawSlots(windows, durationMinutes, interval) {
  const slots = [];

  windows.forEach((window) => {
    const windowStart = timeToMinutes(window.start_time);
    const windowEnd = timeToMinutes(window.end_time);

    for (
      let slot = windowStart;
      slot + durationMinutes <= windowEnd;
      slot += interval
    ) {
      slots.push(slot);
    }
  });

  return [...new Set(slots)].sort((a, b) => a - b);
}

function filterSlotsByBlockedTimes(slots, durationMinutes, blockedTimes) {
  return slots.filter((slot) => {
    const slotEnd = slot + durationMinutes;

    return !blockedTimes.some((block) => {
      const blockStart = timeToMinutes(block.start_time);
      const blockEnd = timeToMinutes(block.end_time);
      return rangesOverlap(slot, slotEnd, blockStart, blockEnd);
    });
  });
}

function filterSlotsByBookings(
  slots,
  durationMinutes,
  bookings,
  bufferBefore,
  bufferAfter,
) {
  return slots.filter((slot) => {
    const slotEnd = slot + durationMinutes;

    return !bookings.some((booking) => {
      const bookStart = timeToMinutes(booking.booking_time) - bufferBefore;
      const bookEnd =
        timeToMinutes(booking.booking_time) + booking.duration + bufferAfter;

      return rangesOverlap(slot, slotEnd, bookStart, bookEnd);
    });
  });
}

function filterSlotsByMinimumNotice(slots, date, today, minimumNoticeHours) {
  if (date.getTime() !== today.getTime()) {
    return slots;
  }

  const now = new Date();
  const earliestMinutes =
    now.getHours() * 60 + now.getMinutes() + minimumNoticeHours * 60;

  return slots.filter((slot) => slot >= earliestMinutes);
}

export async function getAvailableSlots(date, durationMinutes) {
  if (!bookingSettings || !durationMinutes) {
    return [];
  }

  const weekday = getWeekdayDb(date);
  const windows = availabilityRules.filter((rule) => rule.weekday === weekday);

  if (windows.length === 0) {
    return [];
  }

  const dateISO = formatDateISO(date);

  const [blockedTimesResult, bookingsResult] = await Promise.all([
    supabase
      .from("blocked_times")
      .select("start_time, end_time")
      .eq("date", dateISO),
    supabase
      .from("booking_blocks")
      .select("booking_time, duration")
      .eq("booking_date", dateISO),
  ]);

  if (blockedTimesResult.error) {
    console.error(
      "Fehler beim Laden gesperrter Zeiten:",
      blockedTimesResult.error,
    );
  }

  if (bookingsResult.error) {
    console.error("Fehler beim Laden belegter Termine:", bookingsResult.error);
  }

  const blockedTimes = blockedTimesResult.data ?? [];
  const bookings = bookingsResult.data ?? [];

  let slots = generateRawSlots(
    windows,
    durationMinutes,
    bookingSettings.booking_interval,
  );

  slots = filterSlotsByBlockedTimes(slots, durationMinutes, blockedTimes);
  slots = filterSlotsByBookings(
    slots,
    durationMinutes,
    bookings,
    bookingSettings.booking_buffer_before,
    bookingSettings.booking_buffer_after,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  slots = filterSlotsByMinimumNotice(
    slots,
    date,
    today,
    bookingSettings.minimum_notice_hours,
  );

  return slots.map(minutesToTime);
}



============================================================
DATEI: js\booking.js
============================================================

import { supabase } from "./supabase.js";
import {
  initBookingData,
  loadBlockedDaysForMonth,
  isDateSelectable,
  getAvailableSlots,
} from "./booking-api.js";

console.log("Booking System gestartet");

// Utility: race a promise against a timeout (does not abort underlying request)
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms),
    ),
  ]);
}

const servicesContainer = document.getElementById("services-list");

const bookingState = {
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
  customer: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  },
};

const nextButtons = document.querySelectorAll(".next-step");
const previousButtons = document.querySelectorAll(".previous-step");
const bookingForm = document.getElementById("booking-form");
const bookingFormError = document.getElementById("booking-form-error");
const bookingSummaryError = document.getElementById("booking-summary-error");
const bookingConfirmButton = document.getElementById("booking-confirm-button");
let isBookingSubmitting = false;

function setBookingSubmitting(isSubmitting) {
  isBookingSubmitting = isSubmitting;
  if (!bookingConfirmButton) {
    return;
  }

  bookingConfirmButton.disabled = isSubmitting;
  bookingConfirmButton.textContent = isSubmitting
    ? "Buchung wird verarbeitet..."
    : "Termin bestätigen";
}

if (bookingConfirmButton) {
  bookingConfirmButton.addEventListener("click", confirmBooking);
}

// Attach live counter to message textarea
document.addEventListener("DOMContentLoaded", () => {
  const msg = document.getElementById("message");
  if (msg) {
    msg.addEventListener("input", updateMessageCounter);
    // initialize
    updateMessageCounter();
    // also check message length state (warning + disable next)
    msg.addEventListener("input", checkMessageLengthState);
    checkMessageLengthState();
  }
});

nextButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const currentStep = event.target.closest(".booking-step");

    if (!currentStep) {
      return;
    }

    if (currentStep.id === "booking-step-service") {
      if (!bookingState.selectedService) {
        alert("Bitte wählen Sie zuerst eine Beratung aus.");
        return;
      }

      showStep("booking-step-date");
      return;
    }

    if (currentStep.id === "booking-step-date") {
      if (!bookingState.selectedDate) {
        alert("Bitte wählen Sie zuerst ein Datum aus.");
        return;
      }

      if (!bookingState.selectedTime) {
        alert("Bitte wählen Sie zuerst eine Uhrzeit aus.");
        return;
      }

      showStep("booking-step-data");
      return;
    }

    if (currentStep.id === "booking-step-data") {
      collectCustomerFormValues();

      if (!validateCustomerForm()) {
        return;
      }

      showStep("booking-step-summary");
      return;
    }
  });
});

previousButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentStep = button.closest(".booking-step");

    if (!currentStep) {
      return;
    }

    if (currentStep.id === "booking-step-date") {
      showStep("booking-step-service");
      return;
    }

    if (currentStep.id === "booking-step-data") {
      showStep("booking-step-date");
      return;
    }

    if (currentStep.id === "booking-step-summary") {
      showStep("booking-step-data");
      return;
    }
  });
});

function showError(message) {
  servicesContainer.innerHTML = `

        <div class="booking-error">

            <p>
                ${message}
            </p>

            <a href="services.html" class="btn btn-primary">
                Zu den Angeboten
            </a>

        </div>

    `;
}

function showStep(stepId) {
  const steps = document.querySelectorAll(".booking-step");

  steps.forEach((step) => {
    step.style.display = "none";
    step.classList.remove("active");
  });

  const activeStep = document.getElementById(stepId);

  if (activeStep) {
    activeStep.style.display = "block";
    activeStep.classList.add("active");
  }

  if (stepId === "booking-step-date") {
    updateTimesPanel();
  }

  if (stepId === "booking-step-data") {
    populateCustomerForm();
  }

  if (stepId === "booking-step-summary") {
    renderBookingSummary();
  }

  updateProgress(stepId);
}

function updateProgress(stepId) {
  const progressSteps = document.querySelectorAll(".progress-step");

  progressSteps.forEach((step) => {
    step.classList.remove("active");
  });

  let activeIndex = 0;

  if (stepId === "booking-step-date") {
    activeIndex = 1;
  }

  if (stepId === "booking-step-data") {
    activeIndex = 2;
  }

  if (stepId === "booking-step-summary") {
    activeIndex = 3;
  }

  if (progressSteps[activeIndex]) {
    progressSteps[activeIndex].classList.add("active");
  }
}

async function loadServices() {
  console.log("Lade Beratungsangebote...");

  const { data, error } = await supabase

    .from("services")

    .select("*")

    .eq("active", true)

    .order("sort_order");

  if (error) {
    console.error("Fehler beim Laden der Services:", error);

    showError("Die Beratungsangebote konnten gerade nicht geladen werden.");

    return;
  }

  if (!data || data.length === 0) {
    showError("Aktuell sind keine Beratungsangebote verfügbar.");

    return;
  }

  console.log("Services geladen:", data);

  servicesContainer.innerHTML = "";

  data.forEach((service) => {
    const card = document.createElement("div");
    card.className = "booking-service-card";

    const titleEl = document.createElement("h3");
    titleEl.textContent = service.title;

    const descriptionEl = document.createElement("p");
    descriptionEl.textContent = service.description || "";

    const infoDiv = document.createElement("div");
    infoDiv.className = "service-info";

    const durationSpan = document.createElement("span");
    durationSpan.textContent = `⏱ ${service.duration} Minuten`;

    const priceSpan = document.createElement("span");
    priceSpan.textContent = `💶 ${service.price} €`;

    infoDiv.append(durationSpan, priceSpan);

    const button = document.createElement("button");
    button.className = "btn btn-primary select-service-button";
    button.type = "button";
    button.textContent = "Auswählen";

    card.append(titleEl, descriptionEl, infoDiv, button);
    servicesContainer.appendChild(card);

    button.addEventListener("click", () => {
      document.querySelectorAll(".booking-service-card").forEach((card) => {
        card.classList.remove("selected");
      });

      card.classList.add("selected");

      bookingState.selectedService = {
        id: service.id,
        title: service.title,
        duration: service.duration,
        price: service.price,
      };

      console.log("Ausgewählte Beratung:", bookingState.selectedService);

      showStep("booking-step-date");
    });
  });
}

// Welcher Monat gerade im Kalender angezeigt wird (unabhängig vom gewählten Datum)
let calendarViewDate = new Date();
calendarViewDate.setDate(1);
calendarViewDate.setHours(0, 0, 0, 0);

function getTodayAtMidnight() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function createDateAtMidnight(year, month, day) {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date;
}

function isSameDay(dateA, dateB) {
  if (!dateA || !dateB) {
    return false;
  }

  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function initCalendar() {
  const previousMonthButton = document.getElementById("previous-month");
  const nextMonthButton = document.getElementById("next-month");

  previousMonthButton.addEventListener("click", async () => {
    calendarViewDate.setMonth(calendarViewDate.getMonth() - 1);
    await loadBlockedDaysForMonth(
      calendarViewDate.getFullYear(),
      calendarViewDate.getMonth(),
    );
    renderCalendar();
  });

  nextMonthButton.addEventListener("click", async () => {
    calendarViewDate.setMonth(calendarViewDate.getMonth() + 1);
    await loadBlockedDaysForMonth(
      calendarViewDate.getFullYear(),
      calendarViewDate.getMonth(),
    );
    renderCalendar();
  });

  renderCalendar();
}

function renderCalendar() {
  const monthTitle = document.getElementById("current-month");
  const daysContainer = document.getElementById("calendar-days");

  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();
  const today = getTodayAtMidnight();

  const monthName = calendarViewDate.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  monthTitle.textContent = monthName;

  daysContainer.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();

  // Sonntag = 0 → Montag ist der erste Wochentag
  if (startDay === 0) {
    startDay = 7;
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Leere Felder vor dem ersten Tag des Monats
  for (let i = 1; i < startDay; i++) {
    const empty = document.createElement("div");
    empty.className = "calendar-day empty";
    daysContainer.appendChild(empty);
  }

  // Tage des Monats erstellen
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDate = createDateAtMidnight(year, month, day);
    const dayElement = document.createElement("button");

    dayElement.type = "button";
    dayElement.className = "calendar-day";
    dayElement.textContent = day;

    const isPastDay = dayDate < today;
    const isToday = isSameDay(dayDate, today);
    const isSelected = isSameDay(dayDate, bookingState.selectedDate);
    const canSelect = isDateSelectable(dayDate, today);

    if (!canSelect) {
      dayElement.classList.add("unavailable");
      dayElement.disabled = true;

      if (isPastDay) {
        dayElement.classList.add("past");
      }
    }

    if (isToday) {
      dayElement.classList.add("today");
    }

    if (isSelected) {
      dayElement.classList.add("selected");
    }

    if (canSelect) {
      dayElement.addEventListener("click", () => {
        document.querySelectorAll(".calendar-day.selected").forEach((el) => {
          el.classList.remove("selected");
        });

        dayElement.classList.add("selected");

        bookingState.selectedDate = dayDate;

        // Bei neuem Datum: alte Uhrzeit zurücksetzen
        bookingState.selectedTime = null;

        console.log("Ausgewähltes Datum:", bookingState.selectedDate);

        updateTimesPanel();
      });
    }

    daysContainer.appendChild(dayElement);
  }
}

const timesPlaceholder = document.getElementById("times-placeholder");
const timesContent = document.getElementById("times-content");
const selectedDateLabel = document.getElementById("selected-date-label");
const timeSlotsContainer = document.getElementById("time-slots");

function formatDateLabel(date) {
  return date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function formatDateLabelShort(date) {
  return date.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

function renderBookingSummary() {
  const summaryContainer = document.getElementById("booking-summary");

  if (!summaryContainer) {
    return;
  }

  const service = bookingState.selectedService;
  const date = bookingState.selectedDate;
  const time = bookingState.selectedTime;
  const customer = bookingState.customer;

  if (!service || !date || !time) {
    summaryContainer.innerHTML = `
      <p class="times-empty">Bitte wählen Sie zuerst eine Beratung, ein Datum und eine Uhrzeit aus.</p>
    `;
    return;
  }

  summaryContainer.innerHTML = "";

  const summaryCard = document.createElement("div");
  summaryCard.className = "booking-summary-card";

  const title = document.createElement("h3");
  title.textContent = "Ihre Buchung";
  summaryCard.appendChild(title);

  function appendSummaryRow(section, label, value, isLink = false) {
    const heading = document.createElement("p");
    heading.className = "summary-heading";
    heading.textContent = label;

    const valueEl = document.createElement("p");
    valueEl.className = "summary-value";

    if (isLink) {
      const link = document.createElement("a");
      link.href = `mailto:${value}`;
      link.textContent = value;
      valueEl.appendChild(link);
    } else {
      valueEl.textContent = value;
    }

    section.append(heading, valueEl);
  }

  const serviceSection = document.createElement("div");
  serviceSection.className = "summary-section";
  appendSummaryRow(serviceSection, "Beratung", service.title);
  appendSummaryRow(serviceSection, "Dauer", `${service.duration} Minuten`);
  appendSummaryRow(serviceSection, "Preis", formatCurrency(service.price));
  summaryCard.appendChild(serviceSection);

  const dateSection = document.createElement("div");
  dateSection.className = "summary-section";
  appendSummaryRow(dateSection, "Datum", formatDateLabelShort(date));
  appendSummaryRow(dateSection, "Uhrzeit", `${time} Uhr`);
  summaryCard.appendChild(dateSection);

  const customerSection = document.createElement("div");
  customerSection.className = "summary-section";
  appendSummaryRow(customerSection, "Ihre Daten", `${customer.firstName} ${customer.lastName}`);
  appendSummaryRow(customerSection, "E-Mail", customer.email, true);

  if (customer.phone) {
    appendSummaryRow(customerSection, "Telefon", customer.phone);
  }

  if (customer.message) {
    appendSummaryRow(customerSection, "Nachricht", customer.message);
  }

  summaryCard.appendChild(customerSection);

  summaryContainer.appendChild(summaryCard);
}

function collectCustomerFormValues() {
  if (!bookingForm) {
    return;
  }

  bookingState.customer = {
    firstName: document.getElementById("first-name").value.trim(),
    lastName: document.getElementById("last-name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim(),
  };
}

function populateCustomerForm() {
  if (!bookingForm) {
    return;
  }

  document.getElementById("first-name").value = bookingState.customer.firstName;
  document.getElementById("last-name").value = bookingState.customer.lastName;
  document.getElementById("email").value = bookingState.customer.email;
  document.getElementById("phone").value = bookingState.customer.phone;
  document.getElementById("message").value = bookingState.customer.message;

  // update message counter when populating
  const msgEl = document.getElementById("message");
  if (msgEl) {
    updateMessageCounter();
  }

  if (bookingFormError) {
    bookingFormError.hidden = true;
  }
}

function updateMessageCounter() {
  const counter = document.getElementById("message-counter");
  const msg = document.getElementById("message");
  if (!counter || !msg) return;
  const len = msg.value.length;
  counter.textContent = len;
  if (len > 1800) {
    counter.style.color = "#b45200"; // warn color
  } else {
    counter.style.color = "";
  }
}

function checkMessageLengthState() {
  const msg = document.getElementById("message");
  const warning = document.getElementById("message-warning");
  if (!msg || !warning) return;
  const len = msg.value.length;
  const nexts = document.querySelectorAll(".next-step");

  if (len > 2000) {
    warning.hidden = false;
    nexts.forEach((b) => (b.disabled = true));
  } else {
    warning.hidden = true;
    nexts.forEach((b) => (b.disabled = false));
  }
}

function validateCustomerForm() {
  if (!bookingForm) {
    return false;
  }

  if (!bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return false;
  }

  const emailValue = bookingState.customer.email;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(emailValue)) {
    if (bookingFormError) {
      bookingFormError.textContent =
        "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      bookingFormError.hidden = false;
    }
    return false;
  }

  // Vorname / Nachname Mindestlänge
  const first = bookingState.customer.firstName || "";
  const last = bookingState.customer.lastName || "";
  if (first.length < 2 || last.length < 2) {
    if (bookingFormError) {
      bookingFormError.textContent =
        "Bitte geben Sie Vor- und Nachname mit mindestens 2 Zeichen an.";
      bookingFormError.hidden = false;
    }
    return false;
  }

  // Telefon: optional, aber wenn angegeben muss es ein plausibles Format haben
  const phone = bookingState.customer.phone || "";
  if (phone.length > 0) {
    const phonePattern = /^[+0-9()\s\-]{6,20}$/;
    if (!phonePattern.test(phone)) {
      if (bookingFormError) {
        bookingFormError.textContent =
          "Bitte geben Sie eine gültige Telefonnummer ein (Ziffern, +, -, Leerzeichen).";
        bookingFormError.hidden = false;
      }
      return false;
    }
  }

  // Nachricht: optional, max Länge
  const message = bookingState.customer.message || "";
  if (message.length > 2000) {
    if (bookingFormError) {
      bookingFormError.textContent =
        "Die Nachricht ist zu lang. Bitte kürzen Sie Ihre Mitteilung.";
      bookingFormError.hidden = false;
    }
    return false;
  }

  if (bookingFormError) {
    bookingFormError.hidden = true;
  }

  return true;
}

async function updateTimesPanel() {
  if (!bookingState.selectedDate) {
    timesPlaceholder.hidden = false;
    timesContent.hidden = true;
    return;
  }

  timesPlaceholder.hidden = true;
  timesContent.hidden = false;

  selectedDateLabel.textContent = formatDateLabel(bookingState.selectedDate);

  timeSlotsContainer.innerHTML =
    '<p class="times-loading">Zeiten werden geladen...</p>';

  const duration = bookingState.selectedService?.duration;

  if (!duration) {
    timeSlotsContainer.innerHTML =
      '<p class="times-empty">Bitte wählen Sie zuerst eine Beratung aus.</p>';
    return;
  }

  const slots = await getAvailableSlots(bookingState.selectedDate, duration);

  timeSlotsContainer.innerHTML = "";

  if (slots.length === 0) {
    timeSlotsContainer.innerHTML =
      '<p class="times-empty">Keine freien Zeiten an diesem Tag.</p>';
    return;
  }

  slots.forEach((time) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "time-slot";
    button.textContent = time;

    if (bookingState.selectedTime === time) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      document.querySelectorAll(".time-slot.selected").forEach((el) => {
        el.classList.remove("selected");
      });

      button.classList.add("selected");
      bookingState.selectedTime = time;

      console.log("Ausgewählte Uhrzeit:", bookingState.selectedTime);
    });

    timeSlotsContainer.appendChild(button);
  });
}

function showSummaryError(message) {
  if (!bookingSummaryError) {
    return;
  }

  bookingSummaryError.textContent = message;
  bookingSummaryError.hidden = false;
}

function hideSummaryError() {
  if (bookingSummaryError) {
    bookingSummaryError.hidden = true;
  }
}

async function confirmBooking() {
  if (isBookingSubmitting) {
    return;
  }

  hideSummaryError();
  setBookingSubmitting(true);

  if (!bookingState.selectedService) {
    showSummaryError("Bitte wählen Sie zuerst ein Beratungsangebot aus.");
    setBookingSubmitting(false);
    return;
  }

  if (!bookingState.selectedDate) {
    showSummaryError("Bitte wählen Sie zuerst ein Datum aus.");
    setBookingSubmitting(false);
    return;
  }

  if (!bookingState.selectedTime) {
    showSummaryError("Bitte wählen Sie zuerst eine Uhrzeit aus.");
    setBookingSubmitting(false);
    return;
  }

  collectCustomerFormValues();

  if (!validateCustomerForm()) {
    showSummaryError("Bitte füllen Sie alle Pflichtfelder aus.");
    setBookingSubmitting(false);
    return;
  }

  try {
    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .select("id, duration, price, active")
      .eq("id", bookingState.selectedService.id)
      .single();

    if (serviceError || !serviceData || !serviceData.active) {
      console.error("Fehler beim Laden des Dienstes:", serviceError);
      showSummaryError("Der gewählte Service ist leider nicht mehr verfügbar.");
      return;
    }

    const availableSlots = await getAvailableSlots(
      bookingState.selectedDate,
      serviceData.duration,
    );

    if (!availableSlots.includes(bookingState.selectedTime)) {
      showSummaryError(
        "Der gewählte Termin ist leider inzwischen vergeben. Bitte wählen Sie eine andere Uhrzeit.",
      );
      return;
    }

    const bookingDate = bookingState.selectedDate.toISOString().split("T")[0];
    const bookingTime = bookingState.selectedTime;
    const customerName = `${bookingState.customer.firstName} ${bookingState.customer.lastName}`;

    // Versuch, Insert mit Timeout durchzuführen
    let insertedBooking = null;
    try {
      const insertPromise = supabase
        .from("bookings")
        .insert([
          {
            service_id: serviceData.id,
            customer_name: customerName,
            customer_email: bookingState.customer.email,
            customer_phone: bookingState.customer.phone || null,
            booking_date: bookingDate,
            booking_time: bookingTime,
            notes: bookingState.customer.message || null,
            status: "pending",
          },
        ])
        .select("id, created_at")
        .single();

      const result = await withTimeout(insertPromise, 10000);
      const insertError = result?.error;

      if (insertError || !result?.data) {
        console.error("Fehler beim Speichern der Buchung:", insertError);
        console.error("Insert error status:", insertError?.status);
        console.error("Insert error message:", insertError?.message);

        if (insertError && insertError.status === 401) {
          showSummaryError(
            "Zugriff verweigert (401). Bitte überprüfe den Supabase-Anon-Key in js/supabase.js oder die RLS-Policies.",
          );
        } else {
          showSummaryError(
            "Die Buchung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
          );
        }

        setBookingSubmitting(false);
        return;
      }

      insertedBooking = result.data;
    } catch (e) {
      console.error("Fehler beim Insert-Versuch:", e);
      if (e && e.message === "timeout") {
        showSummaryError(
          "Die Anfrage hat zu lange gedauert. Bitte überprüfe deine Verbindung und versuche es erneut.",
        );
      } else {
        showSummaryError(
          "Die Buchung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
        );
      }
      setBookingSubmitting(false);
      return;
    }

    // Leite weiter und übergebe Booking-Daten per Query-String für die Success-Page
    const params = new URLSearchParams({
      id: insertedBooking.id,
      service: bookingState.selectedService?.title || "",
      date: bookingDate,
      time: bookingTime,
      created_at: insertedBooking.created_at || "",
    });

    window.location.href = `success.html?${params.toString()}`;
  } catch (error) {
    console.error("Unbekannter Fehler bei der Buchungsbestätigung:", error);
    showSummaryError(
      "Die Buchung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
    );
    setBookingSubmitting(false);
  }
}

async function initBookingPage() {
  await initBookingData();
  loadServices();
  initCalendar();
  updateTimesPanel();
}

initBookingPage();



============================================================
DATEI: js\config.js
============================================================




============================================================
DATEI: js\content-loader.js
============================================================

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


async function fetchSheet(sheetId) {
  const url =
    `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sheet konnte nicht geladen werden: ${sheetId}`);
  }

  return response.text();
}


function parseSheet(csv) {
  const rows = csv
    .trim()
    .split("\n")
    .map(row => {
      // einfacher CSV-Parser für deine Sheet-Struktur
      const result = [];
      let current = "";
      let insideQuotes = false;

      for (let i = 0; i < row.length; i++) {
        const char = row[i];

        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === "," && !insideQuotes) {
          result.push(current);
          current = "";
        } else {
          current += char;
        }
      }

      result.push(current);

      return result.map(value =>
        value.trim().replace(/^"|"$/g, "")
      );
    });

  const content = {};

  for (const row of rows.slice(1)) {
    const page = row[0]?.trim();
    const section = row[1]?.trim();
    const field = row[2]?.trim();
    const text = row[3] ?? "";

    if (!page || !section || !field) continue;

    const key = `${page}_${section}_${field}`;

    content[key] = text;
  }

  return content;
}


async function loadSheet(sheetId) {
  const csv = await fetchSheet(sheetId);
  return parseSheet(csv);
}


async function loadContent() {
  try {
    console.log("→ Lade aktuelle Inhalte aus Google Sheets...");

    const content = {};

    // Header
    Object.assign(
      content,
      await loadSheet(headerSheetId)
    );

    // Footer
    Object.assign(
      content,
      await loadSheet(footerSheetId)
    );

    // Aktuelle Seite
    const page = document.body.dataset.page;

    if (page && sheets[page]) {
      Object.assign(
        content,
        await loadSheet(sheets[page])
      );
    }

    console.log(
      `✓ ${Object.keys(content).length} Inhalte geladen`
    );

    // Alle data-text Elemente aktualisieren
    document.querySelectorAll("[data-text]").forEach(element => {
      const key = element.dataset.text;

      if (Object.prototype.hasOwnProperty.call(content, key)) {
        element.textContent = content[key];
      }
    });

    console.log("✓ Website mit aktuellen Google-Sheet-Daten aktualisiert");

  } catch (error) {
    console.error(
      "❌ Fehler beim Laden der Google-Sheet-Inhalte:",
      error
    );
  }
}


// WICHTIG:
// Erst Header/Footer laden.
// Danach deren data-text Elemente aktualisieren.
document.addEventListener("componentsLoaded", () => {
  loadContent();
});


============================================================
DATEI: js\faq.js
============================================================

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    if (!button) return;

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach((faq) => {
        faq.classList.remove("is-open");

        const faqButton = faq.querySelector(".faq-question");

        if (faqButton) {
          faqButton.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("is-open");

        button.setAttribute("aria-expanded", "true");
      }
    });
  });
}



============================================================
DATEI: js\header.js
============================================================

function initHeader() {
  document.addEventListener("componentsLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (!menuToggle || !navigation) {
      console.error("❌ Header-Elemente nicht gefunden");
      return;
    }

    // Mobile-Menü öffnen/schließen
    menuToggle.addEventListener("click", () => {
      const isActive = navigation.classList.toggle("is-active");

      menuToggle.setAttribute(
        "aria-expanded",
        isActive ? "true" : "false"
      );
    });

    // Menü schließen, wenn außerhalb geklickt wird
    document.addEventListener("click", (e) => {
      if (
        !navigation.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navigation.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Menü mit Escape schließen
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        navigation.classList.contains("is-active")
      ) {
        navigation.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });

    // Aktuelle Seite hervorheben
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navigation a").forEach((link) => {
      const linkPage = link.getAttribute("href");

      const isCurrentPage =
        linkPage === currentPage;

      link.classList.toggle("active", isCurrentPage);

      // Termin buchen auf der Booking-Seite als CTA hervorheben
      link.classList.toggle(
        "nav-cta",
        isCurrentPage && linkPage === "booking.html"
      );
    });

    console.log(`✓ Aktive Navigation: ${currentPage}`);
  });
}

// Header initialisieren
initHeader();


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
      const main = document.querySelector("main");

      if (main) {
        document.body.insertBefore(component, main);
      } else {
        document.body.prepend(component);
      }
    }

    if (position === "after-main") {
      document.body.appendChild(component);
    }

    console.log(`✓ Komponente geladen: ${file}`);

    return component;
  } catch (error) {
    console.error(`❌ Fehler beim Laden von ${file}:`, error);
    return null;
  }
}

async function loadComponents() {
  const basePath =
    window.location.pathname.substring(
      0,
      window.location.pathname.lastIndexOf("/") + 1
    );

  const header = await loadComponent(
    `${basePath}components/header.html`,
    "before-main"
  );

  const footer = await loadComponent(
    `${basePath}components/footer.html`,
    "after-main"
  );

  // Erst wenn beide Komponenten wirklich da sind
  document.dispatchEvent(
    new CustomEvent("componentsLoaded", {
      detail: {
        header,
        footer,
      },
    })
  );
}

loadComponents();


============================================================
DATEI: js\services.js
============================================================

import { supabase } from "./supabase.js";

async function loadServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  if (error) {
    console.error("Fehler beim Laden der Services:", error);

    const container = document.querySelector("#services-container");

    container.innerHTML = `
            <p>
                Die Angebote konnten gerade nicht geladen werden.
                Bitte versuchen Sie es später erneut.
            </p>
        `;

    return;
  }

  const container = document.querySelector("#services-container");

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `
            <p>
                Aktuell sind keine Beratungsangebote verfügbar.
            </p>
        `;

    return;
  }

  data.forEach((service) => {
    const card = document.createElement("article");

    card.className = "service-card";

    card.innerHTML = `
            <div class="service-content">

                <h3>${service.title}</h3>

                <p>${service.description ?? ""}</p>

                <p>${service.duration} Minuten</p>

                <p>${service.price.toFixed(2)} €</p>

                <a href="booking.html?service=${service.id}" class="btn btn-primary">
                    Termin buchen
                </a>

            </div>
        `;

    container.appendChild(card);
  });
}

loadServices();



============================================================
DATEI: js\supabase.js
============================================================

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Development helper: if the site is served from localhost/127.0.0.1,
// use the local Supabase dev instance started with `supabase start`.
const hostname = (typeof window !== "undefined" && window.location && window.location.hostname) || "";
const isLocalhost = hostname === "127.0.0.1" || hostname === "localhost";

const LOCAL_SUPABASE_URL = "http://127.0.0.1:54321";
const LOCAL_SUPABASE_ANON_KEY = "sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH";

const PROD_SUPABASE_URL = "https://osesjuwfgytibasmnacl.supabase.co";
const PROD_SUPABASE_ANON_KEY = "sb_publishable_am5h5emmjCuvdz69L2PHkw_2Pankgs5";

const supabaseUrl = isLocalhost ? LOCAL_SUPABASE_URL : PROD_SUPABASE_URL;
const supabaseKey = isLocalhost ? LOCAL_SUPABASE_ANON_KEY : PROD_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);



============================================================
DATEI: js\test-rls.js
============================================================

import { supabase } from "./supabase.js";

const { data: loginData, error: loginError } =
  await supabase.auth.signInWithPassword({
    email: "test-admin@example.com",
    password: "Test",
  });

console.log("Login-Fehler:", loginError);
console.log("User:", loginData?.user);

const { data: adminResult, error: adminError } =
  await supabase.rpc("is_admin");

console.log("is_admin():", adminResult);
console.log("is_admin Fehler:", adminError);

const { data: bookings, error: bookingsError } =
  await supabase
    .from("bookings")
    .select("*");

console.log("Buchungen:", bookings);
console.log("Buchungsfehler:", bookingsError);


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
DATEI: js\utils.js
============================================================




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

    <script src="js/load-components.js"></script>
    <script src="js/header.js"></script>
    <script src="js/content-loader.js"></script>
    <script type="module" src="js/booking.js"></script>
  </body>
</html>

