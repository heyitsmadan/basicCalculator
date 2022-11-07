function add(a,b){
    return roundResult(a+b)
}

function subtract(a,b){
    return roundResult(a-b)
}

function multiply(a,b){
    return roundResult(a*b)
}

function divide(a,b){
    return roundResult(a/b)
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
  }

function operate(a,operator,b){
    a=parseFloat(a);
    b=parseFloat(b);
    if(operator=="+") return add(a,b);
    else if(operator=="-") return subtract(a,b);
    else if(operator=="×") return multiply(a,b); 
    else if(operator=="÷") return divide(a,b);
}

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const mainText = document.querySelector(".mainText");
const display = document.querySelector(".display")
const container = document.querySelector(".container")

window.addEventListener('keydown', (e) => {
    if(e.key=="Backspace"){
        equalFlag=false;
        mainText.textContent = mainText.textContent.slice(0,mainText.textContent.length-1)
    }
    else if(e.key=="Escape"){
        equalFlag=false;
        mainText.textContent = '';
    }
})



let equalFlag = false;
window.addEventListener('keypress', (e) => {
    if(e.key=="/"){
        equalFlag=false;
        mainText.textContent+= '÷'
    }
    else if(e.key=="*"){    
        equalFlag=false;
        mainText.textContent+= '×'
    }
    else if(e.key=="+"){
        equalFlag=false;
        mainText.textContent+= '+'
    }
    else if(e.key=="-"){
        equalFlag=false;
        mainText.textContent+= '-'
    }
    else if(e.key=="=" || e.key=="Enter"){
        try{
            mainText.textContent = evaluate(mainText.textContent);
        }
        catch{
            mainText.textContent = "ERROR";
        }
        finally{
            equalFlag = true;
        }
    }
    else if(e.key=="."){
        if(equalFlag){
            equalFlag=false;
            mainText.textContent= `${e.key}`
        }      
        else
        mainText.textContent+= `${e.key}`
    }
    else if(e.keyCode>=48 && e.keyCode<=57){
        if(equalFlag){
            equalFlag=false;
            mainText.textContent= `${e.key}`
        }
        else{
            mainText.textContent+= `${e.key}`
            }
        }   
    }
)


numbers.forEach(number => {
    number.addEventListener('click', () => {
        if(equalFlag){
            equalFlag=false;
            mainText.textContent= `${number.textContent}`
        }
        else
        mainText.textContent+= `${number.textContent}`
    })
})

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        equalFlag=false;
        mainText.textContent+= `${operator.textContent}`
    })
})

const equals = document.querySelector(".equals");
let computed = true
equals.addEventListener('click', () => {
    try{
    mainText.textContent = evaluate(mainText.textContent);
    }
    catch{
        mainText.textContent = "ERROR";
    }
    finally{
        equalFlag = true;
    }
})

const clear = document.querySelector('.clear')

clear.addEventListener('click', ()  => {
    equalFlag=false;
    mainText.textContent = '';
})

const backspace = document.querySelector('.backspace')
backspace.addEventListener('click', () =>{
    equalFlag=false;
    mainText.textContent = mainText.textContent.slice(0,mainText.textContent.length-1)
})


let subExpression = '';
const continueList = ["1","2","3","4","5","6","7","8","9","0","."];
function evaluate(expression){
    if(expression.charAt(0)=='.') //fixes -36 giving NaN
        expression="0"+expression;
    if(operatorExists(expression)){
        let ignoreFirst = true;
        let op2Pos=-1;
        if(continueList.indexOf(expression.charAt(0))==-1)
            i=1
        for(;i<expression.length;i++){
            if(continueList.indexOf(expression.charAt(i))==-1){
                if(ignoreFirst) {
                    ignoreFirst = false;
                    continue;
                }
                subExpression = expression.slice(0,i); //gets first expression with only one operator
                op2Pos = i;
                break;
            }
        }
        if(operatorExists(expression.slice(op2Pos))){
            return evaluate(subEvaluate(subExpression)+expression.slice(op2Pos));
        }
        else{
            return subEvaluate(expression);
        }
    }
    else{
        let count=0;
        for(i=0;i<expression.length;i++)
            if(expression.charAt((i))==".") count++;
        if(count>1 || expression.charAt(expression.length-1)==".")
            return "ERROR";
        else
            return expression;
    }
}

let a='';
let b='';
let operator='';
function subEvaluate(subExpression){
    if(continueList.indexOf(subExpression.charAt(0))==-1) i=1
    for(;i<subExpression.length;i++){
        if(continueList.indexOf(subExpression.charAt(i))==-1){
            a = subExpression.slice(0,i);
            operator = subExpression.charAt(i);
            b = subExpression.slice(i+1);
            break;
        }
    }
    return operate(a,operator,b).toString();
}

function operatorExists(expression){
    for(i=0;i<expression.length;i++){
        if(continueList.indexOf(expression.charAt(i))==-1)
            return true
    }
    return false;
}