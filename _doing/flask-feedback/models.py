from flask_sqlalchemy import SQLAlchemy
import json

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

    # db.drop_all()
    # db.create_all()


class User(db.Model):
    __tablename__ = "users"

    user_id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    username = db.Column(db.Text,
                     nullable=False,
                     unique=True)
    password = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    email = db.Column(db.Text,
                     nullable=True,
                     unique=False)
    first_name = db.Column(db.Text,
                     nullable=False,
                     unique=False)
    last_name = db.Column(db.Text,
                     nullable=False,
                     unique=False)

    def toJSON(self):
        d = {}
        d["user_id"] = self.user_id
        d["username"] = self.username
        d["password"] = self.password
        d["email"] = self.email
        d["first_name"] = self.first_name
        d["last_name"] = self.last_name

        return json.dumps(d)


