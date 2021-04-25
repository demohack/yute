""" Flask app for learning authentication """

from flask import Flask, request, redirect, render_template, flash, jsonify, session
from config import settings, DB_CONFIG, config_app

app = Flask(__name__)
config_app(app)

from flask_debugtoolbar import DebugToolbarExtension
debug = DebugToolbarExtension(app)

from models import db, connect_db, User
connect_db(app)

from forms import RegisterUser, LoginUser
import json, datetime, time
from markupsafe import escape

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

        return redirect("/secret")

    else:
        return render_template("register.html", form=form)

@app.route("/users/<username>")
def show_user(username):
    user = User.query.filter_by(username='yute')
    return render_template("user.html", user=user)

@app.route("/login")
def show_login():

    form = LoginUser()

    if form.validate_on_submit():

        username = form.username.data
        password = form.password.data

        user = User.query.get_or_404(username)

        session[USER_KEY] = user.toJSON()

        return redirect("/secret")

    else:
        return render_template("login.html", form=form)


@app.route("/secret")
def show_secret():
    d_json = session.get(USER_KEY, json.dumps({}))
    print("d_json:", d_json)
    user = json.loads(d_json)
    print("user:", user)

    if not user:
        return redirect("/register")
    else:
        return render_template("secret.html", user=user)

@app.route("/logout")
def show_logout():

    d_json = session.get(USER_KEY, json.dumps({}))
    user = json.loads(d_json)
    if not user:
        return redirect("/register")
    else:
        session.pop(USER_KEY)
        return redirect("/")

