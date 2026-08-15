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
      const main = document.querySelector("main");

      if (main) {
        document.body.insertBefore(component, main);
      } else {
        document.body.prepend(component);
      }
    }

    if (position === "after-main") {
      document.body.appendChild(component);
    }

    console.log(`✓ Komponente geladen: ${file}`);

    return component;
  } catch (error) {
    console.error(`❌ Fehler beim Laden von ${file}:`, error);
    return null;
  }
}

async function loadComponents() {
  const basePath =
    window.location.pathname.substring(
      0,
      window.location.pathname.lastIndexOf("/") + 1
    );

  const header = await loadComponent(
    `${basePath}components/header.html`,
    "before-main"
  );

  const footer = await loadComponent(
    `${basePath}components/footer.html`,
    "after-main"
  );

  // Erst wenn beide Komponenten wirklich da sind
  document.dispatchEvent(
    new CustomEvent("componentsLoaded", {
      detail: {
        header,
        footer,
      },
    })
  );
}

loadComponents();