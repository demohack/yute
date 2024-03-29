"""Blogly application."""

from flask import Flask, request, redirect, render_template
from dotenv import dotenv_values

settings = dotenv_values("/Users/yu/sb/conf/.env") 

DB_CONFIG = {
    'driver': settings['PGDRIVER'],
    'user': settings['PGUSER'],
    'pw': settings['PGPASSWORD'],
    'db': settings['PGDATABASE'],
    'host': settings['PGHOST'],
    'port': settings['PGPORT'],
}

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = '{driver}://{user}:{pw}@{host}:{port}/{db}'.format_map(DB_CONFIG)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogly.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'testtest'
app.config['TESTING'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

users = [
    {
        "id": 0,
        "first_name": "Adam",
        "last_name": "Adam",
        "image_url": "Adam",
        "full_name": "Adam Adam",
        "deleted": False,
    },
    {
        "id": 1,
        "first_name": "Steve",
        "last_name": "Steve",
        "image_url": "Steve",
        "full_name": "Steve Steve",
        "deleted": False,
    }
]

# Import the os module
import os
cwd = os.getcwd()
# Print the current working directory
print("Current working directory: {0}".format(cwd))


@app.route("/")
def show_home():
    # GET /
    # Redirect to list of users. (We’ll fix this in a later step).
    return redirect("/users")

@app.route("/users")
def show_user_list():
    # GET /users
    # Show all users.
    # Make these links to view the detail page for the user.
    # Have a link here to the add-user form.

    # users = User.query.all()
    return render_template('users/users.html', users=users)

@app.route("/users/new")
def show_new_user_form():
    # GET /users/new
    # Show an add form for users

    return render_template('users/new_user_form.html')

@app.route("/users/new", methods=["POST"])
def do_add_new_user():
    # POST /users/new
    # Process the add form, adding a new user and going back to /users

    first_name = request.form['first_name'] if 'first_name' in request.form else None
    last_name = request.form['last_name'] if 'last_name' in request.form else None
    image_url = request.form['image_url'] if 'image_url' in request.form else None
    full_name = '{first_name} {last_name}'.format(first_name=first_name, last_name=last_name)

    users.append({
        "id": len(users),
        "first_name": first_name,
        "last_name": last_name,
        "image_url": image_url,
        "full_name": full_name,
        "deleted": False,
    })
    
    print("do_add_new_user", len(users)-1, first_name, last_name, image_url)
    # new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)

    # db.session.add(new_user)
    # db.session.commit()
    
    return redirect("/users")

@app.route("/users/<int:user_id>")
def show_user_info(user_id):
    # GET /users/[user-id]
    # Show information about the given user.
    # Have buttons to edit the info, delete the user, or show the full list.

    state = "view"
    user = users[user_id]

    # user = User.query.get_or_404(user_id)
    return render_template('users/edit_user_form.html', user=user, state=state)

@app.route("/users/<int:user_id>/edit")
def show_edit_user_form(user_id):
    # GET /users/[user-id]/edit
    # Have a cancel button that returns to the detail page for a user, and a save button that updates the user.

    state = "edit"
    user = users[user_id]

    # user = User.query.get_or_404(user_id)
    return render_template('users/edit_user_form.html', user=user, state=state)

@app.route("/users/<int:user_id>/edit", methods=["POST"])
def do_edit_user(user_id):
    # POST /users/[user-id]/edit
    # Process the edit form, returning the user to the /users page.

    user = users[user_id]
    user["first_name"] = request.form['first_name'] if 'first_name' in request.form else ""
    user["last_name"] = request.form['last_name'] if 'last_name' in request.form else ""
    user["full_name"] = '{first_name} {last_name}'.format(first_name=user["first_name"], last_name=user["last_name"])
    user["image_url"] = request.form['image_url'] if 'image_url' in request.form else ""

    # users[user_id]["first_name"] = user["first_name"]
    # users[user_id]["last_name"] = user["last_name"]
    # users[user_id]["image_url"] = user["image_url"]
    # db.session.add(user)
    # db.session.commit()

    print("do_edit_user", user_id, user["first_name"], user["last_name"], user["image_url"])

    return redirect("/users")

@app.route("/users/<int:user_id>/delete", methods=["POST"])
def do_delete_user(user_id):
    # POST /users/[user-id]/delete
    # Delete the user.

    # user = User.query.get_or_404(user_id)
    # db.session.delete(user)
    # db.session.commit()

    user = users[user_id]
    print("do_delete_user", user_id, user["first_name"], user["last_name"], user["image_url"])
    user["deleted"] = True

    return redirect("/users")
