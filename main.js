const inputBill = document.querySelector('#bill');
const tipOptions = document.querySelectorAll('.tip-btns button');
const customInput = document.querySelector('#custom');
const people = document.querySelector('#people');
const totalTip = document.querySelector('#total-tip');
const amountPerPerson = document.querySelector('#amount-per-person');


document.addEventListener('DOMContentLoaded', function () {
    // Función para mostrar el valor seleccionado
    function showSelection(value) {
        console.log(value);
    }
    let billAmount = 0;
    let tipPercentage = 0;
    let numberOfPeople = 1;

    // Add event listener to Bill
    inputBill.addEventListener("input", function () {
        billAmount = parseFloat(this.value);
        calculateResults();
    });

    // Add event listener for tip buttons
    tipOptions.forEach((option) => {
        option.addEventListener("click", function () {
            tipPercentage = parseFloat(this.getAttribute("data-percentage"));
            showSelection(tipPercentage);
            calculateResults();
        });
    });

    // Add event listener to custom tip input
    customInput.addEventListener("input", function () {
        const customValue = parseFloat(this.value);

        if (!isNaN(customValue)) {
            tipPercentage = customValue / 100;
        } else {
            tipPercentage = 0;
        }
        calculateResults();
    });

    // Add event listener to people
    people.addEventListener("input", function () {
        numberOfPeople = parseInt(this.value) || 1;
        calculateResults();
    });

    // Function to calculate results
    function calculateResults() {
        const tipAmount = billAmount * tipPercentage;
        const totalAmount = billAmount + tipAmount;
        const totalPerPerson = numberOfPeople > 0 ? totalAmount / numberOfPeople : 0;

        // Update displayed results
        totalTip.textContent = tipAmount.toFixed(2);
        amountPerPerson.textContent = totalPerPerson.toFixed(2);
        
    }
    
});

