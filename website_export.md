
============================================================
DATEI: css\about.css
============================================================

/* ========================================
   ABOUT
   ======================================== */

.about-section {
  padding: 80px 20px;
  background: var(--color-surface);
}

.about-container {
  max-width: var(--container-width);
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  gap: 40px;
}

.about-content {
  color: var(--color-dark);
}

.about-content h2 {
  margin-bottom: 25px;

  color: var(--color-dark);
  font-size: 2rem;
  line-height: 1.2;
}

.about-content p {
  margin-bottom: 20px;

  color: var(--color-text);
  line-height: 1.75;
}

.about-content .btn {
  margin-top: 10px;
}

.about-image {
  order: -1;
}

.about-image img {
  display: block;

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
    order: 0;
  }

  .about-content h2 {
    font-size: 2.8rem;
  }
}


============================================================
DATEI: css\faq.css
============================================================

/* ========================================
   FAQ
   ======================================== */

.faq-section {
  padding: 80px 20px;
  background: var(--color-surface);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-container h2 {
  margin-bottom: 20px;

  color: var(--color-dark);
  font-size: 2rem;
  line-height: 1.2;
  text-align: center;
}

.faq-intro {
  max-width: 650px;
  margin: 0 auto 50px;

  color: var(--color-text-muted);
  line-height: 1.7;
  text-align: center;
}

.faq-item {
  border-bottom: 1px solid var(--color-border);

  transition:
    background var(--transition),
    box-shadow var(--transition);
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
  padding: 22px 20px;

  display: flex;
  align-items: center;

  border: 0;
  background: transparent;

  color: var(--color-dark);

  font-family: inherit;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.4;

  text-align: left;

  cursor: pointer;

  transition: background var(--transition);
}

.faq-question:hover {
  background: var(--color-primary-soft);
}

.faq-question::before {
  content: "▸";

  flex-shrink: 0;

  margin-right: 18px;

  color: var(--color-primary);

  transition: transform 0.3s ease;
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

  padding: 0 20px 0 58px;

  opacity: 0;

  transition:
    grid-template-rows 0.35s ease,
    opacity 0.35s ease,
    padding 0.35s ease;
}

.faq-answer p {
  overflow: hidden;
  margin: 0;

  color: var(--color-text);
  line-height: 1.7;
}

.faq-item.is-open .faq-answer {
  grid-template-rows: 1fr;

  padding-bottom: 25px;

  opacity: 1;
}

.faq-cta {
  margin-top: 70px;

  text-align: center;
}

.faq-cta h3 {
  margin-bottom: 15px;

  color: var(--color-dark);
}

.faq-cta p {
  margin-bottom: 30px;

  color: var(--color-text);
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
DATEI: css\global.css
============================================================

:root {
  /* =====================================================
     COLORS
  ====================================================== */

  --color-primary: #d4b295;
  --color-primary-hover: #c7a486;
  --color-primary-soft: rgba(212, 178, 149, 0.1);

  --color-dark: #2a2421;

  --color-background: #fdfbf9;
  --color-surface: #ffffff;

  --color-text: #333333;
  --color-text-light: #ffffff;
  --color-text-muted: #666666;

  --color-border: #dddddd;
  --color-border-strong: #cfcfcf;

  --color-success: #2f7d4a;
  --color-warning: #a66a00;
  --color-danger: #b42318;

  /* =====================================================
     TYPOGRAPHY
  ====================================================== */

  --font-main: "Nunito Sans", Arial, sans-serif;

  --font-size-xs: 0.8rem;
  --font-size-sm: 0.9rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.35rem;
  --font-size-2xl: 1.75rem;
  --font-size-3xl: 2.25rem;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;

  /* =====================================================
     LAYOUT
  ====================================================== */

  --container-width: 1200px;

  --space-xs: 8px;
  --space-sm: 12px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 80px;

  /* =====================================================
     RADIUS
  ====================================================== */

  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;

  /* Bestehender Name bleibt erhalten,
     damit bestehender Code nicht kaputtgeht. */
  --radius: var(--radius-md);

  /* =====================================================
     SHADOWS
  ====================================================== */

  --shadow-sm: 0 2px 8px rgba(42, 36, 33, 0.06);
  --shadow-md: 0 8px 20px rgba(42, 36, 33, 0.1);
  --shadow-lg: 0 16px 36px rgba(42, 36, 33, 0.14);

  --shadow: var(--shadow-md);

  /* =====================================================
     TRANSITIONS
  ====================================================== */

  --transition-fast: 0.2s ease;
  --transition: 0.25s ease;
  --transition-slow: 0.3s ease;
}


/* =====================================================
   RESET
====================================================== */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


html {
  scroll-behavior: smooth;
}


body {
  font-family: var(--font-main);
  background: var(--color-background);
  color: var(--color-text);

  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
}


/* =====================================================
   TYPOGRAPHY BASICS
====================================================== */

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--color-dark);
  line-height: var(--line-height-tight);
}


