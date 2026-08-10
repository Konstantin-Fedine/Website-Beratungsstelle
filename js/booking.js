import { supabase } from "./supabase.js";
import {
  initBookingData,
  loadBlockedDaysForMonth,
  isDateSelectable,
  getAvailableSlots,
} from "./booking-api.js";

console.log("Booking System gestartet");

const servicesContainer = document.getElementById("services-list");

const bookingState = {
  selectedService: null,
  selectedDate: null,
  selectedTime: null,
};

const nextButtons = document.querySelectorAll(".next-step");

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!bookingState.selectedService) {
      alert("Bitte wählen Sie zuerst eine Beratung aus.");

      return;
    }

    showStep("booking-step-date");
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

    card.innerHTML = `


            <h3>
                ${service.title}
            </h3>


            <p>
                ${service.description}
            </p>


            <div class="service-info">

                <span>
                    ⏱ ${service.duration} Minuten
                </span>


                <span>
                    💶 ${service.price} €
                </span>


            </div>


            <button
                class="btn btn-primary select-service-button"
            >
                Auswählen
            </button>


        `;

    servicesContainer.appendChild(card);

    const button = card.querySelector(".select-service-button");

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

async function initBookingPage() {
  await initBookingData();
  loadServices();
  initCalendar();
  updateTimesPanel();
}

initBookingPage();
