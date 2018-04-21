document.addEventListener('DOMContentLoaded', function () {
    // Shared constants.
    const bodyView = document.querySelector("body");

    bodyView.style.display = "block";

    // Actions functions.
    if (bodyView) {
        bodyView.addEventListener("click", function () {
            // Display components.
            window.location.href = '/';
        });
    }

    new WOW({
        mobile: false
    }).init();

}, false);