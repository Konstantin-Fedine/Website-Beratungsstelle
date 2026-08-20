import { supabase } from "./supabase.js";

async function loadServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("sort_order");

  if (error) {
    console.error("Fehler beim Laden der Services:", error);

    const container = document.querySelector("#services-container");

    container.innerHTML = `
            <p>
                Die Angebote konnten gerade nicht geladen werden.
                Bitte versuchen Sie es später erneut.
            </p>
        `;

    return;
  }

  const container = document.querySelector("#services-container");

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `
            <p>
                Aktuell sind keine Beratungsangebote verfügbar.
            </p>
        `;

    return;
  }

  data.forEach((service) => {
    const card = document.createElement("article");

    card.className = "service-card";

    card.innerHTML = `
            <div class="service-content">

                <h3>${service.title}</h3>

          <p class="service-description">${service.description ?? ""}</p>

          <div class="service-info">
            <span>⏱ ${service.duration} Minuten</span>
            <span>💶 ${service.price} €</span>
          </div>

          <a
            href="booking.html?service=${service.id}"
            class="btn btn-primary select-service-button"
          >Termin buchen</a>

            </div>
        `;

    container.appendChild(card);
  });
}

loadServices();
