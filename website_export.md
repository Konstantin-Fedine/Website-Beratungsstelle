
============================================================
DATEI: css\about-page.css
============================================================

.about-hero {
  padding: 90px 20px;
  background: linear-gradient(135deg, var(--color-background), #f4e7db);
  text-align: center;
}

.about-hero-content {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
}

.about-hero h1 {
  margin-bottom: 20px;
  color: var(--color-dark);
  font-size: 2.3rem;
}

.about-hero p {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.about-container {
  max-width: var(--container-width);
  margin: 0 auto;
}

.about-introduction,
.about-values,
.about-target,
.about-school,
.about-qualification,
.about-quote,
.about-cta {
  padding: 80px 20px;
}

.about-container h2 {
  margin-bottom: 30px;
  text-align: center;
  color: var(--color-dark);
}

.about-grid {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.about-image img,
.about-school-image img {
  width: 100%;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.about-text p,
.about-school p {
  margin-bottom: 20px;
  color: var(--color-text-muted);
  line-height: 1.7;
}

.about-values {
  background: var(--color-background);
}

.about-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.about-card {
  padding: 30px 25px;
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.about-card:hover {
  transform: translateY(-5px);
}

.about-card h3 {
  margin-bottom: 15px;
  color: var(--color-dark);
}

.about-card p {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.about-school {
  background: var(--color-surface);
}

.qualification-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.qualification-grid > div {
  padding: 30px;
  background: var(--color-background);
  border-radius: var(--radius);
}

.qualification-grid h3 {
  margin-bottom: 20px;
  color: var(--color-dark);
}

.qualification-grid ul {
  padding-left: 20px;
}

.qualification-grid li {
  margin-bottom: 10px;
  color: var(--color-text-muted);
}

.about-quote {
  background: var(--color-background);
  text-align: center;
}

.about-quote blockquote {
  max-width: 850px;
  margin: 0 auto 25px;
  color: var(--color-dark);
  font-size: 1.5rem;
  font-style: italic;
  line-height: 1.6;
}

.about-quote p {
  color: var(--color-text-muted);
}

.about-cta {
  background: var(--color-dark);
  text-align: center;
}

.about-cta h2 {
  margin-bottom: 30px;
  color: var(--color-text-light);
}

@media (min-width: 1024px) {
  .about-hero h1 {
    font-size: 3.5rem;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 40% 60%;
    align-items: center;
  }

  .about-cards {
    grid-template-columns: repeat(3, 1fr);
  }

  .about-target .about-cards {
    grid-template-columns: repeat(4, 1fr);
  }

  .qualification-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .about-quote blockquote {
    font-size: 2rem;
  }
}



============================================================
DATEI: css\about.css
============================================================

.about-section {
  padding: 80px 20px;
  background: var(--color-background);
}

.about-container {
  max-width: var(--container-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  gap: 40px;
}

.about-content {
  color: var(--color-dark);
}

.about-content h2 {
  font-size: 2rem;
  margin-bottom: 25px;
}

.about-content p {
  line-height: 1.7;
  margin-bottom: 20px;
}

.about-content .btn {
  margin-top: 10px;
}

.about-image img {
  width: 100%;
  height: auto;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  object-fit: cover;
}

@media (min-width: 1024px) {
  .about-section {
    padding: 100px 20px;
  }

  .about-container {
    flex-direction: row;
    align-items: center;
    gap: 70px;
  }

  .about-content {
    width: 60%;
  }

  .about-image {
    width: 40%;
  }

  .about-content h2 {
    font-size: 2.8rem;
  }
}



============================================================
DATEI: css\booking-page.css
============================================================

/* ── Allgemeine Buchungsseite ── */

.booking-step {
  display: none;
}

.booking-step.active {
  display: block;
}

.booking-container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 20px;
}

.booking-hero {
  padding: 60px 0 30px;
  text-align: center;
}

.booking-hero h1 {
  margin-bottom: 12px;
}

.booking-process {
  padding-bottom: 80px;
}

.booking-progress {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 40px;
}

.progress-step {
  padding: 10px 18px;
  border-radius: 999px;
  background: #f2ece7;
  font-weight: 600;
  font-size: 0.9rem;
}

.progress-step.active {
  background: var(--color-dark);
  color: white;
}

.booking-step h2 {
  margin-bottom: 24px;
}

.booking-step-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-top: 30px;
}

.booking-step-actions.is-backward {
  justify-content: flex-start;
}

.booking-step-actions .btn {
  margin: 0;
}

.booking-step .btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── Schritt 1: Beratungsangebote ── */

.booking-service-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin-bottom: 20px;
  border: 2px solid transparent;
  transition: border-color var(--transition);
}

.booking-service-card.selected {
  border-color: var(--color-primary);
}

.booking-service-card h3 {
  margin-bottom: 15px;
}

.service-description {
  line-height: 1.6;
  margin-bottom: 25px;
}

.service-info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  margin-top: 10px;
}

.service-info span {
  background: #f5eee8;
  padding: 10px 15px;
  border-radius: 10px;
  font-weight: 600;
}

/* ── Schritt 2: Kalender & Uhrzeiten ── */

.booking-datetime-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
  max-width: 900px;
  margin-bottom: 8px;
}

/* ── Schritt 3: Kundendatenformular ── */

.booking-form {
  display: grid;
  gap: 18px;
  max-width: 720px;
}

.form-row {
  display: grid;
  gap: 8px;
}

.form-row label {
  font-weight: 600;
  color: var(--color-dark);
}

.booking-form input,
.booking-form textarea {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 14px 16px;
  font: inherit;
  color: var(--color-dark);
  background: #ffffff;
  transition:
    border-color var(--transition),
    box-shadow var(--transition);
}

.booking-form input:focus,
.booking-form textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(212, 178, 149, 0.15);
}

.booking-form textarea {
  min-height: 140px;
  resize: vertical;
}

.message-counter {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin-top: 6px;
}

.message-counter .muted {
  color: var(--color-text-muted);
}

.form-note {
  margin-top: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.form-error {
  color: #b33a3a;
  background: rgba(179, 58, 58, 0.12);
  padding: 12px 16px;
  border-radius: 12px;
  margin: 0;
}

#calendar-container,
#times-panel {
  background: white;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

#times-panel {
  min-height: 200px;
}

#times-placeholder {
  color: var(--color-text-muted);
  line-height: 1.6;
}

