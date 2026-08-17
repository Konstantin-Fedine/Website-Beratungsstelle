
============================================================
DATEI: admin\css\blocked-times.css
============================================================

/* ========================================
   BLOCKED TIMES CONTENT
   ======================================== */

.blocked-times-content {
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;

  padding: 35px 40px;
}


/* ========================================
   HEADER
   ======================================== */

.blocked-times-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 24px;

  margin-bottom: 28px;
}

.blocked-times-header h2 {
  margin: 0;

  color: var(--color-dark);

  font-size: 1.7rem;
  font-weight: 700;
}

.blocked-times-header p {
  max-width: 680px;

  margin: 6px 0 0;

  color: var(--color-text-muted);

  font-size: 0.95rem;
  line-height: 1.5;
}


/* ========================================
   ADD BUTTON
   ======================================== */

.blocked-times-add-button {
  min-height: 44px;

  padding: 11px 18px;

  flex-shrink: 0;

  border: none;
  border-radius: var(--radius);

  background: var(--color-primary);

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.88rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.blocked-times-add-button:hover {
  transform: translateY(-1px);

  box-shadow:
    0 5px 12px rgba(212, 178, 149, 0.25);
}

.blocked-times-add-button:active {
  transform: translateY(0);
}


/* ========================================
   MESSAGE
   ======================================== */

.blocked-times-message {
  margin-bottom: 20px;

  padding: 13px 16px;

  border-radius: var(--radius);

  font-size: 0.88rem;
  font-weight: 600;
}

.blocked-times-message.success {
  border: 1px solid rgba(80, 140, 100, 0.22);

  background: rgba(80, 140, 100, 0.08);

  color: #3d704d;
}

.blocked-times-message.error {
  border: 1px solid rgba(180, 80, 80, 0.22);

  background: rgba(180, 80, 80, 0.08);

  color: #8a3d3d;
}


/* ========================================
   STATES
   ======================================== */

.blocked-times-state {
  padding: 46px 20px;

  border: 1px solid var(--admin-border);
  border-radius: var(--radius);

  background: var(--admin-surface);

  text-align: center;

  color: var(--color-text-muted);
}

.blocked-times-state p {
  margin: 0;
}

.blocked-times-state-error {
  border-color: rgba(180, 80, 80, 0.2);

  background: rgba(180, 80, 80, 0.05);

  color: #8a3d3d;
}

.blocked-times-empty-button {
  margin-top: 14px;

  padding: 9px 14px;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  background: transparent;

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;

  cursor: pointer;
}


/* ========================================
   LIST
   ======================================== */

.blocked-times-list {
  display: flex;
  flex-direction: column;

  gap: 12px;
}


/* ========================================
   CARD
   ======================================== */

.blocked-time-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 24px;

  padding: 20px 22px;

  background: var(--admin-surface);

  border: 1px solid var(--admin-border);
  border-radius: var(--radius);

  box-shadow:
    0 4px 14px rgba(42, 36, 33, 0.04);

  transition:
    transform var(--transition),
    box-shadow var(--transition),
    border-color var(--transition);
}

.blocked-time-card:hover {
  transform: translateY(-1px);

  border-color: rgba(42, 36, 33, 0.12);

  box-shadow:
    0 7px 20px rgba(42, 36, 33, 0.07);
}

.blocked-time-card-main {
  min-width: 0;
}

.blocked-time-card-title {
  margin: 0;

  color: var(--color-dark);

  font-size: 0.98rem;
  font-weight: 700;
}

.blocked-time-card-date {
  margin-top: 5px;

  color: var(--color-text-muted);

  font-size: 0.86rem;
}

.blocked-time-card-meta {
  margin-top: 7px;

  color: var(--color-text-muted);

  font-size: 0.8rem;
}

.blocked-time-card-actions {
  display: flex;
  align-items: center;

  gap: 8px;

  flex-shrink: 0;
}


/* ========================================
   TYPE BADGE
   ======================================== */

.blocked-time-type {
  display: inline-flex;
  align-items: center;

  padding: 5px 9px;

  margin-bottom: 8px;

  border-radius: 999px;

  font-size: 0.72rem;
  font-weight: 700;
}

.blocked-time-type-day {
  background: rgba(212, 178, 149, 0.18);

  color: var(--color-dark);
}

