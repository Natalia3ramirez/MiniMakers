from flask import Blueprint, jsonify, session, request
from app.models import Pin, db
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import upload_file_to_s3, get_unique_filename
from app.forms import PinForm, UpdatePinForm
from .auth_routes import validation_errors_to_error_messages


pin_routes = Blueprint('pins', __name__)

# Delete a Pin

@pin_routes.route('/<int:pinId>', methods=['DELETE'])
@login_required
def delete_pin(pinId):
  current_user_id = current_user.to_dict()['id']
  current_pin = Pin.query.get(pinId)

  if not current_pin:
    return {'errors': "pin not found"}, 400
  if (current_user_id != current_pin.user_id):
    return {'errors': "can only delete your own pin"}, 401

  db.session.delete(current_pin)
  db.session.commit()

  return {"message":f"Successfully deleted review {pinId}"}


# get all pins
@pin_routes.route('/')
# @login_required
def get_all_pins():
  all_pins = Pin.query.all()
  print("this is the current user ---------->", current_user)
  return [pin.to_dict() for pin in all_pins]



#  get one pin by id
@pin_routes.route('/<int:id>')
def get_pin(id):
    one_pin = Pin.query.get(id)
    return one_pin.to_dict()


# post a pin
@pin_routes.route('/new', methods=['POST'])
@login_required
def createNewPin():

  form = PinForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    image_file = form.data["images"]
    image_file.filename = get_unique_filename(image_file.filename)
    upload = upload_file_to_s3(image_file)
    print(upload)

    if 'url' not in upload:
            return upload['errors']

    new_pin = Pin(
      user_id= form.data["user_id"],
      title= form.data['title'],
      images=upload["url"],
      description= form.data['description'],
      alt_text= form.data['alt_text'],
      website= form.data['website']
    )

    db.session.add(new_pin)
    db.session.commit()
    return new_pin.to_dict()


  print(form.errors)
  return {"errors": validation_errors_to_error_messages(form.errors)}


# Edit a pin
@pin_routes.route('/update/<int:pinId>', methods=['PUT'])
@login_required
def editPin(pinId):


  form = UpdatePinForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    pin = Pin.query.get(pinId)

    pin.title= form.data['title']
    pin.description= form.data['description']
    pin.alt_text= form.data['alt_text']
    pin.website= form.data['website']

    db.session.commit()

    return pin.to_dict()

  print(form.errors)
  return {"errors": validation_errors_to_error_messages(form.errors)}
