My coding style
- Make code self-documenting, to minimize comments
- use strict to force variable declarations
- 

# weaknesses
- variable names: 
    = player 1 not intuitive connection to player blue
    = likewise player 2
    = blueScore should have been named playerOneScore
    = redScore should have been named playerTwoScore

- variable assignmenets undefined vs null


# actions
- removed wait function, with its var declarations
- renamed blueScore to scorePlayer1, redScore -> scorePlayer2
- used const declaration for WIDTH and HEIGHT
