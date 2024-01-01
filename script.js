const themeToggle = document.getElementById("themeToggle"); // finding the id of the toggle switch button

// this is for toggle button clicking
const storedTheme = localStorage.getItem("theme"); // creating a local storage in browser to store the theme

// storing the last theme before refreshing the browser
if (themeToggle == "dark") {
  // light to dark
  document.documentElement.style.setProperty("--bg-color", "#040D12");
  document.documentElement.style.setProperty("--text-color", "#93B1A6");
  document.documentElement.style.setProperty("--keypad-bg-color", "#040D12");
  document.documentElement.style.setProperty("--keypad-bg-color2", "#183D3D");
  themeToggle.checked = true; // this will set the value of toggle switch to true
  // localStorage.setItem('theme', 'dark');
}
// switching to light theme from dark
else {
  document.documentElement.style.setProperty("--bg-color", "#f1eaff");
  document.documentElement.style.setProperty("--text-color", "#d67bff");
  document.documentElement.style.setProperty("--keypad-bg-color", "#f1eaff");
  document.documentElement.style.setProperty("--keypad-bg-color2", "#d0a2f7");
  // localStorage.setItem('theme', 'light');
}

// changing the toggle switch from light -> dark or vice versa
themeToggle.addEventListener("change", function () {
  if (this.checked) {
    // light to dark
    document.documentElement.style.setProperty("--bg-color", "#040D12");
    document.documentElement.style.setProperty("--text-color", "#93B1A6");
    document.documentElement.style.setProperty("--keypad-bg-color", "#040D12");
    document.documentElement.style.setProperty("--keypad-bg-color2", "#183D3D");
    localStorage.setItem("theme", "dark");
  }
  // switching to light theme from dark
  else {
    document.documentElement.style.setProperty("--bg-color", "#f1eaff");
    document.documentElement.style.setProperty("--text-color", "#d67bff");
    document.documentElement.style.setProperty("--keypad-bg-color", "#f1eaff");
    document.documentElement.style.setProperty("--keypad-bg-color2", "#d0a2f7");
    localStorage.setItem("theme", "light");
  }
});

// function to display the result
let result = document.getElementById("result");
function appendToResult(value) {
  result.value += value; // appending the new value to the previous value
  playButtonSound();
}

function backspace() {
  if (result.value == "Error" || result.value == "Infinity") {
    result.value = "";
  }
  result.value = result.value.slice(0, -1); // removing the last digit or icon from the result whenever we click on backspace
  playButtonSound();
}

function clearResult() {
  result.value = ""; // erasing all the results
  playButtonSound();
}

function calculate() {
  playButtonSound();
  try {
    if (result.value == "") {
      result.value = "0";
    }
    result.value = eval(result.value); // eval is for evaluating the string that is entered as input
  } catch (e) {
    result.value = "Error";
  }
}

// function to play the sound when we're pressing a button
function playButtonSound() {
  const buttonSound = document.getElementById("buttonSound");
  buttonSound.currentTime = 0; // this will make sure if we press 4,5 buttons consecutively, it will play sound for the no of times buttons are pressed
  buttonSound.play();
}

// Function to add numeric values from the keyboard
function handleKeyPress(event) {
  const calculatorDisplay = document.getElementById("result");

  // Get the pressed key
  const key = event.key;
  playButtonSound(); // playing the button sound when it's pressed

  // Check if the pressed key is a number or an operator
  if (!isNaN(key) || ["+", "-", "*", "/"].includes(key)) {
    calculatorDisplay.value += key;
  } else if (key === "Enter") {
    // Evaluate the expression when Enter key is pressed
    try {
      calculatorDisplay.value = eval(calculatorDisplay.value);
    } catch (error) {
      calculatorDisplay.value = "Error";
    }
  } else if (key === "Escape") {
    // Clear the display when Escape key is pressed
    calculatorDisplay.value = "";
  }
}

// Attach the event listener to the document
document.addEventListener("keydown", handleKeyPress);
