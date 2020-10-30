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
<div class="container">
<h2>Lets Play Jeopardy!</h2>
<!-- Trigger the modal with a button -->
<button type="button" id="restartButton" class="btn btn-info btn-lg">Restart Game</button>

<!-- Modal -->
<div class="modal fade" id="myModal" role="dialog">
      <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                  <div class="modal-header">
                        <h4 class="modal-title">Modal Header</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div class="modal-body">
                        <p>Some text in the modal.</p>
                  </div>
                  <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
            </div>
      </div>
</div>
</div>
<div id="mid-section">
<table id="jeopardy" class="table table-bordered table-dark">
      <thead>
            <tr>
                  <th id="th-0" class="js-panel bg-primary">
                        <div class="th-panel"></div>
                  </th>
                  <th id="th-1" class="js-panel bg-primary">
                        <div class="th-panel"></div>
                  </th>
                  <th id="th-2" class="js-panel bg-primary">
                        <div class="th-panel"></div>
                  </th>
                  <th id="th-3" class="js-panel bg-primary">
                        <div class="th-panel"></div>
                  </th>
                  <th id="th-4" class="js-panel bg-primary">
                        <div class="th-panel"></div>
                  </th>
                  <th id="th-5" class="js-panel bg-primary">
                        <div class="th-panel"></div>
                  </th>
            </tr>
      </thead>
      <tbody>
            <tr>
                  <td id="td-0-0" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-0-1" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-0-2" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-0-3" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-0-4" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-0-5" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
            </tr>
            <tr>
                  <td id="td-1-0" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-1-1" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-1-2" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-1-3" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-1-4" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-1-5" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
            </tr>
            <tr>
                  <td id="td-2-0" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-2-1" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-2-2" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-2-3" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-2-4" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-2-5" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
            </tr>
            <tr>
                  <td id="td-3-0" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-3-1" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-3-2" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-3-3" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-3-4" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-3-5" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
            </tr>
            <tr>
                  <td id="td-4-0" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-4-1" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-4-2" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-4-3" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-4-4" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
                  <td id="td-4-5" class="js-panel bg-primary">
                        <div class="js-content cover">?</div>
                        <div class="js-content question"></div>
                        <div class="js-content answer"></div>
                  </td>
            </tr>
      </tbody>
</table>
</div>
<div id="bottom-section">
</div>
`;
