from flask import Blueprint
from flask import render_template

bp = Blueprint("list", __name__)
# A Blueprint is a way to organize a group of related views and other code.

@bp.route("/list")
def index():
    """Show a list."""
    return render_template("list/index.html")


@bp.route("/list/bootstrap")
def bootstrap():
    """Show a list."""
    return render_template("list/bootstrap.html")
