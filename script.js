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

function reset(display) {
  display.textContent = "";
  operator = undefined;
  leftNumber = undefined;
  rightNumber = undefined;
}

function handleButtonClick(event) {
  const display = document.querySelector(".display");
  switch (event.target.className) {
    case "number":
      if (operator === "equals") reset(display);
      display.textContent += event.target.id;
      break;

    case "operator":
      if (leftNumber && operator !== "equals") {
        rightNumber = display.textContent.slice(leftNumber.length + 3);
        display.textContent = operate(operator, leftNumber, rightNumber);
      }
      leftNumber = display.textContent;
      operator = event.target.id;
      if (operator !== "equals") {
        display.textContent += ` ${event.target.textContent} `;
      }
      break;

    case "clear":
      reset(display);

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
