function appjs_postload() {
    console.log("#### appjs_postload called ####");


    // overall visual structure
    // page areas:
    //     top
    //         game status
    //             game, player, score
    //         restart button
    //         user input field
    //         countdown timer for each turn
    //     main
    //         table
    //             table header with six columns
    //             table rows x5
    //     footer
    //
    // on page load,
    //     create each of the page areas
    //         createGameStatus
    //         createTable
}

$(document).ready(function () {
    console.log("#### appjs document.ready called ####");

    let parsedHTML = $.parseHTML($html);

    // Append the parsed HTML
    $body.prepend(parsedHTML);

    // inspectElements(parsedHTML);
    setupAndStart();
});

const $body = $(document.body);
/* <div id="top-section">
<div class="jumbotron">
      <h1>Jeopardy</h1>
      <p>Game of Trivia</p>
</div>
<div class="jumbotron">
      <h2 id="player1score">0</h2>
      <span id="player1">player 1</span>
</div>
<div class="jumbotron">
      <h2 id="player2score">0</h2>
      <span id="player2">player 2</span>
</div>
<div class="jumbotron">
      <h2 id="player3score">0</h2>
      <span id="player3">player 3</span>
</div>
<button type="button" class="btn btn-primary">Restart Game</button>

<div class="form-group">
      <label for="user-input">user input:</label>
      <input type="text" class="form-control" id="user-input">
</div>
</div> */

const $html = `
<div id="mid-section">
    <table id="jeopardy" class="table table-bordered table-dark">
        <thead>
            <tr>
                <th id="th-0" class="js-panel bg-primary"><div class="th-panel"></div></th>
                <th id="th-1" class="js-panel bg-primary"><div class="th-panel"></div></th>
                <th id="th-2" class="js-panel bg-primary"><div class="th-panel"></div></th>
                <th id="th-3" class="js-panel bg-primary"><div class="th-panel"></div></th>
                <th id="th-4" class="js-panel bg-primary"><div class="th-panel"></div></th>
                <th id="th-5" class="js-panel bg-primary"><div class="th-panel"></div></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td id="td-0-0" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-0-1" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-0-2" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-0-3" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-0-4" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-0-5" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
            </tr>
            <tr>
                <td id="td-1-0" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-1-1" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-1-2" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-1-3" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-1-4" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-1-5" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
            </tr>
            <tr>
                <td id="td-2-0" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-2-1" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-2-2" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-2-3" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-2-4" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-2-5" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
            </tr>
            <tr>
                <td id="td-3-0" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-3-1" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-3-2" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-3-3" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-3-4" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-3-5" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
            </tr>
            <tr>
                <td id="td-4-0" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-4-1" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-4-2" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-4-3" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-4-4" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
                <td id="td-4-5" class="js-panel bg-primary"><div class="js-content cover">?</div><div class="js-content question"></div><div class="js-content answer"></div></td>
            </tr>
        </tbody>
    </table>
</div>
<div id="bottom-section">
</div>
`;

function inspectElements(parsedHTML) {
    let nodeNames = [];

    // Gather the parsed HTML's node names
    $.each(parsedHTML, function (i, el) {
        nodeNames[i] = "<li>" + el.nodeName + "</li>";
    });

    // Insert the node names
    $body.append("<h3>Node Names:</h3>");
    $("<ol></ol>")
        .append(nodeNames.join(""))
        .appendTo($body);
}