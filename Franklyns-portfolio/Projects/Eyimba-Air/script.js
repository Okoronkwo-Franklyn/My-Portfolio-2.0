const RATE_TIERS = [
  {
    name: "Light Jet",
    price: 4800000,
    seats: "Up to 6 seats",
    range: "750 nmi range",
    features: [
      "Ideal for Lagos, Abuja & Enugu runs",
      "Single dedicated crew",
      "Full catering included",
    ],
  },
  {
    name: "Midsize Jet",
    price: 8200000,
    seats: "Up to 9 seats",
    range: "1,800 nmi range",
    features: [
      "Reach Accra & Dakar nonstop",
      "Stand-up cabin comfort",
      "Priority ground handling",
    ],
  },
  {
    name: "Heavy Jet",
    price: 13600000,
    seats: "Up to 16 seats",
    range: "3,500 nmi range",
    features: [
      "Direct to London or Dubai",
      "Private cabin suite",
      "Dedicated flight concierge",
    ],
  },
];

const BENEFITS = [
  { icon: "clock", title: "Skip the Owerri drive", description: "No more driving to Sam Mbakwe Airport. Depart straight from Abia State." },
  { icon: "shield-check", title: "NCAA-certified operators", description: "Every aircraft and crew meets Nigerian Civil Aviation Authority standards." },
  { icon: "map-pin", title: "Reach anywhere in Nigeria", description: "From Lagos to Abuja to Port Harcourt, land closer to where you're actually going." },
  { icon: "users", title: "Dedicated flight concierge", description: "One point of contact from booking through touchdown, in Aba or Lagos." },
  { icon: "plane", title: "Curated regional fleet", description: "Light, midsize, and heavy jets sized to Abia's growing trade routes." },
  { icon: "sparkles", title: "Transparent Naira pricing", description: "Published hourly rates in Naira, with no hidden forex markups." },
];

const FAQS = [
  { q: "How far in advance do I need to book?", a: "Most flights can be arranged within 4 hours of departure. For popular routes or holiday travel, we recommend booking a few days ahead to lock in your preferred aircraft." },
  { q: "Do you fly into the new Abia International Airport?", a: "We currently operate from Nsulu, Isiala Ngwa North, ahead of the international airport's completion, and will move fully onto the new runway once it opens." },
  { q: "Are your rates in Naira or Dollars?", a: "All published rates are in Naira. International charters routed through Lagos or Abuja may carry a dollar-denominated landing fee, disclosed upfront before booking." },
  { q: "Can I book a one-way flight to Lagos or Abuja?", a: "Yes, one-way, round-trip, and multi-leg itineraries are all available at the same published hourly rate." },
];

let tierIndex = 1;
let hours = 3;
let openFaqIndex = 0;

function renderTierCards() {
  const container = document.getElementById("tier-cards");
  container.innerHTML = RATE_TIERS.map((tier, i) => `
    <button data-tier="${i}" class="tier-card rounded-3xl p-9 flex flex-col ${i === tierIndex ? "active" : ""}">
      <span class="selected-badge absolute -top-3 left-9 px-3 py-1 rounded-full text-xs tracking-wide font-medium" style="background-color: var(--gold); color: var(--obsidian);">Selected</span>
      <div class="w-10 h-px mb-6" style="background-color: var(--gold);"></div>
      <h3 class="font-display text-2xl italic mb-1" style="color: var(--text-on-light);">${tier.name}</h3>
      <p class="text-sm mb-7" style="color: var(--muted-on-light);">${tier.seats} &middot; ${tier.range}</p>
      <p class="mb-8">
        <span class="font-display text-4xl italic" style="color: var(--text-on-light);">&#8358;${tier.price.toLocaleString()}</span>
        <span class="text-sm ml-2" style="color: var(--muted-on-light);">/ flight hour</span>
      </p>
      <ul class="flex flex-col gap-3">
        ${tier.features.map(feat => `
          <li class="flex items-start gap-2 text-sm" style="color: var(--muted-on-light);">
            <i data-lucide="check" class="mt-0.5 flex-shrink-0" style="color: var(--gold); width:16px; height:16px;"></i>
            ${feat}
          </li>
        `).join("")}
      </ul>
    </button>
  `).join("");

  container.querySelectorAll(".tier-card").forEach(btn => {
    btn.addEventListener("click", () => {
      tierIndex = parseInt(btn.dataset.tier, 10);
      updateAll();
    });
  });
}

