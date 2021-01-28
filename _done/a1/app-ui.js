"use strict"

// PROJECT: Assessment 1 - Meme Generator
//
// For this assignment, you’ll be building a meme generator in the browser using HTML, CSS, and JavaScript.
//
// Your generator should consist of a form that accepts a link to an image,
//
// text for the top of the meme, and text for the bottom of the meme.
//
// When the user submits the form, use JavaScript to append to the DOM a div which contains the meme,
//
// including the image and its text.
//
// Requirements
//
// User should be able to submit a form on the page to generate a new meme on the page,
//
// and should be able to add multiple memes to the page by submitting the form multiple times.
//
// Users should be able to click on a button to remove a meme from the page.
//
// When the meme form is submitted, values in the form inputs should be cleared.
//
// Be sure to style your meme generator! It should be functional but also look nice.
//
// Only use vanilla JavaScript only: no frameworks/third-party libraries.
//

//
// TEST DOM Events
//
// references:
// https://developer.mozilla.org/en-US/docs/Web/Events
//

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

        this.previewMEME = null;
        this.previewIMG = null;
        this.previewTXT1 = null;
        this.previewTXT2 = null;

        this.backgroundColor = null;
        this.selectedHexagon = null;
    }

    init() {
        this.controlBoard = document.querySelector("#controlboard");

        this.imageURL = document.querySelector("#imageURL");
        this.text1 = document.querySelector("#text1");
        this.text2 = document.querySelector("#text2");

        this.previewDIV = document.querySelector("#previewDIV");
        this.previewIMG = document.querySelector("#previewIMG img");
        this.previewTXT1 = document.querySelector("#previewTXT1 div");
        this.previewTXT2 = document.querySelector("#previewTXT2 div");

        initResizeMoveElement(document.querySelector("#previewTXT1"));
        initResizeMoveElement(document.querySelector("#previewTXT2"));

        this.selectedHexagon = document.getElementById("selectedHexagon");
        clickColor("#FFFFFF", -110, 108);

        this.dropdownSelect = document.querySelector("#dropdownSelect");
        this.dropdownSelect.onchange = function () {
            let my = appUI.dropdownSelect;

            appUI.imageURL.value = my.options[my.selectedIndex].text;
            appUI.previewIMG.src = my.options[my.selectedIndex].text;
        }

        // this.imageURL.value = "https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/30/14/sharpei.jpg";
        // this.text1.value = "Cute puppie...";
        // this.text2.value = "Let's play!";
        this.text1.value = "";
        this.text2.value = "";

        this.previewIMG.src = this.imageURL.value;
        this.previewTXT1.innerHTML = this.text1.value;
        this.previewTXT2.innerHTML = this.text2.value;
    }
}

let appUI = new AppUI();

function insertElement(child) {
    dataList.element.appendChild(child);
}

function createElement(dataItem) {
    let dataDiv = appUI.previewDIV.cloneNode(true);
    dataDiv.id = dataItem.getKey();

    let divIMG = dataDiv.querySelector("#previewIMG");
    let divTXT1 = dataDiv.querySelector("#previewTXT1");
    let divTXT2 = dataDiv.querySelector("#previewTXT2");

    divIMG.id = `previewIMG-${dataItem.myID}`;
    divTXT1.id = `previewTXT1-${dataItem.myID}`;
    divTXT2.id = `previewTXT2-${dataItem.myID}`;

    let b = dataDiv.querySelectorAll(".previewBTN");
    b[0].style.visibility = "Visible";
    // b[1].style.visibility = "Visible";

    let deleteButton = dataDiv.querySelector("#previewDelete");
    // let editButton = dataDiv.querySelector("#previewEdit");

    deleteButton.id = `previewDelete-${dataItem.myID}`;
    // editButton.id = `previewEdit-${dataItem.myID}`;

    deleteButton.addEventListener('click', deleteItem_onClick, false);

    // for (i=0; i<b.length; i++){
    //     b[i].visibility = visible;
    // }

    return dataDiv;
}

// why: preview change in background color of preview text on image
// by whom: called as mouse moves over a colormap hexagon
// location: index.html, colormap div
function mouseOverColor(hex) {
    document.body.style.cursor = "pointer";

    appUI.previewTXT1.style.backgroundColor = hex;
    appUI.previewTXT2.style.backgroundColor = hex;
}

// why: preview change in background color of preview text on image
// by whom: called as mouse leaves colormap
// location: index.html, colormap div
function mouseOutMap() {
    document.body.style.cursor = "";

    appUI.previewTXT1.style.backgroundColor = appUI.backgroundColor;
    appUI.previewTXT2.style.backgroundColor = appUI.backgroundColor;
}