.blocked-time-type-time {
  background: rgba(80, 110, 150, 0.12);

  color: #3d5e82;
}


/* ========================================
   CARD BUTTONS
   ======================================== */

.blocked-time-action {
  min-height: 36px;

  padding: 8px 12px;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  background: transparent;

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    background var(--transition),
    border-color var(--transition);
}

.blocked-time-action:hover {
  background: rgba(42, 36, 33, 0.04);
}

.blocked-time-action-danger {
  border-color: rgba(180, 80, 80, 0.25);

  color: #8a3d3d;
}

.blocked-time-action-danger:hover {
  background: rgba(180, 80, 80, 0.08);

  border-color: rgba(180, 80, 80, 0.4);
}


/* ========================================
   MODAL
   ======================================== */

.blocked-time-modal {
  position: fixed;

  inset: 0;

  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;
}

.blocked-time-modal[hidden] {
  display: none;
}

.blocked-time-modal-backdrop {
  position: absolute;

  inset: 0;

  background: rgba(42, 36, 33, 0.42);

  backdrop-filter: blur(3px);
}

.blocked-time-modal-dialog {
  position: relative;

  z-index: 1;

  width: min(620px, 100%);

  max-height: calc(100vh - 48px);

  overflow-y: auto;

  background: var(--admin-surface);

  border: 1px solid var(--admin-border);

  border-radius: var(--radius);

  box-shadow:
    0 24px 70px rgba(42, 36, 33, 0.2);
}


/* ========================================
   MODAL HEADER
   ======================================== */

.blocked-time-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 20px;

  padding: 24px 26px;

  border-bottom: 1px solid var(--admin-border);
}

.blocked-time-modal-header h2 {
  margin: 0;

  color: var(--color-dark);

  font-size: 1.2rem;
  font-weight: 700;
}

.blocked-time-modal-header p {
  margin: 5px 0 0;

  color: var(--color-text-muted);

  font-size: 0.84rem;
}

.blocked-time-modal-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  flex-shrink: 0;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  background: transparent;

  color: var(--color-dark);

  font-family: inherit;
  font-size: 1.3rem;

  line-height: 1;

  cursor: pointer;
}

.blocked-time-modal-close:hover {
  background: rgba(42, 36, 33, 0.05);
}


/* ========================================
   FORM
   ======================================== */

.blocked-time-form {
  display: flex;
  flex-direction: column;

  gap: 20px;

  padding: 26px;
}

.blocked-time-fieldset {
  margin: 0;

  padding: 0;

  border: none;
}

.blocked-time-fieldset legend {
  margin-bottom: 12px;

  color: var(--color-dark);

  font-size: 0.85rem;
  font-weight: 700;
}

.blocked-time-type-options {
  display: flex;
  flex-wrap: wrap;

  gap: 12px;
}

.blocked-time-radio {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  padding: 10px 12px;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  color: var(--color-dark);

  font-size: 0.84rem;
  font-weight: 600;

  cursor: pointer;
}

.blocked-time-radio input {
  margin: 0;

  accent-color: var(--color-primary);

  cursor: pointer;
}


/* ========================================
   FIELDS
   ======================================== */

.blocked-time-fields {
  display: flex;
  flex-direction: column;

  gap: 14px;
}

.blocked-time-field-row {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 14px;
}

.blocked-time-field {
  display: flex;
  flex-direction: column;

  gap: 7px;
}

.blocked-time-field label {
  color: var(--color-dark);

  font-size: 0.82rem;
  font-weight: 700;
}

.blocked-time-field input {
  width: 100%;

  min-height: 42px;

  padding: 10px 12px;

  box-sizing: border-box;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  background: var(--color-surface);

  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.88rem;

  outline: none;

  transition:
    border-color var(--transition),
    box-shadow var(--transition);
}

.blocked-time-field input:focus {
  border-color: var(--color-primary);

  box-shadow:
    0 0 0 3px rgba(212, 178, 149, 0.15);
}

.blocked-time-field input::placeholder {
  color: var(--color-text-muted);
}


/* ========================================
   FORM ERROR
   ======================================== */

