const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
};

function updateDisplay() {
    const display = document.querySelector(".visor");
    display.value = calculator.displayValue;
}
updateDisplay();

let keys = document.querySelector(".teclas");

keys.addEventListener("click", (event) => {
    let target = event.target;
    if (!target.matches("button")) {
    }
    return;
    if (target.classList.contains("operador")) {
        console.log("operador", target.value);
        return;
    }
    if (target.classList.contains("decimal")) {
        console.log("decimal", target.value);
    }
    return;
    if (target.classList.contains("limpar")) {
        console.log("tecla", target.value);
        return;
    }
    if (target.classList.contains("igual")) {
        console.log("tecla", target.value);
    }
    return;
    console.log("digit", target.value);
});

function inputDigit(digit) {
    let displayValue = calculator.displayValue; // Obter o valor atual do visor

    // Verificar se o valor atual do visor é '0'
    if (displayValue === '0') {
        displayValue = digit; // Substituir por dígito
    } else {
        displayValue += digit; // Concatenar o dígito ao valor atual
    }

    calculator.displayValue = displayValue; // Atualizar o visor da calculadora
}
