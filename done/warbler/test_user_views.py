"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from config import get_config_ipdb_break
import ipdb
# if get_config_ipdb_break(): ipdb.set_trace()

from models import db, Message, User, Likes, Follows

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

# os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['TESTING'] = True
app.config['WTF_CSRF_ENABLED'] = False
app.config['WTF_CSRF_METHODS'] = []  # This is the magic

class UserViewTestCase(TestCase):
    """Test views for users."""

    def setUp(self):
        """Create test client, add sample data."""
        # if get_config_ipdb_break(): ipdb.set_trace()

        Likes.query.delete()
        Follows.query.delete()
        Message.query.delete()
        User.query.delete()

        self.users = []
        for i in range(5):
            u1 = User.signup(f"user{i}", f"user{i}@test.com", f"password{i}", None)
            self.users.append(u1)

        db.session.commit()

        self.client = app.test_client()


    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res


    def test_list_users(self):
        """Can't post to users page?"""

        with self.client as c:

            # if get_config_ipdb_break(): ipdb.set_trace()

            resp = c.get("/users")

            self.assertEqual(resp.status_code, 200)

            html = resp.get_data(as_text=True)

            # are test users in list?
            self.assertIn('user0', html)
            for u1 in self.users:
                self.assertIn(u1.username, html)


    def test_login(self):
        """Can login?"""

        with self.client as c:

            i = 0
            u1 = self.users[i]

            # if get_config_ipdb_break(): ipdb.set_trace()
            resp = c.post("/login", data={"username": f"{u1.username}", "password": f"password{i}"}, follow_redirects=False)
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 302)
            self.assertIn('You should be redirected automatically to target URL:', html)
            self.assertEqual(resp.request.path, "/login")

            # if get_config_ipdb_break(): ipdb.set_trace()
            resp = c.post("/login", data={"username": f"{u1.username}", "password": f"password{i}"}, follow_redirects=True)
            html = resp.get_data(as_text=True)
            self.assertEqual(resp.status_code, 200)
            self.assertEqual(resp.request.path, "/")


    def init_followers(self):
        """Does basic model work?"""
        # if get_config_ipdb_break(): ipdb.set_trace()

        i = 0
        u0 = User.query.get(self.users[i].id)

        for i in range(1, 5):
            u = User.query.get(self.users[i].id)
            u.following.append(u0)
            db.session.commit()



    def test_list_followers(self):
        """Can show followers?"""

        self.init_followers()

        with self.client as c:

            i = 0
            u1 = User.query.get(self.users[i].id)

            resp = c.post("/login", data={"username": f"{u1.username}", "password": f"password{i}"}, follow_redirects=True)
            resp = c.get(f"/users/{u1.id}/followers")

            # if get_config_ipdb_break(): ipdb.set_trace()
            self.assertEqual(resp.status_code, 200)

            html = resp.get_data(as_text=True)

            # if get_config_ipdb_break(): ipdb.set_trace()

            # are test users in list?
            for i in range(5):
                self.assertIn(f"user{i}", html)


