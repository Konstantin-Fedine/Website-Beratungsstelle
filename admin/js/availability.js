import { supabase } from "../../js/supabase.js";

/* ========================================
   KONFIGURATION
   ======================================== */

const weekdays = [
  { id: 1, name: "Montag" },
  { id: 2, name: "Dienstag" },
  { id: 3, name: "Mittwoch" },
  { id: 4, name: "Donnerstag" },
  { id: 5, name: "Freitag" },
  { id: 6, name: "Samstag" },
  { id: 7, name: "Sonntag" },
];


/* ========================================
   ELEMENTE
   ======================================== */

const daysContainer =
  document.getElementById("availability-days");

const messageElement =
  document.getElementById("availability-message");

const saveButton =
  document.getElementById("save-availability");


/* ========================================
   NACHRICHTEN
   ======================================== */

function showMessage(message, type) {
  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;

  messageElement.className =
    `availability-message availability-message-${type}`;

  messageElement.hidden = false;
}


function hideMessage() {
  if (!messageElement) {
    return;
  }

  messageElement.hidden = true;
  messageElement.textContent = "";
  messageElement.className = "availability-message";
}


/* ========================================
   ZEITBLOCK ERSTELLEN
   ======================================== */

function createTimeBlock(
  start = "09:00",
  end = "17:00"
) {
  const block = document.createElement("div");

  /*
   * Diese Klasse entspricht dem CSS.
   */
  block.className = "availability-time-block";

  block.innerHTML = `
    <input
      type="time"
      class="availability-time-start"
      value="${start}"
      aria-label="Startzeit"
    />

    <span class="availability-time-separator">
      –
    </span>

    <input
      type="time"
      class="availability-time-end"
      value="${end}"
      aria-label="Endzeit"
    />

    <button
      type="button"
      class="availability-delete"
      aria-label="Zeitraum löschen"
      title="Zeitraum löschen"
    >
      <span data-icon=delete></span>
    </button>
  `;

  const deleteButton =
    block.querySelector(".availability-delete");

  deleteButton.addEventListener("click", () => {
    block.remove();
  });

  return block;
}


/* ========================================
   WOCHENTAG ERSTELLEN
   ======================================== */

function createWeekday(day, availabilityRows) {
  const dayElement =
    document.createElement("article");

  dayElement.className = "availability-day";


  /*
   * Alle aktiven Zeiträume dieses
   * Wochentages finden.
   */

  const activeRows =
    availabilityRows
      .filter(
        (row) =>
          row.weekday === day.id &&
          row.active === true
      )
      .sort(
        (a, b) =>
          a.start_time.localeCompare(
            b.start_time
          )
      );


  const isActive =
    activeRows.length > 0;


  dayElement.innerHTML = `
    <div class="availability-day-header">

      <div>
        <h3>
          ${day.name}
        </h3>
      </div>

      <label class="availability-toggle">

        <input
          type="checkbox"
          class="availability-day-active"
          ${isActive ? "checked" : ""}
        />

        <span>
          Verfügbar
        </span>

      </label>

    </div>

    <div class="availability-time-blocks"></div>

    <button
      type="button"
      class="availability-add"
    >
      + Zeitraum hinzufügen
    </button>
  `;


  const blocksContainer =
    dayElement.querySelector(
      ".availability-time-blocks"
    );


  const activeCheckbox =
    dayElement.querySelector(
      ".availability-day-active"
    );


  const addButton =
    dayElement.querySelector(
      ".availability-add"
    );


  /* ========================================
     VORHANDENE ZEITBLÖCKE
     ======================================== */

  activeRows.forEach((row) => {
    blocksContainer.appendChild(
      createTimeBlock(
        row.start_time.slice(0, 5),
        row.end_time.slice(0, 5)
      )
    );
  });


  /* ========================================
     ZEITRAUM HINZUFÜGEN
     ======================================== */

  addButton.addEventListener("click", () => {
    blocksContainer.appendChild(
      createTimeBlock()
    );
  });


  /* ========================================
     AKTIV / INAKTIV
     ======================================== */

  function updateDayState() {
    if (activeCheckbox.checked) {

      dayElement.classList.remove(
        "availability-day-unavailable"
      );

      /*
       * Wenn der Tag aktiviert wird und
       * noch kein Zeitraum existiert,
       * automatisch 09:00–17:00 hinzufügen.
       */

      const blocks =
        blocksContainer.querySelectorAll(
          ".availability-time-block"
        );

      if (blocks.length === 0) {
        blocksContainer.appendChild(
          createTimeBlock()
        );
      }

    } else {

      dayElement.classList.add(
        "availability-day-unavailable"
      );
    }
  }


  activeCheckbox.addEventListener(
    "change",
    updateDayState
  );


  /*
   * Anfangszustand setzen.
   */

  updateDayState();


  return dayElement;
}


/* ========================================
   VERFÜGBARKEIT LADEN
   ======================================== */

async function loadAvailability() {
  hideMessage();

  if (!daysContainer) {
    console.error(
      "Element #availability-days wurde nicht gefunden."
    );

    return;
  }


  const {
    data,
    error
  } = await supabase
    .from("availability")
    .select(`
      id,
      weekday,
      start_time,
      end_time,
      active
    `)
    .order(
      "weekday",
      {
        ascending: true
      }
    )
    .order(
      "start_time",
      {
        ascending: true
      }
    );


  if (error) {

    console.error(
      "Verfügbarkeit konnte nicht geladen werden:",
      error
    );

    showMessage(
      "Die Verfügbarkeit konnte nicht geladen werden.",
      "error"
    );

    return;
  }


  console.log(
    "Verfügbarkeit geladen:",
    data
  );


  const availabilityRows =
    data ?? [];


  daysContainer.innerHTML = "";


  weekdays.forEach((day) => {

    daysContainer.appendChild(
      createWeekday(
        day,
        availabilityRows
      )
    );

  });
}


