from input_form import InputForm
from output_form import OutputForm
from flask import Flask, request, render_template, redirect, session, url_for, flash
from forex_python.converter import CurrencyRates #note: not using the CurrencyCodes, as the service has been unreliable and I found an alternative method using currencies.json file
from decimal import Decimal
from re import search
from calc import get_json_data, currency_convert, is_num

app = Flask(__name__, static_url_path='/static')        #note: the static_url_path is required to access the rates.json and currencies.json files
app.config['SECRET_KEY'] = "ABC123"

#
# app serves two pages:
#           /               - the input form for currencies and amount
#           /converted      - the output form for converted currency and amounts
#
# also has a redirected route for calculating the currency conversion
# some error handling is provided for invalid inputs that could happen if input form is not used
#


@app.route('/', methods=["GET", "POST"])        #note that the post method is also needed, for the redirect post if submit is valid
def show_input_form():

    # import ipdb; ipdb.set_trace()
    
    # load up the currencies.json file and store in options.
    # options will contain the list of currencies to choose to convert from and convert to

    options = []        
    unsorted_currencies = get_json_data('currencies.json')    
    currencies = sorted(unsorted_currencies, key = lambda i: i['name'])

    # the currencies list has to be converted to an array of tuple of currency code and currency name
    for x in currencies:

        # get list of currencies to populate SelectField
        t = (x['cc'], f"{x['name']}")
        options.append(t)

        # get two currencies to prefill the currency SelectFields
        if search("United States", x['name']):
            t1 = x
        elif search("Japan", x['name']):
            t2 = x

    form = InputForm()
    form.from_currency_code.choices = options
    form.from_currency_code.data = t1['cc']
    form.to_currency_code.choices = options
    form.to_currency_code.data = t2['cc']
    form.from_amount.data = '100'

    # import ipdb; ipdb.set_trace()

    if 'app_state_prev' not in session:
        session['app_state_prev'] = ''

    # we will ignore not redirect if session['app_state_prev'] == 'calc_convert' or session['app_state_prev'] == 'show_output_form'
    if session['app_state_prev'] == '': 
        # this validate_on_submit and redirect with code 307 is needed, or will result in a Method Not Allowed message.
        if request.method == 'POST' and form.validate_on_submit():
            session['app_state_prev'] = 'show_input_form'
            return redirect(url_for("calc_convert"), code=307)

    # clear out app_state_prev, whatever it was so that the next submit button click can be processed
    session['app_state_prev'] = ''

    # 307 Temporary Redirect
    # The server sends this response to direct the client to get the requested resource at another URI with same method that was 
    # used in the prior request. This has the same semantics as the 302 Found HTTP response code, with the exception that the user 
    # agent must not change the HTTP method used: if a POST was used in the first request, a POST must be used in the second request.

    if 'message' in session:
        if session['message'] == "":
            session.pop('_flashes', None)
        else:
            flash(session['message'])

    return render_template("input_form.html", form=form)


@app.route('/convert', methods=["POST"])
def calc_convert():
    from_currency_code = request.form['from_currency_code'] 
    to_currency_code = request.form['to_currency_code']
    from_amount = request.form['from_amount']
    
    # need to load up the currencies code again to look up the country currency symbols that are the inputs for calculation
    unsorted_currencies = get_json_data('currencies.json')
    currencies = sorted(unsorted_currencies, key = lambda i: i['name'])

    convert_from_country = ''
    from_symbol = ''
    convert_to_country = ''
    to_symbol = ''
    to_amount = ''

    for x in currencies:
        if search(to_currency_code, x['cc']):
            to_symbol = x['symbol']
            convert_to_country = x['name']     
        if search(from_currency_code, x['cc']):
            from_symbol = x['symbol']
            convert_from_country = x['name']   

    # import ipdb; ipdb.set_trace()

    if not is_num(from_amount):
        message = "Sorry unable to convert. Input not a valid number."
        session['message'] = message
        return redirect(url_for("show_input_form"))

    # import ipdb; ipdb.set_trace()
    from_amount = Decimal(from_amount)
    if  from_amount < 0:
        message = "Sorry positive numbers only."
        session['message'] = message
        return redirect(url_for("show_input_form"))

    # first we'll try to use the forex_python.converter service, however it's unreliable
    success = False
    try:
        currencyRates = CurrencyRates()
        to_amount = Decimal(currencyRates.convert(from_currency_code, to_currency_code, from_amount))
        success = True
    except:
        print("unable to convert with forex_python.converter service")

    # however if forex_python.converter service is not available, revert to using a conversion table provided as the rates.json file
    message = ""
    if not success:
        try:
            raw = get_json_data('rates.json')
            rates = raw['data']
            to_amount = Decimal(currency_convert(rates, from_currency_code, to_currency_code, from_amount))
        except:
            to_amount = ""
            message = "Sorry unable to convert. No conversion rate."
            print("unable to convert")

    session['convert_from_country'] = convert_from_country
    session['from_currency_code'] = from_currency_code
    session['from_symbol'] = from_symbol
    session['from_amount'] = from_amount

    session['convert_to_country'] = convert_to_country
    session['to_currency_code'] = to_currency_code
    session['to_symbol'] = to_symbol
    session['to_amount'] = to_amount

    session['message'] = message

    session['app_state_prev'] = 'show_output_form'

    return redirect(url_for("show_output_form"))


# all the calculations are done on /convert route
# the /converted route is to show the results and allow user to click back to input page
@app.route('/converted', methods=["GET", "POST"])
def show_output_form():

    form = OutputForm()
    form.convert_from_country.data = session['convert_from_country']
    form.from_currency_code.data = session['from_currency_code']
    form.from_symbol.data = session['from_symbol']
    form.from_amount.data = session['from_amount']
    form.convert_to_country.data = session['convert_to_country']
    form.to_currency_code.data = session['to_currency_code']
    form.to_symbol.data = session['to_symbol']
    form.to_amount.data = session['to_amount']

    if 'message' in session:
        if session['message'] == "":
            session.pop('_flashes', None)
        else:
            flash(session['message'])

    session['app_state_prev'] = 'show_output_form'

    #import ipdb; ipdb.set_trace()
    return render_template("output_form.html", form=form)

