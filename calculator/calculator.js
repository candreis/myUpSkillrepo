const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector('.visor');
    display.value = calculator.displayValue;
}

updateDisplay();

let keys = document.querySelector('.teclas');
keys.addEventListener('click', (event) => {
    let target = event.target;
    if (!target.matches('button')) {
        return;
    }
    if (target.classList.contains('operador')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }
    if (target.classList.contains('limpar')) {
        resetCalculator();
        updateDisplay();
        return;
    }
    if (target.classList.contains('igual')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }
    inputDigit(target.value);
    updateDisplay();
});

function inputDigit(digit) {
    let displayValue = calculator.displayValue;
    let waitingForSecondOperand = calculator.waitingForSecondOperand;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function handleOperator(operator) {
    let firstOperand = calculator.firstOperand;
    let displayValue = calculator.displayValue;
    let inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (calculator.operator) {
        const result = fazerCalculo[calculator.operator](firstOperand, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result; // Armazena o resultado como o primeiro operando
    }

    if (operator === '=') {
        // Atualiza o visor com o resultado e reinicializa a operação
        calculator.displayValue = String(calculator.firstOperand); // Mostra o resultado
        calculator.firstOperand = null; // Reseta o primeiro operando para novas operações
        calculator.operator = null; // Limpa o operador
    } else {
        calculator.waitingForSecondOperand = true;
        calculator.operator = operator;
    }
}


let fazerCalculo = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
};
