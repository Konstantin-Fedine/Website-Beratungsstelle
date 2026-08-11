function initHeader() {
  const navigation = document.querySelector(".navigation");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navigation) {
    return;
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isActive = navigation.classList.toggle("is-active");
      menuToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navigation.contains(e.target) && !menuToggle.contains(e.target)) {
        if (navigation.classList.contains("is-active")) {
          navigation.classList.remove("is-active");
          menuToggle.setAttribute("aria-expanded", "false");
        }
      }
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navigation.classList.contains("is-active")) {
        navigation.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".navigation a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    const isCurrentPage = linkPage && currentPage === linkPage;

    link.classList.toggle("active", isCurrentPage);
    link.classList.toggle("nav-cta", isCurrentPage && linkPage === "booking.html");
  });
}
