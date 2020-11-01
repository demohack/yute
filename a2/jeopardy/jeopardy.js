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
// super list of categories and clues
// filled once when app is first loaded
// TODO: store categories in local cache

let catIDsMap = null;
// map catetory IDs to individual category data
// filled when categories are filled

let catIDs = [];
// list of category ids
// filled when categories are filled

let cluesCellsMap = null;
// map category clues to table cells
// filled when table of categories/clues are created

/** getCategories()
 */
const HTTP_JEOPARDY_API = "http://jservice.io/api";
const CATEGORIES_COUNT_DOWNLOAD_CHUNK = 10;
let getAPIDataCategoriesOffset = 0;

async function getCategories2(count, offset) {
    let response = await axios.get(
        `${HTTP_JEOPARDY_API}/categories`, {
            params: {
                count,
                offset
            }
        });

    return response.data;
};

/** getCategoryClues()
 */

async function getCategoryClues2(category) {
    let response = await axios.get(
        `${HTTP_JEOPARDY_API}/clues`, {
            params: {
                category
            }
        });

    return response.data;
};

// getAPIData() gets categories / clues data in small chunks, run when user clicks on reload button
// does not modify the global categories variable, but returns a new chunk is then handled by the caller
// does modify the global variable getAPIDataCategoriesOffset, to maintain state
async function getAPIData() {
    let categories = await getCategories2(CATEGORIES_COUNT_DOWNLOAD_CHUNK, getAPIDataCategoriesOffset);
    getAPIDataCategoriesOffset += CATEGORIES_COUNT_DOWNLOAD_CHUNK;

    let item = null;

    for (i = 0; i < CATEGORIES_COUNT_DOWNLOAD_CHUNK; i++) {
        item = categories[i];
        item.clues = await getCategoryClues2(item.id);
    }

    return categories;
}


/** getCategoryIds()
 *
 * Returns randomized array of category ids.
 *
 */

const NUM_CATEGORIES = 6;

function getCategoryIds() {
    return getRandomizedList(catIDs, NUM_CATEGORIES);
}

function getRandomizedList(list, count) {
    let randomizedList = [];
    let m = new Map();
    let item = null;

    do {
        item = _.sample(list);

        // ensures all six categories are uniquely random
        if (!m.has(item)) {
            m.set(item, item);
            randomizedList.push(item);
        }

    } while (m.size < count)

    return randomizedList;
}

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

function getCategory(catID) {
    // given a catID, look up the category info
    return catIDsMap.get(catID);
}

/** fillTable()
 *
 *  Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
    cluesCellsMap = new Map();

    let key = "";
    let randomizedCatIDs = getCategoryIds();
    let category = null;
    let randomizedClues = null;

    $jeopardy = $("#jeopardy");
    for (i = 0; i < 6; i++) {
        if (typeof randomizedCatIDs[i] != "undefined") {
            category = catIDsMap.get(randomizedCatIDs[i]);

            $thd = $(`#th-${i} .th-panel`);
            $thd.html(category.title);

            randomizedClues = getRandomizedList(category.clues, 5);

            for (j = 0; j < 5; j++) {
                key = `td-${j}-${i}`;

                cluesCellsMap.set(key, randomizedClues[j]);

                $tdd = $(`#${key} .cover`);
                $tdd.toggleClass("hide", false);

                $tdd = $(`#${key} .answer`);
                $tdd.toggleClass("hide", true);
            }
        }
    }
}

/** handleClick(evt)
 *
 * Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 */

function handleClick(evt) {
    let target = $(evt.target);

    if (target.hasClass("js-content")) {
        target = $(target[0].parentNode)
    };

    let key = "";
    if (target.hasClass("js-panel")) {
        key = `${target.prop("id")}`;

        // get the child div cover
        let cover = $(`#${key} .cover`);
        cover.toggleClass("hide", true);

        if ($("#useModalCheckBox").prop("checked") == "checked") {
            let modalBox = $("#modalBox");
            modalBox.attr("key", key);

            let modalHead = modalBox.find(".modal-title");
            modalHead.html(cluesCellsMap.get(key).category.title);

            let modalBody = modalBox.find(".modal-body");
            modalBody.html(cluesCellsMap.get(key).question);
            modalBox.modal();

            modalBox.on('hidden.bs.modal', function (e) {
                let key = modalBox.attr("key");
                let answer = $(`#${key} .answer`);
                answer.html(cluesCellsMap.get(key).answer);
                answer.toggleClass("hide", false);
            });
        } else {
            let question = $(`#${key} .question`);
            question.html(cluesCellsMap.get(key).question);
            question.toggleClass("hide", false);

            let answer = $(`#${key} .answer`);
            answer.html(cluesCellsMap.get(key).answer);
            answer.toggleClass("hide", true);
    }
    };
    // else ignore clicks on non-playable element
};


/** showLoadingView()
 *
 * Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 *
 * https://getbootstrap.com/docs/4.4/components/spinners/
 *
 */

function showLoadingView() {
    // get the load button
    // set disable click

    let loadBtn = $("#getAPIDataButton");
    loadBtn.attr("disable", "");

    // add spinner and loading text
    const spinnerHtml = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>Loading...';
    loadBtn.html(spinnerHtml);
};

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    // get the load button
    // unset disable click
    let loadBtn = $("#getAPIDataButton");
    loadBtn.removeAttr("disable");

    // restore load button text
    loadBtn.html('Get API Data');
};


/** setupAndStart()
 *
 * Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 */

async function setupAndStart() {
    // get categories
    // for each category
    //     get clues
    // fill html table

    setGlobalCategories(sampleCategories);

    fillTable();
};

// ensures one place of entry to assign global variable for categories and related set of variables
function setGlobalCategories(newCats) {
    categories = newCats;
    catIDsMap = new Map();
    categories.forEach((element) => {
        catIDsMap.set(element.id, element);
    });
    catIDs = categories.map(c => c.id);
}


/** On page load, add event handler for clicking clues */
$(document.body).on('click', handleClick);


/** loadFavicon()
 *
 * load the favicon.ico
 *
 */
function loadFavicon(url) {
    var $head = document.getElementsByTagName('head')[0];
    var $link = document.createElement('link');

    // set the attributes for link element
    $link.rel = "shortcut icon";
    $link.href = url;

    // Append link element to HTML head
    $head.appendChild($link);
};

/** loadCSS()
 *
 * load additional CSS file
 *
 * reference: https://www.geeksforgeeks.org/how-to-load-css-files-using-javascript/
 */
function loadCSS(url) {
    var $head = document.getElementsByTagName('head')[0];
    var $link = document.createElement('link');

    // set the attributes for link element
    $link.rel = 'stylesheet';
    $link.type = 'text/css';
    $link.href = url;

    // Append link element to HTML head
    $head.appendChild($link);
};

/** loadJS()
 *
 * load additional javascript file given url, and exec function runOnLoad
 *
 * reference: https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js
 */
function loadJS(url, runOnLoad) {
    let $body = document.body;
    let $script = document.createElement('script');
    $script.src = url;

    if (runOnLoad) {
        $script.onload = runOnLoad;
        $script.onreadystatechange = runOnLoad;
    }

    $body.appendChild($script);
};

loadFavicon("favicon.ico");
loadJS("sampledata.js");
loadJS("apphtml.js");
loadCSS("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
loadJS("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js");
//loadJS("https://code.jquery.com/qunit/qunit-2.11.3.js");
loadJS('app.js', () => {
    appjs_postload();
});