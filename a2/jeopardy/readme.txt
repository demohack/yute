Started Saturday October 24, 2020 at 3:30 pm

2020-10-24 15:00-16:00

setup project environment, download files, read requirements

submit only one time
on google drive
*** need to be 100% confident submission is complete
complete independently, without consulting with TA, mentor, other students
spark conversatoin with mentor on strengths and areas for growth
help understand what to focus on in job search
mention to mentor how long assessment took
time: 10 to 15 hrs

assessment 2: Jeopardy!
combines skills of section 1 to create an interactive game
https://www.springboard.com/workshops/software-engineering-career-track/learn#/curriculum/16971

Make a functional interactive game of Jeopardy!
// and learn to spell jeopardy right

2020-10-24 16:15-17:00

goals:
    1. read the provided jeopardy.js
    2. top level design before coding
    3. pseudocode with comments on key data structures, function calls, inptus, outputs, expected outcomes

2020-10-24 16:15-16:26 read the provided jeopardy.js with key data structure, and functions

2020-10-24 14:43-17:06

overall visual structure
page areas:
    top
        game status
            game, player, score
        restart button
        user input field
        countdown timer for each turn
    main
        table
            table header with six columns
            table rows x5
    footer


on page load,
    create each of the page areas
        createGameStatus
        createTable

game mechanics
    randomPlayerTurn - randomly select 1 of 3 players to answer
    compareAnswer - compare input field to answer
    updatePlayerScore
    countDownTimer - starts when user clicks on a clue

jeopardy API wrapper
    getCategoryIds() - get array of category IDs
    getCategory(catId) - get category record given a category IDs
    fillTable() - get data and fill the jeopardy game table
    handleClick(evt) - handle click event on clue
    showLoadingView() - show loading spinner
    hideLoadingView() - hide loading spinner
    setupAndStart() - on click of restart button, restart the game

2020-10-24 18:05-18:25 implemented an additional js file loader, to get around not being able to edit the html file

2020-10-24 18:30-19:36 tested jquery code to append HTML elements

2020-10-24 23:17-

2020-10-27 07:28-

https://stackoverflow.com/questions/5874652/prop-vs-attr

2020-10-28

2020-10-29

2020-10-30

2020-10-31 05:51-05:56 brainstorm list of goals / todos
Goals:
    - fix the non-responsive UI issue after clicking on button to load data from server
    - implement the spin wheel feature, and also freeze UI elements during data download (this might solve the issue)
    - implement the ability to download data in smaller chunks of 10 or 20 categories at a time
    - implement storing category/clues data in localstorage
    - store game state?
    - game menu?
    - cleanup code

2020-10-31 09:21-
    - resolved the non-responsive UI issue
    - implemented the spin wheel using bootstrap
    - implemented downloading data in 10 category chunks

2020-10-31-1436-
    - resolved layout issue, forced fix sized table, row heights, column widths
    - implement required UI behavior, not using modal
    - use checkbox to switch to modal or on table