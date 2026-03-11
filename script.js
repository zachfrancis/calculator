const add = function (x, y) {
  const sum = x + y;
  return sum;
};

const subtract = function (x, y) {
  const difference = x - y;
  return difference;
};

const multiply = function (x, y) {
  const product = x * y;
  return product;
};

const divide = function (x, y) {
  const quotient = x / y;
  return quotient;
};

function operate(operator, leftNumber, rightNumber) {
  x = Number(leftNumber);
  y = Number(rightNumber);
  switch (operator) {
    case "add":
      return add(x, y);
    case "subtract":
      return subtract(x, y);
    case "multiply":
      return multiply(x, y);
    case "divide":
      return divide(x, y);
    default:
      return;
  }
}

function handleButtonClick(event) {
  const display = document.querySelector(".display");
  switch (event.target.className) {
    case "number":
      if (operator === "equals") {
        display.textContent = "";
        operator = undefined;
        leftNumber = undefined;
      }
      display.textContent += event.target.id;
      break;

    case "operator":
      if (!operator) {
        leftNumber = display.textContent;
        operator = event.target.id;
        display.textContent += ` ${event.target.textContent} `;
      } else {
        rightNumber = display.textContent.slice(leftNumber.length + 3);
        const result = operate(operator, leftNumber, rightNumber);
        display.textContent = result;
        operator = event.target.id;
        if (operator !== "equals") {
          display.textContent += ` ${event.target.textContent} `;
        } else if (operator === "equals") {
          operator = undefined;
        }
        leftNumber = String(result);
      }
      break;

    case "clear":
      leftNumber = undefined;
      rightNumber = undefined;
      display.textContent = "";

    default:
      break;
  }
}

let leftNumber;
let operator;
let rightNumber;

const buttons = document.querySelectorAll("button");

for (button of buttons) {
  button.addEventListener("click", handleButtonClick);
}
