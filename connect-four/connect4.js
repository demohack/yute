"use strict"
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

let WIDTH = 6;
let HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = undefined; // array of rows, each row is array of cells  (board[y][x])
let htmlBoard = undefined;
let columnTop = undefined;

let gameWon = false;
let gameTied = false;
let clickInProgress = false;

let blueScore = 0;
let redScore = 0;

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
    // set "board" to empty HEIGHT x WIDTH matrix array

    board = [];
    board.length = HEIGHT;

    for (let i = 0; i < HEIGHT; i++) {
        let cells = [];
        cells.length = WIDTH;

        board[i] = cells;
    }

    gameWon = false;
    gameTied = false;
}

function deleteHtmlBoard() {
    // get "htmlBoard" variable from the item in HTML w/ID of "board"
    htmlBoard = document.querySelector("#board");
    htmlBoard.innerHTML = "";
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
    // get "htmlBoard" variable from the item in HTML w/ID of "board"
    htmlBoard = document.querySelector("#board");

    // create the table header row "column top"
    let top = document.createElement("tr");
    top.id = "column-top";
    top.addEventListener("click", handleClick);

    for (let x = 0; x < WIDTH; x++) {
        let td = document.createElement("td");
        td.id = `h-${x}`;

        let div = document.createElement("div");
        div.classList.add("top-piece");
        td.append(div);

        top.append(td);
    }

    htmlBoard.append(top);
    columnTop = top;

    // create the HTML game board for given HEIGHT and WIDTH
    for (let y = 0; y < HEIGHT; y++) {
        const row = document.createElement("tr");
        for (let x = 0; x < WIDTH; x++) {
            const td = document.createElement("td");
            td.id = `d-${HEIGHT - y - 1}-${x}`;

            let div = document.createElement("div");
            div.classList.add("piece");

            td.append(div);
            row.append(td);
        }
        htmlBoard.append(row);
    }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
    for (let y = 0; y < HEIGHT; y++) {
        if (board[y][x] == undefined) {
            return y;
        }
    }

    return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x, player, callback) {
    // add line to update in-memory board
    board[y][x] = player;

    let cn = (player == 1) ? "player-1-piece" : "player-2-piece";

    // get top div
    let topDiv = htmlBoard.querySelector(`#h-${x} div`);

    // animate drop piece
    topDiv.classList.add("drop-piece");
    topDiv.style.backgroundColor = (player == 1) ? "blue" : "red";
    topDiv.style.top = `${66 * (HEIGHT - y)}px`;

    // wait 2 seconds, and then...
    setTimeout(function () {
        // reset top div
        topDiv.classList.remove("drop-piece");
        topDiv.style.backgroundColor = "";

        // make a div and insert into correct table cell
        let div = htmlBoard.querySelector(`#d-${y}-${x} div`);
        div.classList.add(cn);

        callback();
    }, 2000);
}

function wait(ms) {
    var d = new Date();
    var d2 = null;
    do {
        d2 = new Date();
    }
    while (d2 - d < ms);
}

/** endGame: announce game end */

function endGame(msg) {
    updateResult(msg);
}

function updateResult(msg) {
    let htmlResult = document.querySelector("#result");
    htmlResult.innerHTML = msg;
}

function updateScore(player) {
    if (player == 1) {
        updateBlueScore(blueScore + 1);
    } else {
        updateRedScore(redScore + 1);
    }
}

function updateBlueScore(score) {
    blueScore = score;
    let htmlBlueScore = document.querySelector("#blueScore");
    htmlBlueScore.innerHTML = `blue: ${blueScore}`;
}

function updateRedScore(score) {
    redScore = score;
    let htmlRedScore = document.querySelector("#redScore");
    htmlRedScore.innerHTML = `red: ${redScore}`;
}

/** switchPlayer: switch players */

function switchPlayer(newPlayer) {
    if (newPlayer == undefined) {
        newPlayer = currPlayer == 1 ? 2 : 1;
    }

    // switch currPlayer 1 <-> 2
    currPlayer = newPlayer;

    if (newPlayer == 1) {
        columnTop.classList.remove("player-2");
        columnTop.classList.add("player-1");
        updateResult("Blue to play:")
    } else {
        columnTop.classList.remove("player-1");
        columnTop.classList.add("player-2");
        updateResult("Red to play:")
    }
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
    // exit if game has been won or is tied
    if (gameWon || gameTied || clickInProgress) {
        return;
    }
    clickInProgress = true;

    // get x from ID of clicked cell
    let id = evt.target.parentElement.id;
    let idx = id.indexOf("-") + 1;
    let x = +id.substring(idx, id.length); // single + operator converts string to number

    // get next spot in column (if none, ignore click)
    let y = findSpotForCol(x);
    if (y === null) {
        return;
    }

    placeInTable(y, x, currPlayer, function () {
        clickInProgress = false;
        switchPlayer();

        if (checkForWin(currPlayer)) {
            gameWon = true;
            updateScore(currPlayer);
            return endGame(`Player ${currPlayer} won!`);
        }

        if (checkForTie()) {
            gameTied = true;
            return endGame(`Game tied!`);
        }
    });
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForTie() {
    let x = undefined;
    let y = HEIGHT - 1;

    for (x = 0; x < WIDTH; x++) {
        if (board[y][x] == undefined) {
            return false;
        }
    }

    return true;
}

function checkForWin(player) {
    function _win(cells) {
        // Check four cells to see if they're all color of current player
        //  - cells: list of four (y, x) cells
        //  - returns true if all are legal coordinates & all match currPlayer

        return cells.every(
            ([y, x]) =>
            y >= 0 &&
            y < HEIGHT &&
            x >= 0 &&
            x < WIDTH &&
            board[y][x] === player
        );
    }

    // modified code to be a little more efficient:
    // no need to iterate to the end of height or width
    // because we're also creating temporary arrays to look ahead
    // to determine win conditions
    for (let y = 0; y < HEIGHT; y++) {
        for (let x = 0; x < WIDTH; x++) {
            // create a temporary array from horizontal cells
            let horiz = [
                [y, x],
                [y, x + 1],
                [y, x + 2],
                [y, x + 3]
            ];

            // create a temporary array from vertical cells
            let vert = [
                [y, x],
                [y + 1, x],
                [y + 2, x],
                [y + 3, x]
            ];

            // create a temporary array from diagonal right cells
            let diagDR = [
                [y, x],
                [y + 1, x + 1],
                [y + 2, x + 2],
                [y + 3, x + 3]
            ];

            // create a temporary array from diagonal left cells
            let diagDL = [
                [y, x],
                [y + 1, x - 1],
                [y + 2, x - 2],
                [y + 3, x - 3]
            ];

            // check if any of the temporary arrays meet the win condition
            if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
                return true;
            }
        }
    }
}

function restartButtonClick() {
    makeBoard();
    deleteHtmlBoard();
    makeHtmlBoard();
    switchPlayer();
}

function setRestartButton() {
    // get "htmlBoard" variable from the item in HTML w/ID of "board"
    let button = document.querySelector("#restartButton");
    button.addEventListener("click", restartButtonClick);
}

setRestartButton();
makeBoard();
makeHtmlBoard();
switchPlayer(1);
updateBlueScore(0);
updateRedScore(0);