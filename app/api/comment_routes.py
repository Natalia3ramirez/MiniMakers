
from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import Comment, db
from app.forms import CommentForm


comment_routes = Blueprint('comments', __name__)

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
