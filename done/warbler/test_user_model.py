"""User model tests."""

# run these tests like:
#
#    python -m unittest test_user_model.py


import os
from unittest import TestCase
from sqlalchemy import exc

from config import get_config_ipdb_break
import ipdb
# if get_config_ipdb_break(): ipdb.set_trace()

from models import db, User, Message, Follows, Likes

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

# os.environ['DATABASE_URL'] = "postgresql:///warbler-test"


# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.drop_all()
db.create_all()


class UserModelTestCase(TestCase):
    """Test views for messages."""

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


    def test_user_model_record_created(self):
        """Does basic model work?"""
        # if get_config_ipdb_break(): ipdb.set_trace()

        u0 = self.users[0]
        qu1 = User.query.get(u0.id)

        # assert user record created
        self.assertEqual(u0.id, qu1.id)
        self.assertEqual(u0.email, qu1.email)
        self.assertEqual(u0.username, qu1.username)
        self.assertEqual(u0.password, qu1.password)


    def test_user_model_no_message_no_follower(self):
        """Does basic model work?"""
        # if get_config_ipdb_break(): ipdb.set_trace()

        qu1 = User.query.get(self.users[0].id)

        # User should have no messages & no followers
        self.assertEqual(len(qu1.messages), 0)
        self.assertEqual(len(qu1.followers), 0)


    def test_user_model_follower(self):
        """Does basic model work?"""
        # if get_config_ipdb_break(): ipdb.set_trace()

        qu1 = User.query.get(self.users[1].id)
        qu2 = User.query.get(self.users[2].id)

        qu1.following.append(qu2)
        db.session.commit()

        qu1 = User.query.get(self.users[1].id)
        qu2 = User.query.get(self.users[2].id)

        # User qu2 should have one follower, qu1
        self.assertTrue(qu1.is_following(qu2))
        self.assertTrue(qu2.is_followed_by(qu1))

        # User qu1 has no follower, and qu2 follows no one
        self.assertFalse(qu2.is_following(qu1))
        self.assertFalse(qu1.is_followed_by(qu2))



    def test_valid_signup(self):
        u_test = User.signup("testtesttest", "testtest@test.com", "password", None)
        uid = 99999
        u_test.id = uid
        db.session.commit()

        u_test = User.query.get(uid)
        self.assertIsNotNone(u_test)
        self.assertEqual(u_test.username, "testtesttest")
        self.assertEqual(u_test.email, "testtest@test.com")
        self.assertNotEqual(u_test.password, "password")
        # Bcrypt strings should start with $2b$
        self.assertTrue(u_test.password.startswith("$2b$"))

    def test_invalid_username_signup(self):
        invalid = User.signup(None, "test@test.com", "password", None)
        uid = 123456789
        invalid.id = uid
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_invalid_email_signup(self):
        invalid = User.signup("testtest", None, "password", None)
        uid = 123789
        invalid.id = uid
        with self.assertRaises(exc.IntegrityError) as context:
            db.session.commit()

    def test_invalid_password_signup(self):
        with self.assertRaises(ValueError) as context:
            User.signup("testtest", "email@email.com", "", None)

        with self.assertRaises(ValueError) as context:
            User.signup("testtest", "email@email.com", None, None)



    def test_valid_authentication(self):
        if get_config_ipdb_break(): ipdb.set_trace()

        u = User.authenticate(self.users[0].username, "password0")
        self.assertIsNotNone(u)
        self.assertEqual(u.id, self.users[0].id)

    def test_invalid_username(self):
        self.assertFalse(User.authenticate("badusername", "password"))

    def test_wrong_password(self):
        self.assertFalse(User.authenticate(self.users[0].username, "badpassword"))

