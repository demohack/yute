"""Message model tests."""

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


class MessageModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        Likes.query.delete()
        Follows.query.delete()
        Message.query.delete()
        User.query.delete()

        self.users = []

        u1 = User.signup("test1", "email1@email.com", "password", None)
        uid1 = 1111
        u1.id = uid1
        self.users.append(u1)
        db.session.add(u1)

        u2 = User.signup("test2", "email2@email.com", "password", None)
        uid2 = 2222
        u2.id = uid2
        self.users.append(u2)
        db.session.add(u2)

        self.messages = []
        m1 = Message(text="text1", user_id=u1.id)
        self.messages.append(m1)
        db.session.add(m1)
        m2 = Message(text="text2", user_id=u1.id)
        self.messages.append(m2)
        db.session.add(m2)

        m3 = Message(text="text3", user_id=u2.id)
        self.messages.append(m3)
        db.session.add(m3)
        m4 = Message(text="text4", user_id=u2.id)
        self.messages.append(m4)
        db.session.add(m4)

        # if get_config_ipdb_break(): ipdb.set_trace()
        db.session.commit()

        u1 = User.query.get(uid1)
        u2 = User.query.get(uid2)

        self.u1 = u1
        self.uid1 = uid1

        self.u2 = u2
        self.uid2 = uid2

        self.client = app.test_client()


    def tearDown(self):
        res = super().tearDown()
        db.session.rollback()
        return res


    def test_message_model_record_created(self):
        """Does basic model work?"""
        # if get_config_ipdb_break(): ipdb.set_trace()

        m0 = self.messages[0]
        qm1 = Message.query.get(m0.id)

        # assert record created
        self.assertEqual(m0.text, qm1.text)
        self.assertEqual(m0.user_id, qm1.user_id)

    def test_message_model_user_liked(self):
        """Does basic model work?"""
        # if get_config_ipdb_break(): ipdb.set_trace()

        m0 = self.messages[0]
        u0 = self.users[0]
        u0.likes.append(m0)
        db.session.commit()

        r = Likes.query.filter(Likes.user_id==u0.id).all()

        # assert records exist
        self.assertTrue(len(r) > 0)

    def test_message_model_user_unliked(self):
        """Does basic model work?"""
        # if get_config_ipdb_break(): ipdb.set_trace()

        m0 = self.messages[0]
        u0 = self.users[0]
        u0.likes.append(m0)
        db.session.commit()

        u0.likes.remove(m0)
        db.session.commit()

        r = Likes.query.filter(Likes.user_id==u0.id).all()

        # assert records exist
        self.assertTrue(len(r) == 0)