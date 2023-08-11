from flask import Blueprint, jsonify, session, request
from app.models import Board, db, PinnedBoard
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import PinForm, UpdatePinForm
from .auth_routes import validation_errors_to_error_messages


board_routes = Blueprint('boards', __name__)


# get all boards
@board_routes.route('/')
# @login_required
def get_all_board():

  all_boards = Board.query.all()
  return [board.to_dict() for board in all_boards]




#  get one pin by id
@board_routes.route('/<int:id>')
def get_board(id):
  one_board = Board.query.get(id)
  return one_board.to_dict()


@board_routes.route('/pinned')
def get_pinned_boards():

  all_pinned_boards = PinnedBoard.query.all()
  # print("the all boards----->", all_boards)
  # board_dict = {board.id: board for board in all_boards}
  # print("the board dict----------->", board_dict)
  # return {board.id: board for board in all_boards}
  return [pinned_board.to_dict() for pinned_board in all_pinned_boards]


@board_routes.route('/pinned/<int:id>')
def get_pinned_board(id):
  one_pinned_board = Board.query.get(id)
  return one_pinned_board.to_dict()
