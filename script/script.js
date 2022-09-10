// targeting DOM Elements

// single elements
const btnNegative = document.querySelector('.btn-negative');
const btnDeleteLast = document.querySelector('.btn-back');
const btnDivide = document.querySelector('.btn-divide');
const btnMultiply = document.querySelector('.btn-multiply');

const btnSeven = document.querySelector('.btn-7');
const btnEight = document.querySelector('.btn-8');
const btnNine = document.querySelector('.btn-9');
const btnMinus = document.querySelector('.btn-minus');

const btnFour = document.querySelector('.btn-4');
const btnFive = document.querySelector('.btn-5');
const btnSix = document.querySelector('.btn-6');
const btnPlus = document.querySelector('.btn-plus');

const btnOne = document.querySelector('.btn-1');
const btnTwo = document.querySelector('.btn-2');
const btnThree = document.querySelector('.btn-3');

const btnC = document.querySelector('.btn-c');
const btnZero = document.querySelector('.btn-0');
const btnDot = document.querySelector('.btn-dot');
const btnEquals = document.querySelector('.btn-equals');

const displayTop = document.querySelector('.calc-display--top');
const displayBottom = document.querySelector('.calc-display--bottom');

// group elements
const allNumBtns = document.querySelectorAll('.num-btn');
const allSymblBtns = document.querySelectorAll('.symbl-btn');

// Helper functions

const isASybmol = (str) => {
	if (str === '-' || str === '+' || str === '*' || str === '/') return true;
	return false;
};
const lastElement = (str) => {
	const trimmedStr = str.trim();
	return trimmedStr[trimmedStr.length - 1];
};
const handleCalc = (num1, symbol, num2) => {
	const number1 = +num1;
	const number2 = +num2;
	let result;
	switch (symbol) {
		case '+':
			// trying to solve weird JS Calculation
			// 10.10 + 10.20 = 20.299999999999997
			// result = number1 + number2;
			result = (number1 * 100 + number2 * 100) / 100;
			break;
		case '-':
			// result = number1 - number2;
			result = (number1 * 10 - number2 * 10) / 10;
			break;
		case '*':
			result = number1 * number2;
			break;
		case '/':
			result = number1 / number2;
			break;
	}

	return result;
};

const clearBothDisplays = () => {
	displayBottom.innerText = displayTop.innerHTML = '';
};

const adjustDisplaysFonts = () => {
	let strBottom = displayBottom.innerText;
	let strTop = displayTop.innerText;
	// breakpoints

	// Bottom display logic
	if (strBottom.length >= 0 && strBottom.length <= 9) {
		displayBottom.style.fontSize = '1.7rem';
	}
	if (strBottom.length >= 10 && strBottom.length <= 12) {
		displayBottom.style.fontSize = '1.4rem';
	}
	if (strBottom.length >= 13 && strBottom.length <= 17) {
		displayBottom.style.fontSize = '1.2rem';
	}
	if (strBottom.length >= 18 && strBottom.length <= 25) {
		displayBottom.style.fontSize = '1rem';
	}
	if (strBottom.length >= 26 && strBottom.length <= 999) {
		displayBottom.style.fontSize = '.5rem';
	}

	// Top Display logic
	if (strTop.length >= 0 && strTop.length <= 20) {
		displayTop.style.fontSize = '1.4rem';
	}
	if (strTop.length >= 21 && strTop.length <= 30) {
		console.log(strTop.length);
		displayTop.style.fontSize = '1.1rem';
	}
	if (strTop.length >= 31 && strTop.length <= 999) {
		displayTop.style.fontSize = '.8rem';
		return;
	}
};

// Main logic
let concatEnabled = false; // gives an option not to overrite number one time
// Numbers
const handleNumClick = (val) => {
	adjustDisplaysFonts();
	const number = val;
	const strBottom = displayBottom.innerText;
	const strTop = displayTop.innerText;
	// set max char amount
	if (strBottom.length > 15) return;
	// dot logic
	if (number === '.') {
		if (strBottom.length === 0) {
			displayBottom.innerText = `0.`;
			return;
		}
		if (strBottom.includes('.')) return;
		if (lastElement(strBottom) === '.') return;
	}

	if (isASybmol(lastElement(strTop))) {
		if (!concatEnabled) {
			concatEnabled = !concatEnabled;
			displayBottom.innerText = number;
			return;
		}
		displayBottom.innerText += number;
		return;
	}
	// checking if last operation was complete
	if (lastElement(strTop) === '=') {
		clearBothDisplays();
		displayBottom.innerText += number;
		return;
	}
	displayBottom.innerText += number;
};

