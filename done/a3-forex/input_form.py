from flask_wtf import FlaskForm
from wtforms import FloatField, SelectField
from wtforms.validators import InputRequired, NumberRange

class InputForm(FlaskForm):
    from_currency_code = SelectField("From", validators=[InputRequired()])
    to_currency_code = SelectField("To", validators=[InputRequired()])
    from_amount = FloatField("Amount", validators=[InputRequired()])
