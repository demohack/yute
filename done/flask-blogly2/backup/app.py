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
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogly.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'testtest'
app.config['TESTING'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

from flask_debugtoolbar import DebugToolbarExtension
app.config['SECRET_KEY'] = "SECRET!"
debug = DebugToolbarExtension(app)

from models import db, connect_db, User, Post
connect_db(app)
db.drop_all()
db.create_all()

# Import the os module
import os
# Print the current working directory
os.chdir("/Users/yu/Workspaces/htdocs/yute/_doing/flask-blogly2")
cwd = os.getcwd()
print("Current working directory: {0}".format(cwd))

#
# User routes
#


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
    print(app.config['SQLALCHEMY_DATABASE_URI'])
    users = User.query.all()
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

    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)

    db.session.add(new_user)
    db.session.commit()

    return redirect("/users")


@app.route("/users/<int:user_id>")
def show_user_info(user_id):
    # GET /users/[user-id]
    # Show information about the given user.
    # Have buttons to edit the info, delete the user, or show the full list.

    state = "view"

    user = User.query.get_or_404(user_id)
    return render_template('users/edit_user_form.html', user=user, state=state)


@app.route("/users/<int:user_id>/edit")
def show_edit_user_form(user_id):
    # GET /users/[user-id]/edit
    # Have a cancel button that returns to the detail page for a user, and a save button that updates the user.

    state = "edit"

    user = User.query.get_or_404(user_id)
    return render_template('users/edit_user_form.html', user=user, state=state)


@app.route("/users/<int:user_id>/edit", methods=["POST"])
def do_edit_user(user_id):
    # POST /users/[user-id]/edit
    # Process the edit form, returning the user to the /users page.

    user = User.query.filter_by(id=user_id).first()
    user.first_name = request.form['first_name'] if 'first_name' in request.form else ""
    user.last_name = request.form['last_name'] if 'last_name' in request.form else ""
    user.image_url = request.form['image_url'] if 'image_url' in request.form else ""

    db.session.commit()

    return redirect("/users")


@app.route("/users/<int:user_id>/delete", methods=["POST"])
def do_delete_user(user_id):
    # POST /users/[user-id]/delete
    # Delete the user.

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")


#
# Post routes
#


@app.route("/users/<int:user_id>/posts/new")
def show_new_post(user_id):
    # GET /users/[user-id]/posts/new
    # Show form to add a post for that user.

    return render_template('posts/new_post_form.html', user_id)


@app.route("/users/<int:user_id>/posts/new", methods=["POST"])
def do_new_post(user_id):
    # POST /users/[user-id]/posts/new
    # Handle add form; add post and redirect to the user detail page.

    title = request.form['title'] if 'title' in request.form else None
    content = request.form['content'] if 'content' in request.form else None

    new_post = Post(title=title, content=content, user_id=user_id)

    db.session.add(new_post)
    db.session.commit()

    return redirect("/users/{user_id}".format(user_id=user_id))


@app.route("/posts/<int:post_id>")
def show_post(post_id):
    # GET /posts/[post-id]
    # Show a post.
    # Show buttons to edit and delete the post.

    state = "view"

    post = Post.query.get_or_404(post_id)
    return render_template('posts/edit_post_form.html', post=post, state=state)


@app.route("/posts/<int:post_id>/edit")
def show_edit_post(post_id):
    # GET /posts/[post-id]/edit
    # Show form to edit a post, and to cancel (back to user page).

    state = "edit"

    post = Post.query.get_or_404(post_id)
    return render_template('posts/edit_post_form.html', post=post, state=state)


@app.route("/posts/<int:post_id>/edit", methods=["POST"])
def do_edit_post(post_id):
    # POST /posts/[post-id]/edit
    # Handle editing of a post. Redirect back to the post view.

    post = Post.query.filter_by(id=post_id).first()
    post.title = request.form['title'] if 'title' in request.form else ""
    post.content = request.form['content'] if 'content' in request.form else ""

    db.session.commit()

    return redirect("/posts")


@app.route("/posts/<int:post_id>/delete", methods=["POST"])
def do_delete_post(post_id):
    # POST /posts/[post-id]/delete
    # Delete the post.

    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    return redirect("/posts")
