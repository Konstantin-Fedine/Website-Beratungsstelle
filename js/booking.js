import { supabase } from "./supabase.js";

console.log("Booking System gestartet");

const servicesContainer = document.getElementById("services-list");

const bookingState = {
  selectedService: null,

  selectedDate: null,
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

let currentDate = new Date();

function renderCalendar() {
  const monthTitle = document.getElementById("current-month");
  const daysContainer = document.getElementById("calendar-days");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("de-DE", {
    month: "long",
    year: "numeric",
  });

  monthTitle.textContent = monthName;

  daysContainer.innerHTML = "";

  const firstDay = new Date(year, month, 1);

  let startDay = firstDay.getDay();

  // Sonntag = 0 → auf Montag verschieben
  if (startDay === 0) {
    startDay = 7;
  }

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Leere Felder vor dem ersten Tag

  for (let i = 1; i < startDay; i++) {
    const empty = document.createElement("div");

    empty.className = "calendar-day empty";

    daysContainer.appendChild(empty);
  }

  // Tage erstellen

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("button");

    dayElement.className = "calendar-day";

    dayElement.textContent = day;

    dayElement.addEventListener("click", () => {
      document.querySelectorAll(".calendar-day").forEach((day) => {
        day.classList.remove("selected");
      });

      dayElement.classList.add("selected");

      bookingState.selectedDate = new Date(year, month, day);

      console.log("Ausgewähltes Datum:", bookingState.selectedDate);
    });

    daysContainer.appendChild(dayElement);
  }
}

renderCalendar();
