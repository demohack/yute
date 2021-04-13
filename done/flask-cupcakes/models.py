"""Models for Cupcake app."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

    db.drop_all()
    db.create_all()

class Cupcake(db.Model):
    """Cupcake"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    flavor = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    size = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    rating = db.Column(db.Float,
                     nullable=True,
                     unique=False)
    image = db.Column(db.Text,
                     default='https://tinyurl.com/demo-cupcake',
                     nullable=True,
                     unique=False)
    created_at = db.Column(db.DateTime,
                     nullable=True,
                     server_default=db.func.now(),
                     unique=False)

