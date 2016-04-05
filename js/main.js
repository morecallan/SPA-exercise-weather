"use strict"

let zipCodeInput = document.getElementsByName("postalCode")[0];
let zipCodeInputDiv = document .getElementsByClassName("form-group")[0];

zipCodeInput.addEventListener("keyup", function(){
    let userInputZip = document.getElementsByName("postalCode")[0].value
    let isValid = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(userInputZip)

    if (isValid) {
        zipCodeInputDiv.classList.remove("has-error");
        zipCodeInputDiv.classList.add("has-success", "has-feedback");
        zipCodeStatus.classList.add("sr-only");
        activateEventListeners();
    } else {
        zipCodeInputDiv.classList.remove("has-success", "has-feedback")
        zipCodeInputDiv.classList.add("has-error");
        zipCodeStatus.classList.remove("sr-only");
        disableEventListeners();
    }
});


