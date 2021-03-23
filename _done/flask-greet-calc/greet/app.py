from flask import Flask, request

app = Flask(__name__)


@app.route('/welcome')
def welcome():
    """return simple welcome message"""
    html = "welcome"
    return html

@app.route('/welcome/home')
def welcome_home():
    """return welcome home message"""

    html = "welcome home"
    return html

@app.route('/welcome/back')
def welcome_back():
    """return welcome back message"""

    html = "welcome back"
    return html
