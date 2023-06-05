from decimal import Decimal
import json, requests
from re import match
from flask import url_for


# get data from json file given a filename, assuming the file was stored on static folder
def get_json_data(filename):
    #import ipdb; ipdb.set_trace()

    try:
        url = url_for('static', filename = filename, _external = True)
        response = requests.get(url)    
    except requests.ConnectionError:
        print("connection error")

    data = None
    try:
        data = json.loads(response.text)
    except:
        print("unable to load json file")

    return data


# this the fall back currency convert function, which uses the converion table stored on rates.json file
def currency_convert(rates, from_currency_code, to_currency_code, from_amount):

    if from_currency_code == 'USD':
        to_amount = Decimal(from_amount) * Decimal(rates[to_currency_code])
    else:
        to_amount = Decimal(from_amount) * Decimal(rates[to_currency_code]) / Decimal(rates[from_currency_code])

    return to_amount


# uses regex, returns true if string is a number
def is_num(s):
    if match("^\d+?\.\d+?$", s) is None:
        return s.isdigit()
    return True
