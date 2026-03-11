const MAX_DECIMALS = 6;

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
  if (y === 0) {
    alert("Don't you dare!");
    return x;
  }
  const quotient = x / y;
  return quotient;
};

function roundNumber(n) {
  return !Number.isInteger(n) ? n.toFixed(MAX_DECIMALS) : n;
}

function operate(operator, leftNumber, rightNumber) {
  x = Number(leftNumber);
  y = Number(rightNumber);
  switch (operator) {
    case "add":
      result = add(x, y);
      break;
    case "subtract":
      result = subtract(x, y);
      break;
    case "multiply":
      result = multiply(x, y);
      break;
    case "divide":
      result = divide(x, y);
      break;
    default:
      return;
  }
  return roundNumber(result);
}

function reset() {
  display.textContent = "";
  operator = undefined;
  leftNumber = undefined;
  rightNumber = undefined;
}

function handleNumber(elem) {
  // If last operation was equals, start with a blank slate
  if (operator === "equals") reset();
  display.textContent += elem.id;
}

function handleOperator(elem) {
  const inputtingRightNumber = leftNumber && operator !== "equals";
  if (inputtingRightNumber) {
    rightNumber = display.textContent.slice(leftNumber.length + 3);
    if (rightNumber) {
      display.textContent = operate(operator, leftNumber, rightNumber);
    } else {
      display.textContent = leftNumber;
    }
  }
  leftNumber = display.textContent;
  operator = elem.id;
  if (operator !== "equals") {
    display.textContent += ` ${elem.textContent} `;
  }
}

function handleButtonClick(event) {
  switch (event.target.className) {
    case "number":
      handleNumber(event.target);
      break;
    case "operator":
      handleOperator(event.target);
      break;
    case "clear":
      reset(display);
    default:
      break;
  }
}

// Global variables - needed for most functions
let leftNumber;
let rightNumber;
let operator;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

for (button of buttons) {
  button.addEventListener("click", handleButtonClick);
}
