
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
  formatDateISO,
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

  console.log("Services-Abfrage:", {
    data,
    error,
  });

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

  try {
    // --------------------------------------------------
    // 1. Grundlegende Validierung
    // --------------------------------------------------

    if (!bookingState.selectedService) {
      showSummaryError("Bitte wählen Sie zuerst ein Beratungsangebot aus.");
      return;
    }

    if (!bookingState.selectedDate) {
      showSummaryError("Bitte wählen Sie zuerst ein Datum aus.");
      return;
    }

    if (!bookingState.selectedTime) {
      showSummaryError("Bitte wählen Sie zuerst eine Uhrzeit aus.");
      return;
    }

    collectCustomerFormValues();

    if (!validateCustomerForm()) {
      showSummaryError("Bitte füllen Sie alle Pflichtfelder aus.");
      return;
    }

    // --------------------------------------------------
    // 2. Service noch einmal direkt aus Supabase laden
    // --------------------------------------------------

    const { data: serviceData, error: serviceError } = await supabase
      .from("services")
      .select("id, duration, price, active")
      .eq("id", bookingState.selectedService.id)
      .single();

    if (serviceError || !serviceData || !serviceData.active) {
      console.error(
        "Fehler beim Laden des Dienstes:",
        serviceError,
      );

      showSummaryError(
        "Der gewählte Service ist leider nicht mehr verfügbar.",
      );

      return;
    }

    // --------------------------------------------------
    // 3. Verfügbarkeit unmittelbar vor der Buchung prüfen
    // --------------------------------------------------

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

    // --------------------------------------------------
    // 4. Buchungsdaten vorbereiten
    // --------------------------------------------------

    const bookingDate = formatDateISO(bookingState.selectedDate);

    const bookingTime = bookingState.selectedTime;

    const customerName =
      `${bookingState.customer.firstName} ${bookingState.customer.lastName}`;

    // ID bereits im Browser erzeugen.
    // Dadurch brauchen wir nach dem INSERT kein SELECT.
    const bookingId = crypto.randomUUID();

    // --------------------------------------------------
    // 5. Buchung speichern
    // --------------------------------------------------

    const insertPromise = supabase
      .from("bookings")
      .insert({
        id: bookingId,
        service_id: serviceData.id,
        customer_name: customerName,
        customer_email: bookingState.customer.email,
        customer_phone: bookingState.customer.phone || null,
        booking_date: bookingDate,
        booking_time: bookingTime,
        notes: bookingState.customer.message || null,
        status: "pending",
      });

    const result = await withTimeout(insertPromise, 10000);

    if (result?.error) {
      const insertError = result.error;

      console.error(
        "Fehler beim Speichern der Buchung:",
        insertError,
      );

      console.error(
        "Insert error code:",
        insertError.code,
      );

      console.error(
        "Insert error status:",
        insertError.status,
      );

      console.error(
        "Insert error message:",
        insertError.message,
      );

      if (insertError.code === "42501") {
        showSummaryError(
          "Die Buchung konnte wegen fehlender Berechtigungen nicht gespeichert werden.",
        );
      } else if (insertError.code === "23505") {
        showSummaryError(
          "Dieser Termin wurde gerade von jemand anderem gebucht. Bitte wählen Sie eine andere Uhrzeit.",
        );
      } else {
        showSummaryError(
          "Die Buchung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
        );
      }

      return;
    }

    // --------------------------------------------------
    // 6. Erfolgreiche Buchung
    // --------------------------------------------------

    console.log("Buchung erfolgreich gespeichert:", bookingId);

    const createdAt = new Date().toISOString();

    const params = new URLSearchParams({
      id: bookingId,
      service: bookingState.selectedService.title || "",
      date: bookingDate,
      time: bookingTime,
      created_at: createdAt,
    });

    window.location.href = `success.html?${params.toString()}`;

  } catch (error) {
    console.error(
      "Unbekannter Fehler bei der Buchungsbestätigung:",
      error,
    );

    if (error?.message === "timeout") {
      showSummaryError(
        "Die Anfrage hat zu lange gedauert. Bitte überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
      );
    } else {
      showSummaryError(
        "Die Buchung konnte leider nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
      );
    }

  } finally {
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