function renderBenefits() {
  const container = document.getElementById("benefits-grid");
  container.innerHTML = BENEFITS.map((b, i) => `
    <div class="benefit-cell flex flex-col gap-4 py-8 px-2 ${i % 3 !== 2 ? "border-right" : ""}">
      <i data-lucide="${b.icon}" style="color: var(--gold); width:22px; height:22px;"></i>
      <h3 class="font-display text-xl italic" style="color: var(--text-on-dark);">${b.title}</h3>
      <p style="color: var(--muted-on-dark);">${b.description}</p>
    </div>
  `).join("");
}

function renderFaq() {
  const container = document.getElementById("faq-list");
  container.innerHTML = FAQS.map((faq, i) => `
    <div class="faq-item ${i === openFaqIndex ? "open" : ""}" data-index="${i}">
      <button class="faq-toggle w-full flex items-center justify-between text-left py-6">
        <span class="font-display text-xl italic pr-4" style="color: var(--text-on-light);">${faq.q}</span>
        <i data-lucide="chevron-down" class="faq-chevron flex-shrink-0" style="color: var(--gold); width:20px; height:20px;"></i>
      </button>
      <div class="faq-answer fade-up">${faq.a}</div>
    </div>
  `).join("");

  container.querySelectorAll(".faq-item").forEach(item => {
    item.querySelector(".faq-toggle").addEventListener("click", () => {
      const idx = parseInt(item.dataset.index, 10);
      openFaqIndex = openFaqIndex === idx ? null : idx;
      renderFaq();
      if (window.lucide) lucide.createIcons();
    });
  });
}

function updateAll() {
  const activeTier = RATE_TIERS[tierIndex];
  const total = activeTier.price * hours;

  document.getElementById("hours-display").textContent = hours;
  document.getElementById("total-price").textContent = total.toLocaleString();
  document.getElementById("tier-price").textContent = activeTier.price.toLocaleString();
  document.getElementById("tier-name").textContent = activeTier.name;
  document.getElementById("tier-meta").textContent = `${activeTier.seats} \u00B7 ${activeTier.range}`;

  document.querySelectorAll(".tier-btn").forEach(btn => {
    const i = parseInt(btn.dataset.tier, 10);
    btn.classList.toggle("active", i === tierIndex);
  });

  document.querySelectorAll(".tier-card").forEach(card => {
    const i = parseInt(card.dataset.tier, 10);
    card.classList.toggle("active", i === tierIndex);
  });

  const slider = document.getElementById("hours-slider");
  slider.style.setProperty("--fill", `${((hours - 1) / 11) * 100}%`);
}

function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.started) {
        entry.target.dataset.started = "true";
        const target = parseInt(entry.target.dataset.target, 10) || 0;
        const suffix = entry.target.dataset.suffix || "";
        const duration = 1200;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          entry.target.textContent = Math.floor(progress * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
          else entry.target.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((el) => observer.observe(el));
}

function initNav() {
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.dataset.section === entry.target.id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
  sections.forEach((s) => observer.observe(s));
}

function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("mobile-menu");
  const openIcon = document.getElementById("menu-icon-open");
  const closeIcon = document.getElementById("menu-icon-close");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menu.classList.toggle("hidden", !isOpen);
    openIcon.classList.toggle("hidden", isOpen);
    closeIcon.classList.toggle("hidden", !isOpen);
  });

  menu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menu.classList.add("hidden");
      openIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });
}

function initSpotlight() {
  const hero = document.getElementById("start");
  const spotlight = document.getElementById("spotlight");
  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.background = `radial-gradient(650px circle at ${x}% ${y}%, rgba(201,169,97,0.16), transparent 60%)`;
  });
}

function initCalculator() {
  document.querySelectorAll(".tier-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      tierIndex = parseInt(btn.dataset.tier, 10);
      updateAll();
    });
  });

  document.getElementById("hours-slider").addEventListener("input", (e) => {
    hours = parseInt(e.target.value, 10);
    updateAll();
  });
}

function setYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", () => {
  renderTierCards();
  renderBenefits();
  renderFaq();
  updateAll();
  initCounters();
  initNav();
  initMobileMenu();
  initSpotlight();
  initCalculator();
  setYear();

  if (window.lucide) lucide.createIcons();
});
