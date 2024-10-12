const inputBill = document.querySelector("#bill");
const tipOptions = document.querySelectorAll(".tip-btns button");
const customInput = document.querySelector("#custom");
const people = document.querySelector("#people");
const totalTip = document.querySelector("#total-tip");
const amountPerPerson = document.querySelector("#amount-per-person");
const resetBtn = document.querySelector(".reset-btn");

document.addEventListener("DOMContentLoaded", function () {
    let billAmount = 0;
    let tipPercentage = 0;
    let numberOfPeople = 0;

    // Add event listener to Bill
    inputBill.addEventListener("input", function () {
        billAmount = parseFloat(this.value) || 0;
        calculateResults();
        checkResetButton(); // Check if the reset button should be enabled
    });

    // Add event listener for tip buttons
    tipOptions.forEach((option) => {
        option.addEventListener("click", function () {
        tipOptions.forEach((btn) => btn.classList.remove("active"));
        customInput.value = "";
        this.classList.add("active");

        tipPercentage = parseFloat(this.getAttribute("data-percentage"));
        calculateResults();
        checkResetButton(); // Check if the reset button should be enabled
        });
    });

    // Add event listener to custom tip input
    customInput.addEventListener("input", function () {
        tipOptions.forEach((btn) => btn.classList.remove("active")); // Remove active class from buttons
        const customValue = parseFloat(this.value) || 0;
        tipPercentage = customValue / 100;
        calculateResults();
        checkResetButton(); // Check if the reset button should be enabled
    });

    // Add event listener to people
    people.addEventListener("input", function () {
        numberOfPeople = parseInt(this.value) || 0;
        validatePeopleInput();
        calculateResults();
        checkResetButton(); // Check if the reset button should be enabled
    });

    // Function to validate people input
    function validatePeopleInput() {
        const errorMessage = document.querySelector(".error-message");

        if (numberOfPeople <= 0) {
        people.classList.add("error");
        errorMessage.style.display = "inline";
        } else {
        people.classList.remove("error");
        errorMessage.style.display = "none";
        }
    }

    // Function to calculate results
    function calculateResults() {
        if (numberOfPeople <= 0) {
        totalTip.textContent = "$0.00";
        amountPerPerson.textContent = "$0.00";
        return; // Exit if there are no people
        }

        const tipAmount = billAmount * tipPercentage;
        const tipPerPerson = tipAmount / numberOfPeople;
        const totalAmount = billAmount + tipAmount;
        const totalPerPerson = totalAmount / numberOfPeople;

        // Update displayed results
        totalTip.textContent = `$${tipPerPerson.toFixed(2)}`;
        amountPerPerson.textContent = `$${totalPerPerson.toFixed(2)}`;
    }

    // Function to check and enable/disable the reset button
    function checkResetButton() {
        if (billAmount > 0 || tipPercentage > 0 || numberOfPeople > 0) {
        resetBtn.removeAttribute("disabled");
        resetBtn.classList.add("enabled");
        } else {
        resetBtn.setAttribute("disabled", true);
        resetBtn.classList.remove("enabled");
        }
    }

    // Add event listener to Reset button
    resetBtn.addEventListener("click", function () {
        // Reset all fields
        inputBill.value = "";
        customInput.value = "";
        people.value = "";

        // Reset displayed fields
        totalTip.textContent = "$0.00";
        amountPerPerson.textContent = "$0.00";

        // Disable reset button again
        resetBtn.setAttribute("disabled", true);
        resetBtn.classList.remove("enabled");

        // Reset stored values
        billAmount = 0;
        tipPercentage = 0;
        numberOfPeople = 0;

        // Remove active class from tip buttons
        tipOptions.forEach((btn) => btn.classList.remove("active"));

        // Hide the error message if there was any
        validatePeopleInput();
    });
});
