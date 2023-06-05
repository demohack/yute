"""Models for Blogly."""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

    # db.drop_all()
    # db.create_all()

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
    created_at = db.Column(db.DateTime,
                     nullable=False,
                     server_default=db.func.now(),
                     unique=False)
    deleted = db.Column(db.Boolean,
                     nullable=False,
                     default=False,
                     unique=False)
    image_url = db.Column(db.Text,
                     nullable=True,
                     unique=False)
    posts = db.relationship("Post")

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
# https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html

class PostTag(db.Model):
    """PostTag"""

    __tablename__ = "post_tags"
    post_id = db.Column(db.Integer,
                     db.ForeignKey('posts.id'),
                     primary_key=True)
    tag_id = db.Column(db.Integer,
                     db.ForeignKey('tags.id'),
                     primary_key=True)
    tag = db.relationship("Tag", back_populates="posts")
    post = db.relationship("Post", back_populates="tags")

# post_tags = db.Table('post_tags', db.Model.metadata,
#     db.Column('post_id', db.Integer, db.ForeignKey('posts.id')),
#     db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'))
# )

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
                     server_default=db.func.now(),
                     unique=False)
    user_id = db.Column(db.Integer,
                     db.ForeignKey('users.id'),
                     nullable=True,
                     unique=False)
    recipient_id = db.Column(db.Integer,
                     nullable=True,
                     unique=False)
    tags = db.relationship("PostTag", back_populates="post")


class Tag(db.Model):
    """Tag"""

    __tablename__ = "tags"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.Text,
                     nullable=True,
                     unique=False)
    posts = db.relationship("PostTag", back_populates="tag")
