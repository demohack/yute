from unittest import TestCase

from app import app
from models import db, User

from dotenv import dotenv_values

settings = dotenv_values("/Users/yu/sb/conf/.env") 

DB_CONFIG = {
    'driver': settings['PGDRIVER'],
    'user': settings['PGUSER'],
    'pw': settings['PGPASSWORD'],
    'db': settings['PGDATABASE'],
    'host': settings['PGHOST'],
    'port': settings['PGPORT'],
}

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = '{driver}://{user}:{pw}@{host}:{port}/{db}'.format_map(DB_CONFIG)
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    """Tests for views for Users."""

    def setUp(self):
        """Add sample user."""

        User.query.delete()

        first_name = "a"
        last_name = "a"
        image_url = "a"

        user = User(first_name=first_name, last_name=last_name, image_url=image_url)
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        """Clean up any fouled transaction."""

        db.session.rollback()

    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get("/")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h>Users list</h>", html)

    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h>Users list</h>", html)

    def test_add_user(self):
        with app.test_client() as client:
            d = {"first_name": "TestUser2", "last_name": "cat", "image_url": "20"}
            resp = client.post("/users/new", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("<h>Users list</h>", html)
