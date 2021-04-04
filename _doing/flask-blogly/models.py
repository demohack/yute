"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

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

