"use strict"
evt = "script.js:begin";
console.log(`${evt}: ${new Date}`);

const gameContainer = document.getElementById("game");

const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];

const FACES = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(input) {
    let array = input.slice();
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    let x = 0;
    console.log("shuffle()-----------------------------------------------------------------------------")
    array.forEach(e => {
        console.log(`${x++}: ${e.color} ${e.face}`);
    });

    return array;
}

function createDeck(colors, faces) {
    let deck = [];
    let k = 0;
    for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < 2; j++) {
            deck[k++] = {
                color: colors[i],
                face: faces[j]
            };
        }
    }

    let x = 0;
    console.log("createDeck()-----------------------------------------------------------------------------")
    deck.forEach(e => {
        console.log(`${x++}: ${e.color} ${e.face}`);
    });

    return deck;
}

evt = "script.js:end";
console.log(`${evt}: ${new Date}`);