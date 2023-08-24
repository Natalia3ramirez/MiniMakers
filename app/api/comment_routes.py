
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import Comment, db
from app.forms import UpdateCommentForm


comment_routes = Blueprint('comments', __name__)


# edit a comment

@comment_routes.route('/update/<int:commentId>', methods=['PUT'])
@login_required
def editComment(commentId):

  current_user_id = current_user.to_dict()['id']
  current_comment = Comment.query.get(commentId)

  if (current_user_id != current_comment.user_id):
    return {'errors': "can only edit your own comment"}, 401


  form = UpdateCommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    comment = Comment.query.get(commentId)

    comment.message= form.data['message']

    db.session.commit()
    return comment.to_dict()

  print(form.errors)
  return {"errors": validation_errors_to_error_messages(form.errors)}



# delete a comment
@comment_routes.route('/<int:commentId>', methods=['DELETE'])
@login_required
def deleteComment(commentId):
  current_user_id = current_user.to_dict()['id']
  current_comment = Comment.query.get(commentId)

  if not current_comment:
    return {'errors': "comment not found"}, 400
  if (current_user_id != current_comment.user_id):
    return {'errors': "can only delete your own comment"}, 401

  db.session.delete(current_comment)
  db.session.commit()

  return {"message":f"Successfully deleted Comment {commentId}"}
