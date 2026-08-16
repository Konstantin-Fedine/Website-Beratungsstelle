/* ========================================
   ADMIN LAYOUT
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  const layout = document.getElementById("adminLayout");
  const sidebar = document.getElementById("adminSidebar");

  const sidebarToggle =
    document.getElementById("sidebarToggle");

  const mobileMenuButton =
    document.getElementById("mobileMenuButton");

  const overlay =
    document.getElementById("sidebarOverlay");

  if (!layout || !sidebar) {
    return;
  }


  /* ========================================
     DESKTOP SIDEBAR
     ======================================== */

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {

      layout.classList.toggle("sidebar-collapsed");

      const collapsed =
        layout.classList.contains("sidebar-collapsed");

      sidebarToggle.setAttribute(
        "aria-expanded",
        String(!collapsed)
      );

      localStorage.setItem(
        "admin-sidebar-collapsed",
        String(collapsed)
      );
    });
  }


  /* ========================================
     GESPEICHERTEN ZUSTAND LADEN
     ======================================== */

  const savedState =
    localStorage.getItem(
      "admin-sidebar-collapsed"
    );

  if (
    savedState === "true" &&
    window.innerWidth > 800
  ) {
    layout.classList.add("sidebar-collapsed");

    if (sidebarToggle) {
      sidebarToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }


  /* ========================================
     MOBILE SIDEBAR ÖFFNEN
     ======================================== */

  function openMobileSidebar() {

    sidebar.classList.add("mobile-open");

    if (overlay) {
      overlay.classList.add("is-visible");
    }

    if (mobileMenuButton) {
      mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
      );
    }
  }


  /* ========================================
     MOBILE SIDEBAR SCHLIESSEN
     ======================================== */

  function closeMobileSidebar() {

    sidebar.classList.remove("mobile-open");

    if (overlay) {
      overlay.classList.remove("is-visible");
    }

    if (mobileMenuButton) {
      mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }


  /* ========================================
     MOBILE BUTTON
     ======================================== */

  if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
      "click",
      () => {

        const isOpen =
          sidebar.classList.contains(
            "mobile-open"
          );

        if (isOpen) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      }
    );
  }


  /* ========================================
     OVERLAY
     ======================================== */

  if (overlay) {
    overlay.addEventListener(
      "click",
      closeMobileSidebar
    );
  }


  /* ========================================
     NAVIGATION
     ======================================== */

  const navigationLinks =
    document.querySelectorAll(
      ".sidebar-link[href]"
    );

  navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

      if (window.innerWidth <= 800) {
        closeMobileSidebar();
      }

    });

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
        "sidebar-public-link"
      )
    ) {
      return;
    }

    const linkPath =
      new URL(link.href)
        .pathname
        .replace(/\/+$/, "");

    if (linkPath === currentPath) {

      navigationLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
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

    }
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

    }
  );

});