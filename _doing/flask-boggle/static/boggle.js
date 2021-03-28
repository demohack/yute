const API_ENDPOINT = "/lookup";

//
// entry point
//

$(document).ready(function () {
    startTimer(seconds = 5, () => {
        updateEndGame();
    });

    updateGame(0);
    updateStatusMsg(`Good luck!`);
    console.log("document is ready");
});

//
// game state / keeping score
//

let globalScore = 0;
let scoredWords = new Set();
let submits = 0;

//
// user interactions
//

$('#submit').on('click', function (e) {
    e.preventDefault()
    let word = $('#word').val();

    submitWord(word, data => {
        if (data.result == "ok") {
            if (!scoredWords.has(word)) {
                scoredWords.add(word);

                updateGame(globalScore + word.length);
                updateStatusMsg(`fantastic! ${word} is ${data.result}`);
            }
            //        } else if (result == "not-on-board") {
            //            updateGStatusMsg(`err: ${word} is ${result}`);
        } else { // result == "not-word"
            updateStatusMsg(`doh! ${word} is ${data.result}`);
        }

        logSubmittedWord(word, data.result);
    });
})

//
// status updates
//

function updateEndGame() {
    updateStatusMsg("game over");
    submitScore(globalScore, (data) => {
        console.log("updateEndGame: result = " + data.result)
    });
}

function updateGame(score) {
    globalScore = score;
    $("#score").text(`score total: ${globalScore}`);
}

function updateStatusMsg(msg) {
    $("#status-msg").text(msg);
}

function logSubmittedWord(word, result) {
    submits += 1
    $("#submitted-words").prepend(`<li>${submits} : ${word} - ${result}</li>`)
}

//
// I/O
//

async function submitScore(score, f) {

    let response = await axios.get(
        "/score", {
            params: {
                score: score,
            }
        });

    f(response.data);

    console.log("submit score response: ", response.data);
}

async function submitWord(word, f) {

    let response = await axios.get(
        "/lookup", {
            params: {
                word: word,
            }
        });

    f(response.data);

    console.log("submit word response: ", response.data.result);
}

//
// helper functions
//

function startTimer(seconds, f = null) {
    this.timer = null;
    this.seconds = seconds;

    function intervalTicker() {
        if (this.timer == null) {
            return;
        }

        $("#timer").text(`seconds remaining: ${this.seconds}`);
        this.seconds = this.seconds - 1;

        if (this.seconds < 0) {
            clearInterval(this.timer);
            this.timer = null;
            if (f) {
                f();
            }
        }
    }

    this.timer = setInterval(intervalTicker, 1000);
}