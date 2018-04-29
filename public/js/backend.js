document.addEventListener('DOMContentLoaded', function () {
    // Shared constants.
    const newsletterView = document.querySelector("#newsletter");
    const whatsappBtn = document.querySelector("#whatsapp");
    const telephoneValue1 = document.querySelector(".valueTelephone1");
    const telephoneValue2 = document.querySelector(".valueTelephone2");
    var wppAtend = "85 9 9697-9349"


    // Init Main.
    main();

    // Actions functions.
    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", function () {
            // Display components.
            newsletterView.style.height = "100vh";
            newsletterView.style.paddingTop = "35vh";
            console.log("clicker");
            telephoneValue.innerHTML = wppAtend;
        });
    }

    function main() {
        changeTelefone(wppAtend);
    }

    function changeTelefone(wppAtend) {
        if (telephoneValue1) {
            // Display components.
            telephoneValue1.innerHTML = wppAtend;
            telephoneValue2.innerHTML = wppAtend;
        }
    }

    function sendEmail() {
        if (current_cart.length > 0) {
            Email.send('melissecabral07@gmail.com', 'melissecabral@gmail.com', gerateSubjectEmailSdl(), gerateBodyEmailSdl(), 'smtp.gmail.com',
                'melissecabral07@gmail.com', "85998614541");
            removingAllFromCart();
        }
    }
}, false);