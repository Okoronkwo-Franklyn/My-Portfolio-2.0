document.addEventListener("DOMContentLoaded", () => {
    console.log("Franklyn's portfolio loaded succcessfully.");
});

// =========================================
// STICKY NAVBAR — PREMIUM SCROLL STATE
// =========================================

const navbar = document.querySelector(".navbar");

if (navbar) {

    const SCROLL_THRESHOLD = 40;

    const updateNavbarState = () => {

        if (window.scrollY > SCROLL_THRESHOLD) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    // Run once on load in case the page starts pre-scrolled

    updateNavbarState();

    window.addEventListener("scroll", updateNavbarState, { passive: true });

}

// =========================================
// SERVICES ACCORDION
// =========================================

const serviceCards = document.querySelectorAll(".service-card");

serviceCards.forEach((card) => {

    const button = card.querySelector(".service-toggle");

    if (!button) return;

    button.addEventListener("click", () => {

        const currentlyActive =
            card.classList.contains("active");


        // Close every card

        serviceCards.forEach((item) => {

            item.classList.remove("active");

            const itemButton =
                item.querySelector(".service-toggle");

            if (itemButton) {
                itemButton.textContent = "+";
            }

        });


        // Open clicked card

        if (!currentlyActive) {

            card.classList.add("active");

            button.textContent = "×";

        }

    });

});

// =========================================
// PROJECT FILTER
// =========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;


        // Active button

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Filter projects

        projectItems.forEach((project) => {

            const category = project.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                project.classList.remove("hidden");

            } else {

                project.classList.add("hidden");

            }

        });

    });

});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("active");

        menuToggle.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });


    // Close menu when a link is clicked

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    // Close menu when clicking outside

    document.addEventListener("click", (event) => {

        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            navLinks.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}

