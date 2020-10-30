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

    // Get the show going!
    setupAndStart();
});

const $body = $(document.body);

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

