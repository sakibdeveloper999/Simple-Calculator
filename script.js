let display = document.getElementById('result');
let currentInput = '';
let previousInput = '';
let operator = null;

// Append number to the display
function appendNumber(number) {
  if (currentInput.includes('.') && number === '.') return;
  currentInput += number;
  display.value = currentInput;
}

// Clear the display
function clearDisplay() {
  currentInput = '';
  previousInput = '';
  operator = null;
  display.value = '';
}

// Backspace functionality
function backspace() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}

// Select operator
function calculate(op) {
  if (currentInput === '') return;
  if (previousInput !== '') {
    equal();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
}

// Perform calculation
function equal() {
  if (operator === null || currentInput === '') return;
  let result;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  switch (operator) {
    case '+':
      result = prev + curr;
      break;
    case '-':
      result = prev - curr;
      break;
    case '*':
      result = prev * curr;
      break;
    case '/':
      result = prev / curr;
      break;
    case '%':
      result = prev % curr;
      break;
    case '**2':
      result = prev ** 2;
      break;
    default:
      return;
  }

  currentInput = result;
  operator = null;
  previousInput = '';
  display.value = result;
}

// Listen for keyboard events
document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Handle numbers and dot
  if (!isNaN(key) || key === '.') {
    appendNumber(key);
  }

  // Handle operators
  if (['+', '-', '*', '/'].includes(key)) {
    calculate(key);
  }

  // Handle Enter key for "="
  if (key === 'Enter') {
    equal();
  }

  // Handle Backspace
  if (key === 'Backspace') {
    backspace();
  }

  // Handle "C" or "Escape" for clearing
  if (key.toLowerCase() === 'c' || key === 'Escape') {
    clearDisplay();
  }
});
