# from flask.json import jsonify
from input_form import InputForm
from output_form import OutputForm
from flask import Flask, request, render_template, redirect, session, url_for
from forex_python.converter import CurrencyRates, CurrencyCodes
from decimal import Decimal
import ipdb

app = Flask(__name__)
app.config['SECRET_KEY'] = "ABC123"

@app.route('/', methods=["GET", "POST"])
def show_input_form():

    form = InputForm()
    form.convert_from.data = ''
    form.convert_to.data = ''
    form.amount.data = ''

    if form.validate_on_submit():
        return redirect(url_for("calc_convert"), code=307)

    return render_template("input_form.html", form=form)


@app.route('/convert', methods=["POST"])
def calc_convert():
    convert_from = request.form['convert_from']
    convert_to = request.form['convert_to']
    amount = request.form['amount']

    cc = CurrencyCodes()
    cr = CurrencyRates()
    currency_code = cc.get_symbol(convert_to)
    convert_amount = float(cr.convert(convert_from, convert_to, Decimal(amount)))

    session['convert_to'] = convert_to
    session['currency_code'] = currency_code
    session['convert_amount'] = convert_amount

    return redirect(url_for("show_output_form"))


@app.route('/converted', methods=["GET"])
def show_output_form():

    convert_to = session['convert_to']
    currency_code = session['currency_code']
    convert_amount = session['convert_amount']

    form = OutputForm()
    form.convert_to.data = convert_to
    form.currency_code.data = currency_code
    form.convert_amount.data = convert_amount

    # ipdb.set_trace()
    return render_template("output_form.html", form=form)
