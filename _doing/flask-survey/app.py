from flask import Flask, render_template, request
from markupsafe import escape
from surveys import satisfaction_survey

from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__, static_url_path='/static')

# Step Two: The Start Page
survey_responses = []
satisfaction_survey.num_questions = len(satisfaction_survey.questions)


@app.route('/')
def do_survey_form():
    return render_template("satisfaction_survey.html", survey=satisfaction_survey)


@app.route("/question/<int:question_id>", methods=['GET', 'POST'])
def do_question(question_id):
    # the jinja question form will figure out what question number is to be passed in
    survey_question = satisfaction_survey.questions[question_id]
    survey_question.survey_title = satisfaction_survey.title
    survey_question.question_id = question_id
    survey_question.num_questions = satisfaction_survey.num_questions
    return render_template("survey_question.html", question_id=question_id, question=survey_question)





#### testing

@app.route('/hello')
def do_hello_world():
    return f"<html><body>Hello world</body></html"


@app.route('/hello2')
def do_hello2():
    return render_template("hello2.html")


@app.route('/hello3')
def do_hello3():
    return render_template("hello3.html")

