const calc = {
    firstVal: null,
    secondVal: null,
    operator: null,
    result: null,
};

let operators = ['+','-','*','/'];


const topScreen = document.querySelector('.top-screen');
const bottomScreen = document.querySelector('.bottom-screen');

const btnAllClear = document.querySelector('.clear');
const btnBackspace = document.querySelector('.backspace');
const btnEquals = document.querySelector('.equals');
const btnNegative = document.querySelector('.negative');


function operate(a, b, operator)
{
    a = parseFloat(a);
    b = parseFloat(b);
    let result;
    switch (operator)
    {
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

    if(result == Math.floor(result))
        result = Math.floor(result);
    else 
    {
        result = result.toFixed(1);
    }

    return result;
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function resetCalculator()
{
    calc.firstVal = null;
    calc.secondVal = null;
    calc.operator = null;
    calc.result = null;
    refreshScreen();
}

function refreshScreen()
{
    if(calc.firstVal == null)
    {
        topScreen.textContent = '';
        bottomScreen.textContent = '0';
    }
    else if(calc.operator == null) //first operator still being set
    {
        topScreen.textContent = '';
        bottomScreen.textContent = calc.firstVal;
    }
    else if(calc.result != null)
    {
        topScreen.textContent = `${calc.firstVal} ${calc.operator} ${calc.secondVal}`;
        bottomScreen.textContent = calc.result;
    }
    else 
    {
        topScreen.textContent = `${calc.firstVal} ${calc.operator}`;
        bottomScreen.textContent = calc.secondVal == null? '0' : calc.secondVal;
    }
}

function numberButton_click(e)
{
    let number = e.target.dataset.value;
    if(calc.operator == null) //first number
    {
        if(calc.firstVal == null)
        {
            calc.firstVal = number == '0' ? null : number;
        }
        else
        {
            calc.firstVal += number;
        }
    }
    else 
    {
        if(calc.secondVal == null)
        {
            calc.secondVal = number == '0' ? null : number;
        }
        else
        {
            calc.secondVal += number;
        }
    }
    refreshScreen();
}

function backspaceButton_click()
{
    if(calc.firstVal == null)
    return;

    if(calc.operator != null)
    {
        calc.secondVal = calc.secondVal == null ? null : calc.secondVal.slice(0, calc.secondVal.length-1);
        if(calc.secondVal == '')
            calc.secondVal = null;
    }
    else {
        calc.firstVal = calc.firstVal == null ? null : calc.firstVal.slice(0, calc.firstVal.length-1);
        if(calc.firstVal == '')
            calc.firstVal = null;
    }
    refreshScreen();
}

calc.firstVal = '5';
calc.operator = '+';
refreshScreen();


btnAllClear.addEventListener('click', resetCalculator);
btnBackspace.addEventListener('click', backspaceButton_click);

btnEquals.addEventListener('click', ()=>
{
    if(calc.result != null) //already calculated
        return;
    if(calc.secondVal == null || calc.firstVal == null || calc.operator == null)
        return;
    
    calc.result = operate(calc.firstVal, calc.secondVal, calc.operator);
    refreshScreen();
});


let numButtons = document.querySelectorAll('.number');
numButtons.forEach(x=> x.addEventListener('click', numberButton_click));



