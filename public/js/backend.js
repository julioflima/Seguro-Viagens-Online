// Shared variables. 
var wppAtend = "85 9 9697-9349"

// Init Main.
main();

// Main function.
function main() {
    changeTelefone(wppAtend);
}

// On Load functions.
document.addEventListener('DOMContentLoaded', function () {
    if (document.URL === "https://seguroviagens.online/") {
        messageText = "seguro viagens online";
        messageText = "assistencia 24h";
        messageText = "sulamerica";
        var addMessage = firebase.functions().httpsCallable('addMessage');
        addMessage({
            text: {
                messageText1,
                messageText2,
                messageText3,
            }
        }).then(function (result) {
            // Read result of the Cloud Function.
            return result;
        }).catch(function (error) {
            // Getting the Error details.
            return error;
        });
        console.log(addMessage);
        updateLinks();
    }


    if (timeInput) {
        timeInput.value = 0;
    }
});

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

function requestPromo() {
    document.querySelector("body").innerHTML = '\
    <a id="btn-back" onclick="requestBack()" class="section-btn btn btn-success">\
    <i class="fa fa-angle-left"></i></a>\
    <iframe frameborder="0 " style=" height: 100vh !important; width: 100vw !important; margin: 0; border: none; overflow: hidden;"\
    scrolling="no " src="' + links[1] + '" >< /iframe>\
    <script src="js/firebase.js "></script>';

}

function requestBack() {
    window.location.href = "/";
}

function updateLinks() {
    var insurer = "sulamerica";
    getPromotions(insurer);
    let restoredSession = JSON.parse(localStorage.getItem('session'));
    let _promo = restoredSession[insurer][0]['promotion'];
    let _time = restoredSession[insurer][0]['time'];
    let _default = restoredSession[insurer][0]['default'];
    links = new Array(_promo, _default);
}