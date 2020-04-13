"use strict"
evt = "4-5-memory-game.js:begin";
console.log(`${evt}: ${new Date}`);

// PROJECT: Memory Game
//
// Build a memory game in the browser using HTML, CSS, and JavaScript.
// Your goal is to build a card-based memory game.
//
// x Players will be shown a collection of cards, face down,
// x and can click on a card to reveal what’s underneath.
//
// x After clicking on two cards, the game should check to see whether they match.
// x If they do, they will remain facing up.
// x If not, the cards should remain displayed to the player for one second, and then flip back down.
//
// x The goal of the game is to match up all the pairs.
//
// Part One - Reading the tarter code provided.
//
// We have an array of colors which we shuffle and
// then loop over to create 10 <div> elements on the page and
// give them a class of the color we loop over.
//
// We then append the <div> elements to the DOM and
// add an event listener for a “click” for each of the elements.
//
// Part Two - Implementing clicks and matches
//
// x Clicking a card should change the background color to be the color of the class it has.
//
// x Users should only be able to change at most two cards at a time.
//
// x Clicking on two matching cards should be a “match” — those cards should stay face up.
//
// x When clicking two cards that are not a match,
// x they should stay turned over for at least 1 second before they hide the color again.
//
// x You should make sure to use a setTimeout so that you can execute code after one second.
//
// Part Three - Gotchas
//
// x Make sure this works only if you click on two different cards
// x — clicking the same card twice shouldn’t count as a match!)
//
// x Make sure that you can not click too quickly and guess more than two cards at a time.
//
// Further Study
// x Add a button that when clicked will start the game
// x Add a button that when clicked will restart the game once it has ended
// For every guess made, increment a score variable and display the score while the game is played
// Store the lowest-scoring game in local storage, so that players can see a record of the best game played.
// x Allow for any number of cards to appear
// Instead of hard-coding colors, try something different like random colors or even images!


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

    cardUI.init();
    cardList.init();
});

window.addEventListener("click", function (e) {
    const evt = "window.click";
    console.log(`${evt}: ${new Date} start h: ${document.body.clientHeight} w: ${document.body.clientWidth}`);

    e.preventDefault();
    let target = e.target;

    if (target.matches(".card")) {
        cardItem_onClick(target);
    } else if (target.matches("#deal")) {
        controlBoard_onDeal(target);
    } else if (target.matches("#replay")) {
        controlBoard_onReplay(target);
    } else if (target.matches("#undo")) {
        controlBoard_onUndo(target);
    } else if (target.matches("#redo")) {
        controlBoard_onRedo(target);
    } else if (target.matches("#reset")) {
        controlBoard_onReset(target);
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

    controlBoard_onReset();

    let colorsToDeal = cardUI.colorsToDeal.value;

    deckOfCards = shuffle(createDeck(COLORS.slice(0, colorsToDeal), FACES.slice(0, 2)));

    let cardItem = null;

    cardUI.clicksPlayed.value = 0;

    cardUI.startTime = new Date();
    cardUI.timerVar = setInterval(function () {
        let currentDate   = new Date();
        let seconds = Math.round((currentDate.getTime() - cardUI.startTime.getTime()) / 1000);
        if (cardUI.timePlayed.value != seconds) {
            cardUI.timePlayed.value = seconds;
        }
        console.log("timer - controlBoard_onDeal() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    }, 1000);

    let x = 0;
    console.log("controlBoard_onDeal()-----------------------------------------------------------------------------")
    deckOfCards.forEach(e => {
        console.log(`${x++}: ${e.color} ${e.face}`);
        cardItem = cardList.addCard(e.color, e.face);
        cardItem.element = createElement(cardItem);
        insertElement(cardItem.element);
    });

    console.log("you just clicked", target);
}

function controlBoard_onReplay(target) {
    const evt = "controlBoard_onReplay";
    console.log(`${evt}: ${new Date}`);

    console.log("you just clicked", target);
}

function controlBoard_onUndo(target) {
    const evt = "controlBoard_onUndo";
    console.log(`${evt}: ${new Date}`);

    console.log("you just clicked", target);
}

function controlBoard_onRedo(target) {
    const evt = "controlBoard_onRedo";
    console.log(`${evt}: ${new Date}`);

    console.log("you just clicked", target);
}

function controlBoard_onReset(target) {
    const evt = "controlBoard_onReset";
    console.log(`${evt}: ${new Date}`);

    let tries = 0;

    let recursive = function (cardItem) {
        if (tries > 20)
            return;

        if (cardItem == null) {
            return;
        } else {
            recursive(cardItem.nextItem);
            if (cardItem.element) {
                cardList.element.removeChild(cardItem.element);
            }
        }
    }

    recursive(cardList.firstItem);

    cardList.resetCardList();
}

function cardItem_onClick(target) {
    const evt = "cardItem_onClick";
    console.log(`${evt}: ${new Date}`);

    if (!cardUI.canClick || target.classList.contains("matched"))
        return;

    let cardItem = cardList.findItemByKey(target.id);
    let lastSelectedItem = cardList.lastSelectedItem;

    if (lastSelectedItem == cardItem) {
        // ignore
    } else if (lastSelectedItem == null) {
        // open it up
        target.classList.add("selected");
        target.style.backgroundColor = cardItem.color;
        cardItem.selected = true;

        cardUI.clicksPlayed.value++;

        cardList.lastSelectedItem = cardItem;
    } else {
        // a different card was clicked

        cardUI.clicksPlayed.value++;

        // open it up
        target.classList.add("selected");
        target.style.backgroundColor = cardItem.color;
        cardItem.selected = true;

        // if its the same color, then we have a match
        if (cardItem.color == lastSelectedItem.color) {
            // and we keep it open
            cardItem.element.classList.add("matched");
            lastSelectedItem.element.classList.add("matched");
            cardList.selectedItems += 2;

            if (cardList.selectedItems == cardList.countOfItems) {
                // player finished game
                // stop the timer, and record the score
                clearInterval(cardUI.timerVar);
            }
        } else {
            // if its not the same color, then we keep it open for a second

            cardUI.canClick = false;

            setTimeout(function () {
                // after one second, we turn over both cards

                cardItem.element.classList.remove("selected");
                cardItem.element.style.backgroundColor = null;
                cardItem.selected = false;
                cardItem.matched = true;

                lastSelectedItem.element.classList.remove("selected");
                lastSelectedItem.element.style.backgroundColor = null;
                lastSelectedItem.selected = false;
                lastSelectedItem.matched = true;

                cardUI.canClick = true;
            }, 1000);
        }

        cardList.lastSelectedItem = null;
    }

    console.log("you just clicked", target);
}

evt = "4-5-memory-game.js:end";
console.log(`${evt}: ${new Date}`);