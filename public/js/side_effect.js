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

// Actions functions.
if (stakeSliderMin) {
    stakeSliderMin.addEventListener("change", function () {
        var total = parseInt(stakeSliderMin.value);
        minValue.innerHTML = total;
        timeInput.value = parseInt(minValue.innerHTML) + parseInt(hrValue.innerHTML)*60 + parseInt(dayValue.innerHTML)*24*365;
    }, false);
}

if (stakeSliderHr) {
    stakeSliderHr.addEventListener("change", function () {
        var total = parseInt(stakeSliderHr.value);
        hrValue.innerHTML = total;
        timeInput.value = parseInt(minValue.innerHTML) + parseInt(hrValue.innerHTML)*60 + parseInt(dayValue.innerHTML)*24*365;
    }, false);
}

if (stakeSliderDay) {
    stakeSliderDay.addEventListener("change", function () {
        var total = parseInt(stakeSliderDay.value);
        dayValue.innerHTML = total;
        timeInput.value = parseInt(minValue.innerHTML) + parseInt(hrValue.innerHTML)*60 + parseInt(dayValue.innerHTML)*24*365;
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