/* ========================================
   ZEIT IN MINUTEN UMWANDELN
   ======================================== */

function timeToMinutes(time) {
  const [
    hours,
    minutes
  ] = time
    .split(":")
    .map(Number);

  return (
    hours * 60 +
    minutes
  );
}


/* ========================================
   FORMULAR AUSLESEN
   ======================================== */

function collectAvailability() {
  const result = [];


  const dayElements =
    daysContainer.querySelectorAll(
      ".availability-day"
    );


  dayElements.forEach(
    (dayElement, index) => {

      const weekday =
        index + 1;


      const activeCheckbox =
        dayElement.querySelector(
          ".availability-day-active"
        );


      const active =
        activeCheckbox.checked;


      const blocks =
        dayElement.querySelectorAll(
          ".availability-time-block"
        );


      blocks.forEach((block) => {

        const startInput =
          block.querySelector(
            ".availability-time-start"
          );


        const endInput =
          block.querySelector(
            ".availability-time-end"
          );


        result.push({
          weekday,
          start_time:
            startInput.value,
          end_time:
            endInput.value,
          active,
        });

      });

    }
  );


  return result;
}


/* ========================================
   VALIDIERUNG
   ======================================== */

function validateAvailability(rows) {

  /*
   * 1. Jeden einzelnen Zeitraum prüfen.
   */

  for (const row of rows) {

    /*
     * Inaktive Tage werden nicht gespeichert.
     */

    if (!row.active) {
      continue;
    }


    if (
      !row.start_time ||
      !row.end_time
    ) {

      return {
        valid: false,
        message:
          "Bitte fülle alle Zeiträume vollständig aus.",
      };

    }


    const start =
      timeToMinutes(
        row.start_time
      );


    const end =
      timeToMinutes(
        row.end_time
      );


    /*
     * Start muss vor Ende liegen.
     */

    if (start >= end) {

      return {
        valid: false,
        message:
          "Die Startzeit muss vor der Endzeit liegen.",
      };

    }

  }


  /*
   * 2. Überschneidungen prüfen.
   */

  for (const day of weekdays) {

    const dayRows =
      rows
        .filter(
          (row) =>
            row.weekday === day.id &&
            row.active
        )
        .sort(
          (a, b) =>
            timeToMinutes(
              a.start_time
            ) -
            timeToMinutes(
              b.start_time
            )
        );


    for (
      let i = 0;
      i < dayRows.length - 1;
      i++
    ) {

      const current =
        dayRows[i];

      const next =
        dayRows[i + 1];


      const currentEnd =
        timeToMinutes(
          current.end_time
        );


      const nextStart =
        timeToMinutes(
          next.start_time
        );


      if (
        currentEnd > nextStart
      ) {

        return {
          valid: false,
          message:
            `Die Zeiträume am ${day.name} überschneiden sich.`,
        };

      }

    }

  }


  /*
   * Alles korrekt.
   */

  return {
    valid: true,
  };
}


/* ========================================
   SPEICHERN
   ======================================== */

async function saveAvailability() {

  hideMessage();


  if (!saveButton) {
    return;
  }


  const rows =
    collectAvailability();


  /*
   * Eingaben validieren.
   */

  const validation =
    validateAvailability(rows);


  if (!validation.valid) {

    showMessage(
      validation.message,
      "error"
    );

    return;
  }


  /*
   * Button sperren.
   */

  saveButton.disabled = true;

  saveButton.textContent =
    "Wird gespeichert...";


  try {

    /*
     * Alte Verfügbarkeit löschen.
     */

    const {
      error: deleteError
    } = await supabase
      .from("availability")
      .delete()
      .neq(
        "id",
        "00000000-0000-0000-0000-000000000000"
      );


    if (deleteError) {
      throw deleteError;
    }


    /*
     * Nur aktive Zeiträume speichern.
     */

    const activeRows =
      rows.filter(
        (row) =>
          row.active === true
      );


    if (activeRows.length > 0) {

      const {
        error: insertError
      } = await supabase
        .from("availability")
        .insert(
          activeRows.map(
            (row) => ({
              weekday:
                row.weekday,

              start_time:
                row.start_time,

              end_time:
                row.end_time,

              active: true,
            })
          )
        );


      if (insertError) {
        throw insertError;
      }
    }


    /*
     * Erfolg.
     */

    showMessage(
      "✓ Verfügbarkeit gespeichert.",
      "success"
    );


    console.log(
      "Gespeicherte Verfügbarkeit:",
      activeRows
    );

  } catch (error) {

    console.error(
      "Verfügbarkeit konnte nicht gespeichert werden:",
      error
    );


    /*
     * RLS-Fehler verständlicher anzeigen.
     */

    if (error?.code === "42501") {

      showMessage(
        "Keine Berechtigung zum Speichern der Verfügbarkeit.",
        "error"
      );

    } else {

      showMessage(
        "Die Änderungen konnten nicht gespeichert werden.",
        "error"
      );

    }

  } finally {

    saveButton.disabled = false;

    saveButton.textContent =
      "Änderungen speichern";

  }
}


/* ========================================
   EVENTS
   ======================================== */

if (saveButton) {

  saveButton.addEventListener(
    "click",
    saveAvailability
  );

}


/* ========================================
   START
   ======================================== */

loadAvailability();