p {
  line-height: var(--line-height-relaxed);
}


small {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}


a {
  color: inherit;
}


/* =====================================================
   IMAGES
====================================================== */

img {
  display: block;
  max-width: 100%;
  height: auto;
}


/* =====================================================
   BUTTONS – BASIS
====================================================== */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 46px;
  padding: 12px 24px;

  border: 1px solid transparent;
  border-radius: var(--radius-md);

  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);

  text-decoration: none;
  text-align: center;

  cursor: pointer;

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast),
    box-shadow var(--transition-fast),
    transform var(--transition-fast);

  white-space: nowrap;
}


/* =====================================================
   PRIMARY BUTTON
====================================================== */

.btn-primary {
  background: var(--color-primary);
  color: var(--color-dark);

  box-shadow: 0 3px 8px rgba(212, 178, 149, 0.16);
}

.btn-primary:hover {
  background: var(--color-primary-hover);

  transform: translateY(-1px);

  box-shadow: 0 4px 10px rgba(212, 178, 149, 0.22);
}


/* =====================================================
   SECONDARY BUTTON
====================================================== */

.btn-secondary {
  background: rgba(42, 36, 33, 0.04);
  border-color: rgba(42, 36, 33, 0.18);
  color: var(--color-dark);

  box-shadow: 0 4px 10px rgba(42, 36, 33, 0.05);
}

.btn-secondary:hover {
  transform: translateY(-1px);

  background: rgba(42, 36, 33, 0.06);
  border-color: rgba(42, 36, 33, 0.25);

  box-shadow: 0 6px 14px rgba(42, 36, 33, 0.08);
}


/* =====================================================
   BUTTON ROW
====================================================== */

.btn-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  gap: var(--space-md);

  margin-top: var(--space-lg);
}


.btn-row .btn {
  margin: 0;
}


.btn-row.justify-between {
  justify-content: space-between;
}


/* =====================================================
   DISABLED BUTTON
====================================================== */

.btn:disabled {
  opacity: 0.55;

  cursor: not-allowed;

  transform: none;

  box-shadow: none;
}


.btn:disabled:hover {
  transform: none;
}


/* =====================================================
   FORMS – GLOBAL BASIS
====================================================== */

input,
textarea,
select {
  font-family: inherit;
  font-size: var(--font-size-base);
}


input,
textarea,
select {
  width: 100%;

  min-height: 46px;

  padding: 11px 14px;

  border: 1px solid var(--color-border);

  border-radius: var(--radius-sm);

  background: var(--color-surface);

  color: var(--color-text);

  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast),
    background-color var(--transition-fast);
}


textarea {
  min-height: 120px;

  resize: vertical;
}


input::placeholder,
textarea::placeholder {
  color: var(--color-text-muted);
}


input:hover,
textarea:hover,
select:hover {
  border-color: var(--color-border-strong);
}


input:focus,
textarea:focus,
select:focus {
  border-color: var(--color-primary);

  outline: none;

  box-shadow:
    0 0 0 3px var(--color-primary-soft);
}


