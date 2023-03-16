var acc;
var operator;

var enteringNumber; // currently entering a number?
var lastWasOperator;
var lastWasEquals;

/**
 * Initialise button callback handlers and clear display
 */
function init() {	
	console.log("1")
	for ( var i = 0; i < 10; i++) {
		document.getElementById(i).onclick = appendNumber;
	}
	document.getElementById("dot").onclick = appendDot;
	document.getElementById("plus").onclick = operatorButtonPressed;
	document.getElementById("minus").onclick = operatorButtonPressed;
	document.getElementById("times").onclick = operatorButtonPressed;
	document.getElementById("divide").onclick = operatorButtonPressed;
	document.getElementById("equals").onclick = equalsPressed;
	document.getElementById("plusMinus").onclick = toggleSign;
	document.getElementById("clear").onclick = clear;
	clear();
}

/**
 * Append the number typed to the content of the display
 */
function appendNumber() {
	var display = document.getElementById("display");
	if (enteringNumber) {
		display.value = String(display.value) + String(this.value);
	} else {
		display.value = "0";
		display.value = this.value;
		enteringNumber = true;
	}
	lastWasOperator = false;
	lastWasEquals = false;
}

/**
 * Append the dot if there is no dot in the display yet, otherwise ignore the
 * button press.
 */
function appendDot() {
	var display = document.getElementById("display");
	if (enteringNumber) {
		if (display.value.indexOf(".") == -1) {
			display.value = String(display.value) + ".";
		}
	} else {
		display.value = "0.";
		enteringNumber = true;
	}
	lastWasOperator = false;
	lastWasEquals = false;
}

/**
 * Evaluate a previous expression if 
 * or save current number to accumulator and set
 * to zero.
 */
function operatorButtonPressed() {
	if (operator) {
		evaluateExpression();
		operator = this.id
	} else {
		saveToAcc();
		resetToZero();
	}
	operator = this.id;
	lastWasEquals = false;
	lastWasOperator = true;
	enteringNumber = false;
}

/**
 * Callback for the equals button.
 */
function equalsPressed() {
	evaluateExpression();
	lastWasEquals = true;
	lastWasOperator = false;
	enteringNumber = false;
}

/**
 * Evaluate an expression previously entered.
 */
function evaluateExpression() {
	var display = document.getElementById("display");
	var operand1, operand2;
	
	operand1 = Number(display.value);
	operand2 = Number(acc);
	
	
	switch (operator) {
	case "plus":
		display.value = operand1 + operand2;
		break;
	case "minus":
		display.value = operand2 - operand1;
		break;
	case "times":
		display.value = operand1 * operand2;
		break;
	case "divide":
		display.value = operand2 / operand1;
		break;
	}
	acc = Number(display.value);	
}

/**
 * Toggle the sign of the number in the display.
 */
function toggleSign() {
	var display = document.getElementById("display");
	display.value = 0 - Number(display.value);
	lastWasEquals = false;
	lastWasOperator = false;
}

/**
 * Save the value in the display to the accumulator.
 */
function saveToAcc() {
	var display = document.getElementById("display");
	acc = Number(display.value)
}

/**
 * Clear the display and reset the model to initial state.
 */
function clear() {
	resetToZero();
	operator = undefined;
	enteringNumber = false;
}

/**
 * Reset the display to zero.
 */
function resetToZero() {
	var display = document.getElementById("display");
	display.value = "0";
}

window.onload = init