#selected-date-label {
  font-size: 1.1rem;
  margin-bottom: 16px;
  text-transform: capitalize;
}

.times-heading {
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

#time-slots {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.time-slot {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: #f2ece7;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-dark);
  cursor: pointer;
  text-align: center;
  transition:
    background var(--transition),
    color var(--transition),
    border-color var(--transition);
}

.time-slot:hover {
  background: var(--color-primary);
}

.time-slot.selected {
  background: var(--color-dark);
  color: white;
  border-color: var(--color-dark);
}

.times-loading,
.times-empty {
  color: var(--color-text-muted);
  line-height: 1.6;
}

#calendar-container {
  max-width: none;
}

.booking-summary-card {
  background: linear-gradient(180deg, #ffffff 0%, #fdf8f4 100%);
  border: 1px solid rgba(212, 178, 149, 0.28);
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 0;
}

.booking-summary-card h3 {
  margin: 0 0 18px;
  font-size: 1.6rem;
  color: var(--color-dark);
}

.summary-section {
  display: grid;
  gap: 10px;
  padding: 18px 0;
  border-top: 1px solid rgba(42, 36, 33, 0.08);
}

.summary-section:first-of-type {
  border-top: none;
  padding-top: 0;
}

.summary-heading {
  margin: 0;
  font-weight: 700;
  color: var(--color-dark);
  letter-spacing: 0.01em;
}

.summary-value {
  margin: 0;
  color: var(--color-text);
  line-height: 1.6;
}

.summary-value a {
  color: var(--color-dark);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.summary-subtext {
  color: var(--color-text-muted);
  font-size: 0.95rem;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.calendar-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-dark);
  text-align: center;
}

.calendar-header button {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: #ffffff;
  color: var(--color-dark);
  font-size: 1.15rem;
  cursor: pointer;
  transition: all var(--transition);
}

.calendar-header button:hover {
  background: #f2ece7;
  border-color: #d7c6b5;
  color: var(--color-dark);
}

.calendar-weekdays,
#calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.calendar-weekdays div {
  text-align: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  padding-bottom: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  border: 2px solid transparent;
  border-radius: 12px;
  background: #f2ece7;
  cursor: pointer;
  font-size: 0.95rem;
  font-family: inherit;
  font-weight: 600;
  color: var(--color-dark);
  transition:
    background var(--transition),
    color var(--transition),
    border-color var(--transition);
}

