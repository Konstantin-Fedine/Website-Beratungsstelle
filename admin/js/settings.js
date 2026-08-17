import { supabase } from "../../js/supabase.js";

/* ========================================
   ELEMENTE
   ======================================== */

const loadingElement =
  document.getElementById("settings-loading");

const form =
  document.getElementById("settings-form");

const messageElement =
  document.getElementById("settings-message");

const saveButton =
  document.getElementById("settings-save");

const accountSection =
  document.getElementById("admin-account-section");

const adminEmailElement =
  document.getElementById("admin-email");

const changePasswordButton =
  document.getElementById("change-password");

const newPasswordInput =
  document.getElementById("new-password");

const passwordMessage =
  document.getElementById("password-message");


/* ========================================
   FORM-ELEMENTE
   ======================================== */

const bookingIntervalInput =
  document.getElementById("booking-interval");

const minimumNoticeHoursInput =
  document.getElementById("minimum-notice-hours");

const bookingAdvanceDaysInput =
  document.getElementById("booking-advance-days");

const notifyProviderNewBookingInput =
  document.getElementById("notify-provider-new-booking");

const notifyProviderCancellationInput =
  document.getElementById("notify-provider-cancellation");

const notifyProviderRescheduleInput =
  document.getElementById("notify-provider-reschedule");

const notifyCustomerConfirmationInput =
  document.getElementById("notify-customer-confirmation");

const notifyCustomerCancellationInput =
  document.getElementById("notify-customer-cancellation");

const notifyCustomerRescheduleInput =
  document.getElementById("notify-customer-reschedule");

const notifyCustomerReminderInput =
  document.getElementById("notify-customer-reminder");

const reminderHoursInput =
  document.getElementById("reminder-hours");

const organizationNameInput =
  document.getElementById("organization-name");

const contactEmailInput =
  document.getElementById("contact-email");

const timezoneInput =
  document.getElementById("timezone");


/* ========================================
   DATEN
   ======================================== */

let settingsId = null;


/* ========================================
   NACHRICHTEN
   ======================================== */

function showMessage(message, type) {
  messageElement.textContent = message;
  messageElement.className =
    `settings-message ${type}`;
  messageElement.hidden = false;
}

function hideMessage() {
  messageElement.textContent = "";
  messageElement.className =
    "settings-message";
  messageElement.hidden = true;
}


/* ========================================
   HILFSFUNKTIONEN
   ======================================== */

function getNumberValue(input) {
  return Number(input.value);
}

