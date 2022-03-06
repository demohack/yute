from flask_wtf import FlaskForm
from wtforms import StringField, FloatField

class OutputForm(FlaskForm):
    convert_from_country = StringField("From", render_kw={'readonly': True})
    from_currency_code = StringField("Currency Code", render_kw={'readonly': True})
    from_symbol = StringField("Symbol", render_kw={'readonly': True})
    from_amount = FloatField("Amount", render_kw={'readonly': True})
    convert_to_country = StringField("To", render_kw={'readonly': True})
    to_currency_code = StringField("Currency Code", render_kw={'readonly': True})
    to_symbol = StringField("Symbol", render_kw={'readonly': True})
    to_amount = FloatField("Amount", render_kw={'readonly': True})
