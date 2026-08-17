document.addEventListener("DOMContentLoaded", () => {
    console.log("Franklyn's portfolio loaded succcessfully.");
});

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