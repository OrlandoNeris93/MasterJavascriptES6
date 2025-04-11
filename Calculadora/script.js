function getContentClick(event){
    const value = event.target.innerHTML;  
    filterAction(value);//? addOperator(value) : addNumber(value);
}

const filterAction = (value) => {
    console.log(value);
    value === "0" ? addNumberInput(value) : null;  
    value === "1" ? addNumberInput(value) : null;
    value === "2" ? addNumberInput(value) : null;
    value === "3" ? addNumberInput(value) : null;
    value === "4" ? addNumberInput(value) : null;
    value === "5" ? addNumberInput(value) : null;
    value === "6" ? addNumberInput(value) : null;
    value === "7" ? addNumberInput(value) : null;
    value === "8" ? addNumberInput(value) : null;
    value === "9" ? addNumberInput(value) : null;
    value === "," ? addNumberInput(value) : null;
    value === "+" ? setOperation(value) : null;
    value === "-" ? setOperation(value) : null;
    value === "*" ? setOperation(value) : null;
    value === "/" ? setOperation(value) : null;
    value === "%" ? setOperation(value) : null;
    value === "=" ? addNumberInput(value) : null;
    value === "C" ? addNumberInput(value) : null;
    
    // const operators = ['+', '-', '*', '/'];
    // return operators.includes(value);
}

function addNumberInput(value){
    const input = document.getElementsByClassName('display')[0];
  

    if (input.value === "0" && value !== "," && input.value.length === 1) {
        input.value = value;
        return;
    }
    input.value = input.value + value;
}

function setOperation(value){
   
    console.log(value);
}