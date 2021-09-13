from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired

class OutputForm(FlaskForm):
    convert_to = StringField("Converted to", render_kw={'readonly': True})
    currency_code = StringField("Currency Code", render_kw={'readonly': True})
    convert_amount = FloatField("Amount", render_kw={'readonly': True})
