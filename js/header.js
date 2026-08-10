function initHeader() {
  const navigation = document.querySelector(".navigation");
  const menuToggle = document.querySelector(".menu-toggle");

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

  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".navigation a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (window.location.pathname.endsWith(linkPage)) {
      link.classList.add("active");
    }
  });
}
