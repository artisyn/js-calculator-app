console.log('this works');
// targeting variables

// single variables
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

// group variables
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
	let result;
	switch (symbol) {
		case '+':
			result = +num1 + +num2;

			break;

		default:
			break;
	}

	return result;
};

// Main logic

// Numbers
const handleNumClick = (e) => {
	console.log(e.target.innerText);
	let number = e.target.innerText;
	let strBottom = displayBottom.innerText;
	let strTop = displayTop.innerText;

	if (isASybmol(lastElement(strTop))) {
		displayBottom.innerText = number;
		return;
	}
	displayBottom.innerText += e.target.innerText;
};

// Symbols
const handleSymbolClick = (e) => {
	console.log(e.target.innerText);
	// if no text return
	if (displayBottom.innerText.length === 0) return;
	let symbol = e.target.innerText;
	let strBottom = displayBottom.innerText;
	let strTop = displayTop.innerText;
	// symbol C
	if (symbol === 'C') {
		displayBottom.innerText = '';
		displayTop.innerText = '';
		return;
	}
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
	}

	// All the rest symbols
	if (lastElement(strTop) === symbol) return;
	if (isASybmol(lastElement(strTop))) {
		const firstEl = strTop.split(' ')[0];
		displayTop.innerText = `${firstEl} ${symbol} `;
		return;
	}
	displayTop.innerText = `${displayBottom.innerText} ${symbol} `;
};

// Equals
const handleEqualsClick = (e) => {
	let strBottom = displayBottom.innerText;
	let strTop = displayTop.innerText;
	// check if operation is possible
	if (strBottom && isASybmol(lastElement(strTop))) {
		const [numLeft, symbol] = strTop.split(' ');
		const numRight = strBottom;
		displayBottom.innerText = handleCalc(numLeft, symbol, numRight);
	}
};

// adding Event Listeners
allNumBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleNumClick(e);
	});
});

allSymblBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		handleSymbolClick(e);
	});
});

btnEquals.addEventListener('click', (e) => {
	handleEqualsClick(e);
});

//To do
// keyboard access