.calendar-day:hover:not(:disabled):not(.empty) {
  background: var(--color-primary);
}

.calendar-day.today {
  border-color: var(--color-primary);
  font-weight: 700;
}

.calendar-day.selected {
  background: var(--color-dark);
  color: white;
  border-color: var(--color-dark);
}

.calendar-day.selected.today {
  border-color: white;
}

.calendar-day.past,
.calendar-day.unavailable,
.calendar-day:disabled {
  background: #ece8e4;
  color: #b0aaa4;
  cursor: not-allowed;
}

.calendar-day.past:hover,
.calendar-day.unavailable:hover,
.calendar-day:disabled:hover {
  background: #ece8e4;
}

.calendar-day.empty {
  background: transparent;
  cursor: default;
  border: none;
}

/* ── Responsive ── */

@media (max-width: 768px) {
  .booking-datetime-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .booking-hero {
    padding: 40px 0 20px;
  }

  .booking-container {
    padding: 0 16px;
  }

  .progress-step {
    font-size: 0.8rem;
    padding: 8px 14px;
  }

  #calendar-container,
  #times-panel {
    padding: 16px;
  }

  #calendar-container {
    max-width: 100%;
  }

  .calendar-header h3 {
    font-size: 1rem;
  }

  .calendar-header button {
    width: 40px;
    height: 40px;
  }

  .calendar-weekdays,
  #calendar-days {
    gap: 4px;
  }

  .calendar-weekdays div {
    font-size: 0.7rem;
  }

  .calendar-day {
    font-size: 0.8rem;
    border-radius: 8px;
  }

  .booking-step-actions {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }

  .booking-step-actions.is-backward {
    justify-content: flex-end;
  }

  .booking-step-actions .btn {
    display: inline-flex;
    width: auto;
    flex: 0 0 auto;
  }
}



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
DATEI: css\faq-page.css
============================================================

