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

// This is the true start up of the whole shebang.
$(document).ready(function () {
    let $body = $(document.body);
    console.log("#### appjs document.ready called ####");

    // I really don't like building out HTML code, it's slow and cumbersome.
    // Also wanted to play with dynamically loading HTML from other files, but didn't quite get further into it.
    // Was running into problem from Live Server not wanting to serve up html files without full html head code.
    let parsedHTML = $.parseHTML($html);

    // Append the parsed HTML
    $body.prepend(parsedHTML);

    // Get the show going!
    setupAndStart();
});
