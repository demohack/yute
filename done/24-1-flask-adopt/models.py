"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

    # db.drop_all()
    # db.create_all()

class Pet(db.Model):
    """Pet"""

    __tablename__ = "pets"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    species = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    photo_url = db.Column(db.Text,
                     nullable=True,
                     unique=False)
    age = db.Column(db.Integer,
                     nullable=True,
                     unique=False)
    adopted_at = db.Column(db.Date,
                     nullable=True,
                     unique=False)
    notes = db.Column(db.Text,
                     nullable=True,
                     unique=False)
    created_at = db.Column(db.DateTime,
                     nullable=True,
                     server_default=db.func.now(),
                     unique=False)
    deleted = db.Column(db.Boolean,
                     nullable=True,
                     default=False,
                     unique=False)

