import { supabase } from "./supabase.js";

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-button");
const signoutButton = document.getElementById("signout-button");
const authArea = document.getElementById("auth-area");
const adminTools = document.getElementById("admin-tools");
const bookingsContainer = document.getElementById("bookings-container");
const policyHelp = document.getElementById("policy-help");
const adminUser = document.getElementById("admin-user");
const adminStatus = document.getElementById("admin-status");

function setStatus(msg, isError = false) {
  if (!adminStatus) return;
  adminStatus.textContent = msg || "";
  adminStatus.style.color = isError ? "#b33" : "#2b7";
}

// Global error handlers so the page shows issues even if console is noisy
window.addEventListener("error", (ev) => {
  try {
    const msg = ev?.message || String(ev);
    setStatus(`Fehler: ${msg}`, true);
    console.error("Global error:", ev.error || ev);
  } catch (e) {
    console.error(e);
  }
});

window.addEventListener("unhandledrejection", (ev) => {
  try {
    const reason = ev?.reason || ev;
    setStatus(`Promise rejected: ${reason?.message || reason}`, true);
    console.error("Unhandled rejection:", reason);
  } catch (e) {
    console.error(e);
  }
});

async function renderBookings() {
  setStatus("Lade Buchungen...");
  bookingsContainer.innerHTML = "Lade Buchungen…";

  const { data, error } = await supabase
    .from("bookings")
    .select("id, created_at, service_id, customer_name, customer_email, customer_phone, booking_date, booking_time, notes, status")
    .order("created_at", { ascending: false });

  // Debug: show full response in console
  console.debug("renderBookings response:", { data, error });

  if (error) {
    console.error("Error loading bookings:", error);
    const details = error.details ? ` — ${error.details}` : "";
    bookingsContainer.innerHTML = `<p class=\"form-error\">Fehler beim Laden der Buchungen: ${error.message}${details}</p>`;
    policyHelp.hidden = false;
    // show raw error payload for easier debugging
    const dump = document.createElement("pre");
    dump.style.whiteSpace = "pre-wrap";
    dump.textContent = JSON.stringify(error, null, 2);
    bookingsContainer.appendChild(dump);
    setStatus("Fehler beim Laden der Buchungen — siehe Details weiter unten.", true);
    return;
  }

  policyHelp.hidden = true;

  if (!data || data.length === 0) {
    bookingsContainer.innerHTML = "<p>Keine Buchungen gefunden.</p>";
    setStatus("Keine Buchungen vorhanden oder Zugriff verweigert.", true);
    // helpful debug info: show current user/session
    try {
      const u = await supabase.auth.getUser();
      adminUser.textContent = u?.data?.user ? `Angemeldet als: ${u.data.user.email} (id: ${u.data.user.id})` : "Angemeldet: (keine Details)";
    } catch (e) {
      console.debug("getUser failed:", e);
    }
    return;
  }

  const table = document.createElement("table");
  table.className = "admin-table";

  const thead = document.createElement("thead");
  thead.innerHTML = `<tr><th>ID</th><th>Datum</th><th>Leistung(ID)</th><th>Name</th><th>E-Mail</th><th>Telefon</th><th>Status</th><th>Aktionen</th></tr>`;
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  data.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.booking_date} ${row.booking_time}</td>
      <td>${row.service_id}</td>
      <td>${row.customer_name}</td>
      <td>${row.customer_email}</td>
      <td>${row.customer_phone || ""}</td>
      <td class="status">${row.status}</td>
      <td class="actions">
        <button data-id="${row.id}" data-action="confirm" class="btn btn-primary small">Bestätigen</button>
        <button data-id="${row.id}" data-action="cancel" class="btn btn-secondary small">Stornieren</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  bookingsContainer.innerHTML = "";
  bookingsContainer.appendChild(table);
  setStatus("");

  // attach action handlers
  bookingsContainer.querySelectorAll("button[data-action]").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const newStatus = action === "confirm" ? "confirmed" : "cancelled";

      btn.disabled = true;
      const { error } = await supabase.from("bookings").update({ status: newStatus }).eq("id", id);
      if (error) {
        alert("Fehler beim Aktualisieren: " + error.message);
        console.error(error);
        btn.disabled = false;
        return;
      }
      // refresh
      renderBookings();
    });
  });
}

async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data?.session) {
    authArea.hidden = true;
    adminTools.hidden = false;
    // show signed-in user
    try {
      const u = await supabase.auth.getUser();
      adminUser.textContent = u?.data?.user ? `Angemeldet als: ${u.data.user.email}` : "Angemeldet";
    } catch (e) {
      console.debug("getUser failed:", e);
    }

    renderBookings();
  } else {
    authArea.hidden = false;
    adminTools.hidden = true;
    setStatus("Nicht angemeldet. Bitte einloggen.");
  }
}

loginButton.addEventListener("click", async () => {
  const email = document.getElementById("admin-email").value.trim();
  const password = document.getElementById("admin-password").value;
  loginButton.disabled = true;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert("Login fehlgeschlagen: " + error.message);
    loginButton.disabled = false;
    return;
  }

  checkSession();
});

signoutButton.addEventListener("click", async () => {
  await supabase.auth.signOut();
  checkSession();
});

checkSession();
