"use strict";

const checkboxContainer = document.querySelector(".check-box");
const btns = checkboxContainer.querySelectorAll(".btn");
const btnReset = document.querySelector(".btn--reset");
const billEl = document.querySelector("#bill");
const billErrorEl = document.querySelector(".error-msg--bill");
const numOfPeopleEl = document.querySelector("#num-of-people");
const numOfPeopleErrorEl = document.querySelector(".error-msg--num");
const tipErrorEl = document.querySelector(".error-msg--tip");
const tipLabel = document.querySelector("#tip");
const totalLabel = document.querySelector("#total");
const customTip = document.querySelector(".input--custom");

let tipPercent = 0;
let bill = 0;
let numOfPeople = 0;

const resetFrom = function () {
  tipPercent = bill = numOfPeople = 0;
  tipLabel.textContent = totalLabel.textContent = "$0.00";
  billEl.value = numOfPeopleEl.value = customTip.value = "";
  btns.forEach((btn) => btn.classList.remove("active"));
};

const calTip = (bill, percent, num) => {
  let tip = (bill * percent) / 100;
  tipLabel.textContent = "$" + (tip / num).toFixed(2);
  totalLabel.textContent = "$" + ((bill + tip) / num).toFixed(2);
  btnReset.disabled = false;
};
const checkValues = function () {
  billEl.classList.remove("error");
  numOfPeopleEl.classList.remove("error");
  document
    .querySelectorAll(".error-msg")
    .forEach((err) => err.classList.add("hidden"));

  if (bill === 0) {
    billEl.classList.add("error");
    billErrorEl.classList.remove("hidden");
    return false;
  }

  if (tipPercent === 0) {
    tipErrorEl.classList.remove("hidden");
    return false;
  }

  if (numOfPeople === 0) {
    numOfPeopleEl.classList.add("error");
    numOfPeopleErrorEl.classList.remove("hidden");
    return false;
  }

  return true;
};

checkboxContainer.addEventListener("click", function (e) {
  btns.forEach((btn) => btn.classList.remove("active"));

  if (!e.target.classList.contains("btn")) return;

  const btn = e.target;

  btn.classList.add("active");
  tipPercent = btn.dataset.value;

  if (!checkValues()) return;

  calTip(bill, tipPercent, numOfPeople);
});

billEl.addEventListener("keyup", function (e) {
  bill = +e.target.value;
  if (!checkValues()) return;
  calTip(bill, tipPercent, numOfPeople);
});

numOfPeopleEl.addEventListener("keyup", function (e) {
  numOfPeople = +e.target.value;
  if (!checkValues()) return;
  calTip(bill, tipPercent, numOfPeople);
});

btnReset.addEventListener("click", resetFrom);

customTip.addEventListener("keyup", function (e) {
  tipPercent = +e.target.value;
  calTip(bill, tipPercent, numOfPeople);
});
