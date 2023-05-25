from flask import Flask, render_template, request, session, redirect, flash, jsonify
import json
import datetime
import time
from markupsafe import escape
from boggle import Boggle

from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = "secrete key!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

BOGGLE_KEY = "boggle_state"
boggle_game = Boggle()

#
# routes
#


@app.route('/')
def do_boggle_start():
    game_state = get_game_state(restart=True)

    set_game_state(game_state)

    return render_template("boggle_start.html", game_state=game_state)


@app.route("/lookup")
def do_lookup():
    """Is word in list."""

    game_state = get_game_state()

    word = request.args["word"]
    result = boggle_game.check_valid_word(game_state["board"], word)

    set_game_state(game_state)

    return jsonify({'result': result})


@app.route("/score")
def do_score():
    game_state = get_game_state()

    score = int(request.args["score"])
    print("### score: " + str(score))

    high_score = int(game_state["high_score"])
    games_played = int(game_state["games_played"]) + 1

    if score > high_score:
        high_score = score
        game_state["high_score"] = str(high_score)

    game_state["games_played"] = str(games_played)

    set_game_state(game_state)

    return jsonify({'result': "good score!", 'high_score': high_score, 'games_played': games_played})

#
# helper functions
#


def get_game_state(restart=False):
    # load game_state {} from string stored in session, and create an empty {} if necessary
    boggle_json = session.get(BOGGLE_KEY, json.dumps({}))
    print(datetime.datetime.now().strftime(
        "%m/%d/%Y, %H:%M:%S") + " load game state: " + boggle_json)

    game_state = json.loads(boggle_json)

    if restart:
        game_state["title"] = "boggle game test"
        game_state["board"] = boggle_game.make_board()
        game_state["score"] = 0
        game_state["high_score"] = 0
        game_state["games_played"] = 0

    return game_state


def set_game_state(game_state):
    # dump game_state to json string
    session[BOGGLE_KEY] = json.dumps(game_state)
    print(datetime.datetime.now().strftime("%m/%d/%Y, %H:%M:%S") +
          " save game state: " + session[BOGGLE_KEY])
