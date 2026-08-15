
============================================================
DATEI: css\contact.css
============================================================

.contact-hero {
  padding: 90px 20px;
  background: linear-gradient(135deg, var(--color-background), #f4e7db);
  text-align: center;
}

.contact-hero-content {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
}

.contact-hero h1 {
  margin-bottom: 20px;
  color: var(--color-dark);
  font-size: 2.2rem;
}

.contact-hero p {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-cost {
  padding: 80px 20px;
  background: var(--color-surface);
}

.contact-cost-card {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  background: var(--color-background);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.contact-cost-card h2 {
  margin-bottom: 30px;
  text-align: center;
  color: var(--color-dark);
}

.contact-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid rgba(42, 36, 33, 0.1);
  font-size: 1.05rem;
}

.contact-price-row strong {
  color: var(--color-dark);
  font-size: 1.2rem;
}

.contact-cost-card p {
  margin: 30px 0;
  text-align: center;
  color: var(--color-text-muted);
  line-height: 1.6;
}

.contact-options,
.contact-process,
.contact-form-section {
  padding: 80px 20px;
}

.contact-options h2,
.contact-process h2,
.contact-form-section h2 {
  margin-bottom: 30px;
  text-align: center;
  color: var(--color-dark);
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.contact-card {
  padding: 35px 25px;
  background: var(--color-background);
  text-align: center;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.contact-card:hover {
  transform: translateY(-5px);
}

.contact-icon {
  margin-bottom: 15px;
  font-size: 2rem;
}

.contact-card h3 {
  margin-bottom: 15px;
  color: var(--color-dark);
}

.contact-card p {
  line-height: 1.6;
}

.contact-card a {
  margin-top: 20px;
}

.contact-small {
  opacity: 0.8;
  font-size: 0.9rem;
}

.contact-process {
  background: var(--color-surface);
}

.contact-steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 45px;
}

.contact-step {
  position: relative;
  text-align: center;
}

.contact-step span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background: var(--color-primary);
  color: var(--color-dark);
  border-radius: 50%;
  font-size: 1.3rem;
  font-weight: 700;
  transition: var(--transition);
}

.contact-step:hover span {
  transform: scale(1.15);
}

.contact-step:not(:last-child)::after {
  content: "↓";
  display: block;
  margin-top: 35px;
  font-size: 1.5rem;
  color: var(--color-primary);
}

.contact-step p {
  max-width: 250px;
  margin: 0 auto;
  line-height: 1.6;
  color: var(--color-text-muted);
}

.contact-form-section {
  background: var(--color-background);
}

.contact-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.contact-intro {
  margin-bottom: 35px;
  color: var(--color-text-muted);
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-form label {
  margin-top: 10px;
  color: var(--color-dark);
  font-weight: 600;
}

.contact-form input,
.contact-form textarea,
.contact-form select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(42, 36, 33, 0.15);
  border-radius: var(--radius);
  background: #fff;
  color: var(--color-dark);
  font-family: inherit;
  font-size: 1rem;
  transition: var(--transition);
}

.contact-form input:focus,
.contact-form textarea:focus,
.contact-form select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(212, 178, 149, 0.25);
}

.contact-form textarea {
  min-height: 140px;
  resize: vertical;
}

.contact-submit {
  align-self: center;
}

.privacy-note {
  margin: 25px 0;
  padding: 15px;
  background: var(--color-primary-soft);
  border-radius: var(--radius);
  color: var(--color-dark);
  text-align: center;
  line-height: 1.5;
}

.faq-link {
  margin-top: 50px;
  text-align: center;
}

.faq-link p {
  margin-bottom: 10px;
  color: var(--color-dark);
}

.faq-link a {
  color: var(--color-dark);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid var(--color-primary);
}

.faq-link a:hover {
  color: var(--color-primary);
}

@media (min-width: 1024px) {
  .contact-hero h1 {
    font-size: 3.5rem;
  }

  .contact-cards {
    flex-direction: row;
  }

  .contact-card {
    flex: 1;
  }

  .contact-steps {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  .contact-step {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-step:not(:last-child)::after {
    content: "→";
    position: absolute;
    top: 30px;
    right: -18px;
    margin: 0;
    font-size: 1.5rem;
    color: var(--color-primary);
  }
}



============================================================
DATEI: contact.html
============================================================

<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Aufwind Beratung</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="css/global.css" />
    <link rel="stylesheet" href="css/header.css" />
    <link rel="stylesheet" href="css/footer.css" />
    <link rel="stylesheet" href="css/contact.css" />
  </head>
  <body data-page="contact">
    <main>
      <section class="contact-hero">
        <div class="contact-hero-content">
          <h1 data-text="contact_Hero_title">Ihr erster Schritt zu mehr Klarheit</h1>
          <p data-text="contact_Hero_text">Sie möchten mehr erfahren oder den ersten Schritt gehen? Kontaktieren Sie mich gerne für ein unverbindliches Erstgespräch.</p>
        </div>
      </section>

      <section class="contact-cost">
        <div class="contact-container">
          <div class="contact-cost-card">
            <h2 data-text="contact_Kosten_title">Kosten</h2>

            <div class="contact-price-row">
              <span data-text="contact_Kosten_erstgespraech">Erstgespräch (30 Minuten)</span>
              <strong data-text="contact_Kosten_erstgespraech_preis">kostenlos</strong>
            </div>

            <div class="contact-price-row">
              <span data-text="contact_Kosten_beratung">Beratung (50 Minuten)</span>
              <strong data-text="contact_Kosten_beratung_preis">80€</strong>
            </div>

            <p data-text="contact_Kosten_info">Die Kosten meiner Angebote werden nicht von den Krankenkassen übernommen und sind daher Selbstzahlerleistungen. In vielen Fällen sind die Kosten steuerlich absetzbar. Die Anzahl und Häufigkeit der Termine stimmen wir individuell nach Ihrem Bedarf ab. Die Termine können wir sowohl vor Ort als auch online durchführen.

Terminabsage Wenn Sie einen vereinbarten Termin nicht einhalten können, bitte ich Sie um eine schriftliche oder telefonische Absage spätestens 24 Stunden vor dem Termin. Ohne Absage berechne ich Ihnen den vollen Preis der gebuchten Stunde. </p>
          </div>
        </div>
      </section>

      <section class="contact-options">
        <div class="contact-container">
          <h2 data-text="contact_Kontaktmöglichkeiten_title">Kontaktmöglichkeiten</h2>
          <div class="contact-cards">
            <article class="contact-card">
              <div class="contact-icon">✉</div>
              <h3 data-text="contact_Kontakt_1_title">E-Mail</h3>
              <p data-text="contact_Kontakt_1_text">beratung.aufwind@gmail.com</p>
              <a
                href="mailto:beratung.aufwind@gmail.com"
                class="btn btn-primary"
                data-text="contact_Kontakt_1_button"
              >E-Mail schreiben</a>
            </article>

            <article class="contact-card">
              <div class="contact-icon">☎</div>
              <h3 data-text="contact_Kontakt_2_title">Telefon</h3>
              <p data-text="contact_Kontakt_2_text">0176 31027082</p>
              <p class="contact-small" data-text="contact_Kontakt_2_zeit">Mo - Fr 9:00 - 14:00 Uhr oder nach Vereinbarung</p>
            </article>

            <article class="contact-card">
              <div class="contact-icon">📍</div>
              <h3 data-text="contact_Kontakt_3_title">Ort</h3>
              <p data-text="contact_Kontakt_3_text">Wiesbaden</p>
              <p
                class="contact-small"
                data-text="contact_Kontakt_3_untertitel"
              >Persönliche Beratung vor Ort oder flexibel online möglich.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="contact-process">
        <div class="contact-container">
          <h2 data-text="contact_Ablauf_title">So einfach funktioniert die Kontaktaufnahme</h2>
          <div class="contact-steps">
            <div class="contact-step">
              <span>1</span>
              <p data-text="contact_Schritt_1_title">Anfrage senden</p>
            </div>

            <div class="contact-step">
              <span>2</span>
              <p data-text="contact_Schritt_2_title">Erstgespräch vereinbaren</p>
            </div>

            <div class="contact-step">
              <span>3</span>
              <p data-text="contact_Schritt_3_title">Gemeinsam starten</p>
            </div>
          </div>
        </div>
      </section>

      <section class="contact-form-section">
        <div class="contact-form-container">
          <h2 data-text="contact_Formular_title">Lassen Sie uns gemeinsam klären, ob mein Angebot für Ihr Anliegen passend ist. Gerne nehme ich mir Zeit für Ihre Fragen – unverbindlich und in Ruhe.</h2>
          <p class="contact-intro" data-text="contact_Formular_intro">Rufen Sie mich einfach an oder senden Sie mir eine Nachricht über das nachfolgende Kontaktformular.</p>

          <form
            class="contact-form"
            name="kontakt"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            action="/success.html"
          >
            <p hidden>
              <label>
                Nicht ausfüllen:
                <input name="bot-field" />
              </label>
            </p>

            <label for="name" data-text="contact_Formular_label_name">Name</label>
            <input type="text" id="name" name="name" required />

            <label for="email" data-text="contact_Formular_label_email">E-Mail</label>
            <input type="email" id="email" name="email" required />

            <label for="topic" data-text="contact_Formular_label_topic">Thema der Anfrage</label>
            <select id="topic" name="topic">
              <option data-text="contact_Formular_option_1">Familienberatung</option>
              <option data-text="contact_Formular_option_2">Beratung für Frauen</option>
              <option data-text="contact_Formular_option_3">Online-Beratung</option>
              <option data-text="contact_Formular_option_4">Allgemeine Frage</option>
            </select>

            <label
              for="contact-type"
              data-text="contact_Formular_label_contact_type"
            >Bevorzugte Kontaktart</label>
            <select id="contact-type" name="contact-type">
              <option data-text="contact_Formular_option_email">E-Mail</option>
              <option data-text="contact_Formular_option_phone">Telefon</option>
            </select>

            <label
              for="message"
              data-text="contact_Formular_label_message"
            >Nachricht</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <p class="privacy-note" data-text="contact_Formular_privacy">🔒 Ihre Anfrage wird selbstverständlich vertraulich behandelt.</p>

            <button
              type="submit"
              class="btn btn-primary contact-submit"
              data-text="contact_Formular_button"
            >Anfrage senden</button>
          </form>

          <div class="faq-link">
            <p data-text="contact_FAQ_Link_text">Noch Fragen?</p>
            <a href="faq.html" data-text="contact_FAQ_Link_link">Zu den häufig gestellten Fragen</a>
          </div>
        </div>
      </section>
    </main>

    <script src="js/load-components.js"></script>
    <script src="js/header.js"></script>
    <script src="js/content-loader.js"></script>
  </body>
</html>


