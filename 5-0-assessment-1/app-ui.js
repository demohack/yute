"use strict"
let evt = "card-ui.js:begin";
console.log(`${evt}: ${new Date}`);

class AppUI {
    constructor() {
        //
        // declare UI global variables
        //

        this.controlBoard = null;

        //
        // for new memes
        //

        this.imageURL = null;
        this.text1 = null;
        this.text2 = null;

        this.previewDIV = null;
        this.previewIMG = null;
        this.previewTXT1 = null;
        this.previewTXT2 = null;
    }

    init() {
        this.controlBoard = document.querySelector("#controlboard");

        this.imageURL = document.querySelector("#imageURL");
        this.text1 = document.querySelector("#text1");
        this.text2 = document.querySelector("#text2");

        this.previewDIV = document.querySelector("#previewDIV");
        this.previewIMG = document.querySelector("#previewIMG");
        this.previewTXT1 = document.querySelector("#previewTXT1");
        this.previewTXT2 = document.querySelector("#previewTXT2");
    }
}

let appUI = new AppUI();

// todo: iterator protocol
function insertElement(child) {
    dataList.element.appendChild(child);
}

// todo: iterator protocol
function createElement(dataItem) {
    let dataDiv = document.createElement("div");
    dataDiv.id = dataItem.getKey();

    dataDiv.classList.add("w3-cell");

    return dataDiv;
}