/* =====================================================
   ACCESSIBILITY – FOCUS
====================================================== */

:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}


/*
   Absichtlich KEIN globales
   element:focus { outline: none; }

   Dadurch bleibt der sichtbare Tastatur-Fokus erhalten.
*/


/* =====================================================
   STATUS COLORS
====================================================== */

.status-success {
  color: var(--color-success);
}


.status-warning {
  color: var(--color-warning);
}


.status-danger {
  color: var(--color-danger);
}


/* =====================================================
   ANIMATION
====================================================== */

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


/* =====================================================
   MOBILE
====================================================== */

@media (max-width: 600px) {

  .btn {
    min-height: 48px;

    padding: 13px 20px;

    font-size: var(--font-size-base);
  }

  input,
  textarea,
  select {
    min-height: 46px;
  }

}


============================================================
DATEI: css\header.css
============================================================

/* ========================================
   HEADER
======================================== */

.main-header {
  position: sticky;
  top: 0;

  width: 100%;

  background: var(--color-dark);

  z-index: 1000;

  padding: 14px 0;
}


.header-container {
  max-width: var(--container-width);

  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;
}


/* ========================================
   LOGO
======================================== */

.logo {
  flex-shrink: 0;
}


.logo h1 {
  min-inline-size: 0;

  color: var(--color-primary);

  font-size: 22px;
  font-weight: 600;

  line-height: 1.2;
}


/* ========================================
   MOBILE MENU BUTTON
======================================== */

.menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 30px;
  height: 21px;

  padding: 0;

  border: none;

  background: transparent;

  cursor: pointer;
}


.menu-toggle span {
  width: 100%;
  height: 2px;

  border-radius: 2px;

  background: var(--color-primary);

  transition:
    transform var(--transition),
    opacity var(--transition);
}


/* ========================================
   NAVIGATION – MOBILE
======================================== */

.navigation {
  position: absolute;

  top: 100%;
  left: 12px;
  right: 12px;

  background: var(--color-dark);

  border-radius:
    0 0
    var(--radius-lg)
    var(--radius-lg);

  box-shadow: var(--shadow-md);

  opacity: 0;
  visibility: hidden;

  transform: translateY(-8px);

  transition:
    opacity var(--transition),
    visibility var(--transition),
    transform var(--transition);
}


.navigation.is-active {
  opacity: 1;
  visibility: visible;

  transform: translateY(0);
}


.navigation ul {
  display: flex;
  flex-direction: column;

  gap: 4px;

  width: 100%;

  padding: 14px;

  list-style: none;
}


.navigation li {
  width: 100%;
}


/* ========================================
   NORMALE NAVIGATION LINKS
======================================== */

.navigation a {
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 44px;

  padding: 10px 14px;

  border: 1px solid transparent;
  border-radius: var(--radius-sm);

  background: transparent;

  color: rgba(255, 255, 255, 0.82);

  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;

  line-height: 1.2;

  text-decoration: none;
  text-align: left;

  cursor: pointer;

  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);
}


/* ========================================
   NORMALE LINKS – HOVER
======================================== */

.navigation a:hover {
  background: rgba(255, 255, 255, 0.06);

  color: var(--color-text-light);
}


/* ========================================
   AKTIVE SEITE
======================================== */

.navigation a.active {
  color: var(--color-primary);
}


/* ========================================
   TERMIN BUCHEN – HAUPT-CTA
   5. Menüpunkt
======================================== */

.navigation li:last-child {
  margin-left: 8px;
  padding-left: 12px;
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.navigation li:last-child a {
  background: var(--color-primary);
  color: var(--color-dark);
  box-shadow: 0 3px 8px rgba(212, 178, 149, 0.16);
}

.navigation li:last-child a:hover {
  background: var(--color-primary-hover);
  color: var(--color-dark);
  box-shadow: 0 4px 10px rgba(212, 178, 149, 0.22);
}

.navigation a:not(.nav-cta):hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--color-primary);
}

