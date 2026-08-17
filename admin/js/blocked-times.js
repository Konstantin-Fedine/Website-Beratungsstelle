import { supabase } from "../../js/supabase.js";

/* ========================================
   ELEMENTE
   ======================================== */

const listElement =
  document.getElementById("blocked-times-list");

const loadingElement =
  document.getElementById("blocked-times-loading");

const emptyElement =
  document.getElementById("blocked-times-empty");

const errorElement =
  document.getElementById("blocked-times-error");

const messageElement =
  document.getElementById("blocked-times-message");

const addButton =
  document.getElementById("add-blocked-time-button");

const emptyAddButton =
  document.getElementById("empty-add-blocked-time");

const retryButton =
  document.getElementById("retry-blocked-times");

const modal =
  document.getElementById("blocked-time-modal");

const modalTitle =
  document.getElementById("blocked-time-modal-title");

const modalCloseButton =
  document.getElementById("blocked-time-modal-close");

const modalCancelButton =
  document.getElementById("blocked-time-cancel");

const form =
  document.getElementById("blocked-time-form");

const saveButton =
  document.getElementById("blocked-time-save");

const formError =
  document.getElementById("blocked-time-form-error");

const editIdInput =
  document.getElementById("blocked-time-edit-id");

const editTypeInput =
  document.getElementById("blocked-time-edit-type");

const dayFields =
  document.getElementById("blocked-day-fields");

const timeFields =
  document.getElementById("blocked-time-fields");

const dayFromInput =
  document.getElementById("blocked-day-from");

const dayToInput =
  document.getElementById("blocked-day-to");

const timeDateInput =
  document.getElementById("blocked-time-date");

const timeStartInput =
  document.getElementById("blocked-time-start");

const timeEndInput =
  document.getElementById("blocked-time-end");

const reasonInput =
  document.getElementById("blocked-time-reason");

const typeInputs =
  document.querySelectorAll(
    'input[name="blocked-time-type"]'
  );


/* ========================================
   DATEN
   ======================================== */

let blockedDays = [];
let blockedTimes = [];


/* ========================================
   HILFSFUNKTIONEN
   ======================================== */

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function parseISODate(dateString) {
  if (!dateString) {
    return null;
  }

  const date =
    new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}


