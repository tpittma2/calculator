const calc = {
    firstVal: null,
    secondVal: null,
    operator: null,
    result: null,
};

const keyCodes = {
    esc: 'Escape',
    backspace: 'Backspace',
    decimal: 'Period',
    enter: 'Enter',
    equals: 'Equal',
    '+': 107,
    '-': 109,
    '*': 106,
    '/': 111,
    '0': 48,
    '1': 49,
    '2': 50,
    '3': 51,
    '4': 52,
    '5': 53,
    '6': 54,
    '7': 55,
    '8': 56,
    '9': 57,   
};

let operators = ['+', '-', '*', '/'];


const topScreen = document.querySelector('.top-screen');
const bottomScreen = document.querySelector('.bottom-screen');

const btnAllClear = document.querySelector('.clear');
const btnBackspace = document.querySelector('.backspace');
const btnEquals = document.querySelector('.equals');
const btnNegative = document.querySelector('.negative');
const btnDecimal = document.querySelector('.decimal');

function operate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            result = a / b;
            break;
    }

    if (result == Math.floor(result))
        result = Math.floor(result);
    else {
        result = result.toFixed(1);
    }

    return result;
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function resetCalculator() {
    resetCalcObj();
    refreshScreen();
}

function resetCalcObj() {
    calc.firstVal = null;
    calc.secondVal = null;
    calc.operator = null;
    calc.result = null;
}

function refreshScreen() {
    if (calc.result == Infinity || calc.firstVal == Infinity) {
        topScreen.textContent = 'ERROR'
        bottomScreen.textContent = 'Cannot divide by 0'
        resetCalcObj();
    }
    else if (calc.firstVal == null) {
        topScreen.textContent = '';
        bottomScreen.textContent = '0';
    }
    else if (calc.operator == null) //first operator still being set
    {
        topScreen.textContent = '';
        bottomScreen.textContent = calc.firstVal;
    }
    else if (calc.result != null) {
        topScreen.textContent = `${calc.firstVal} ${calc.operator} ${calc.secondVal}`;
        bottomScreen.textContent = calc.result;
    }
    else {
        topScreen.textContent = `${calc.firstVal} ${calc.operator}`;
        bottomScreen.textContent = calc.secondVal == null ? '0' : calc.secondVal;
    }
}

function numberButton_click(e) {
    let number = e.target.dataset.value;
    if (calc.result != null)
        resetCalculator();
    if (calc.operator == null) //first number
    {
        if (calc.firstVal == null || calc.firstVal == '0') {
            calc.firstVal = number;
        }
        else {
            calc.firstVal += number;
        }
    }
    else {
        if (calc.secondVal == null || calc.secondVal == '0') {
            calc.secondVal = number;
        }
        else {
            calc.secondVal += number;
        }
    }
    refreshScreen();
}

function operatorButton_click(e) {
    let operator = e.target.dataset.value;
    if (calc.firstVal == null)
        return;
    if (calc.result != null) //use prev result as first number
    {

        calc.firstVal = calc.result;
        calc.secondVal = null;
        calc.result = null;
    }
    else if (calc.operator != null && calc.secondVal != null) {
        let newFirstNumber = operate(calc.firstVal, calc.secondVal, calc.operator);
        calc.firstVal = newFirstNumber;
        calc.secondVal = null;
    }
    calc.operator = operator;
    refreshScreen();

}

function backspaceButton_click() {
    if (calc.result != null || calc.firstVal == null)
        return;

    if (calc.operator != null) {
        calc.secondVal = calc.secondVal == null ? null : calc.secondVal.slice(0, calc.secondVal.length - 1);
        if (calc.secondVal == '')
            calc.secondVal = null;
    }
    else {
        calc.firstVal = calc.firstVal == null ? null : calc.firstVal.slice(0, calc.firstVal.length - 1);
        if (calc.firstVal == '')
            calc.firstVal = null;
    }
    refreshScreen();
}

function btnNegative_click() {
    if (calc.result != null
        || calc.firstVal == null)
        return;

    if (calc.operator == null && calc.firstVal != '0' && calc.firstVal != '') {
        calc.firstVal = toggleNumberNegativity(calc.firstVal);
    }
    else if (calc.secondVal != null && calc.secondVal != '0' && calc.secondVal != '') {
        calc.secondVal = toggleNumberNegativity(calc.secondVal);
    }
    refreshScreen();

}

function addDecimal() {
    if (calc.result != null)
        return;
    if (calc.operator == null) {
        calc.firstVal = addDecimalToNum(calc.firstVal);
    }
    else {
        calc.secondVal = addDecimalToNum(calc.secondVal);
    }
    refreshScreen();
}

function addDecimalToNum(num) {
    if (num == null)
        return '0.';
    else if (!num.toString().includes('.')) {
        return num + '.';
    }
    else {
        return num;
    }
}

function toggleNumberNegativity(num) {
    return num * -1
}

function processKeyDow(e)
{
    if(e.keyCode == 13)
        e.preventDefault();
    if(e.key === 'Escape')
        btnAllClear.click();
    else if(e.key === 'Backspace')
        btnBackspace.click();
    else if(e.key === '.')
        btnDecimal.click();
    else if(e.key === 'Enter' || e.key === '=')
        btnEquals.click();
    else if(e.key >= 0 && e.key <= 9)
    {
        numButtons.forEach(x=> {
            if(e.key === x.dataset.value)
            {
                keyFound = true;
                x.click();
            }
        });  
    }
    else
    {
        operatorButtons.forEach(x=> 
            {
                if(e.key === x.dataset.value)
                {
                    keyFound = true;
                    x.click();
                }
            });
    }


}


refreshScreen();


btnAllClear.addEventListener('click', resetCalculator);
btnBackspace.addEventListener('click', backspaceButton_click);
btnNegative.addEventListener('click', btnNegative_click);
btnDecimal.addEventListener('click', addDecimal);

btnEquals.addEventListener('click', () => {
    if (calc.result != null) //already calculated
        return;
    if (calc.secondVal == null || calc.firstVal == null || calc.operator == null)
        return;

    calc.result = operate(calc.firstVal, calc.secondVal, calc.operator);
    refreshScreen();
});


const numButtons = document.querySelectorAll('.number');
numButtons.forEach(x => x.addEventListener('click', numberButton_click));

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(x => x.addEventListener('click', operatorButton_click));

document.addEventListener('keydown', processKeyDow, {
    capture: true,
});