.navigation a:not(.nav-cta).active {
  color: var(--color-primary);
}

/* ========================================
   DESKTOP
======================================== */

@media (min-width: 1024px) {

  .menu-toggle {
    display: none;
  }


  .navigation {
    position: static;

    width: auto;

    background: transparent;

    border-radius: 0;

    box-shadow: none;

    opacity: 1;
    visibility: visible;

    transform: none;
  }


  .navigation ul {
    flex-direction: row;

    align-items: center;

    gap: 4px;

    padding: 0;
  }


  .navigation li {
    width: auto;
  }


  .navigation a {
    width: auto;

    min-height: 40px;

    padding: 8px 12px;

    font-size: 0.9rem;

    text-align: center;
  }


  .navigation li:nth-child(5) a {
    margin-top: 0;
    margin-left: 8px;

    padding-left: 16px;
    padding-right: 16px;
  }

}


/* ========================================
   MOBILE
======================================== */

@media (max-width: 600px) {

  .header-container {
    padding: 0 16px;
  }


  .logo h1 {
    font-size: 21px;
  }

}


============================================================
DATEI: css\hero.css
============================================================

/* ========================================
   HERO
   ======================================== */

.hero {
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 70vh;
  padding: 90px 20px;

  text-align: center;

  background:
    linear-gradient(
      rgba(253, 251, 249, 0.78),
      rgba(212, 178, 149, 0.48)
    ),
    url("../images/hero.jpg");

  background-size: cover;
  background-position: center;
}

.hero-content {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  opacity: 0;
  transform: translateY(20px);

  animation: fadeUp 0.8s ease forwards;
}

.hero h1 {
  max-width: 900px;
  margin: 0 auto 30px;

  color: var(--color-dark);

  font-size: clamp(2.2rem, 6vw, 4rem);
  line-height: 1.15;
  font-weight: 700;
}

.hero p {
  max-width: 780px;
  margin: 0 auto 35px;

  color: var(--color-dark);

  font-size: 1.05rem;
  line-height: 1.75;
}

.hero-buttons {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 14px;

  max-width: 420px;
  margin: 0 auto;
}

.hero-buttons .btn {
  width: 100%;
}


/* ========================================
   DESKTOP
   ======================================== */

@media (min-width: 768px) {
  .hero {
    min-height: 75vh;
    padding: 120px 20px;
  }

  .hero-buttons {
    flex-direction: row;
    justify-content: center;
    align-items: center;

    max-width: none;
  }

  .hero-buttons .btn {
    width: auto;
  }
}


@media (min-width: 1024px) {
  .hero {
    min-height: 80vh;
    padding: 140px 20px;
  }

  .hero p {
    font-size: 1.15rem;
  }
}


============================================================
DATEI: css\process.css
============================================================

/* ========================================
   PROCESS
   ======================================== */

.process-section {
  padding: 80px 20px;
  background: var(--color-background);
}

.process-container {
  max-width: var(--container-width);
  margin: 0 auto;

  text-align: center;
}

.process-container h2 {
  margin-bottom: 20px;

  color: var(--color-dark);
  font-size: 2rem;
  line-height: 1.2;
}

.process-intro {
  max-width: 650px;
  margin: 0 auto 60px;

  color: var(--color-text-muted);
  line-height: 1.7;
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

  color: var(--color-primary);
  font-size: 1.5rem;
}

.step-number {
  width: 60px;
  height: 60px;

  margin: 0 auto 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--color-primary);
  color: var(--color-dark);

  font-size: 1.3rem;
  font-weight: 700;

  transition: transform var(--transition);
}

.process-step:hover .step-number {
  transform: scale(1.08);
}

.process-step h3 {
  margin-bottom: 15px;

  color: var(--color-dark);
}

.process-step p {
  color: var(--color-text-muted);
  line-height: 1.7;
}

.process-ending {
  max-width: 600px;
  margin: 70px auto 30px;

  color: var(--color-dark);
  line-height: 1.7;
}


