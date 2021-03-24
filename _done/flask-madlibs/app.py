from flask import Flask, request, render_template
from random import choice, sample

from flask_debugtoolbar import DebugToolbarExtension
from stories import Story

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

story_prompts = ["place", "noun", "verb", "adjective", "plural_noun"]
story_text = "Once upon a time in a long-ago {place}, there lived a large {adjective} {noun}. It loved to {verb} {plural_noun}."

@app.route('/')
def index():
    """Return homepage."""

    return render_template("hello.html", fields=prompts)


# SIMPLE VERSION OF FORM/GREET

@app.route('/form')
def show_form():
    """Show MadLibs form."""

    return render_template("form.html", fields=story_prompts)


@app.route('/story')
def offer_greeting():
    """Show story."""

    story = Story(story_prompts, story_text)

    ans = {"place" : request.args["place"], 
            "noun" : request.args["noun"], 
            "verb" : request.args["verb"], 
            "adjective" : request.args["adjective"], 
            "plural_noun" : request.args["plural_noun"]}

    return render_template("story.html", text=story.generate(ans))

