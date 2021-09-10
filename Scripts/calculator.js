function operate(a, b, operator)
{
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


let testCases = [
 //   {a: 3, b: 2, operator: '+'},
  //  {a: 3, b: 2, operator: '-'},
  //  {a: 3, b: 2, operator: '*'},
    {a: 3, b: 2, operator: '/'},
]

for(let t of testCases)
{
    console.log(`${t.a} ${t.operator} ${t.b} = ${operate(t.a, t.b, t.operator)}`);
}


