"""Flask app for Cupcakes"""

from flask import Flask, request, redirect, render_template, flash, jsonify
from config import settings, DB_CONFIG, config_app

app = Flask(__name__)
config_app(app)

from flask_debugtoolbar import DebugToolbarExtension
debug = DebugToolbarExtension(app)

from forms import CupcakeForm
from models import db, connect_db, Cupcake
connect_db(app)


def serialize_cupcake(cupcake):
    """Serialize a cupcake SQLAlchemy obj to dictionary."""

    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image,
    }

@app.route("/api/cupcakes")
def get_all_cupcakes():
    """Return JSON {'cupcakes': [{id, flavor, size, rating, image}, ...]}"""
    # GET /api/cupcakes
    # Get data about all cupcakes.
    # Respond with JSON like: {cupcakes: [{id, flavor, size, rating, image}, ...]}.
    # The values should come from each cupcake instance.

    cupcakes = Cupcake.query.all()
    serialized = [serialize_cupcake(d) for d in cupcakes]

    return jsonify(cupcakes=serialized)


@app.route("/api/cupcakes/<cupcake_id>")
def get_single_cupcake(cupcake_id):
    """Return JSON {'cupcake': {id, flavor, size, rating, image}}"""
    # GET /api/cupcakes/[cupcake-id]
    # Get data about a single cupcake.
    # Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.
    # This should raise a 404 if the cupcake cannot be found.

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    serialized = serialize_cupcake(cupcake)

    return jsonify(cupcake=serialized)


@app.route("/api/cupcakes", methods=["POST"])
def create_cupcake():
    """Create cupcake from form data & return it.
    # POST /api/cupcakes
    # Create a cupcake with flavor, size, rating and image data from the body of the request.
    # Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.
    """

    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = request.json["rating"]
    image = request.json["image"]

    new_cupcake = Cupcake(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(new_cupcake)
    db.session.commit()

    serialized = serialize_cupcake(new_cupcake)

    # Return w/status code 201 --- return tuple (json, status)
    return (jsonify(cupcake=serialized), 201)


@app.route("/api/cupcakes/<cupcake_id>", methods=["PATCH"])
def update_cupcake(cupcake_id):
    """Update cupcake from form data & return it.
    # PATCH /api/cupcakes/[cupcake-id]
    # Update a cupcake with the id passed in the URL and flavor, size, rating and image data from the body of the request. You can always assume that the entire cupcake object will be passed to the backend.
    # This should raise a 404 if the cupcake cannot be found.
    # Respond with JSON of the newly-updated cupcake, like this: {cupcake: {id, flavor, size, rating, image}}.
    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    cupcake.flavor = request.json["flavor"]
    cupcake.size = request.json["size"]
    cupcake.rating = request.json["rating"]
    cupcake.image = request.json["image"]

    db.session.commit()

    serialized = serialize_cupcake(cupcake)

    # Return w/status code 201 --- return tuple (json, status)
    return (jsonify(cupcake=serialized), 200)



@app.route("/api/cupcakes/<cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """Delete cupcake.
    # DELETE /api/cupcakes/[cupcake-id]
    # This should raise a 404 if the cupcake cannot be found.
    # Delete cupcake with the id passed in the URL. Respond with JSON like {message: "Deleted"}.
    """

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()

    # Return w/status code 201 --- return tuple (json, status)
    return jsonify(message="Deleted")


@app.route("/")
def show_cupcake_list():
    # GET /
    # This should return an HTML page (via render_template). This page should be entirely static
    # (the route should just render the template, without providing any information on cupcakes in the database).
    # It should show simply have an empty list where cupcakes should appear and a form where new cupcakes can be added.
    # Write Javascript (using axios and jQuery) that:
    #   queries the API to get the cupcakes and adds to the page
    #   handles form submission to both let the API know about the new cupcake and updates the list on the page to show it

    form = CupcakeForm()

    return render_template("index.html", form=form)