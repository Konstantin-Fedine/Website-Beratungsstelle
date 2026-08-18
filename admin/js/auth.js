import { supabase } from "../../js/supabase.js";

const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const adminEmail = document.getElementById("admin-email");
const adminUserName = document.getElementById("adminUserName");

/* ========================================
   FEHLERMELDUNG
   ======================================== */

function showLoginError(message) {
  if (!loginError) return;

  loginError.textContent = message;
  loginError.hidden = false;
}

/* ========================================
   ADMIN PRÜFEN
   ======================================== */

async function checkAdmin() {
  const { data, error } = await supabase.rpc("is_admin");

  if (error) {
    console.error("Admin-Prüfung fehlgeschlagen:", error);
    return false;
  }

  return data === true;
}

/* ========================================
   LOGIN
   ======================================== */

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const button = loginForm.querySelector("button[type='submit']");

    if (loginError) {
      loginError.hidden = true;
      loginError.textContent = "";
    }

    button.disabled = true;
    button.textContent = "Anmelden...";

    try {
      // 1. Bei Supabase anmelden
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // 2. Prüfen, ob der eingeloggte User Admin ist
      const isAdmin = await checkAdmin();

      if (!isAdmin) {
        await supabase.auth.signOut();

        showLoginError(
          "Du hast keine Berechtigung für den Admin-Bereich."
        );

        return;
      }

      // 3. Admin → Dashboard
      window.location.href = "pages/dashboard.html";
    } catch (error) {
      console.error("Login fehlgeschlagen:", error);

      showLoginError(
        "Anmeldung fehlgeschlagen. Bitte überprüfe E-Mail und Passwort."
      );
    } finally {
      button.disabled = false;
      button.textContent = "Anmelden";
    }
  });
}

/* ========================================
   ADMIN-SEITE SCHÜTZEN
   ======================================== */

async function protectAdminPage() {
  // Login-Seite: bei aktiver Session direkt ins Dashboard
  if (loginForm) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return;
    }

    const isAdmin = await checkAdmin();

    if (isAdmin) {
      window.location.href = "pages/dashboard.html";
      return;
    }

    await supabase.auth.signOut();

    return;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Nicht eingeloggt
  if (!session) {
    window.location.href = "../index.html";
    return;
  }

  // Eingeloggt, aber kein Admin
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    await supabase.auth.signOut();

    window.location.href = "../index.html";
    return;
  }

  // Admin-E-Mail anzeigen
  if (adminEmail) {
    adminEmail.textContent = session.user.email;
  }

  // Name in der Topbar anzeigen
  if (adminUserName) {
    adminUserName.textContent = session.user.email || "Admin";
  }
}

/* ========================================
   LOGOUT
   ======================================== */

async function logout(triggerButton = null) {
  if (triggerButton) {
    triggerButton.disabled = true;
    triggerButton.textContent = "Abmelden...";
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout fehlgeschlagen:", error);

    if (triggerButton) {
      triggerButton.disabled = false;
      triggerButton.textContent = "Abmelden";
    }

    return;
  }

  window.location.href = "../index.html";
}

// Sidebar wird dynamisch geladen, daher Event Delegation nutzen.
document.addEventListener("click", async (event) => {
  const button = event.target.closest(
    "#logoutButton, #logout-button"
  );

  if (!button) {
    return;
  }

  await logout(button);
});

/* ========================================
   START
   ======================================== */

protectAdminPage();