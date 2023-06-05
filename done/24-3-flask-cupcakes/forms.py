"""Forms for our demo Flask app."""

from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, DateField, IntegerField
from wtforms.validators import InputRequired, Optional, Email, URL, ValidationError


# https://wtforms.readthedocs.io/en/3.0.x/validators/#built-in-validators

class CupcakeForm(FlaskForm):
    """Form for adding cupcake."""

    flavor = StringField("Flavor", validators=[InputRequired()])
    size = StringField("Size", validators=[InputRequired()])
    rating = StringField("Rating", validators=[Optional()])
    image = IntegerField("image", validators=[Optional(), URL()])
    notes = StringField("Notes", validators=[Optional()])
