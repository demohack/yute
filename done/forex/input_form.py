from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired

class InputForm(FlaskForm):
    convert_from = StringField("Converting from", validators=[InputRequired()])
    convert_to = StringField("Converting to", validators=[InputRequired()])
    amount = FloatField("Amount", validators=[InputRequired()])
