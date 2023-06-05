from flask import Flask, request

app = Flask(__name__)


@app.route('/add', methods = ['POST', 'GET'])
def add(a=0, b=0):
    """Adds a and b and returns result as the body"""

    if request.method == 'POST':
        a = request.form['a']
        b = request.form['b']
    elif request.method == 'GET':
        a = request.args.get('a')
        b = request.args.get('b')

    a = int(a)
    b = int(b)

    html = f"{a + b}"

    return html

@app.route('/sub', methods = ['POST', 'GET'])
def sub(a=0, b=0):
    """subtract b from a and returns result as the body"""

    if request.method == 'POST':
        a = request.form['a']
        b = request.form['b']
    elif request.method == 'GET':
        a = request.args.get('a')
        b = request.args.get('b')

    a = int(a)
    b = int(b)

    html = f"{a - b}"
    return html

@app.route('/mult', methods = ['POST', 'GET'])
def mult(a=0, b=0):
    """multiply a and b; returns result as the body"""

    if request.method == 'POST':
        a = request.form['a']
        b = request.form['b']
    elif request.method == 'GET':
        a = request.args.get('a')
        b = request.args.get('b')

    a = int(a)
    b = int(b)

    html = f"{a * b}"
    return html

@app.route('/div', methods = ['POST', 'GET'])
def div(a=0, b=0):
    """divide a by b; returns result as the body"""

    if request.method == 'POST':
        a = request.form['a']
        b = request.form['b']
    elif request.method == 'GET':
        a = request.args.get('a')
        b = request.args.get('b')

    a = int(a)
    b = int(b)

    html = f"{a / b}"
    return html

@app.route('/math/<op>', methods = ['POST', 'GET'])
def math(op):
    """divide a by b; returns result as the body"""

    if request.method == 'POST':
        a = request.form['a']
        b = request.form['b']
    elif request.method == 'GET':
        a = request.args.get('a')
        b = request.args.get('b')

    a = int(a)
    b = int(b)

    r = eval(op + f"({a},{b})")
    html = f"{r}"
    return html

