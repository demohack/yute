from flask import Flask, render_template, request, session, redirect, flash
from markupsafe import escape
from surveys import satisfaction_survey

from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = "secrete key!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

RESPONSES_KEY = "survey_responses"
satisfaction_survey.num_questions = len(satisfaction_survey.questions)

@app.route('/')
def do_survey_form():
    #seed the responses with blanks

    survey_responses = []
    for i in range(satisfaction_survey.num_questions):
        survey_responses.append("")

    session[RESPONSES_KEY] = survey_responses

    return render_template("satisfaction_survey.html", survey=satisfaction_survey)


@app.route("/answer/<int:question_id>", methods=['POST'])
def do_answer(question_id):
    # get session data
    survey_responses = session.get(RESPONSES_KEY)

    prev_question_id = question_id              # question to record answer
    choice = ""
    if 'choice' in request.form:
        choice = request.form['choice']
        survey_responses[prev_question_id] = choice

    # save session data
    session[RESPONSES_KEY] = survey_responses

    next_question_id = request.form['next-question-id']
    print(f'### record answer to {question_id} : {choice}')
    print(f'### next question {next_question_id}')

    return redirect(f"/question/{next_question_id}")


@app.route("/complete/<int:question_id>", methods=['POST'])
def do_complete_answer(question_id):
    # get session data
    survey_responses = session.get(RESPONSES_KEY)

    prev_question_id = question_id              # question to record answer
    choice = ""
    if 'choice' in request.form:
        choice = request.form['choice']
        survey_responses[prev_question_id] = choice

    # save session data
    session[RESPONSES_KEY] = survey_responses

    return render_template("complete.html", survey=satisfaction_survey)


@app.route("/question/<int:question_id>", methods=['POST', 'GET'])
def do_question(question_id):
    print(f'### question {question_id}')

    survey_responses = session.get(RESPONSES_KEY)

    if question_id < 0 or question_id >= satisfaction_survey.num_questions:
        # invalid question id, will be redirected to next unanswered question

        flash(f"Invalid question id {question_id}. You have been directed to the next unanswered question or back to start.")

        # if all questions have been answered, next_question_id will be set to 0
        next_question_id = 0

        # iterate through responses, look for blank
        for i, r in enumerate(survey_responses):
            if r == "":
                next_question_id = i
                break

        return redirect(f"/question/{next_question_id}")

    # get the next question
    survey_question = satisfaction_survey.questions[question_id]

    # add some meta-data about the survey to pass into the form
    survey_question.survey_title = satisfaction_survey.title
    survey_question.num_questions = satisfaction_survey.num_questions
    survey_question.question_id = question_id

    survey_question.choice = survey_responses[question_id]

    return render_template("survey_question.html", question=survey_question)
