document.addEventListener("DOMContentLoaded", () => {
  /* Mobile nav toggle */
  const menuBtn = document.getElementById("menu-btn");
  const topnav = document.getElementById("topnav");

  if (menuBtn && topnav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = topnav.classList.toggle("nav-open");
      const icon = menuBtn.querySelector("i");
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    topnav.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        topnav.classList.remove("nav-open");
        const icon = menuBtn.querySelector("i");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      });
    });
  }

  /* Accordion rows (services / skills) */
  document.querySelectorAll(".row-item").forEach(row => {
    const top = row.querySelector(".row-top");
    if (!top) return;
    top.addEventListener("click", () => {
      const wasActive = row.classList.contains("is-active");
      row.parentElement.querySelectorAll(".row-item").forEach(r => r.classList.remove("is-active"));
      if (!wasActive) row.classList.add("is-active");
    });
  });

  /* Duplicate ticker content so the marquee loops seamlessly */
  document.querySelectorAll(".ticker-track").forEach(track => {
    track.innerHTML += track.innerHTML;
  });
});