// Symbols
const handleSymbolClick = (val) => {
	adjustDisplaysFonts();
	const symbol = val;
	const strBottom = displayBottom.innerText;
	const strTop = displayTop.innerText;
	// symbol C
	if (symbol === 'C') {
		concatEnabled = false;
		displayBottom.innerText = '';
		displayTop.innerText = '';
		return;
	}
	// if no text return
	if (displayBottom.innerText.length === 0) return;
	// symbol <
	if (symbol === '<') {
		displayBottom.innerText = strBottom.slice(0, strBottom.length - 1);
		return;
	}

	//symbol +/-
	if (symbol === '+/-') {
		if (strBottom[0] === '-') {
			displayBottom.innerText = strBottom.slice(1);
			return;
		}
		displayBottom.innerText = `-${strBottom}`;
		return;
	}

	// All the rest symbols
	if (lastElement(strTop) === symbol && concatEnabled) {
		handleEqualsFromSymbol();
		return;
	}

	if (lastElement(strTop) === symbol) return;
	if (isASybmol(lastElement(strTop))) {
		const firstEl = strTop.split(' ')[0];
		displayTop.innerText = `${firstEl} ${symbol} `;
		return;
	}
	displayTop.innerText = `${displayBottom.innerText} ${symbol} `;
};

// Equals
const handleEqualsClick = () => {
	const strBottom = displayBottom.innerText;
	const strTop = displayTop.innerText;
	// check if operation is possible
	if (strBottom && isASybmol(lastElement(strTop))) {
		const [numLeft, symbol] = strTop.split(' ');
		const numRight = strBottom;
		displayTop.innerText = `${strTop} ${strBottom} =`;
		displayBottom.innerText = handleCalc(numLeft, symbol, numRight);
	}
	concatEnabled = false;
	adjustDisplaysFonts();
};
const handleEqualsFromSymbol = () => {
	const strBottom = displayBottom.innerText;
	const strTop = displayTop.innerText;
	// check if operation is possible
	if (strBottom && isASybmol(lastElement(strTop))) {
		const [numLeft, symbol] = strTop.split(' ');
		const numRight = strBottom;
		const result = handleCalc(numLeft, symbol, numRight);
		displayTop.innerText = `${result} ${lastElement(strTop)}`;
		displayBottom.innerText = result;
	}
	concatEnabled = false;
	adjustDisplaysFonts();
};

// adding Event Listeners
allNumBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleNumClick(e.target.innerText);
	});
});

allSymblBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleSymbolClick(e.target.innerText);
	});
});

btnEquals.addEventListener('click', (e) => {
	handleEqualsClick();
});

// keyboard access logic
window.addEventListener('keyup', (e) => {
	if (e.key === '1') handleNumClick('1');

	if (e.key === '2') handleNumClick('2');

	if (e.key === '3') handleNumClick('3');

	if (e.key === '4') handleNumClick('4');

	if (e.key === '5') handleNumClick('5');

	if (e.key === '6') handleNumClick('6');

	if (e.key === '7') handleNumClick('7');

	if (e.key === '8') handleNumClick('8');

	if (e.key === '9') handleNumClick('9');

	if (e.key === '0') handleNumClick('0');

	if (e.key === 'Backspace') handleSymbolClick('<');

	if (e.key === '+') handleSymbolClick('+');

	if (e.key === '-') handleSymbolClick('-');

	if (e.key === '*') handleSymbolClick('*');

	if (e.key === '/') handleSymbolClick('/');

	if (e.key === '.') handleNumClick('.');

	if (e.key === '=') handleEqualsClick();

	if (e.key === 'c') handleSymbolClick('C');

	if (e.key === 'Escape') handleSymbolClick('C');
});
