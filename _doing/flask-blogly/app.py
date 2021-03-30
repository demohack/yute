"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'thisisatesttest'

from flask_debugtoolbar import DebugToolbarExtension
toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route("/")
def show_home():
# GET /
# Redirect to list of users. (We’ll fix this in a later step).


@app.route("/users")
def list_users():
# GET /users
# Show all users.
# Make these links to view the detail page for the user.
# Have a link here to the add-user form.

@app.route("/users/new")
def show_form():
# GET /users/new
# Show an add form for users

@app.route("/users/new", methods=["POST"])
def show_form():
# POST /users/new
# Process the add form, adding a new user and going back to /users

@app.route("/users/new", methods=["POST"])
def show_form():
# GET /users/[user-id]
# Show information about the given user.
# Have a button to get to their edit page, and to delete the user.

@app.route("/users/new", methods=["POST"])
def show_form():
# GET /users/[user-id]/edit
# Show the edit page for a user.
# Have a cancel button that returns to the detail page for a user, and a save button that updates the user.

@app.route("/users/new", methods=["POST"])
def show_form():
# POST /users/[user-id]/edit
# Process the edit form, returning the user to the /users page.

@app.route("/users/new", methods=["POST"])
def show_form():
# POST /users/[user-id]/delete
# Delete the user.





