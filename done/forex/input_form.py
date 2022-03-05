from flask_wtf import FlaskForm
from wtforms import FloatField, SelectField
from wtforms.validators import InputRequired, NumberRange

class InputForm(FlaskForm):
    from_currency_code = SelectField("Converting from", validators=[InputRequired()])
    to_currency_code = SelectField("Converting to", validators=[InputRequired()])
    from_amount = FloatField("From amount", validators=[InputRequired()])
