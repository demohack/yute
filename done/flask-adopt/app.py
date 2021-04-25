"""Blogly application."""

from flask import Flask, request, redirect, render_template, flash
from config import settings, DB_CONFIG, config_app

app = Flask(__name__)
config_app(app)

from flask_debugtoolbar import DebugToolbarExtension
debug = DebugToolbarExtension(app)

from models import db, connect_db, Pet
connect_db(app)

from forms import AddPetForm, EditPetForm

#
# User routes
#

@app.route("/")
def show_home():
    # GET /
    # Redirect to list of users. (We’ll fix this in a later step).
    return redirect("/pets")


@app.route("/pets")
def show_pets():
    # The homepage (at route /) should list the pets:

    # name
    # show photo, if present
    # display “Available” in bold if the pet is available for adoption

    pets = Pet.query.all()
    return render_template('pets/pets.html', pets=pets)


@app.route("/add", methods=["GET", "POST"])
def add_pet():
    """Show add Pet form, and handle adding."""

    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data

        new_pet = Pet(name=form.name.data,
                        species=form.species.data,
                        age=form.age.data,
                        photo_url=form.photo.data,
                        notes=form.notes.data)

        db.session.add(new_pet)
        db.session.commit()

        flash(f"Added {new_pet.name}, a {new_pet.age} yro {new_pet.species}")
        return redirect("/pets")

    else:
        return render_template("pets/pet_add_form.html", form=form)


@app.route("/pets/<int:pet_id>/edit", methods=["GET", "POST"])
def edit_pet(pet_id):
    # name
    # show photo, if present
    # display “Available” in bold if the pet is available for adoption

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        form.populate_obj(pet)
        db.session.commit()
        # pet.save()

        flash(f"Updated {pet.name}, a {pet.age} yro {pet.species}")
        return redirect("/pets")
    else:
        return render_template("pets/pet_edit_form.html", form=form)
