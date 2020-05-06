"use strict"

// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement('td');
  newTd.innerHTML = value;    // changed from innerText, to be able to add html buttons

  tr.append(newTd);
  return newTd;
}

// expects a table row element, appends a newly created td element from the value
function appendDeleteBtn(tr) {
  let newBtn = document.createElement('button');
  newBtn.innerHTML = 'X';    // changed from innerText, to be able to add html buttons

  let newTd = document.createElement('td');
  newTd.append(newBtn);    // changed from innerText, to be able to add html buttons

  tr.append(newTd);
  return newTd;
}

// https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
const deepCopyFunction = (inObject) => {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value)
  }

  return outObject
}
