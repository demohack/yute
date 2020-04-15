"use strict"
evt = "4-5-memory-game.js:begin";
console.log(`${evt}: ${new Date}`);

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

//
// on load, construct the UI, initialize the DOM events, load the app state, restore game if any
//
window.addEventListener("load", function (e) {
    const evt = "window.load";
    console.log(`${evt}: ${new Date} start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`);

    appUI.init();
    dataList.init();
});

window.addEventListener("change", function (e) {
    const evt = "window.addEventListener('change')";
    console.log(`${evt}: ${new Date}`);

    e.preventDefault();
    let target = e.target;

    if (target.matches("#imageURL")) {
        imageURL_onChange(e.target);
    } else if (target.matches("#text1")) {
        text1_onChange(e.target);
    } else if (target.matches("#text2")) {
        text2_onChange(e.target);
    }

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~ you just clicked", e.target);
})

window.addEventListener("click", function (e) {
    const evt = "window.click";
    console.log(`${evt}: ${new Date} start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`);

    e.preventDefault();
    let target = e.target;

    if (target.matches("#previewIMG")) {
        dataItem_onClick(target);
    } else if (target.matches("#previewTXT1")) {
        dataItem_onClick(target);
    } else if (target.matches("#previewTXT2")) {
        dataItem_onClick(target);
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

let deckOfCards = null;

function controlBoard_onDeal(target) {
    const evt = "controlBoard_onDeal";
    console.log(`${evt}: ${new Date}`);

    console.log("you just clicked", target);
}

function imageURL_onChange(target) {
    const evt = "imageURL_onChange";
    console.log(`${evt}: ${new Date}`);

    appUI.previewIMG.src = appUI.imageURL.value;

    console.log("you just clicked", target);
}

function text1_onChange(target) {
    const evt = "text1_onChange";
    console.log(`${evt}: ${new Date}`);

    appUI.previewTXT1.innerHTML = appUI.text1.value;

    console.log("you just clicked", target);
}

function text2_onChange(target) {
    const evt = "text2_onChange";
    console.log(`${evt}: ${new Date}`);

    appUI.previewTXT2.innerHTML = appUI.text2.value;

    console.log("you just clicked", target);
}

function dataItem_onClick(target) {
    const evt = "dataItem_onClick";
    console.log(`${evt}: ${new Date}`);


    console.log("you just clicked", target);
}

evt = "4-5-memory-game.js:end";
console.log(`${evt}: ${new Date}`);