.faq-hero {
  padding: 90px 20px;
  background: linear-gradient(135deg, var(--color-background), #f4e7db);
  text-align: center;
}

.faq-hero-content {
  max-width: 800px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
}

.faq-hero h1 {
  margin-bottom: 20px;
  color: var(--color-dark);
  font-size: 2.3rem;
}

.faq-hero p {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

.faq-section,
.faq-cta {
  padding: 80px 20px;
}

.faq-container h2 {
  margin-bottom: 40px;
  text-align: center;
  color: var(--color-dark);
}

.faq-list {
  display: flex;
  flex-direction: column;
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
  transition: var(--transition);
}

.faq-item:first-child {
  border-top: 1px solid var(--color-border);
}

.faq-item.is-open {
  background: var(--color-primary-soft);
  box-shadow: inset 4px 0 0 var(--color-primary);
}

.faq-question {
  width: 100%;
  padding: 24px 20px;

  display: flex;
  align-items: center;

  border: none;
  background: transparent;

  cursor: pointer;

  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 600;

  color: var(--color-dark);

  text-align: left;

  transition: var(--transition);
}

.faq-question:hover {
  background: var(--color-primary-soft);
}

.faq-question::before {
  content: "▸";
  margin-right: 18px;
  color: var(--color-primary);
  transition: transform 0.3s;
}

.faq-item.is-open .faq-question::before {
  transform: rotate(90deg);
}

.faq-item.is-open .faq-question {
  color: var(--color-primary);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;

  opacity: 0;

  padding: 0 20px 0 58px;

  transition:
    grid-template-rows 0.35s ease,
    opacity 0.35s ease,
    padding 0.35s ease;
}

.faq-answer p {
  overflow: hidden;
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.7;
}

.faq-item.is-open .faq-answer {
  grid-template-rows: 1fr;
  opacity: 1;
  padding-bottom: 25px;
}

.faq-cta {
  background: var(--color-dark);
  text-align: center;
}

.faq-cta h2 {
  color: var(--color-text-light);
}

.faq-cta p {
  max-width: 700px;
  margin: 0 auto 35px;
  color: var(--color-text-light);
  line-height: 1.7;
}

@media (min-width: 1024px) {
  .faq-hero h1 {
    font-size: 3.5rem;
  }

  .faq-section {
    padding: 100px 20px;
  }
}



============================================================
DATEI: css\faq.css
============================================================

.faq-section {
  padding: 80px 20px;
  background: var(--color-surface);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-container h2 {
  text-align: center;
  color: var(--color-dark);
  margin-bottom: 20px;
  font-size: 2rem;
}

.faq-intro {
  text-align: center;
  line-height: 1.7;
  margin-bottom: 50px;
  color: var(--color-text-muted);
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
  transition: var(--transition);
}

.faq-item:first-child {
  border-top: 1px solid var(--color-border);
}

.faq-item.is-open {
  background: var(--color-primary-soft);
  box-shadow: inset 4px 0 0 var(--color-primary);
}

.faq-question {
  width: 100%;
  padding: 24px 20px;

  display: flex;
  align-items: center;

  border: none;
  background: transparent;

  cursor: pointer;

  font-size: 1.05rem;
  font-weight: 600;

  color: var(--color-dark);

  text-align: left;

  transition: var(--transition);
}

.faq-question:hover {
  background: var(--color-primary-soft);
}

.faq-question::before {
  content: "▸";
  margin-right: 18px;
  color: var(--color-primary);
  transition: transform 0.3s;
}

.faq-item.is-open .faq-question::before {
  transform: rotate(90deg);
}

.faq-item.is-open .faq-question {
  color: var(--color-primary);
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;

  opacity: 0;

  padding: 0 20px 0 58px;

  transition:
    grid-template-rows 0.35s ease,
    opacity 0.35s ease,
    padding 0.35s ease;
}

.faq-answer p {
  overflow: hidden;
  margin: 0;
}

.faq-item.is-open .faq-answer {
  grid-template-rows: 1fr;
  opacity: 1;
  padding-bottom: 25px;
}

.faq-cta {
  text-align: center;
  margin-top: 70px;
}

.faq-cta h3 {
  color: var(--color-dark);
  margin-bottom: 15px;
}

.faq-cta p {
  margin-bottom: 30px;
  line-height: 1.7;
}

@media (min-width: 1024px) {
  .faq-section {
    padding: 100px 20px;
  }

  .faq-container h2 {
    font-size: 2.8rem;
  }
}



============================================================
DATEI: css\footer.css
============================================================

.footer {
  background: var(--color-dark);
  color: var(--color-text-light);
  padding: 60px 20px 25px;
}

.footer-container {
  max-width: var(--container-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.footer h2,
.footer h3 {
  color: var(--color-primary);
}

.footer h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.footer h3 {
  font-size: 1rem;
  margin-bottom: 15px;
}

.footer p {
  line-height: 1.7;
  opacity: 0.9;
}

.footer ul {
  padding: 0;
  list-style: none;
}

.footer li {
  margin-bottom: 10px;
}

.footer a {
  color: var(--color-text-light);
  text-decoration: none;
  transition: var(--transition);
}

.footer a:hover {
  color: var(--color-primary);
}

.footer-navigation a:hover {
  transform: translateX(3px);
}

.footer-bottom {
  max-width: var(--container-width);
  margin: 40px auto 0;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  text-align: center;
}

.footer-legal {
  display: flex;
  gap: 20px;
}

@media (min-width: 1024px) {
  .footer-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .footer-brand {
    max-width: 300px;
  }

  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
}



============================================================
DATEI: css\global.css
============================================================

:root {
  --color-primary: #d4b295;
  --color-dark: #2a2421;

  --color-background: #fdfbf9;
  --color-surface: #ffffff;

  --color-text: #333333;
  --color-text-light: #ffffff;
  --color-text-muted: #666666;

  --color-border: #dddddd;
  --color-primary-soft: rgba(212, 178, 149, 0.08);

  --font-main: "Nunito Sans", Arial, sans-serif;

  --container-width: 1200px;

  --radius: 10px;
  --shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

  --transition: 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-main);
  background: var(--color-background);
  color: var(--color-text);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 14px 28px;
  border: 2px solid transparent;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.2;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  white-space: nowrap;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-dark);
  box-shadow: 0 8px 20px rgba(212, 178, 149, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(0.95);
}

.btn-secondary {
  background: rgba(42, 36, 33, 0.04);
  border-color: rgba(42, 36, 33, 0.18);
  color: var(--color-dark);
}

.btn-secondary:hover {
  background: rgba(42, 36, 33, 0.06);
  border-color: rgba(42, 36, 33, 0.28);
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
}

.btn-row.justify-between {
  justify-content: space-between;
}

.btn-row .btn {
  margin: 0;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive images and basic accessibility */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}

/* Mobile tweaks: larger tap targets and readable text */
@media (max-width: 600px) {
  .btn {
    padding: 16px 20px;
    font-size: 1.05rem;
  }

  input,
  textarea,
  select,
  .btn {
    min-height: 44px;
  }
}

/* Remove mouse-click outlines while keeping keyboard focus-visible */
.menu-toggle:focus,
.btn:focus,
.navigation a:focus {
  outline: none;
}



============================================================
DATEI: css\header.css
============================================================

.main-header {
  position: sticky;
  top: 0;
  width: 100%;
  background: var(--color-dark);
  z-index: 1000;
  padding: 15px 0;
}

.header-container {
  max-width: var(--container-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo h1 {
  min-inline-size: 250px;
  color: var(--color-primary);
  font-size: 20px;
  font-weight: 600;
}

.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  border: 0;
  background: none;
  cursor: pointer;
}

.menu-toggle span {
  width: 100%;
  height: 3px;
  background: var(--color-primary);
  transition: var(--transition);
}

.navigation {
  position: absolute;
  top: 100%;
  right: 0;
  width: 300px;
  max-width: 100vw;
  background: var(--color-dark);
  border-radius: 0 0 var(--radius) var(--radius);
  box-shadow: var(--shadow);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: var(--transition);
}

.navigation.is-active {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.navigation ul {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 20px;
  list-style: none;
}

.navigation li {
  width: 100%;
}

.navigation a {
  display: block;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  color: var(--color-text-light);
  background: transparent;
  border-radius: var(--radius);
  font-weight: 500;
  transition: var(--transition);
}

.navigation a.nav-cta {
  background: var(--color-primary);
  color: var(--color-dark);
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(212, 178, 149, 0.2);
}

.navigation a.active:not(.nav-cta),
.navigation a:hover:not(.nav-cta),
.navigation a.nav-cta:hover {
  background: var(--color-primary);
  color: var(--color-dark);
}

.navigation a.active:not(.nav-cta),
.navigation a:hover:not(.nav-cta) {
  border-radius: var(--radius);
}

@media (min-width: 1024px) {
  .logo h1 {
    font-size: 26px;
  }

  .menu-toggle {
    display: none;
  }

  .navigation {
    position: static;
    width: auto;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
    opacity: 1;
    visibility: visible;
    transform: none;
  }

  .navigation ul {
    flex-direction: row;
    gap: 20px;
    padding: 0;
    align-items: center;
  }

  .navigation a {
    width: auto;
    padding: 8px 12px;
    font-size: 14px;
  }
}


============================================================
DATEI: css\hero.css
============================================================

.hero {
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 70vh;
  padding: 80px 20px;

  text-align: center;

  background:
    linear-gradient(rgba(253, 251, 249, 0.75), rgba(212, 178, 149, 0.45)),
    url("../images/hero.jpg");

  background-size: cover;
  background-position: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;

  opacity: 0;
  transform: translateY(20px);

  animation: fadeUp 0.8s ease forwards;
}

.hero h1 {
  margin-bottom: 40px;
  color: var(--color-dark);
  font-size: 3.5rem;
  line-height: 1.2;
}

.hero p {
  margin-bottom: 35px;
  color: var(--color-dark);
  font-size: 1rem;
  line-height: 1.7;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn {
  display: inline-block;
  padding: 14px 28px;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-dark);
}

.btn-primary:hover {
  transform: translateY(-2px);
  filter: brightness(0.95);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.45);
  border: 2px solid var(--color-dark);
  color: var(--color-dark);
}

.btn-secondary:hover {
  background: var(--color-dark);
  color: var(--color-text-light);
}

@media (min-width: 1024px) {
  .hero {
    min-height: 80vh;
    padding: 140px 20px;
  }

  .hero h1 {
    font-size: 3.5rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: row;
    justify-content: center;
  }
}



============================================================
DATEI: css\process.css
============================================================

.process-section {
  padding: 80px 20px;
  background: var(--color-surface);
}

.process-container {
  max-width: var(--container-width);
  margin: 0 auto;
  text-align: center;
}

.process-container h2 {
  color: var(--color-dark);
  font-size: 2rem;
  margin-bottom: 20px;
}

.process-intro {
  max-width: 650px;
  margin: 0 auto 60px;
  line-height: 1.7;
  color: var(--color-dark);
}

.process-grid {
  display: grid;
  gap: 45px;
}

.process-step {
  position: relative;
}

.process-step:not(:last-child)::after {
  content: "↓";
  display: block;
  margin-top: 35px;
  font-size: 1.5rem;
  color: var(--color-primary);
}

.step-number {
  width: 60px;
  height: 60px;

  margin: 0 auto 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;

  background: var(--color-primary);
  color: var(--color-dark);

  font-size: 1.3rem;
  font-weight: 700;

  transition: transform 0.3s;
}

.process-step:hover .step-number {
  transform: scale(1.08);
}

.process-step h3 {
  margin-bottom: 15px;
  color: var(--color-dark);
}

.process-step p {
  line-height: 1.6;
  color: var(--color-text-muted);
}

.process-ending {
  margin: 70px auto 30px;
  max-width: 600px;
  line-height: 1.7;
  color: var(--color-dark);
}

.process-container .btn {
  display: inline-block;
}

@media (min-width: 1024px) {
  .process-section {
    padding: 100px 20px;
  }

  .process-container h2 {
    font-size: 2.8rem;
  }

  .process-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
  }

  .process-step {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .process-step:not(:last-child)::after {
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
DATEI: css\services-page.css
============================================================

/* Hero */

.services-hero {
  padding: 90px 20px;
  background: linear-gradient(
    135deg,
    var(--color-background),
    var(--color-primary-soft)
  );
  text-align: center;
}

.services-hero-content {
  max-width: 800px;
  margin: 0 auto;

  opacity: 0;
  transform: translateY(20px);

  animation: fadeUp 0.8s ease forwards;
}

.services-hero h1 {
  margin-bottom: 20px;

  color: var(--color-dark);

  font-size: 2.3rem;
}

.services-hero p {
  color: var(--color-text-muted);
  line-height: 1.7;
}

/* Allgemein */

.services-container {
  max-width: var(--container-width);
  margin: 0 auto;
}

.services-overview,
.services-approach,
.services-form,
.services-cost,
.services-process,
.services-cta {
  padding: 80px 20px;
}

.services-container h2 {
  margin-bottom: 40px;

  color: var(--color-dark);

  text-align: center;
}

/* Karten */

.services-cards {
  display: grid;
  grid-template-columns: 1fr;

  gap: 25px;
}

.service-card {
  overflow: hidden;

  background: var(--color-surface);

  border-radius: var(--radius);

  box-shadow: var(--shadow);

  transition: var(--transition);
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card img {
  width: 100%;
  height: 220px;

  object-fit: cover;
}

.service-content {
  padding: 30px 25px;

  text-align: center;
}

.service-card h3 {
  margin-bottom: 15px;

  color: var(--color-dark);
}

.service-card p {
  color: var(--color-text-muted);

  line-height: 1.6;
}

/* Beratungsansatz */

.services-approach {
  background: var(--color-background);
}

.services-approach .services-cards {
  justify-content: center;
}

/* Beratungsformen */

.services-form {
  background: var(--color-surface);
}

/* Kosten */

.services-cost {
  background: var(--color-background);

  text-align: center;
}

.services-cost p {
  max-width: 800px;
  margin: 0 auto;

  color: var(--color-text-muted);

  line-height: 1.7;
}

/* Ablauf */

.services-process {
  background: var(--color-surface);
}

.services-steps {
  display: grid;
  grid-template-columns: 1fr;

  gap: 45px;
}

.services-step {
  position: relative;

  text-align: center;
}

.services-step span {
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

.services-step:hover span {
  transform: scale(1.1);
}

.services-step h3 {
  margin-bottom: 15px;

  color: var(--color-dark);
}

.services-step p {
  color: var(--color-text-muted);

  line-height: 1.6;
}

/* CTA */

.services-cta {
  background: var(--color-dark);

  text-align: center;
}

.services-cta h2 {
  color: var(--color-text-light);
}

/* Animation */

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Desktop */

@media (min-width: 1024px) {
  .services-hero h1 {
    font-size: 3.5rem;
  }

  .services-cards {
    grid-template-columns: repeat(2, 1fr);

    max-width: 1000px;
    margin: 0 auto;
  }

  .services-overview .services-cards {
    grid-template-columns: repeat(4, 1fr);

    max-width: none;
  }

  .services-approach .services-cards,
  .services-form .services-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .services-steps {
    grid-template-columns: repeat(3, 1fr);

    gap: 30px;
  }

  .services-step {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}



============================================================
DATEI: css\services.css
============================================================

.services-section {
  padding: 80px 20px;
  background: var(--color-background);
}

.services-container {
  max-width: var(--container-width);
  margin: 0 auto;
  text-align: center;
}

.services-container h2 {
  color: var(--color-dark);
  font-size: 2rem;
  margin-bottom: 20px;
}

.services-intro {
  max-width: 700px;
  margin: 0 auto 50px;
  color: var(--color-dark);
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.service-card {
  overflow: hidden;
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  text-align: left;
  transition: var(--transition);
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.service-content {
  padding: 25px;
}

.service-content h3 {
  color: var(--color-dark);
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.service-content p {
  color: var(--color-text);
  line-height: 1.6;
  margin-bottom: 25px;
}

.service-content .btn {
  display: inline-block;
}

@media (min-width: 1024px) {
  .services-section {
    padding: 100px 20px;
  }

  .services-container h2 {
    font-size: 2.8rem;
  }

  .services-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }
}



============================================================
DATEI: css\success.css
============================================================

.success {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, var(--color-background), #f4e7db);
}

.success-card {
  max-width: 700px;
  padding: 50px 40px;
  background: #fff;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  text-align: center;
}

.success-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.success h1 {
  margin-bottom: 20px;
  color: var(--color-dark);
}

.success p {
  margin-bottom: 18px;
  line-height: 1.7;
  color: var(--color-text-muted);
}

.btn {
  margin-top: 50px;
  text-align: center;
}

.btn p {
  margin-bottom: 10px;
  color: var(--color-dark);
}