function formatDate(dateString) {
  const date =
    parseISODate(dateString);

  if (!date) {
    return "–";
  }

  return date.toLocaleDateString(
    "de-DE",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
}


function formatTime(timeString) {
  if (!timeString) {
    return "–";
  }

  return timeString.slice(0, 5);
}


function formatDateInput(date) {
  const year =
    date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(date.getDate())
      .padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/* ========================================
   NACHRICHTEN
   ======================================== */

function showMessage(message, type) {
  if (!messageElement) {
    return;
  }

  messageElement.textContent =
    message;

  messageElement.className =
    `blocked-times-message ${type}`;

  messageElement.hidden = false;
}


function hideMessage() {
  if (!messageElement) {
    return;
  }

  messageElement.hidden = true;

  messageElement.textContent = "";

  messageElement.className =
    "blocked-times-message";
}


function showFormError(message) {
  if (!formError) {
    return;
  }

  formError.textContent =
    message;

  formError.hidden = false;
}


function hideFormError() {
  if (!formError) {
    return;
  }

  formError.textContent = "";

  formError.hidden = true;
}


/* ========================================
   ZUSTÄNDE
   ======================================== */

function showLoading() {
  loadingElement.hidden = false;
  emptyElement.hidden = true;
  errorElement.hidden = true;

  listElement.innerHTML = "";
}


function showEmpty() {
  loadingElement.hidden = true;
  emptyElement.hidden = false;
  errorElement.hidden = true;

  listElement.innerHTML = "";
}


function showErrorState() {
  loadingElement.hidden = true;
  emptyElement.hidden = true;
  errorElement.hidden = false;

  listElement.innerHTML = "";
}


function showList() {
  loadingElement.hidden = true;
  emptyElement.hidden = true;
  errorElement.hidden = true;
}


/* ========================================
   MODAL
   ======================================== */

function getSelectedType() {
  const selected =
    document.querySelector(
      'input[name="blocked-time-type"]:checked'
    );

  return selected?.value ?? "day";
}


function setSelectedType(type) {
  typeInputs.forEach((input) => {
    input.checked =
      input.value === type;
  });

  updateTypeFields();
}


function updateTypeFields() {
  const type =
    getSelectedType();

  if (type === "day") {

    dayFields.hidden = false;
    timeFields.hidden = true;

    dayFromInput.required = true;
    dayToInput.required = true;

    timeDateInput.required = false;
    timeStartInput.required = false;
    timeEndInput.required = false;

  } else {

    dayFields.hidden = true;
    timeFields.hidden = false;

    dayFromInput.required = false;
    dayToInput.required = false;

    timeDateInput.required = true;
    timeStartInput.required = true;
    timeEndInput.required = true;
  }
}


function openCreateModal() {
  form.reset();

  editIdInput.value = "";
  editTypeInput.value = "";

  modalTitle.textContent =
    "Neue Sperrzeit hinzufügen";

  saveButton.textContent =
    "Speichern";

  hideFormError();

  setSelectedType("day");

  const today =
    formatDateInput(new Date());

  dayFromInput.value =
    today;

  dayToInput.value =
    today;

  timeDateInput.value =
    today;

  modal.hidden = false;

  document.body.classList.add(
    "blocked-time-modal-open"
  );

  requestAnimationFrame(() => {
    dayFromInput.focus();
  });
}


function openEditDayModal(entry) {
  form.reset();

  hideFormError();

  editIdInput.value =
    entry.id;

  editTypeInput.value =
    "day";

  modalTitle.textContent =
    "Sperrzeit bearbeiten";

  saveButton.textContent =
    "Änderungen speichern";

  setSelectedType("day");

  dayFromInput.value =
    entry.start_date;

  dayToInput.value =
    entry.end_date;

  reasonInput.value =
    entry.reason ?? "";

  modal.hidden = false;

  document.body.classList.add(
    "blocked-time-modal-open"
  );

  requestAnimationFrame(() => {
    dayFromInput.focus();
  });
}


function openEditTimeModal(entry) {
  form.reset();

  hideFormError();

  editIdInput.value =
    entry.id;

  editTypeInput.value =
    "time";

  modalTitle.textContent =
    "Sperrzeit bearbeiten";

  saveButton.textContent =
    "Änderungen speichern";

  setSelectedType("time");

  timeDateInput.value =
    entry.date;

  timeStartInput.value =
    formatTime(entry.start_time);

  timeEndInput.value =
    formatTime(entry.end_time);

  reasonInput.value =
    entry.reason ?? "";

  modal.hidden = false;

  document.body.classList.add(
    "blocked-time-modal-open"
  );

  requestAnimationFrame(() => {
    timeDateInput.focus();
  });
}


function closeModal() {
  modal.hidden = true;

  document.body.classList.remove(
    "blocked-time-modal-open"
  );

  hideFormError();

  form.reset();

  editIdInput.value = "";
  editTypeInput.value = "";
}


/* ========================================
   VALIDIERUNG
   ======================================== */

function validateDayForm() {
  const startDate =
    dayFromInput.value;

  const endDate =
    dayToInput.value;

  if (!startDate || !endDate) {
    return "Bitte fülle Von und Bis aus.";
  }

  const start =
    parseISODate(startDate);

  const end =
    parseISODate(endDate);

  if (!start || !end) {
    return "Bitte gib gültige Daten ein.";
  }

  if (start > end) {
    return "Das Startdatum darf nicht nach dem Enddatum liegen.";
  }

  return null;
}


function validateTimeForm() {
  const date =
    timeDateInput.value;

  const start =
    timeStartInput.value;

  const end =
    timeEndInput.value;

  if (!date || !start || !end) {
    return "Bitte fülle Datum, Von und Bis aus.";
  }

  if (!parseISODate(date)) {
    return "Bitte gib ein gültiges Datum ein.";
  }

  if (start >= end) {
    return "Die Startzeit muss vor der Endzeit liegen.";
  }

  return null;
}


/* ========================================
   DATEN LADEN
   ======================================== */

async function loadBlockedTimes() {
  showLoading();
  hideMessage();

  const [
    blockedDaysResult,
    blockedTimesResult,
  ] = await Promise.all([
    supabase
      .from("blocked_days")
      .select(
        "id, created_at, start_date, end_date, reason"
      )
      .order(
        "start_date",
        { ascending: true }
      ),

    supabase
      .from("blocked_times")
      .select(
        "id, created_at, date, start_time, end_time, reason"
      )
      .order(
        "date",
        { ascending: true }
      )
      .order(
        "start_time",
        { ascending: true }
      ),
  ]);


  if (
    blockedDaysResult.error ||
    blockedTimesResult.error
  ) {

    console.error(
      "Sperrzeiten konnten nicht geladen werden:",
      {
        blockedDaysError:
          blockedDaysResult.error,

        blockedTimesError:
          blockedTimesResult.error,
      }
    );

    showErrorState();

    return;
  }


  blockedDays =
    blockedDaysResult.data ?? [];

  blockedTimes =
    blockedTimesResult.data ?? [];


  renderEntries();
}


/* ========================================
   EINTRÄGE DARSTELLEN
   ======================================== */

function renderEntries() {
  const entries = [
    ...blockedDays.map((entry) => ({
      type: "day",
      ...entry,
    })),

    ...blockedTimes.map((entry) => ({
      type: "time",
      ...entry,
    })),
  ];


  entries.sort((a, b) => {

    const dateA =
      a.type === "day"
        ? a.start_date
        : a.date;

    const dateB =
      b.type === "day"
        ? b.start_date
        : b.date;

    if (dateA !== dateB) {
      return dateA.localeCompare(dateB);
    }

    if (a.type === "day") {
      return -1;
    }

    if (b.type === "day") {
      return 1;
    }

    return a.start_time.localeCompare(
      b.start_time
    );
  });


  if (entries.length === 0) {
    showEmpty();
    return;
  }


  showList();


  listElement.innerHTML =
    entries.map((entry) => {

      if (entry.type === "day") {

        return `
          <article class="blocked-time-card">

            <div class="blocked-time-card-main">

              <h3 class="blocked-time-card-title">
                ${escapeHtml(
                  entry.reason ||
                  "Ganztägige Sperrzeit"
                )}
              </h3>

              <p class="blocked-time-card-date">
                ${escapeHtml(
                  formatDate(
                    entry.start_date
                  )
                )}
                ${
                  entry.start_date !==
                  entry.end_date
                    ? `
                      –
                      ${escapeHtml(
                        formatDate(
                          entry.end_date
                        )
                      )}
                    `
                    : ""
                }
              </p>

            </div>

            <div class="blocked-time-card-actions">

              <button
                type="button"
                class="blocked-time-action"
                data-action="edit-day"
                data-id="${escapeHtml(
                  entry.id
                )}"
              >
                Bearbeiten
              </button>

              <button
                type="button"
                class="blocked-time-action blocked-time-action-danger"
                data-action="delete-day"
                data-id="${escapeHtml(
                  entry.id
                )}"
              >
                Löschen
              </button>

            </div>

          </article>
        `;
      }


      return `
        <article class="blocked-time-card">

          <div class="blocked-time-card-main">

            <h3 class="blocked-time-card-title">
              ${escapeHtml(
                entry.reason ||
                "Gesperrte Zeit"
              )}
            </h3>

            <p class="blocked-time-card-date">
              ${escapeHtml(
                formatDate(entry.date)
              )}
              ·
              ${escapeHtml(
                formatTime(entry.start_time)
              )}
              –
              ${escapeHtml(
                formatTime(entry.end_time)
              )}
            </p>

          </div>

          <div class="blocked-time-card-actions">

            <button
              type="button"
              class="blocked-time-action"
              data-action="edit-time"
              data-id="${escapeHtml(
                entry.id
              )}"
            >
              Bearbeiten
            </button>

            <button
              type="button"
              class="blocked-time-action blocked-time-action-danger"
              data-action="delete-time"
              data-id="${escapeHtml(
                entry.id
              )}"
            >
              Löschen
            </button>

          </div>

        </article>
      `;
    }).join("");
}


/* ========================================
   SPEICHERN – GANZER TAG
   ======================================== */

async function createBlockedDay(
  startDate,
  endDate,
  reason
) {
  const { error } =
    await supabase
      .from("blocked_days")
      .insert({
        start_date: startDate,
        end_date: endDate,
        reason: reason || null,
      });

  if (error) {
    throw error;
  }
}


/* ========================================
   SPEICHERN – ZEIT
   ======================================== */

async function createBlockedTime(
  date,
  start,
  end,
  reason
) {
  const { error } =
    await supabase
      .from("blocked_times")
      .insert({
        date,
        start_time: start,
        end_time: end,
        reason: reason || null,
      });

  if (error) {
    throw error;
  }
}


/* ========================================
   FORMULAR SPEICHERN
   ======================================== */

async function handleFormSubmit(event) {
  event.preventDefault();

  hideFormError();

  const type =
    getSelectedType();

  const reason =
    reasonInput.value.trim();


  const validationError =
    type === "day"
      ? validateDayForm()
      : validateTimeForm();


  if (validationError) {
    showFormError(
      validationError
    );

    return;
  }


  saveButton.disabled = true;

  saveButton.textContent =
    editIdInput.value
      ? "Änderungen speichern..."
      : "Wird gespeichert...";


  try {

    const editId =
      editIdInput.value;

    const editType =
      editTypeInput.value;


    if (type === "day") {

      if (
        editType === "day" &&
        editId
      ) {

        const { error } =
          await supabase
            .from("blocked_days")
            .update({
              start_date:
                dayFromInput.value,

              end_date:
                dayToInput.value,

              reason:
                reason || null,
            })
            .eq(
              "id",
              editId
            );

        if (error) {
          throw error;
        }

      } else {

        await createBlockedDay(
          dayFromInput.value,
          dayToInput.value,
          reason
        );
      }

    } else {

      if (
        editType === "time" &&
        editId
      ) {

        const { error } =
          await supabase
            .from("blocked_times")
            .update({
              date:
                timeDateInput.value,

              start_time:
                timeStartInput.value,

              end_time:
                timeEndInput.value,

              reason:
                reason || null,
            })
            .eq(
              "id",
              editId
            );

        if (error) {
          throw error;
        }

      } else {

        await createBlockedTime(
          timeDateInput.value,
          timeStartInput.value,
          timeEndInput.value,
          reason
        );
      }
    }


    closeModal();

    await loadBlockedTimes();

    showMessage(
      "Sperrzeit gespeichert.",
      "success"
    );

  } catch (error) {

    console.error(
      "Sperrzeit konnte nicht gespeichert werden:",
      error
    );

    showFormError(
      "Die Sperrzeit konnte nicht gespeichert werden."
    );

  } finally {

    saveButton.disabled = false;

    saveButton.textContent =
      editIdInput.value
        ? "Änderungen speichern"
        : "Speichern";
  }
}


/* ========================================
   BEARBEITEN
   ======================================== */

function editDay(id) {
  const entry =
    blockedDays.find(
      (item) =>
        item.id === id
    );

  if (!entry) {
    return;
  }

  openEditDayModal(entry);
}


function editTime(id) {
  const entry =
    blockedTimes.find(
      (item) =>
        item.id === id
    );

  if (!entry) {
    return;
  }

  openEditTimeModal(entry);
}


/* ========================================
   LÖSCHEN
   ======================================== */

async function deleteDay(id) {
  const confirmed =
    window.confirm(
      "Möchtest du diese Sperrzeit wirklich löschen?"
    );

  if (!confirmed) {
    return;
  }


  try {

    const { error } =
      await supabase
        .from("blocked_days")
        .delete()
        .eq(
          "id",
          id
        );

    if (error) {
      throw error;
    }


    await loadBlockedTimes();

    showMessage(
      "Sperrzeit gelöscht.",
      "success"
    );

  } catch (error) {

    console.error(
      "Sperrzeit konnte nicht gelöscht werden:",
      error
    );

    showMessage(
      "Die Sperrzeit konnte nicht gelöscht werden.",
      "error"
    );
  }
}


async function deleteTime(id) {
  const confirmed =
    window.confirm(
      "Möchtest du diese Sperrzeit wirklich löschen?"
    );

  if (!confirmed) {
    return;
  }


  try {

    const { error } =
      await supabase
        .from("blocked_times")
        .delete()
        .eq(
          "id",
          id
        );

    if (error) {
      throw error;
    }


    await loadBlockedTimes();

    showMessage(
      "Sperrzeit gelöscht.",
      "success"
    );

  } catch (error) {

    console.error(
      "Sperrzeit konnte nicht gelöscht werden:",
      error
    );

    showMessage(
      "Die Sperrzeit konnte nicht gelöscht werden.",
      "error"
    );
  }
}


/* ========================================
   LISTEN-AKTIONEN
   ======================================== */

listElement?.addEventListener(
  "click",
  (event) => {

    const button =
      event.target.closest(
        "[data-action]"
      );

    if (!button) {
      return;
    }

    const action =
      button.dataset.action;

    const id =
      button.dataset.id;


    if (action === "edit-day") {
      editDay(id);
    }

    if (action === "delete-day") {
      deleteDay(id);
    }

    if (action === "edit-time") {
      editTime(id);
    }

    if (action === "delete-time") {
      deleteTime(id);
    }
  }
);


/* ========================================
   EVENTS
   ======================================== */

typeInputs.forEach(
  (input) => {
    input.addEventListener(
      "change",
      updateTypeFields
    );
  }
);


addButton?.addEventListener(
  "click",
  openCreateModal
);


emptyAddButton?.addEventListener(
  "click",
  openCreateModal
);


retryButton?.addEventListener(
  "click",
  loadBlockedTimes
);


modalCloseButton?.addEventListener(
  "click",
  closeModal
);


modalCancelButton?.addEventListener(
  "click",
  closeModal
);


modal?.addEventListener(
  "click",
  (event) => {

    if (
      event.target.matches(
        "[data-modal-close]"
      )
    ) {
      closeModal();
    }

  }
);


form?.addEventListener(
  "submit",
  handleFormSubmit
);


/* ========================================
   ESC
   ======================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      modal &&
      !modal.hidden
    ) {
      closeModal();
    }

  }
);


/* ========================================
   START
   ======================================== */

updateTypeFields();
loadBlockedTimes();