from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import db, Follow
from app.forms import FollowForm


follow_routes = Blueprint('follows', __name__)




@follow_routes.route('/<int:followId>', methods=['DELETE'])
@login_required
def delete_follow(followId):
  current_user_id = current_user.to_dict()['id']
  current_follow = Follow.query.get(followId)

  if not current_follow:
    return {'errors': "follow not found"}, 400
  if (current_user_id != current_pin.user_id):
    return {'errors': "can only delete your own follow"}, 401

  db.session.delete(current_follow)
  db.session.commit()

  return {"message":f"Successfully unfollowed {current_follow}"}



# follow a user

@follow_routes.route('/new', methods=['POST'])
def follow_user():

  form = FollowForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    new_follow = Follow(
      current_id = form.data['current_id'],
      following_id = form.data['following_id']
    )

    db.session.add(new_follow)
    db.session.commit()

    return new_follow.to_dict()
  return {"errors": validation_errors_to_error_messages(form.errors)}



# get all followers

@follow_routes.route('/')
def get_all_followers():
  all_followers = Follow .query.all()
  return [follow.to_dict() for follow in all_followers]
