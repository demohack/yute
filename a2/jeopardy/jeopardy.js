// categories
//
// The main data structure for the app; it looks like this:
//
//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];


/** getCategoryIds()
 *
 * Returns array of category ids, Get NUM_CATEGORIES random category from API.
 *
 */

function getCategoryIds() {}

/** getCategory(catId)
 *
 *  Return object with data about a category:
 *  e.g. { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {}

/** fillTable()
 *
 *  Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {}

/** handleClick(evt)
 *
 * Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 */

function handleClick(evt) {}

/** showLoadingView()
 *
 * Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 *
 * https://getbootstrap.com/docs/4.4/components/spinners/
 *
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {}

/** setupAndStart()
 *
 * Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 */

async function setupAndStart() {}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

/** loadJS()
 *
 * load additional javascript file
 *
 * reference: https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js
 */

//
function loadJS(url, implementationCode) {
    // url is URL of external file
    // implementationCode is the code to be called from the file

    // location is the location to insert the <script> element
    let location = document.body;

    let scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
};

const boostrapjs = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
loadJS(boostrapjs, () => {
    console.log("#### load boostrapjs ####");
});

loadJS('app.js', () => {
    console.log("#### load appjs ####");
    appjs_postload();
});