// why: cement change in background color of preview text on image
// by whom: called as mouse is clicked while hovering over a colormap hexagon
// location: index.html, colormap div
function clickColor(hex, seltop, selleft) {
    appUI.backgroundColor = hex;
    appUI.previewTXT1.style.backgroundColor = hex;
    appUI.previewTXT2.style.backgroundColor = hex;

    if ((seltop + 200) > -1 && selleft > -1) {
        appUI.selectedHexagon.style.top = seltop + "px";
        appUI.selectedHexagon.style.left = selleft + "px";
        appUI.selectedHexagon.style.visibility = "visible";
    } else {
        appUI.selectedHexagon.style.visibility = "hidden";
    }
}

//
// on load, construct the UI, initialize the DOM events, load the app state, restore game if any
//
window.addEventListener("load", function (e) {
    appUI.init();
    dataList.init();
});

window.addEventListener("change", function (e) {
    e.preventDefault();
    let target = e.target;

    if (target.matches("#imageURL")) {
        imageURL_onChange(e.target);
    } else if (target.matches("#text1")) {
        text1_onChange(e.target);
    } else if (target.matches("#text2")) {
        text2_onChange(e.target);
    }
})

window.addEventListener("click", function (e) {
    e.preventDefault();
    let target = e.target;

    if (target.matches("#text1")) {
        text1_onClick(target);
    } else if (target.matches("#text2")) {
        text2_onClick(target);
    } else if (target.matches("#addNew")) {
        addNew_onClick(target);
    } else if (target.matches("#saveEdit")) {
        saveEdit_onClick(target);
    } else if (target.matches("#clearEditor")) {
        clearEditor_onClick(target);
    }
});

window.addEventListener("focus", function (e) {
    const evt = "window.focus";
    console.log(`${evt}: ${new Date} start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`);
});

window.addEventListener("blur", function (e) {
    const evt = "window.blur";
    console.log(`${evt}: ${new Date} start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`);
});

window.addEventListener("resize", function (e) {
    const evt = "window.resize";
    console.log(`${evt}: ${new Date} start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`);
});

window.addEventListener("keydown", function (e) {
    const evt = "window.keydown";
    console.log(`${evt}: ${new Date} start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`);
});


//
// GUI interaction
//

function imageURL_onChange(target) {
    appUI.previewIMG.src = appUI.imageURL.value;
}

function text1_onChange(target) {
    appUI.previewTXT1.innerHTML = appUI.text1.value;
}

function text2_onChange(target) {
    appUI.previewTXT2.innerHTML = appUI.text2.value;
}

function text1_onClick(target) {
    const evt = "text1_onClick";
    console.log(`${evt}: ${new Date}`);
}

function text2_onClick(target) {
    const evt = "text2_onClick";
    console.log(`${evt}: ${new Date}`);
}

function addNew_onClick(target) {
    const evt = "addNew_onClick";
    console.log(`${evt}: ${new Date}`);
    let imageURL = appUI.imageURL.value,
        text1 = appUI.text1.value,
        text2 = appUI.text2.value,
        textBackgroundColor = appUI.backgroundColor;

    let dataItem = dataList.addItem(imageURL, text1, text2, textBackgroundColor);
    dataItem.element = createElement(dataItem);
    insertElement(dataItem.element);

    appUI.text1.value = "";
    appUI.text2.value = "";
    appUI.imageURL.value = "";

    appUI.previewIMG.src = appUI.imageURL.value;
    appUI.previewTXT1.innerHTML = appUI.text1.value;
    appUI.previewTXT2.innerHTML = appUI.text2.value;
}

function deleteItem_onClick(target) {
    const evt = "deleteItem_onClick";
    console.log(`${evt}: ${new Date}`);

    let buttonID = target.srcElement.id;
    let length = buttonID.length;
    let start = buttonID.indexOf("-",0);
    if (start > -1) {
        start += 1;
    }
    let dataID = buttonID.slice(start,length);
    let dataItem = dataList.findItemByKey(`dataItemID-${dataID}`);
    let parent = dataItem.element.parentElement;
    dataItem.element.remove();
}

function saveEdit_onClick(target) {
    const evt = "saveEdit_onClick";
    console.log(`${evt}: ${new Date}`);
}

function clearEditor_onClick(target) {
    const evt = "clearEditor_onClick";
    console.log(`${evt}: ${new Date}`);
}
