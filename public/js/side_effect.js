// Shared constants.
var stakeSliderMin = document.querySelector("#sliderStakeMin");
var stakeSliderHr = document.querySelector("#sliderStakeHr");
var stakeSliderDay = document.querySelector("#sliderStakeDay");
var promoInput = document.querySelector("#promo");
var timeInput = document.querySelector("#time");
var defaultInput = document.querySelector("#default");
var minValue = document.querySelector("#valueMinutes");
var hrValue = document.querySelector("#valueHours");
var dayValue = document.querySelector("#valueDays");

// Main
timeInput.value = 0;

// Actions functions.
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

// Get Timer from section function.
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

// Snackbar function.
function snackbar(string) {
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var data = {
        message: string,
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};