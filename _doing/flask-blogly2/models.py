"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    """User"""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    last_name = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    deleted = db.Column(db.Boolean,
                     nullable=False,
                     default=False,
                     unique=False)
    image_url = db.Column(db.Text,
                     nullable=True,
                     unique=False)

    def get_full_name(self):
        """Return full name of user."""
        return f"{self.first_name} {self.last_name}"

    @property
    def full_name(self):
        """Return full name of user."""
        return f"{self.first_name} {self.last_name}"


# References
# https://stackoverflow.com/questions/13370317/sqlalchemy-default-datetime
# Calculate timestamps within your DB, not your client - Jeff Widman
# https://docs.sqlalchemy.org/en/14/core/defaults.html
# https://stackoverflow.com/questions/38878846/how-do-i-call-a-database-function-using-sqlalchemy-in-flask

class Post(db.Model):
    """Post"""

    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.Text,
                     nullable=True,
                     unique=False)
    content = db.Column(db.Text,
                     nullable=True,
                     unique=False)
    created_at = db.Column(db.DateTime,
                     nullable=False,
                     server_default=func.now(),
                     unique=False)
    user_id = db.Column(db.Integer,
                     nullable=True,
                     unique=False)
    recipient_id = db.Column(db.Integer,
                     nullable=True,
                     unique=False)

