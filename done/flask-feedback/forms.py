from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FloatField, DateField, IntegerField
from wtforms.validators import InputRequired, Length, Optional, Email, URL, ValidationError

class RegisterUser(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=6, max=55)])
    email = StringField("Email", validators=[InputRequired(), Length(min=0, max=50)])
    first_name = StringField("First Name", validators=[InputRequired(), Length(min=0, max=30)])
    last_name = StringField("Last Name", validators=[InputRequired(), Length(min=0, max=30)])

class LoginUser(FlaskForm):
    username = StringField("Username", validators=[InputRequired(), Length(min=1, max=20)])
    password = PasswordField("Password", validators=[InputRequired(), Length(min=6, max=55)])


class ProvideFeedback(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(min=0, max=100)])
    content = StringField("Content", validators=[InputRequired()])


class DeleteFeedback(FlaskForm):
    """Delete form -- this form is intentionally blank."""


class EditFeedback(FlaskForm):
    title = StringField("Title", validators=[InputRequired(), Length(min=0, max=100)])
    content = StringField("Content", validators=[InputRequired()])