@media (min-width: 768px) {
  .process-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 50px 30px;
  }

  .process-step:not(:last-child)::after {
    content: none;
  }
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

  .process-step:not(:last-child)::after {
    content: "→";

    position: absolute;

    top: 30px;
    right: -18px;

    margin: 0;

    color: var(--color-primary);
    font-size: 1.5rem;
  }
}


============================================================
DATEI: css\services.css
============================================================

/* ========================================
   SERVICES
   ======================================== */

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
  max-width: 800px;
  margin: 0 auto 20px;

  color: var(--color-dark);
  font-size: 2rem;
  line-height: 1.2;
}

.services-intro {
  max-width: 700px;
  margin: 0 auto 50px;

  color: var(--color-text-muted);
  line-height: 1.7;
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  text-align: left;
}

.service-card {
  overflow: hidden;

  display: flex;
  flex-direction: column;

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);

  box-shadow: var(--shadow);

  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 30px rgba(42, 36, 33, 0.12);
}

.service-card img {
  display: block;

  width: 100%;
  height: 220px;

  object-fit: cover;
}

.service-content {
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 28px;
}

.service-content h3 {
  margin-bottom: 15px;

  color: var(--color-dark);
  font-size: 1.3rem;
  line-height: 1.3;
}

.service-content p {
  margin-bottom: 25px;

  color: var(--color-text);
  line-height: 1.7;
}

.service-content .btn {
  align-self: flex-start;
  margin-top: auto;
}


