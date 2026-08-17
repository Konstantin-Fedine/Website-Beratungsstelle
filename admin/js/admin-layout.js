import { icons } from "../../js/icons.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadSidebar();
  initializeAdminLayout();
});


/* ========================================
   SIDEBAR LADEN
   ======================================== */

async function loadSidebar() {
  const container =
    document.getElementById("adminSidebarContainer");

  if (!container) {
    console.error(
      "Sidebar-Container wurde nicht gefunden.",
    );

    return;
  }

  try {
    const response = await fetch(
      "/admin/sidebar.html",
      {
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error(
        `Sidebar konnte nicht geladen werden (${response.status}).`,
      );
    }

    const html = await response.text();

    container.innerHTML = html;

    initializeIcons();

  } catch (error) {
    console.error(
      "Fehler beim Laden der Sidebar:",
      error,
    );
  }
}


/* ========================================
   ICONS
   ======================================== */

function initializeIcons() {
  const iconElements =
    document.querySelectorAll(
      "[data-icon]",
    );

  iconElements.forEach((element) => {
    const iconName =
      element.dataset.icon;

    const iconSvg =
      icons[iconName];

    if (!iconSvg) {
      console.warn(
        `Icon "${iconName}" wurde nicht gefunden.`,
      );

      return;
    }

    element.innerHTML = iconSvg;
  });
}


/* ========================================
   ADMIN LAYOUT
   ======================================== */

function initializeAdminLayout() {
  const layout =
    document.getElementById("adminLayout");

  const sidebar =
    document.getElementById("adminSidebar");

  const sidebarToggle =
    document.getElementById("sidebarToggle");

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");

  const overlay =
    document.getElementById("sidebarOverlay");

  if (!layout || !sidebar) {
    console.error(
      "Admin-Layout oder Sidebar wurde nicht gefunden.",
    );

    return;
  }


  /* ========================================
     DESKTOP SIDEBAR
     ======================================== */

  if (sidebarToggle) {
    sidebarToggle.addEventListener(
      "click",
      () => {
        layout.classList.toggle(
          "sidebar-collapsed",
        );

        const collapsed =
          layout.classList.contains(
            "sidebar-collapsed",
          );

        sidebarToggle.setAttribute(
          "aria-expanded",
          String(!collapsed),
        );

        localStorage.setItem(
          "admin-sidebar-collapsed",
          String(collapsed),
        );
      },
    );
  }


  /* ========================================
     GESPEICHERTEN ZUSTAND LADEN
     ======================================== */

  const savedState =
    localStorage.getItem(
      "admin-sidebar-collapsed",
    );

  if (
    savedState === "true" &&
    window.innerWidth > 800
  ) {
    layout.classList.add(
      "sidebar-collapsed",
    );

    if (sidebarToggle) {
      sidebarToggle.setAttribute(
        "aria-expanded",
        "false",
      );
    }
  }


  /* ========================================
     MOBILE SIDEBAR
     ======================================== */

  function openMobileSidebar() {
    sidebar.classList.add(
      "mobile-open",
    );

    if (overlay) {
      overlay.classList.add(
        "is-visible",
      );
    }

    if (mobileMenuButton) {
      mobileMenuButton.setAttribute(
        "aria-expanded",
        "true",
      );
    }
  }


  function closeMobileSidebar() {
    sidebar.classList.remove(
      "mobile-open",
    );

    if (overlay) {
      overlay.classList.remove(
        "is-visible",
      );
    }

    if (mobileMenuButton) {
      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false",
      );
    }
  }


  if (mobileMenuButton) {
    mobileMenuButton.addEventListener(
      "click",
      () => {
        const isOpen =
          sidebar.classList.contains(
            "mobile-open",
          );

        if (isOpen) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      },
    );
  }


  /* ========================================
     OVERLAY
     ======================================== */

  if (overlay) {
    overlay.addEventListener(
      "click",
      closeMobileSidebar,
    );
  }


  /* ========================================
     NAVIGATION
     ======================================== */

  const navigationLinks =
    document.querySelectorAll(
      ".sidebar-link[href]",
    );

  navigationLinks.forEach((link) => {
    link.addEventListener(
      "click",
      () => {
        if (window.innerWidth <= 800) {
          closeMobileSidebar();
        }
      },
    );
  });


  /* ========================================
     AKTIVE SEITE
     ======================================== */

  const currentPath =
    window.location.pathname
      .replace(/\/+$/, "");

  navigationLinks.forEach((link) => {
    if (
      link.classList.contains(
        "sidebar-public-link",
      )
    ) {
      return;
    }

    const linkPath =
      new URL(link.href)
        .pathname
        .replace(/\/+$/, "");

    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });


  /* ========================================
     ESC
     ======================================== */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        closeMobileSidebar();
      }
    },
  );


  /* ========================================
     WINDOW RESIZE
     ======================================== */

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 800) {
        closeMobileSidebar();
      }
    },
  );
}