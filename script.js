const bill_input = document.getElementById("input-bill");
const numOfPpl_input = document.getElementById("input-ppl");
const tipBtns = document.querySelectorAll("button.calculator__tip-btn");
const customTip_input = document.querySelector(".btn-custom");
const labels = document.querySelectorAll(".calculator__section-title span");
const resetBtn = document.querySelector(".btn--reset");

const input_color = "hsl(183, 100%, 15%)";
const btn_color = "hsl(189, 41%, 97%)";

function handleError(error, element, label_id) {
	let error_label;
	if (label_id) {
		const error_label = document.getElementById(label_id);
		error_label.innerText = error;
	}

	element.focus();
	element.classList.add("error");

	// if the element is number of ppl, then also it will be reset otherwise only bill number will be reset
	bill_input.value = 0;

	element.value = 0;
}

function isValid() {
	let error_msg = "Can't be negative";
	let error_el = numOfPpl_input;
	let label_id = "";
	// 1.zero
	// 2. negative value
	const numOfPpl = Number(numOfPpl_input.value);
	if (numOfPpl === 0) {
		error_msg = "Can't be zero";
		label_id = "error_ppl";
	}

	// In bill inputcheck negative number
	const billNum = Number.parseFloat(bill_input.value);

	if (billNum < 0) {
		error_el = bill_input;
		label_id = "error_bill";
	}

	const customTip = Number(customTip_input.value);
	if (customTip < 0) {
		error_el = customTip;
	}
	const isValid = numOfPpl > 0 && billNum >= 0;
	if (!isValid) {
		handleError(error_msg, error_el, label_id);
	}
	return isValid;
}

function updatePerPersonSection(e, ppl, bill, tip) {
	const tipId = "perperson__tip";
	const sumId = "perperson__total";
	const tipEl = document.getElementById(tipId);
	const sumEl = document.getElementById(sumId);

	const sumPerPerson = bill / ppl;

	const tipPerPerson = (sumPerPerson * tip) / 100;

	const totalPerPerson = sumPerPerson + tipPerPerson;
	tipEl.innerText = tipPerPerson.toFixed(2);
	sumEl.innerText = totalPerPerson.toFixed(2);
}

function handleInput(e) {
	resetErrors();
	let tip = 0;
	const elClassList = Array.from(e.target.classList);
	if (elClassList.includes("btn-custom")) {
		tip = customTip_input.value;
		customTip_input.value = Number(tip);
	} else if (elClassList.includes("calculator__tip-btn")) {
		tip = e.target.innerText.split("%").join("");
		resetCustomTip();
		Array.from(tipBtns).forEach((btn) => {
			if (btn.innerText !== e.target.innerText) btn.style.color = btn_color;
		});
	}

	if (isValid()) {
		// Reset errors

		const pplNum = Number(numOfPpl_input.value).toString();
		const billSum = Number.parseFloat(bill_input.value).toString();
		numOfPpl_input.value = pplNum;

		updatePerPersonSection(e, +pplNum, +billSum, +tip);
	}
}

function resetCustomTip() {
	customTip_input.blur();
	customTip_input.value = "";
	customTip_input.ariaPlaceholder = "Custom";
	customTip_input.style.color = input_color;
}

function resetTipBtns() {
	Array.from(tipBtns).forEach((btn) => {
		btn.blur();
		btn.style.color = btn_color;
	});
}

function resetErrors() {
	Array.from(labels).forEach((label) => {
		label.innerText = "";
	});
	const elErrors = document.getElementsByClassName("error");
	Array.from(elErrors).forEach((element) => element.classList.remove("error"));
}
function handleReset(e) {
	bill_input.value = "";
	numOfPpl_input.value = "1";
	56872;

	resetTipBtns();
	resetCustomTip();
	// Reset errors
	resetErrors();
	updatePerPersonSection(null, 1, 0, 0);
}

// Handle the style of buttons when custom tip is focused
if (document.hasFocus() && customTip_input === document.activeElement) {
	resetTipBtns();
}

bill_input.addEventListener("keyup", handleInput);
numOfPpl_input.addEventListener("keyup", handleInput);

Array.from(tipBtns).forEach((btn) => {
	btn.addEventListener("click", handleInput);
});
customTip_input.addEventListener("keyup", handleInput);

resetBtn.addEventListener("click", handleReset);
