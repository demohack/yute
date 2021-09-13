"""Test forex app"""

from unittest import TestCase
from app import app
from flask import session

# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class ForexAppTestCase(TestCase):
    """testing Flask app."""

    def test_show_input(self):
        with app.test_client() as client:
            # can now make requests to flask via `client`
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>FOREX INPUT</h1>', html)

    def test_show_input(self):
        with app.test_client() as client:
            # can now make requests to flask via `client`
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>FOREX INPUT</h1>', html)

    def test_submit_input(self):
        with app.test_client() as client:
            resp = client.post('/convert',
                               data={'convert_from': 'USD', 'convert_to': 'GBP', 'amount': '100'},
                               follow_redirects=False)
            self.assertEqual(resp.status_code, 302)

            resp = client.post('/convert',
                               data={'convert_from': 'USD', 'convert_to': 'GBP', 'amount': '100'},
                               follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('convert_to', html)
            self.assertIn('GBP', html)
            self.assertIn('convert_amount', html)
