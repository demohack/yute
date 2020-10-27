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

let categories = []; // master list of categories and clues available

// note:
// Each category stays put in the categories array.
// The category array indexes (ie 0,1,2,3... n-1) are stored in unplayedCategoriesPointers
// which grow and shrink, and gets randomized as needed for the game.
// The categories that are played will have their indexes listed in currentCategoriesPointers,
// and also in usedCategoriesPointers which grows as the list of in play or played categories grows.
let unplayedCategoriesPointers = []; // list of pointers to categories
let currentCategoriesPointers = []; // list of pointers to current 6 categories in game
let usedCategoriesPointers = []; // list of pointers to used categories from previous games

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

async function fillTable() {
    $jeopardy = $("#jeopardy");
    for (i = 0; i < 6; i++) {
        if (typeof categories[i] != "undefined") {
            $thd = $(`#th-${i} .th-panel`);
            $thd.html(categories[i].title);

            for (j = 0; j < 5; j++) {
                $tdd = $(`#td-${j}-${i} .td-panel`);
                $tdd.toggleClass("hide", false);

                $tdd = $(`#td-${j}-${i} .answer`);
                $tdd.toggleClass("hide", true);
                $tdd.html(categories[i].clues[j].answer);

                $tdd = $(`#td-${j}-${i} .question`);
                $tdd.toggleClass("hide", true);
                $tdd.html(categories[i].clues[j].question);
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
    // TODO: trace target
    let target = $(evt.target);

    if (target.hasClass("js-content")) {
        console.log('*** handleClick on js-content: ', $(evt.target));
        target = $(target.parentNode)
    };

    if (target.hasClass("js-panel")) {
        console.log('*** handleClick on js-panel: ', $(evt.target));

        // get the three child divs: cover, question, answer
        let cover = $(`#${target.prop("id")} .cover`);
        let question = $(`#${target.prop("id")} .question`);
        let answer = $(`#${target.prop("id")} .answer`);
        cover.toggleClass("hide", true);
        question.toggleClass("hide", false);
        answer.toggleClass("hide", true);
    } else {
        console.log('*** handleClick on non-playable element: ', $(evt.target));
    };
}

$(document.body).click(handleClick);

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


/** getCategories()
 */
const API_JEOPARDY_CATEGORIES = "http://jservice.io/api/categories";
const API_JEOPARDY_CATEGORIES_COUNT = 1;
const API_JEOPARDY_CATEGORIES_OFFSET = 0;

async function getCategories(count, offset) {
    let response = await axios.get(
        API_JEOPARDY_CATEGORIES, {
            params: {
                count,
                offset
            }
        });

    console.log("getCategories() response=", response);
    return response.data;
}

/** getCategoryClues()
 */
const API_JEOPARDY_CLUES = "http://jservice.io/api/clues";

async function getCategoryClues(category) {
    let response = await axios.get(
        API_JEOPARDY_CLUES, {
            params: {
                category
            }
        });

    console.log("getCategoryClues() response=", response);
    return response.data;
}

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

    categories = sampleCategories;
    // categories = await getCategories(API_JEOPARDY_CATEGORIES_COUNT, API_JEOPARDY_CATEGORIES_OFFSET);

    // for (i = 0; i < API_JEOPARDY_CATEGORIES_COUNT; i++) {
    //     item = categories[i];
    //     item.clues = await getCategoryClues(item.id);
    // }

    fillTable();
}

/** On click of start / restart button, set up game. */

// TODO


/** On page load, add event handler for clicking clues */

// TODO


/** loadCSS()
 *
 * load additional CSS file
 *
 * reference: https://www.geeksforgeeks.org/how-to-load-css-files-using-javascript/
 */
function loadCSS(url) {
    // Get HTML head element
    var $head = document.getElementsByTagName('head')[0];

    // Create new link Element
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
 * load additional javascript file
 *
 * reference: https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js
 */
function loadJS(url, exec) {
    // url is URL of external file
    // implementationCode is the code to be called from the file

    // location is the location to insert the <script> element
    let $body = document.body;

    let $script = document.createElement('script');
    $script.src = url;

    $script.onload = exec;
    $script.onreadystatechange = exec;

    $body.appendChild($script);
};

const bootstrapcss = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
loadCSS(bootstrapcss);

const bootstrapjs = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
loadJS(bootstrapjs, () => {
    console.log("#### load boostrapjs ####");
});

loadJS('app.js', () => {
    console.log("#### load appjs ####");
    appjs_postload();
});




let sampleCategories = [{
    "id": 11531,
    "title": "mixed bag",
    "clues_count": 5,
    "clues": [{
        "id": 87818,
        "answer": "\u003Ci\u003EGuitar Hero\u003C/i\u003E",
        "question": "In 2009 14-year-old Danny Johnson became a legend of rock when he scored 973,954 points in this game",
        "value": 200,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.092Z",
        "updated_at": "2014-02-14T01:53:29.092Z",
        "category_id": 11531,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11531,
            "title": "mixed bag",
            "created_at": "2014-02-14T01:53:28.904Z",
            "updated_at": "2014-02-14T01:53:28.904Z",
            "clues_count": 5
        }
    }, {
        "id": 87824,
        "answer": "half full",
        "question": "(Sarah of the Clue Crew holds a proverbial glass of, well, colored liquid of some sort.)  As an optimist, it's how I see this glass",
        "value": 400,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.304Z",
        "updated_at": "2014-02-14T01:53:29.304Z",
        "category_id": 11531,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11531,
            "title": "mixed bag",
            "created_at": "2014-02-14T01:53:28.904Z",
            "updated_at": "2014-02-14T01:53:28.904Z",
            "clues_count": 5
        }
    }, {
        "id": 87830,
        "answer": "a sports utility vehicle",
        "question": "Even if your parents don't drive one, you should know that SUV stands for this type of vehicle",
        "value": 600,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.517Z",
        "updated_at": "2014-02-14T01:53:29.517Z",
        "category_id": 11531,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11531,
            "title": "mixed bag",
            "created_at": "2014-02-14T01:53:28.904Z",
            "updated_at": "2014-02-14T01:53:28.904Z",
            "clues_count": 5
        }
    }, {
        "id": 87836,
        "answer": "Tombstone",
        "question": "In 1881 a famous gunfight took place at the O.K. Corral in this Arizona city with a \"grave\" name",
        "value": 800,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.775Z",
        "updated_at": "2014-02-14T01:53:29.775Z",
        "category_id": 11531,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11531,
            "title": "mixed bag",
            "created_at": "2014-02-14T01:53:28.904Z",
            "updated_at": "2014-02-14T01:53:28.904Z",
            "clues_count": 5
        }
    }, {
        "id": 87842,
        "answer": "Cinco de Mayo",
        "question": "This holiday that celebrates a Mexican victory in 1862 may be more widely celebrated in the U.S. than in Mexico itself",
        "value": 1000,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.992Z",
        "updated_at": "2014-02-14T01:53:29.992Z",
        "category_id": 11531,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11531,
            "title": "mixed bag",
            "created_at": "2014-02-14T01:53:28.904Z",
            "updated_at": "2014-02-14T01:53:28.904Z",
            "clues_count": 5
        }
    }]
}, {
    "id": 11532,
    "title": "let's \"ch\"at",
    "clues_count": 5,
    "clues": [{
        "id": 87819,
        "answer": "chores",
        "question": "They're routine tasks done around the house, \u0026 before you go out to play, you'd better do yours",
        "value": 200,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.129Z",
        "updated_at": "2014-02-14T01:53:29.129Z",
        "category_id": 11532,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11532,
            "title": "let's \"ch\"at",
            "created_at": "2014-02-14T01:53:28.916Z",
            "updated_at": "2014-02-14T01:53:28.916Z",
            "clues_count": 5
        }
    }, {
        "id": 87825,
        "answer": "charcoal",
        "question": "It's the form of carbon your dad probably uses when he fires up the barbecue",
        "value": 400,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.339Z",
        "updated_at": "2014-02-14T01:53:29.339Z",
        "category_id": 11532,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11532,
            "title": "let's \"ch\"at",
            "created_at": "2014-02-14T01:53:28.916Z",
            "updated_at": "2014-02-14T01:53:28.916Z",
            "clues_count": 5
        }
    }, {
        "id": 87831,
        "answer": "churn",
        "question": "To make butter, you need one of these special containers in which to stir the milk or cream",
        "value": 600,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.554Z",
        "updated_at": "2014-02-14T01:53:29.554Z",
        "category_id": 11532,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11532,
            "title": "let's \"ch\"at",
            "created_at": "2014-02-14T01:53:28.916Z",
            "updated_at": "2014-02-14T01:53:28.916Z",
            "clues_count": 5
        }
    }, {
        "id": 87837,
        "answer": "a chisel",
        "question": "The basic tools for carving stone are a hammer \u0026 this long-bladed implement seen here",
        "value": 800,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:29.811Z",
        "updated_at": "2014-02-14T01:53:29.811Z",
        "category_id": 11532,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11532,
            "title": "let's \"ch\"at",
            "created_at": "2014-02-14T01:53:28.916Z",
            "updated_at": "2014-02-14T01:53:28.916Z",
            "clues_count": 5
        }
    }, {
        "id": 87843,
        "answer": "Chile",
        "question": "One of the driest places on Earth, the Atacama Desert lies mainly in this South American country",
        "value": 1000,
        "airdate": "2009-07-16T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:30.027Z",
        "updated_at": "2014-02-14T01:53:30.027Z",
        "category_id": 11532,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11532,
            "title": "let's \"ch\"at",
            "created_at": "2014-02-14T01:53:28.916Z",
            "updated_at": "2014-02-14T01:53:28.916Z",
            "clues_count": 5
        }
    }]
}, {
    "id": 5412,
    "title": "prehistoric times",
    "clues_count": 10,
    "clues": [{
        "id": 43837,
        "answer": "Writing",
        "question": "Historians generally agree that the development of this separates prehistory from history",
        "value": 100,
        "airdate": "2001-03-14T12:00:00.000Z",
        "created_at": "2014-02-11T23:12:14.011Z",
        "updated_at": "2014-02-11T23:12:14.011Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 43843,
        "answer": "Horse",
        "question": "Eohippus was not an early hippopotamus, but the first one of these animals",
        "value": 200,
        "airdate": "2001-03-14T12:00:00.000Z",
        "created_at": "2014-02-11T23:12:14.164Z",
        "updated_at": "2014-02-11T23:12:14.164Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 43849,
        "answer": "Glaciers",
        "question": "In the Pleistocene epoch, these gouged at gorges in river valleys; when they melted, rocks \u0026 soil were left",
        "value": 300,
        "airdate": "2001-03-14T12:00:00.000Z",
        "created_at": "2014-02-11T23:12:14.291Z",
        "updated_at": "2014-02-11T23:12:14.291Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 43855,
        "answer": "Neanderthal",
        "question": "This \"man\" found in a German valley in 1856 was the first fossil recognized as a prehistoric human",
        "value": 400,
        "airdate": "2001-03-14T12:00:00.000Z",
        "created_at": "2014-02-11T23:12:14.416Z",
        "updated_at": "2014-02-11T23:12:14.416Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 43861,
        "answer": "Carboniferous",
        "question": "This coal-forming period consisted of 2 portions:  Pennsylvanian \u0026 Mississippian",
        "value": 500,
        "airdate": "2001-03-14T12:00:00.000Z",
        "created_at": "2014-02-11T23:12:14.544Z",
        "updated_at": "2014-02-11T23:12:14.544Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 87634,
        "answer": "a skull",
        "question": "Homo sapiens had a higher \u0026 more rounded one of these than did Homo erectus",
        "value": 200,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.355Z",
        "updated_at": "2014-02-14T01:53:18.355Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 87640,
        "answer": "a mastodon",
        "question": "(Kelly of the Clue Crew reports from the University of Wisconsin-Madison Geology Museum.) The University of Wisconsin-Madison Geology Museum has a skeleton of this animal that humans may have driven extinct; the distinctive teeth that provided its name were once thought to belong to a carnivore",
        "value": 400,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.611Z",
        "updated_at": "2014-02-14T01:53:18.611Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 87646,
        "answer": "written records (or writing)",
        "question": "This development divides prehistoric times from historic times",
        "value": null,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.902Z",
        "updated_at": "2014-02-14T01:53:18.902Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 87652,
        "answer": "the femur",
        "question": "(Jimmy of the Clue Crew reports from the University of Wisconsin-Madison Geology Museum.) Apatosaurus weighed up to 30 tons, so just this bone of the upper leg is 5 feet long \u0026 weighs 300 pounds",
        "value": 800,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.142Z",
        "updated_at": "2014-02-14T01:53:19.142Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }, {
        "id": 87658,
        "answer": "bronze",
        "question": "One of the earliest known uses of this metal alloy was in Sumer in Mesopotamia around 3500 B.C.",
        "value": 1000,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.374Z",
        "updated_at": "2014-02-14T01:53:19.374Z",
        "category_id": 5412,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 5412,
            "title": "prehistoric times",
            "created_at": "2014-02-11T23:12:13.915Z",
            "updated_at": "2014-02-11T23:12:13.915Z",
            "clues_count": 10
        }
    }]
}, {
    "id": 11496,
    "title": "acting families",
    "clues_count": 5,
    "clues": [{
        "id": 87635,
        "answer": "O\\'Neal",
        "question": "Ryan \u0026Tatum",
        "value": 200,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.417Z",
        "updated_at": "2014-02-14T01:53:18.417Z",
        "category_id": 11496,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11496,
            "title": "acting families",
            "created_at": "2014-02-14T01:53:18.198Z",
            "updated_at": "2014-02-14T01:53:18.198Z",
            "clues_count": 5
        }
    }, {
        "id": 87641,
        "answer": "Affleck",
        "question": "BrothersBen \u0026 Casey",
        "value": 400,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.650Z",
        "updated_at": "2014-02-14T01:53:18.650Z",
        "category_id": 11496,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11496,
            "title": "acting families",
            "created_at": "2014-02-14T01:53:18.198Z",
            "updated_at": "2014-02-14T01:53:18.198Z",
            "clues_count": 5
        }
    }, {
        "id": 87647,
        "answer": "Prinze",
        "question": "Dad \u0026 sonFreddie",
        "value": 600,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.945Z",
        "updated_at": "2014-02-14T01:53:18.945Z",
        "category_id": 11496,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11496,
            "title": "acting families",
            "created_at": "2014-02-14T01:53:18.198Z",
            "updated_at": "2014-02-14T01:53:18.198Z",
            "clues_count": 5
        }
    }, {
        "id": 87653,
        "answer": "Zimbalist",
        "question": "Efrem \u0026Stephanie",
        "value": 800,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.179Z",
        "updated_at": "2014-02-14T01:53:19.179Z",
        "category_id": 11496,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11496,
            "title": "acting families",
            "created_at": "2014-02-14T01:53:18.198Z",
            "updated_at": "2014-02-14T01:53:18.198Z",
            "clues_count": 5
        }
    }, {
        "id": 87659,
        "answer": "Booth",
        "question": "Junius \u0026 his boys Edwin \u0026 John",
        "value": 1000,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.410Z",
        "updated_at": "2014-02-14T01:53:19.410Z",
        "category_id": 11496,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11496,
            "title": "acting families",
            "created_at": "2014-02-14T01:53:18.198Z",
            "updated_at": "2014-02-14T01:53:18.198Z",
            "clues_count": 5
        }
    }]
}, {
    "id": 11498,
    "title": "world city walk",
    "clues_count": 5,
    "clues": [{
        "id": 87637,
        "answer": "Vatican City",
        "question": "It's the city (also a country) that's home to St. Peter's Basilica",
        "value": 200,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.494Z",
        "updated_at": "2014-02-14T01:53:18.494Z",
        "category_id": 11498,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11498,
            "title": "world city walk",
            "created_at": "2014-02-14T01:53:18.236Z",
            "updated_at": "2014-02-14T01:53:18.236Z",
            "clues_count": 5
        }
    }, {
        "id": 87643,
        "answer": "Rabat",
        "question": "In the 17th century the Corsairs controlled this current capital of Morocco",
        "value": 400,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.778Z",
        "updated_at": "2014-02-14T01:53:18.778Z",
        "category_id": 11498,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11498,
            "title": "world city walk",
            "created_at": "2014-02-14T01:53:18.236Z",
            "updated_at": "2014-02-14T01:53:18.236Z",
            "clues_count": 5
        }
    }, {
        "id": 87649,
        "answer": "Sapporo",
        "question": "The first Japanese city to host the Winter Olympics, it's also famous for its beer \u0026 its Snow Festival",
        "value": 600,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.023Z",
        "updated_at": "2014-02-14T01:53:19.023Z",
        "category_id": 11498,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11498,
            "title": "world city walk",
            "created_at": "2014-02-14T01:53:18.236Z",
            "updated_at": "2014-02-14T01:53:18.236Z",
            "clues_count": 5
        }
    }, {
        "id": 87655,
        "answer": "Stalingrad",
        "question": "In 1942 Field Marshal Erich Von Manstein led a failed effort to assist surrounded German forces in this Soviet city",
        "value": 800,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.251Z",
        "updated_at": "2014-02-14T01:53:19.251Z",
        "category_id": 11498,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11498,
            "title": "world city walk",
            "created_at": "2014-02-14T01:53:18.236Z",
            "updated_at": "2014-02-14T01:53:18.236Z",
            "clues_count": 5
        }
    }, {
        "id": 87661,
        "answer": "Beijing",
        "question": "Found in the Dong Cheng district, this capital city's main railway station connects to Harbin \u0026 Qingdao",
        "value": 1000,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.489Z",
        "updated_at": "2014-02-14T01:53:19.489Z",
        "category_id": 11498,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11498,
            "title": "world city walk",
            "created_at": "2014-02-14T01:53:18.236Z",
            "updated_at": "2014-02-14T01:53:18.236Z",
            "clues_count": 5
        }
    }]
}, {
    "id": 11499,
    "title": "tough-pourri",
    "clues_count": 5,
    "clues": [{
        "id": 87638,
        "answer": "Hogwarts",
        "question": "Students are allowed to bring a toad, a cat or an owl to this fictional boarding school",
        "value": 200,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.533Z",
        "updated_at": "2014-02-14T01:53:18.533Z",
        "category_id": 11499,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11499,
            "title": "tough-pourri",
            "created_at": "2014-02-14T01:53:18.250Z",
            "updated_at": "2014-02-14T01:53:18.250Z",
            "clues_count": 5
        }
    }, {
        "id": 87644,
        "answer": "the Rose Bowl",
        "question": "This last Ivy-League school to win this college football bowl game was Columbia University in 1934",
        "value": 400,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:18.821Z",
        "updated_at": "2014-02-14T01:53:18.821Z",
        "category_id": 11499,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11499,
            "title": "tough-pourri",
            "created_at": "2014-02-14T01:53:18.250Z",
            "updated_at": "2014-02-14T01:53:18.250Z",
            "clues_count": 5
        }
    }, {
        "id": 87650,
        "answer": "Senator Joe McCarthy",
        "question": "When \"Face The Nation\" premiered in 1954, this first guest was grilled over comments he had been making about the Army",
        "value": 600,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.062Z",
        "updated_at": "2014-02-14T01:53:19.062Z",
        "category_id": 11499,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11499,
            "title": "tough-pourri",
            "created_at": "2014-02-14T01:53:18.250Z",
            "updated_at": "2014-02-14T01:53:18.250Z",
            "clues_count": 5
        }
    }, {
        "id": 87656,
        "answer": "Boy Scouts",
        "question": "In 1907, the first 4 groups in this org. started in England were the Bulls, the Wolves, the Curlews \u0026 the Ravens",
        "value": 800,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.288Z",
        "updated_at": "2014-02-14T01:53:19.288Z",
        "category_id": 11499,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11499,
            "title": "tough-pourri",
            "created_at": "2014-02-14T01:53:18.250Z",
            "updated_at": "2014-02-14T01:53:18.250Z",
            "clues_count": 5
        }
    }, {
        "id": 87662,
        "answer": "April 1st",
        "question": "On this date in 1999, England's Guardian newspaper announced a coup in the nation of San Seriffe",
        "value": 1000,
        "airdate": "2009-07-24T12:00:00.000Z",
        "created_at": "2014-02-14T01:53:19.528Z",
        "updated_at": "2014-02-14T01:53:19.528Z",
        "category_id": 11499,
        "game_id": null,
        "invalid_count": null,
        "category": {
            "id": 11499,
            "title": "tough-pourri",
            "created_at": "2014-02-14T01:53:18.250Z",
            "updated_at": "2014-02-14T01:53:18.250Z",
            "clues_count": 5
        }
    }]
}]