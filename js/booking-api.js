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
