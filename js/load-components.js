async function loadComponent(file, position) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(
        `Komponente konnte nicht geladen werden: ${file} (${response.status})`
      );
    }

    const html = await response.text();

    const template = document.createElement("template");
    template.innerHTML = html.trim();

    const component = template.content.firstElementChild;

    if (!component) {
      throw new Error(`Keine gültige Komponente in ${file} gefunden.`);
    }

    if (position === "before-main") {
      document.body.insertBefore(component, document.body.querySelector("main"));
    }

    if (position === "after-main") {
      document.body.appendChild(component);
    }

    console.log(`✓ Komponente geladen: ${file}`);
  } catch (error) {
    console.error(`❌ Fehler beim Laden von ${file}:`, error);
  }
}

async function loadComponents() {
  const basePath = window.location.pathname.substring(
    0,
    window.location.pathname.lastIndexOf("/") + 1
  );

  await loadComponent(`${basePath}components/header.html`, "before-main");
  await loadComponent(`${basePath}components/footer.html`, "after-main");

  // Content-Loader informieren, dass Header und Footer jetzt vorhanden sind
  document.dispatchEvent(new Event("componentsLoaded"));
}

loadComponents();