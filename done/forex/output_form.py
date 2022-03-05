from flask_wtf import FlaskForm
from wtforms import StringField, FloatField

class OutputForm(FlaskForm):
    convert_from_country = StringField("Converted From", render_kw={'readonly': True})
    from_currency_code = StringField("From Currency Code", render_kw={'readonly': True})
    from_symbol = StringField("From Symbol", render_kw={'readonly': True})
    from_amount = FloatField("From Amount", render_kw={'readonly': True})
    convert_to_country = StringField("Converted To", render_kw={'readonly': True})
    to_currency_code = StringField("To Currency Code", render_kw={'readonly': True})
    to_symbol = StringField("To Symbol", render_kw={'readonly': True})
    to_amount = FloatField("To Amount", render_kw={'readonly': True})
