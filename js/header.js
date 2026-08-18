function initHeader() {
  document.addEventListener("componentsLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".navigation");

    if (!menuToggle || !navigation) {
      console.error("❌ Header-Elemente nicht gefunden");
      return;
    }

    // Mobile-Menü öffnen/schließen
    menuToggle.addEventListener("click", () => {
      const isActive = navigation.classList.toggle("is-active");

      menuToggle.setAttribute(
        "aria-expanded",
        isActive ? "true" : "false"
      );
    });

    // Menü schließen, wenn außerhalb geklickt wird
    document.addEventListener("click", (e) => {
      if (
        !navigation.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        navigation.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Menü mit Escape schließen
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        navigation.classList.contains("is-active")
      ) {
        navigation.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });

    // Aktuelle Seite hervorheben
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navigation a").forEach((link) => {
      const linkPage = link.getAttribute("href");

      const isCurrentPage =
        linkPage === currentPage;

      link.classList.toggle("active", isCurrentPage);
    });

    console.log(`✓ Aktive Navigation: ${currentPage}`);
  });
}

initHeader();