@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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
DATEI: index.html
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
    <link rel="stylesheet" href="css/hero.css" />
    <link rel="stylesheet" href="css/services.css" />
    <link rel="stylesheet" href="css/about.css" />
    <link rel="stylesheet" href="css/process.css" />
    <link rel="stylesheet" href="css/faq.css" />
  </head>

  <body data-page="index">
  <main>
    <section class="hero">
      <div class="hero-content">
        <h1 data-text="index_Hero_title">Systemisch. Auf Augenhöhe. Damit Orientierung, Handlungsspielräume und Sicherheit wachsen können.</h1>

        <p data-text="index_Hero_text">Willkommen bei Aufwind Beratung. Ich begleite Frauen und Familien bei persönlichen und familiären Herausforderungen, an beruflichen und persönlichen Wendepunkten sowie rund um die Themen Elternschaft und Schule. Gemeinsam schaffen wir Raum, um neue Perspektiven zu gewinnen, Veränderungen zu gestalten und den eigenen Weg zu finden – persönlich in Wiesbaden oder online.</p>

        <div class="hero-buttons">
          <a
            href="booking.html"
            class="btn btn-primary"
            data-text="index_Hero_button1"
          >Termin vereinbaren</a>

          <a
            href="services.html"
            class="btn btn-secondary"
            data-text="index_Hero_button2"
          >Mehr erfahren</a>
        </div>
      </div>
    </section>

    <section class="services-section">
      <div class="services-container">
        <h2 data-text="index_Leistungen_title">Gemeinsam neue Wege entdecken</h2>

        <p class="services-intro" data-text="index_Leistungen_intro">Jeder Mensch steht vor individuellen Herausforderungen. Gemeinsam entwickeln wir neue Perspektiven und finden Wege, die zu Ihrer persönlichen Situation passen.</p>

        <div class="services-grid">
          <article class="service-card">
            <div class="service-content">
              <h3 data-text="index_Leistung_1_title">Familien- &amp; Elternberatung</h3>

              <p data-text="index_Leistung_1_text">Wenn Beziehungen schwierig werden und sich vertraute Dynamiken verändern. Unterstützung bei familiären Konflikten, Elternschaft, Kommunikation und Situationen, in denen Schule, Familie und persönliche Belastungen miteinander verbunden sind.</p>

              <a
                href="services.html"
                class="btn btn-primary"
                data-text="index_Leistung_1_button"
              >Mehr erfahren</a>
            </div>
          </article>

          <article class="service-card">
            <div class="service-content">
              <h3 data-text="index_Leistung_2_title">Beratung für Frauen</h3>

              <p data-text="index_Leistung_2_text">Wenn Sie sich neu orientieren, in einer Veränderung stecken oder wieder mehr bei sich selbst ankommen möchten. Begleitung bei persönlichen und beruflichen Wendepunkten, Selbstzweifeln, Entscheidungsfragen, Grenzen, Rollenveränderungen und neuen Lebensperspektiven.</p>

              <a
                href="services.html"
                class="btn btn-primary"
                data-text="index_Leistung_2_button"
              >Mehr erfahren</a>
            </div>
          </article>

          <article class="service-card">
            <div class="service-content">
              <h3 data-text="index_Leistung_3_title">Schule &amp; Übergänge</h3>

              <p data-text="index_Leistung_3_text">Wenn Schule zur Herausforderung für Ihr Kind oder die ganze Familie wird. Beratung bei schulischen Übergängen, Konflikten, Überforderung, Motivation, Leistungsdruck und schwierigen Situationen zwischen Eltern, Kindern und Schule.</p>

              <a
                href="services.html"
                class="btn btn-primary"
                data-text="index_Leistung_3_button"
              >Mehr erfahren</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="about-section">
      <div class="about-container">
        <div class="about-content">
          <h2 data-text="index_Ueber_mich_title">Über Aufwind Beratung</h2>

          <p data-text="index_Ueber_mich_text1">Mit meiner 30-jährigen Erfahrung in den Bereichen Nachhilfe, Begabtenförderung, Schule, Praktikantenbetreuung, Lehrerausbildung und Beratung verbinde ich umfassende pädagogische und psychologische Kompetenzen mit einem tiefen Verständnis für die vielfältigen Herausforderungen des erzieherischen, pädagogischen und schulischen Alltags. Über viele Jahre hinweg habe ich Menschen zu unterschiedlichen persönlichen, familiären, pädagogischen und beruflichen Fragestellungen beraten und begleitet. Auch als Mutter von zwei Kindern im Alter von 8 und 14 Jahren erlebe ich den Familienalltag aus einer ganz persönlichen Perspektive – mit seinen schönen Momenten, aber auch mit seinen Herausforderungen und Veränderungen. Diese Verbindung aus langjähriger beruflicher Beratungserfahrung und persönlichem Erleben ermöglicht es mir, Eltern und Familien einfühlsam und auf Augenhöhe zu begegnen. In meiner Beratung möchte ich einen geschützten Raum schaffen, in dem Sorgen, Fragen und Unsicherheiten Platz haben und in dem gemeinsam neue Perspektiven und passende Wege gefunden werden können.</p>

          <p data-text="index_Ueber_mich_text2">Gemeinsam entdecken wir Ressourcen, lösen Blockaden und entwickeln neue Möglichkeiten für nachhaltige Veränderungen.</p>

          <a
            href="about.html"
            class="btn btn-primary"
            data-text="index_Ueber_mich_button"
          >Mehr über mich</a>
        </div>

        <div class="about-image">
          <img
            src="https://placehold.co/800x600?text=Aufwind+Beratung"
            alt="Aufwind Beratung"
          />
        </div>
      </div>
    </section>

    <section class="process-section">
      <div class="process-container">
        <h2 data-text="index_Ablauf_title">So läuft eine Beratung ab</h2>

        <p class="process-intro" data-text="index_Ablauf_intro">Der erste Schritt ist oft der schwerste. Ich begleite Sie Schritt für Schritt – vom ersten Kennenlernen bis zur Entwicklung neuer Perspektiven.</p>

        <div class="process-grid">
          <article class="process-step">
            <div class="step-number">1</div>

            <h3 data-text="index_Schritt_1_title">Erstkontakt</h3>

            <p data-text="index_Schritt_1_text">Kurzes Kennenlernen und Terminvereinbarung.</p>
          </article>

          <article class="process-step">
            <div class="step-number">2</div>

            <h3 data-text="index_Schritt_2_title">Persönliches Gespräch</h3>

            <p data-text="index_Schritt_2_text">Gemeinsam besprechen wir Ihre Situation, Wünsche und Ziele.</p>
          </article>

          <article class="process-step">
            <div class="step-number">3</div>

            <h3 data-text="index_Schritt_3_title">Gemeinsame Lösungen</h3>

            <p data-text="index_Schritt_3_text">Gemeinsam entwickeln wir neue Perspektiven und individuelle Handlungsmöglichkeiten.</p>
          </article>

          <article class="process-step">
            <div class="step-number">4</div>

            <h3 data-text="index_Schritt_4_title">Nachhaltige Begleitung</h3>

            <p data-text="index_Schritt_4_text">Ich begleite Sie dabei, neue Wege Schritt für Schritt in Ihren Alltag zu integrieren.</p>
          </article>
        </div>

        <p class="process-ending" data-text="index_Ablauf_ending">Ich freue mich darauf, Sie auf Ihrem Weg zu begleiten.</p>

        <a
          href="contact.html"
          class="btn btn-primary"
          data-text="index_Ablauf_button"
        >Jetzt Termin vereinbaren</a>
      </div>
    </section>

    <section class="faq-section">
      <div class="faq-container">
        <h2 data-text="index_FAQ_title">Häufige Fragen</h2>

        <p class="faq-intro" data-text="index_FAQ_intro">Hier finden Sie Antworten auf Fragen, die mir häufig gestellt werden.</p>

        <div class="faq">
          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_1_question"
            >Wie läuft eine Beratung ab?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_1_answer">Nach einem ersten Kennenlernen besprechen wir Ihre Anliegen und Ziele. Gemeinsam entwickeln wir passende Lösungsansätze und arbeiten Schritt für Schritt an den Themen, die Ihnen wichtig sind.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_2_question"
            >Wie lange dauert eine Sitzung?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_2_answer">Eine Beratung dauert in der Regel etwa 60 Minuten. Die genaue Dauer kann je nach Anliegen individuell vereinbart werden.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_3_question"
            >Wo findet die Beratung statt?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_3_answer">Die Beratung findet persönlich in Wiesbaden oder bequem online statt – ganz so, wie es am besten zu Ihrer Situation passt.		</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_4_question"
            >Was kostet eine Beratung?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_4_answer">Alle Informationen zu den Kosten finden Sie auf der Seite „Kosten &amp; Terminbuchung“. Gerne beantworte ich Ihre Fragen auch persönlich.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_5_question"
            >Werden meine Gespräche vertraulich behandelt?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_5_answer">Ja. Vertraulichkeit ist eine wichtige Grundlage meiner Arbeit. Alle Gespräche werden selbstverständlich vertraulich behandelt.</p>
            </div>
          </div>

          <div class="faq-item">
            <button
              class="faq-question"
              aria-expanded="false"
              data-text="index_FAQ_6_question"
            >Wie kann ich einen Termin vereinbaren?</button>

            <div class="faq-answer">
              <p data-text="index_FAQ_6_answer">Sie können mich ganz einfach per E-Mail oder telefonisch kontaktieren oder über die Terminseite eine Anfrage stellen.</p>
            </div>
          </div>
        </div>

        <div class="faq-cta">
          <h3 data-text="index_FAQ_CTA_title">Ich freue mich darauf, Sie kennenzulernen.</h3>

          <p data-text="index_FAQ_CTA_text">Haben Sie noch Fragen oder möchten einen Termin vereinbaren? Ich freue mich auf Ihre Nachricht.</p>

          <a
            href="contact.html"
            class="btn btn-primary"
            data-text="index_FAQ_CTA_button"
          >Termin vereinbaren</a>
        </div>
      </div>
    </section>

  </main>
  </body>

  <script src="js/load-components.js"></script>
  <script src="js/header.js"></script>
  <script src="js/faq.js"></script>
  <script src="js/content-loader.js"></script>

</html>


