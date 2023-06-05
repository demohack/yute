"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DateField, IntegerField
from wtforms.validators import InputRequired, Optional, Email, URL, ValidationError


def valid_species():
    message = 'Must be a cat, dog, or porcupine.'

    def _species(form, field):
        if str(field.data).lower() not in ["cat", "dog", "porcupine"]:
            raise ValidationError(message)

    return _species

def valid_age(min=0, max=30):
    message = 'Must be between %d and %d years old.' % (min, max)

    def _age(form, field):
        l = field.data or 0
        if l < min or l > max:
            raise ValidationError(message)

    return _age


# https://wtforms.readthedocs.io/en/3.0.x/validators/#built-in-validators

class AddPetForm(FlaskForm):
    """Form for adding pet."""

    name = StringField("Name", validators=[InputRequired()])
    species = StringField("Species", validators=[InputRequired(), valid_species()])
    photo = StringField("Photo", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), valid_age(0,30)])
    notes = StringField("Notes", validators=[Optional()])


class EditPetForm(FlaskForm):
    """Form for adding pet."""

    name = StringField("Name", validators=[InputRequired()])
    species = StringField("Species", validators=[InputRequired(), valid_species()])
    photo = StringField("Photo", validators=[Optional(), URL()])
    age = IntegerField("Age", validators=[Optional(), valid_age(0,30)])
    notes = StringField("Notes", validators=[Optional()])
    adopted_at = DateField("Adopted at", validators=[Optional()])
