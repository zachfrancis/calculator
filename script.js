const MAX_DIGITS = 9;

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
  return !Number.isInteger(n) ? parseFloat(n.toPrecision(MAX_DIGITS)) : n;
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

function handleDot() {
  if (!display.textContent) {
    display.textContent = "0.";
  } else if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function handleNumber(elem) {
  // If last operation was equals, start with a blank slate
  if (operator === "equals") {
    reset();
  } else if (prevInputType === "operator") {
    display.textContent = "";
  }
  if (elem.id === "dot") {
    handleDot();
  } else if (display.textContent.length < MAX_DIGITS) {
    display.textContent += elem.textContent;
  }
}

function handleOperator(elem) {
  const inputtingRightNumber = leftNumber && operator !== "equals";
  if (prevInputType === "operator") {
    display.textContent = leftNumber;
  } else if (inputtingRightNumber) {
    rightNumber = display.textContent;
    display.textContent = operate(operator, leftNumber, rightNumber);
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
  prevInputType = event.target.className;
}

// Global variables - needed for most functions
let leftNumber;
let rightNumber;
let operator;
let prevInputType;

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

for (button of buttons) {
  button.addEventListener("click", handleButtonClick);
}
