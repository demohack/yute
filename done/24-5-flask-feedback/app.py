""" Flask app for learning authentication """

from flask import Flask, flash, jsonify, redirect, render_template, request, session
from config import settings, DB_CONFIG, config_app

app = Flask(__name__)
config_app(app)

from flask_debugtoolbar import DebugToolbarExtension
debug = DebugToolbarExtension(app)

from models import db, connect_db, User, Feedback
connect_db(app)

from forms import RegisterUser, LoginUser, ProvideFeedback, DeleteFeedback, EditFeedback
import json, datetime, time
from markupsafe import escape
from werkzeug.exceptions import Unauthorized

USER_KEY = "user_data"


@app.route("/")
def show_home():
    return redirect("/register")


@app.route("/register", methods=['GET', 'POST'])
def show_register():

    form = RegisterUser()

    if form.validate_on_submit():

        username = form.username.data
        password = form.password.data
        first_name = form.first_name.data
        last_name = form.last_name.data
        email = form.email.data

        new_user = User(username=username,
                        password=password,
                        first_name=first_name,
                        last_name=last_name,
                        email=email)

        db.session.add(new_user)
        db.session.commit()

        session[USER_KEY] = new_user.toJSON()
        session['username'] = new_user.username

#        return redirect("/secret")
        return redirect(f"/users/{new_user.username}")

    else:
        return render_template("register.html", form=form)


@app.route("/login", methods=['GET', 'POST'])
def show_login():

    form = LoginUser()

    if form.validate_on_submit():

        username = form.username.data
        password = form.password.data

        user = User.query.filter(User.username==username).first()

        session[USER_KEY] = user.toJSON()
        session['username'] = user.username

#        return redirect("/secret")
        if user:
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors = ["Invalid username/password."]
            return render_template("login.html", form=form)

    return render_template("login.html", form=form)


@app.route("/logout")
def show_logout():

    d_json = session.get(USER_KEY, json.dumps({}))
    user = json.loads(d_json)

    if "username" in session:
        session.pop('username')

    if USER_KEY in session:
        session.pop(USER_KEY)

    return redirect("/login")


@app.route("/users/<username>")
def show_user(username):

    print("### session ", session)
    if "username" not in session or username != session['username']:
        raise Unauthorized()

    user = User.query.filter(User.username == username).first()
    form = DeleteFeedback()

    return render_template("user.html", user=user, form=form)


@app.route("/secret")
def show_secret():
    d_json = session.get(USER_KEY, json.dumps({}))
    user = json.loads(d_json)

    if not user:
        return redirect("/register")
    else:
        return render_template("secret.html", user=user)


@app.route("/feedback/<int:feedback_id>/update", methods=["GET", "POST"])
def update_feedback(feedback_id):
    """Show update-feedback form and process it."""

    feedback = Feedback.query.get(feedback_id)
    user = User.query.get(feedback.user_id)

    if "username" not in session or user.username != session['username']:
        raise Unauthorized()

    form = EditFeedback(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        return redirect(f"/users/{user.username}")

    return render_template("/edit_feedback.html", form=form, feedback=feedback)

@app.route("/feedback/<int:feedback_id>/delete", methods=["POST"])
def delete_feedback(feedback_id):
    """Delete feedback."""

    feedback = Feedback.query.get(feedback_id)
    user = User.query.get(feedback.user_id)

    if "username" not in session or user.username != session['username']:
        raise Unauthorized()

    form = DeleteFeedback()

    if form.validate_on_submit():
        db.session.delete(feedback)
        db.session.commit()

    return redirect(f"/users/{user.username}")


@app.route("/users/<username>/delete", methods=["POST"])
def remove_user(username):
    """Remove user and redirect to login."""

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    user = User.query.filter(User.username==username).first()

    db.session.delete(user)
    db.session.commit()
    session.pop("username")

    return redirect("/login")


@app.route("/users/<username>/feedback/new", methods=["GET", "POST"])
def new_feedback(username):
    """Show add-feedback form and process it."""

    if "username" not in session or username != session['username']:
        raise Unauthorized()

    form = ProvideFeedback()
    user = User.query.filter(User.username==username).first()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(
            title=title,
            content=content,
            user_id=user.user_id,
        )

        db.session.add(feedback)
        db.session.commit()

        return redirect(f"/users/{username}")

    else:
        return render_template("new_feedback.html", form=form)

