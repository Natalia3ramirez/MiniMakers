from flask import Blueprint, jsonify, session, request
from app.models import Pin, db
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import upload_file_to_s3, get_unique_filename

pin_routes = Blueprint('pins', __name__)


# get all pins
@pin_routes.route('/')
@login_required
def getPins():
  all_pins = Pin.query.all()
  return [pin.to_dict() for pin in all_pin]

#  get one pin by id
@pin_routes.route('/<int:id>')
def get_pin(id):
    one_pin = Pin.query.get(id)
    return one_pin.to_dict()