.blocked-time-form-error {
  margin: 0;

  padding: 11px 13px;

  border: 1px solid rgba(180, 80, 80, 0.2);
  border-radius: 8px;

  background: rgba(180, 80, 80, 0.06);

  color: #8a3d3d;

  font-size: 0.82rem;

  line-height: 1.45;
}

/* ========================================
   FORM INPUTS
   ======================================== */

.blocked-time-field input {
  width: 100%;
  min-height: 42px;
  padding: 10px 12px;
  box-sizing: border-box;

  border: 1px solid var(--admin-border);
  border-radius: 8px;

  background: var(--color-surface);
  color: var(--color-dark);

  font-family: inherit;
  font-size: 0.88rem;

  outline: none;

  transition:
    border-color var(--transition),
    box-shadow var(--transition);
}

.blocked-time-field input:focus {
  border-color: var(--color-primary);

  box-shadow:
    0 0 0 3px rgba(212, 178, 149, 0.15);
}

.blocked-time-field input::placeholder {
  color: var(--color-text-muted);
}


/* ========================================
   EINHEITLICHE DATUMSFELDER
   ======================================== */

.blocked-date-input {
  width: 100%;
}

.blocked-date-input::-webkit-datetime-edit {
  padding: 0;
}

.blocked-date-input::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

.blocked-date-input::-webkit-calendar-picker-indicator {
  margin-left: auto;
  cursor: pointer;
  opacity: 0.7;
}

.blocked-date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}


/* ========================================
   EINHEITLICHE ZEITFELDER
   ======================================== */

.blocked-time-input {
  width: 100%;
}

.blocked-time-input::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.7;
}

.blocked-time-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}


/* ========================================
   MODAL ACTIONS
   ======================================== */

.blocked-time-modal-actions {
  display: flex;
  justify-content: flex-end;

  gap: 9px;

  padding-top: 4px;
}

.blocked-time-secondary-button,
.blocked-time-primary-button {
  min-height: 42px;

  padding: 10px 16px;

  border-radius: 8px;

  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 700;

  cursor: pointer;
}

.blocked-time-secondary-button {
  border: 1px solid var(--admin-border);

  background: transparent;

  color: var(--color-dark);
}

.blocked-time-secondary-button:hover {
  background: rgba(42, 36, 33, 0.04);
}

.blocked-time-primary-button {
  border: none;

  background: var(--color-primary);

  color: var(--color-dark);
}

.blocked-time-primary-button:hover {
  box-shadow:
    0 5px 12px rgba(212, 178, 149, 0.2);
}

.blocked-time-primary-button:disabled,
.blocked-time-secondary-button:disabled {
  opacity: 0.6;

  cursor: not-allowed;
}


/* ========================================
   SCROLLSPERRE
   ======================================== */

body.blocked-time-modal-open {
  overflow: hidden;
}


/* ========================================
   TABLET
   ======================================== */

@media (max-width: 800px) {

  .blocked-times-content {
    padding: 28px 24px;
  }

  .blocked-times-header {
    align-items: stretch;
    flex-direction: column;
  }

  .blocked-times-add-button {
    width: fit-content;
  }
}


/* ========================================
   MOBILE
   ======================================== */

@media (max-width: 600px) {

  .blocked-times-content {
    padding: 24px 18px;
  }

  .blocked-times-header h2 {
    font-size: 1.45rem;
  }

  .blocked-times-add-button {
    width: 100%;
  }

  .blocked-time-card {
    align-items: flex-start;

    flex-direction: column;

    gap: 16px;

    padding: 18px;
  }

  .blocked-time-card-actions {
    width: 100%;
  }

  .blocked-time-action {
    flex: 1;
  }

  .blocked-time-modal {
    align-items: flex-end;

    padding: 0;
  }

  .blocked-time-modal-dialog {
    width: 100%;

    max-height: 92vh;

    border-radius: 18px 18px 0 0;
  }

  .blocked-time-modal-header,
  .blocked-time-form {
    padding: 20px;
  }

  .blocked-time-field-row {
    grid-template-columns: 1fr;
  }

  .blocked-time-modal-actions {
    flex-direction: column-reverse;
  }

  .blocked-time-primary-button,
  .blocked-time-secondary-button {
    width: 100%;
  }
}


/* ========================================
   VERY SMALL PHONES
   ======================================== */