function isValidEmail(email) {
  if (!email) {
    return true;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ========================================
   FORMULAR BEFÜLLEN
   ======================================== */

function fillForm(settings) {
  bookingIntervalInput.value =
    String(settings.booking_interval ?? 60);

  minimumNoticeHoursInput.value =
    String(settings.minimum_notice_hours ?? 24);

  bookingAdvanceDaysInput.value =
    String(settings.booking_advance_days ?? 180);

  notifyProviderNewBookingInput.checked =
    Boolean(settings.notify_provider_new_booking);

  notifyProviderCancellationInput.checked =
    Boolean(settings.notify_provider_cancellation);

  notifyProviderRescheduleInput.checked =
    Boolean(settings.notify_provider_reschedule);

  notifyCustomerConfirmationInput.checked =
    Boolean(settings.notify_customer_confirmation);

  notifyCustomerCancellationInput.checked =
    Boolean(settings.notify_customer_cancellation);

  notifyCustomerRescheduleInput.checked =
    Boolean(settings.notify_customer_reschedule);

  notifyCustomerReminderInput.checked =
    Boolean(settings.notify_customer_reminder);

  reminderHoursInput.value =
    String(settings.reminder_hours ?? 24);

  organizationNameInput.value =
    settings.organization_name ?? "Aufwind Beratung";

  contactEmailInput.value =
    settings.contact_email ?? "";

  timezoneInput.value =
    settings.timezone ?? "Europe/Berlin";
}


/* ========================================
   VALIDIERUNG
   ======================================== */

function validateSettings() {
  const bookingInterval =
    getNumberValue(bookingIntervalInput);

  const minimumNoticeHours =
    getNumberValue(minimumNoticeHoursInput);

  const bookingAdvanceDays =
    getNumberValue(bookingAdvanceDaysInput);

  const reminderHours =
    getNumberValue(reminderHoursInput);

  const organizationName =
    organizationNameInput.value.trim();

  const contactEmail =
    contactEmailInput.value.trim();

  const timezone =
    timezoneInput.value.trim();

  if (![30, 60].includes(bookingInterval)) {
    return "Das Zeitraster muss 30 oder 60 Minuten betragen.";
  }

  if (
    !Number.isInteger(minimumNoticeHours) ||
    minimumNoticeHours < 0
  ) {
    return "Der Mindestvorlauf muss mindestens 0 Stunden betragen.";
  }

  if (
    !Number.isInteger(bookingAdvanceDays) ||
    bookingAdvanceDays <= 0
  ) {
    return "Die maximale Vorausbuchung muss größer als 0 Tage sein.";
  }

  if (
    !Number.isInteger(reminderHours) ||
    reminderHours <= 0
  ) {
    return "Die Erinnerungszeit muss größer als 0 Stunden sein.";
  }

  if (!organizationName) {
    return "Bitte gib den Namen der Beratungsstelle ein.";
  }

  if (!isValidEmail(contactEmail)) {
    return "Bitte gib eine gültige Kontakt-E-Mail-Adresse ein.";
  }

  if (!timezone) {
    return "Bitte gib eine Zeitzone ein.";
  }

  return null;
}


/* ========================================
   EINSTELLUNGEN LADEN
   ======================================== */

async function loadSettings() {
  loadingElement.hidden = false;
  form.hidden = true;
  accountSection.hidden = true;

  hideMessage();

  try {
    const {
      data,
      error,
    } = await supabase
      .from("settings")
      .select("*")
      .limit(1);

    if (error) {
      console.error(
        "Einstellungen konnten nicht geladen werden:",
        error
      );

      showMessage(
        "Die Einstellungen konnten gerade nicht geladen werden.",
        "error"
      );

      return;
    }

    let settings = data?.[0];

    /*
     * Falls noch keine Settings-Zeile existiert,
     * wird eine Standardkonfiguration angelegt.
     */

    if (!settings) {
      const {
        data: insertedSettings,
        error: insertError,
      } = await supabase
        .from("settings")
        .insert({
          booking_interval: 60,
          booking_advance_days: 180,
          minimum_notice_hours: 24,
          organization_name: "Aufwind Beratung",
          timezone: "Europe/Berlin",

          notify_provider_new_booking: true,
          notify_provider_cancellation: true,
          notify_provider_reschedule: true,

          notify_customer_confirmation: true,
          notify_customer_cancellation: true,
          notify_customer_reschedule: true,
          notify_customer_reminder: true,

          reminder_hours: 24,
        })
        .select("*")
        .single();

      if (insertError) {
        console.error(
          "Standardeinstellungen konnten nicht angelegt werden:",
          insertError
        );

        showMessage(
          "Die Einstellungen konnten gerade nicht eingerichtet werden.",
          "error"
        );

        return;
      }

      settings = insertedSettings;
    }

    settingsId = settings.id;

    fillForm(settings);

    loadingElement.hidden = true;
    form.hidden = false;

    await loadAdminAccount();

  } catch (error) {
    console.error(
      "Unbekannter Fehler beim Laden der Einstellungen:",
      error
    );

    showMessage(
      "Die Einstellungen konnten gerade nicht geladen werden.",
      "error"
    );
  }
}


/* ========================================
   SPEICHERN
   ======================================== */

async function handleFormSubmit(event) {
  event.preventDefault();

  hideMessage();

  const validationError =
    validateSettings();

  if (validationError) {
    showMessage(
      validationError,
      "error"
    );

    return;
  }

  if (!settingsId) {
    showMessage(
      "Die Einstellungen konnten nicht gespeichert werden.",
      "error"
    );

    return;
  }

  saveButton.disabled = true;
  saveButton.textContent =
    "Wird gespeichert...";

  try {
    const {
      error,
    } = await supabase
      .from("settings")
      .update({
        booking_interval:
          getNumberValue(bookingIntervalInput),

        booking_advance_days:
          getNumberValue(bookingAdvanceDaysInput),

        minimum_notice_hours:
          getNumberValue(minimumNoticeHoursInput),

        organization_name:
          organizationNameInput.value.trim(),

        contact_email:
          contactEmailInput.value.trim() || null,

        timezone:
          timezoneInput.value.trim(),

        notify_provider_new_booking:
          notifyProviderNewBookingInput.checked,

        notify_provider_cancellation:
          notifyProviderCancellationInput.checked,

        notify_provider_reschedule:
          notifyProviderRescheduleInput.checked,

        notify_customer_confirmation:
          notifyCustomerConfirmationInput.checked,

        notify_customer_cancellation:
          notifyCustomerCancellationInput.checked,

        notify_customer_reschedule:
          notifyCustomerRescheduleInput.checked,

        notify_customer_reminder:
          notifyCustomerReminderInput.checked,

        reminder_hours:
          getNumberValue(reminderHoursInput),

        updated_at:
          new Date().toISOString(),
      })
      .eq("id", settingsId);

    if (error) {
      console.error(
        "Einstellungen konnten nicht gespeichert werden:",
        error
      );

      showMessage(
        "Die Einstellungen konnten nicht gespeichert werden.",
        "error"
      );

      return;
    }

    showMessage(
      "Einstellungen gespeichert.",
      "success"
    );

  } catch (error) {
    console.error(
      "Unbekannter Fehler beim Speichern der Einstellungen:",
      error
    );

    showMessage(
      "Die Einstellungen konnten nicht gespeichert werden.",
      "error"
    );

  } finally {
    saveButton.disabled = false;
    saveButton.textContent =
      "Änderungen speichern";
  }
}


/* ========================================
   ADMIN-KONTO LADEN
   ======================================== */

async function loadAdminAccount() {
  const {
    data,
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(
      "Admin-Konto konnte nicht geladen werden:",
      error
    );

    return;
  }

  const user = data?.user;

  if (!user) {
    return;
  }

  adminEmailElement.textContent =
    user.email || "–";

  accountSection.hidden = false;
}


/* ========================================
   PASSWORT ÄNDERN
   ======================================== */

async function changePassword() {
  passwordMessage.hidden = true;
  passwordMessage.textContent = "";
  passwordMessage.className =
    "settings-help";

  const newPassword =
    newPasswordInput.value;

  if (!newPassword) {
    passwordMessage.textContent =
      "Bitte gib ein neues Passwort ein.";

    passwordMessage.classList.add("error");
    passwordMessage.hidden = false;

    return;
  }

  if (newPassword.length < 8) {
    passwordMessage.textContent =
      "Das neue Passwort muss mindestens 8 Zeichen enthalten.";

    passwordMessage.classList.add("error");
    passwordMessage.hidden = false;

    return;
  }

  changePasswordButton.disabled = true;
  changePasswordButton.textContent =
    "Wird geändert...";

  try {
    const {
      error,
    } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error(
        "Passwort konnte nicht geändert werden:",
        error
      );

      passwordMessage.textContent =
        "Das Passwort konnte nicht geändert werden.";

      passwordMessage.classList.add("error");
      passwordMessage.hidden = false;

      return;
    }

    newPasswordInput.value = "";

    passwordMessage.textContent =
      "Passwort erfolgreich geändert.";

    passwordMessage.classList.add("success");
    passwordMessage.hidden = false;

  } catch (error) {
    console.error(
      "Unbekannter Fehler beim Passwortändern:",
      error
    );

    passwordMessage.textContent =
      "Das Passwort konnte nicht geändert werden.";

    passwordMessage.classList.add("error");
    passwordMessage.hidden = false;

  } finally {
    changePasswordButton.disabled = false;
    changePasswordButton.textContent =
      "Passwort ändern";
  }
}


/* ========================================
   EVENTS
   ======================================== */

form?.addEventListener(
  "submit",
  handleFormSubmit
);

changePasswordButton?.addEventListener(
  "click",
  changePassword
);


/* ========================================
   START
   ======================================== */

loadSettings();