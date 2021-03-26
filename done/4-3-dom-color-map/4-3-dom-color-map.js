"use strict"
// we're converting pixels to color map
// utilizing RGB
// origin is 0,0,0

let controlboard = null; // control board
let colormap = null; // color map

let fieldX = null; // text box for X
let fieldY = null; // text box for Y
let fieldZ = null; // text box for Z

let fieldR = null; // text box for R
let fieldG = null; // text box for G
let fieldB = null; // text box for B

let fieldVelocity = null;
let fieldKey = null;
let fieldShift = null;
let fieldKeyInterval = null;

let offsetX = 0;
let offsetY = 0;

let valX = 0; // the X value
let valY = 0; // the Y value
let valZ = 0; // the Z value

let valR = 0; // the R value
let valG = 0; // the G value
let valB = 0; // the B value

let velocity = 1; // used as a multiplier for key presses to determine movement along Z axis
let key = ''; // is the shift key pressed, used as a brake to slow velocity
let shift = false; // is the shift key pressed, used as a brake to slow velocity

let lastKey = ''; // the last key pressed, either Q or A, used for determining direction and velocity

// references
// https://www.w3schools.com/jsref/event_onresize.asp

window.addEventListener("load", function (e) {
    console.log(`load h: ${document.body.clientHeight} w: ${document.body.clientWidth}`)

    controlboard = document.querySelector("#controlboard");
    colormap = document.querySelector("#colormap");

    offsetX = colormap.offsetLeft;
    offsetY = colormap.offsetTop;

    fieldX = document.querySelector("#posX");
    fieldY = document.querySelector("#posY");
    fieldZ = document.querySelector("#posZ");

    fieldR = document.querySelector("#colorR");
    fieldG = document.querySelector("#colorG");
    fieldB = document.querySelector("#colorB");

    fieldVelocity = document.querySelector("#velocity");
    fieldKey = document.querySelector("#key");
    fieldShift = document.querySelector("#shift");
    fieldKeyInterval = document.querySelector("#keyInterval");

    fieldX.value = valX;
    fieldY.value = valY;
    fieldZ.value = valZ;

    fieldR.value = valR;
    fieldG.value = valG;
    fieldB.value = valB;

    fieldVelocity.value = velocity;
    fieldKey.value = key;
    fieldShift.value = shift;

    console.log('page is fully loaded');
});

document.addEventListener("resize", function (e) {
    console.log(`resize h: ${document.body.clientHeight} w: ${document.body.clientWidth}`)
});

document.addEventListener("mousemove", function (e) {
    valX = e.clientX - offsetX;
    valY = e.clientY - offsetY;

    fieldX.value = valX;
    fieldY.value = valY;

    valR = convertPosToColor(valX, 400);
    valG = convertPosToColor(valY, 400);
    valB = convertPosToColor(valZ, 400);

    fieldR.value = valR;
    fieldG.value = valG;
    fieldB.value = valB;

    colormap.style.backgroundColor = `rgb(${valR}, ${valG}, ${valB})`;
    console.log(`${e.clientX}, ${e.clientY}`);
});

let keyFlag = false;
let keyDownDate = Date.now(); // keyDownDate
let keyUpDate = Date.now(); // keyUpDate
let keyPressInterval = 0; // keyPressInterval in milliseconds

let shiftFlag = false;
let shiftDownDate = Date.now(); // shiftDownDate
let shiftUpDate = Date.now(); // shiftUpDate
let shiftInterval = 0; // shiftInterval in milliseconds

document.addEventListener("focusin", function (e) {
    console.log(`focusIn h: ${document.body.clientHeight} w: ${document.body.clientWidth}`)

    keyFlag = false;
    keyPressInterval = 0;

    shiftFlag = false;
    shiftInterval = 0;
});

document.addEventListener("focusout", function (e) {
    console.log(`focusOut h: ${document.body.clientHeight} w: ${document.body.clientWidth}`)

    keyFlag = false;
    keyPressInterval = 0;

    shiftFlag = false;
    shiftInterval = 0;
});

document.addEventListener("keydown", function (e) {
    if (keyFlag == false) {
        keyDownDate = Date.now();
        keyFlag = true;
    };

    if (e.shiftKey) {
        if (shiftFlag == false) {
            shiftDownDate = Date.now();
            shiftFlag = true;
        };

        if (!shift) {
            shift = true;
        };
    };

    if (key == "q" || key == "Q") {
        velocity = -factorIntervals(keyPressInterval);
        lastKey = key;
    } else if (key == "a" || key == "A") {
        velocity = factorIntervals(keyPressInterval);
        lastKey = key;
    };
});

document.addEventListener("keyup", function (e) {
    valZ = isNaN(fieldZ.value) ? 0 : parseInt(fieldZ.value);

    // shiftFlag = false;
    // shiftUpDate = Date.now();
    // shiftInterval = shiftUpDate - shiftDownDate;
    // shift = false;

    keyFlag = false;
    keyUpDate = Date.now();
    keyPressInterval = keyUpDate - keyDownDate;

    let validKeys = new Set(["q", "a", "Q", "A"]);

    if (validKeys.has(e.key)) {
        if (key == "q" || key == "Q") {
            velocity = -factorIntervals(keyPressInterval);
            lastKey = key;
        } else if (key == "a" || key == "A") {
            velocity = factorIntervals(keyPressInterval);
            lastKey = key;
        };

        valZ += velocity;

        if (valZ < 0) {
            valZ = 0;
        } else if (valZ > 400) {
            valZ = 400;
        }
    }

    fieldZ.value = valZ;
    fieldKey.value = key = e.key;
    fieldVelocity.value = velocity;
    fieldKeyInterval.value = keyPressInterval;

    valR = convertPosToColor(valX, 400);
    valG = convertPosToColor(valY, 400);
    valB = convertPosToColor(valZ, 400);

    fieldR.value = valR;
    fieldG.value = valG;
    fieldB.value = valB;

    colormap.style.backgroundColor = `rgb(${valR}, ${valG}, ${valB})`;
    console.log(`${e.key}: d${keyDownDate}, u${keyUpDate}, e${keyPressInterval}`);
});

function convertPosToColor(pos, size) {
    let rgb = (pos / size) * 255;
    return Math.round(rgb);
}

// convert key presses to Z access movement
// q is origin, toward screen
// z is away from screen, toward user
// a typical key press is equivalent to a pixel
// holding down on the key is equivalent to an accelerated movement
//  150,  300,  450,  600,
//  2^0,  2^1,  2^2,  2^3,
//    1,  1*2,  1*4,  1*8,

// every 150 ms is multiplied by a power of 2, from 0 to n
function factorIntervals(interval) {
    return Math.pow(2, Math.round(interval / 150));
}