@media (max-width: 400px) {

  .blocked-times-content {
    padding: 20px 14px;
  }

  .blocked-time-modal-header,
  .blocked-time-form {
    padding: 16px;
  }

  .blocked-time-card {
    padding: 16px;
  }
}


============================================================
DATEI: admin\js\blocked-times.js
============================================================

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


============================================================
DATEI: admin\pages\blocked-times.html
============================================================

<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />

    <title>Sperrzeiten | Aufwind Beratung</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />

    <link rel="stylesheet" href="../../css/global.css" />
    <link rel="stylesheet" href="../css/admin.css" />
    <link rel="stylesheet" href="../css/blocked-times.css" />
  </head>

  <body>
    <div class="admin-layout" id="adminLayout">

      <!-- SIDEBAR -->

      <aside class="admin-sidebar" id="adminSidebar">

        <div class="sidebar-header">

          <a
            href="dashboard.html"
            class="sidebar-logo"
          >
            <span class="sidebar-logo-mark">A</span>
            <span class="sidebar-logo-text">Aufwind</span>
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


        <nav
          class="sidebar-navigation"
          aria-label="Admin-Navigation"
        >

          <a
            href="dashboard.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">⌂</span>
            <span class="sidebar-link-text">Dashboard</span>
          </a>

          <a
            href="bookings.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">▣</span>
            <span class="sidebar-link-text">Termine</span>
          </a>

          <a
            href="availability.html"
            class="sidebar-link"
          >
            <span class="sidebar-icon">◷</span>
            <span class="sidebar-link-text">Verfügbarkeit</span>
          </a>

          <a
            href="blocked-times.html"
            class="sidebar-link active"
          >
            <span class="sidebar-icon">⊘</span>
            <span class="sidebar-link-text">Sperrzeiten</span>
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
            <span class="sidebar-link-text">Einstellungen</span>
          </a>

        </nav>


        <div class="sidebar-bottom">

          <a
            href="/"
            class="sidebar-link sidebar-public-link"
          >
            <span class="sidebar-icon">↗</span>
            <span class="sidebar-link-text">Zur Website</span>
          </a>

          <button
            type="button"
            class="sidebar-link sidebar-logout"
            id="logoutButton"
          >
            <span class="sidebar-icon">↪</span>
            <span class="sidebar-link-text">Abmelden</span>
          </button>

        </div>

      </aside>


      <!-- MOBILE OVERLAY -->

      <div
        class="sidebar-overlay"
        id="sidebarOverlay"
      ></div>


      <!-- MAIN -->

      <main class="admin-main">

        <!-- TOPBAR -->

        <!-- TOPBAR -->

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
              <h1>Sperrzeiten</h1>
              <p>Zeiten und Tage für Buchungen sperren</p>
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


        <!-- CONTENT -->

        <section class="blocked-times-content">

          <div class="blocked-times-header">

            <div>
              <h2>Sperrzeiten</h2>

              <p>
                Verwalte ganze Tage und einzelne Zeiten,
                an denen keine Buchungen möglich sein sollen.
              </p>
            </div>

            <button
              type="button"
              class="blocked-times-add-button"
              id="add-blocked-time-button"
            >
              + Sperrzeit hinzufügen
            </button>

          </div>


          <!-- MESSAGE -->

          <div
            id="blocked-times-message"
            class="blocked-times-message"
            hidden
            role="status"
            aria-live="polite"
          ></div>


          <!-- LOADING -->

          <div
            id="blocked-times-loading"
            class="blocked-times-state"
          >
            <p>Sperrzeiten werden geladen...</p>
          </div>


          <!-- EMPTY -->

          <div
            id="blocked-times-empty"
            class="blocked-times-state"
            hidden
          >
            <p>Keine Sperrzeiten vorhanden.</p>

            <button
              type="button"
              class="blocked-times-empty-button"
              id="empty-add-blocked-time"
            >
              + Sperrzeit hinzufügen
            </button>
          </div>


          <!-- ERROR -->

          <div
            id="blocked-times-error"
            class="blocked-times-state blocked-times-state-error"
            hidden
          >
            <p>
              Die Sperrzeiten konnten nicht geladen werden.
            </p>

            <button
              type="button"
              class="blocked-times-empty-button"
              id="retry-blocked-times"
            >
              Erneut versuchen
            </button>
          </div>


          <!-- LIST -->

          <div
            id="blocked-times-list"
            class="blocked-times-list"
          ></div>

        </section>

      </main>

    </div>


    <!-- ==================================================
         MODAL
         ================================================== -->

    <div
      class="blocked-time-modal"
      id="blocked-time-modal"
      hidden
    >

      <div
        class="blocked-time-modal-backdrop"
        data-modal-close
      ></div>

      <div
        class="blocked-time-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blocked-time-modal-title"
      >

        <div class="blocked-time-modal-header">

          <div>
            <h2 id="blocked-time-modal-title">
              Neue Sperrzeit hinzufügen
            </h2>

            <p>
              Lege fest, wann keine Termine gebucht werden können.
            </p>
          </div>

          <button
            type="button"
            class="blocked-time-modal-close"
            id="blocked-time-modal-close"
            aria-label="Modal schließen"
          >
            ×
          </button>

        </div>


        <form
          id="blocked-time-form"
          class="blocked-time-form"
        >

          <input
            type="hidden"
            id="blocked-time-edit-id"
          />

          <input
            type="hidden"
            id="blocked-time-edit-type"
          />

          <!-- ART -->

          <fieldset class="blocked-time-fieldset">

            <legend>Art der Sperrzeit</legend>

            <div class="blocked-time-type-options">

              <label class="blocked-time-radio">

                <input
                  type="radio"
                  name="blocked-time-type"
                  value="day"
                  checked
                />

                <span>
                  Ganzer Tag / Zeitraum
                </span>

              </label>

              <label class="blocked-time-radio">

                <input
                  type="radio"
                  name="blocked-time-type"
                  value="time"
                />

                <span>
                  Bestimmte Uhrzeit
                </span>

              </label>

            </div>

          </fieldset>


          <!-- GANZER TAG -->

          <div
            id="blocked-day-fields"
            class="blocked-time-fields"
          >

            <div class="blocked-time-field-row">

              <div class="blocked-time-field">

                <label for="blocked-day-from">
                  Von
                </label>

                <input
                  type="date"
                  id="blocked-day-from"
                  class="blocked-date-input"
                  required
                />

              </div>


              <div class="blocked-time-field">

                <label for="blocked-day-to">
                  Bis
                </label>

                <input
                  type="date"
                  id="blocked-day-to"
                  class="blocked-date-input"
                  required
                />

              </div>

            </div>

          </div>


          <!-- BESTIMMTE UHRZEIT -->

          <div
            id="blocked-time-fields"
            class="blocked-time-fields"
            hidden
          >

            <div class="blocked-time-field">

              <label for="blocked-time-date">
                Datum
              </label>

              <input
                type="date"
                id="blocked-time-date"
                class="blocked-date-input"
              />

            </div>


            <div class="blocked-time-field-row">

              <div class="blocked-time-field">

                <label for="blocked-time-start">
                  Von
                </label>

                <input
                  type="time"
                  id="blocked-time-start"
                  class="blocked-time-input"
                />

              </div>


              <div class="blocked-time-field">

                <label for="blocked-time-end">
                  Bis
                </label>

                <input
                  type="time"
                  id="blocked-time-end"
                  class="blocked-time-input"
                />

              </div>

            </div>

          </div>


          <!-- GRUND -->

          <div class="blocked-time-field">

            <label for="blocked-time-reason">
              Grund
            </label>

            <input
              type="text"
              id="blocked-time-reason"
              maxlength="200"
              placeholder="z. B. Urlaub"
            />

          </div>


          <!-- VALIDATION -->

          <p
            id="blocked-time-form-error"
            class="blocked-time-form-error"
            role="alert"
            aria-live="assertive"
            hidden
          ></p>


          <!-- ACTIONS -->

          <div class="blocked-time-modal-actions">

            <button
              type="button"
              class="blocked-time-secondary-button"
              id="blocked-time-cancel"
            >
              Abbrechen
            </button>

            <button
              type="submit"
              class="blocked-time-primary-button"
              id="blocked-time-save"
            >
              Speichern
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- JAVASCRIPT -->

    <script
      type="module"
      src="../js/auth.js"
    ></script>

    <script src="../js/admin-layout.js"></script>

    <script
      type="module"
      src="../js/blocked-times.js"
    ></script>

  </body>
</html>

