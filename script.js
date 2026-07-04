/* ============================================================
   DELL CONSTRUCTIONS — SITE SCRIPT (v2)
   ============================================================

   HOW TO ADD YOUR OWN PHOTOS
   ---------------------------------------------------------
   1. Save your own photos (screenshots, or copies you have the
      rights to use) into an "images" folder in your GitHub repo.
   2. Add a line to the GALLERY array below, e.g:
        { src: "images/kanahooka-exterior.jpg", caption: "Kanahooka duplex" }
   3. Until you add real photos, placeholder boxes show instead
      so you can see the layout.

   Suggested captions for the two projects you mentioned are
   already written in as commented-out examples below — just
   uncomment and point them at your saved image files.
   ---------------------------------------------------------- */

const GALLERY = [
  // { src: "images/kanahooka-exterior.jpg", caption: "Kanahooka — duplex, exterior" },
  // { src: "images/kanahooka-interior.jpg", caption: "Kanahooka — living area" },
  // { src: "images/rosemeadow-exterior.jpg", caption: "Rosemeadow — 158 Copperfield Dr" },
  // { src: "images/rosemeadow-kitchen.jpg", caption: "Rosemeadow — kitchen" },
];

const REVIEWS = [
  {
    name: "Sony A.",
    rating: 5,
    text: "Excellent from start to finish. Other builders quoted far more for the same custom build, and the team was professional, friendly, and genuinely listened. Even with several design changes mid-build, everything stayed on time and on budget.",
  },
  {
    name: "Rekha J.",
    rating: 5,
    text: "The service was beyond what we expected. Helpful, professional and responsive at every step, with expert guidance throughout. Our finished home is everything we wanted — nothing we'd change.",
  },
  {
    name: "Mark T.",
    rating: 5,
    text: "Worked with George on our build and it was a great experience. Always on time, easy to talk to, and clearly explained every stage. He cares about the details. Would definitely recommend.",
  },
];

/* ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initGallery();
  initReviews();
  initHeroDraw();
  initReveal();
  initCounters();
  initContactForm();
});

function initNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}

function initGallery() {
  const grid = document.querySelector(".gallery-grid");
  if (!grid) return;

  const items = GALLERY.length > 0 ? GALLERY : Array.from({ length: 6 });

  grid.innerHTML = items
    .map((item, i) => {
      if (item) {
        return `
          <div class="gallery-item">
            <img src="${item.src}" alt="${item.caption || "Dell Constructions build"}">
            <div class="caption">${item.caption || ""}</div>
          </div>`;
      }
      return `
        <div class="gallery-item">
          <div class="gallery-placeholder">Photo ${i + 1}<br>Add via GALLERY array in script.js</div>
        </div>`;
    })
    .join("");
}

function initReviews() {
  const grid = document.querySelector(".reviews-grid");
  if (!grid) return;

  grid.innerHTML = REVIEWS.map(
    (r) => `
    <div class="review-card">
      <span class="quote-mark">&ldquo;</span>
      <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      <p class="text">${r.text}</p>
      <div class="reviewer">${r.name} — Google Review</div>
    </div>`
  ).join("");
}

/* Draw the hero line-art house in on load */
function initHeroDraw() {
  const el = document.querySelector(".hero-art");
  if (!el) return;
  requestAnimationFrame(() => el.classList.add("drawn"));
}

/* Fade/slide sections in as they scroll into view */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* Count-up animation for the hero stat numbers that have a data-count value */
function initCounters() {
  const stats = document.querySelectorAll("[data-count]");
  if (!stats.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round(target * progress);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    stats.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  stats.forEach((el) => observer.observe(el));
}

/* Contact form: build a mailto link so no backend/server is needed */
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const email = data.get("email") || "";
    const phone = data.get("phone") || "";
    const message = data.get("message") || "";

    const businessEmail = "georkul@gmail.com";

    const subject = encodeURIComponent(`New enquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
  });
}
