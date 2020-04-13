"use strict"
let evt = "card-ui.js:begin";
console.log(`${evt}: ${new Date}`);

class CardUI {
    constructor() {
        //
        // UI global variables
        //
        this.controlBoard = null; // control board

        //
        // for new tasks
        //
        this.colorsToDeal = null;
    }

    init() {
        this.controlBoard = document.querySelector("#controlboard");
        this.colorsToDeal = document.querySelector("#colorsToDeal");
    }
}

let cardUI = new CardUI();

// todo: iterator protocol
function insertElement(child) {
    cardList.element.appendChild(child);
}

// todo: iterator protocol
function createElement(cardItem) {
    let cardDiv = document.createElement("div");
    cardDiv.id = cardItem.getKey();

    cardDiv.classList.add("card");
    cardDiv.dataset.color = cardItem.color;
    cardDiv.dataset.face = cardItem.face;

    if (cardItem.dealt) {
        cardElement.classList.add("dealt");
    }

    if (cardItem.selected) {
        cardElement.classList.add("selected");
    }

    return cardDiv;
}