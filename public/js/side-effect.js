// Shared constants.
const stakeSliderMin = document.querySelector("#sliderStakeMin");
const stakeSliderHr = document.querySelector("#sliderStakeHr");
const stakeSliderDay = document.querySelector("#sliderStakeDay");
const timeInput = document.querySelector("#time");
const minValue = document.querySelector("#valueMinutes");
const hrValue = document.querySelector("#valueHours");
const dayValue = document.querySelector("#valueDays");
const profilePhoto = document.querySelector(".image");
const loginBox = document.querySelector("#container-box");
const enterKey = document.querySelector("#keyEnter");
const reportText = document.querySelector("#report");
const titleText = document.querySelector("#title");
const usernameText = document.querySelector("#txtUsername");
const emailText = document.querySelector("#txtEmail");
const photoURLText = document.querySelector("#txtphotoURL");
const passText = document.querySelector("#txtPassword");
const repassText = document.querySelector("#txtRePassword");
const budgetText = document.querySelector("#txtBudget");
const enterButton = document.querySelector("#btnEnter");
const backButton = document.querySelector("#btnBack");
const accountButton = document.querySelector("#btnAccount");
const bugButton = document.querySelector("#btnBug");
const codeButton = document.querySelector("#btnCode");
const upButton = document.querySelector("#btnUp");
const updateButton = document.querySelector("#btnUpdate");
const fireButton = document.querySelector("#btnFire");
const sendButton = document.querySelector("#btnSend");
const sign_upButton = document.querySelector("#btnSingUp");
const closeButton = document.querySelector("#btnClose");
const logoutButton = document.querySelector("#btnLogout");
const loginButton = document.querySelector("#btnLogin");
const insurerInput = document.querySelector("#insurer");
const promoInput = document.querySelector("#promo");
const defaultInput = document.querySelector("#default");
const newsletterView = document.querySelector("#newsletter");
const whatsappBtn = document.querySelector("#whatsapp");
const telephoneValue1 = document.querySelector(".valueTelephone1");
const telephoneValue2 = document.querySelector(".valueTelephone2");

// Login functions.
if (sign_upButton) {
    sign_upButton.addEventListener("click", function () {
        // Display components.
        titleText.innerHTML = "Cadastrar-se";
        closeButton.style.display = "flex";
        sign_upButton.style.display = "none";
        enterButton.innerHTML = "confirmar";
        var data = {
            message: 'test ' + toString(++counter)
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);

    })
}

if (closeButton) {
    closeButton.addEventListener("click", function () {
        // Display components.
        sign_upButton.style.display = "inline-block";
        titleText.innerHTML = "Entrar";
        closeButton.style.display = "none";
        enterButton.innerHTML = "entrar";
        loginBox.style.display = "block";
        reportText.style.display = "none";
    })
}

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        logout();
        window.location.href = '/';
    })
}

if (backButton) {
    backButton.addEventListener("click", function () {
        logout();
        window.location.href = '/';
    })
}

if (enterButton) {
    enterButton.addEventListener("click", function () {
        if (closeButton) {
            if (closeButton.style.display === "flex") {
                firebase.auth().createUserWithEmailAndPassword(emailText.value.toLowerCase(), passText.value).then(function () {
                    // Display components.
                    closeButton.style.display = "flex";
                    loginBox.style.display = "none";
                    reportText.style.display = "block";
                    console.log("Created account!");
                    // Handle errors.
                }).catch(function (error) {
                    console.log("Got an: ", error);
                    snackbar(error);
                });
            } else {
                firebase.auth().signInWithEmailAndPassword(emailText.value.toLowerCase(), passText.value).then(function () {
                    // Handle errors.
                }).catch(function (error) {
                    console.log("Got an: ", error);
                    snackbar(error);
                });
                signedout = false;
            }
        }
        if (document.URL === "https://seguroviagens.online/admin.html") {
            if (defaultInput.value === "") {
                snackbar("O campo padrão não pode ficar vazio.");
            } else {
                setPromotions(insurerInput.value.toLowerCase(), promoInput.value, defaultInput.value);
            }
        }
    })
}

if (enterKey) {
    enterKey.addEventListener("keyup", function (e) {
        e.preventDefault();
        if (e.keyCode == 13) {
            enterButton.click();
        }
    });
}

// Home functions.
if (accountButton) {
    accountButton.addEventListener("click", function () {
        emailText.value.toLowerCase() = email;
        usernameText.value = displayName;
        photoURLText.value = photoURL;
        profilePhoto.style.background = "url('" + photoURL + "')";
        // Display components.
        document.querySelector('.photo-dirty').classList.add('is-dirty');
        document.querySelector('.username-dirty').classList.add('is-dirty');
        document.querySelector('.email-dirty').classList.add('is-dirty');
    });
}

if (updateButton) {
    updateButton.addEventListener("click", function () {
        updateProfile(emailText.value.toLowerCase(), usernameText.value, photoURLText.value, passText.value, repassText.value);
    });
}

if (sendButton) {
    sendButton.addEventListener("click", function () {});
}

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        logout();
        signedout = true;
    });
}

if (insurerInput) {
    insurerInput.addEventListener("change", function () {
        if (document.URL === "https://seguroviagens.online/admin.html") {
            getPromotions(insurerInput.value.toLowerCase());
            let restoredSession = JSON.parse(localStorage.getItem('session'));
            let time = restoredSession[insurerInput.value.toLowerCase()][0]['time'];
            getTimer(time);
        }
    });
}

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

if (stakeSliderMin) {
    stakeSliderMin.addEventListener("change", function () {
        var total = parseInt(stakeSliderMin.value);
        minValue.innerHTML = total;
        timeInput.value = parseInt(minValue.innerHTML) + parseInt(hrValue.innerHTML) * 60 + parseInt(dayValue.innerHTML) * 24 * 365;
    }, false);
}

if (stakeSliderHr) {
    stakeSliderHr.addEventListener("change", function () {
        var total = parseInt(stakeSliderHr.value);
        hrValue.innerHTML = total;
        timeInput.value = parseInt(minValue.innerHTML) + parseInt(hrValue.innerHTML) * 60 + parseInt(dayValue.innerHTML) * 24 * 365;
    }, false);
}

if (stakeSliderDay) {
    stakeSliderDay.addEventListener("change", function () {
        var total = parseInt(stakeSliderDay.value);
        dayValue.innerHTML = total;
        timeInput.value = parseInt(minValue.innerHTML) + parseInt(hrValue.innerHTML) * 60 + parseInt(dayValue.innerHTML) * 24 * 365;
    }, false);
}

// Snackbar function.
function snackbar(string) {
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var data = {
        message: string,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

// Get timer from section function.
function getTimer(timer) {
    let days = parseInt(timer / (365 * 24));
    let hours = parseInt((timer - days * 365 * 24) / 60);
    let minutes = parseInt((((timer - days * 365 * 24) / 60) - hours) * 60);
    //console.log("mins: ", minutes)
    //console.log("hours: ", hours)
    //console.log("days: ", days)
    minValue.innerHTML = minutes;
    hrValue.innerHTML = hours;
    dayValue.innerHTML = days;
    stakeSliderMin.value = minutes;
    stakeSliderHr.value = hours;
    stakeSliderDay.value = days;
    stakeSliderMin.classList.remove("is-lowest-value");
    stakeSliderHr.classList.remove("is-lowest-value");
    stakeSliderDay.classList.remove("is-lowest-value");
}