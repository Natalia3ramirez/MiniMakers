from flask import Blueprint, jsonify, session, request
from app.models import Board, db, PinnedBoard, Pin
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import PinForm, UpdatePinForm
from .auth_routes import validation_errors_to_error_messages


board_routes = Blueprint('boards', __name__)


# get all boards
@board_routes.route('/')
def get_all_board():

  all_boards = Board.query.all()
  print("------>", all_boards)
  return [board.to_dict() for board in all_boards]

  #  get one pin by id
@board_routes.route('/<int:id>')
@login_required
def get_board(id):
  one_board = Board.query.get(id)
  return one_board.to_dict()


# Get all PinnedBoards
@board_routes.route('/pinned')
def get_boards_with_pins():
    all_boards = PinnedBoard.query.all()
    print("these are all boards-------->", [board.to_dict() for board in all_boards])
    return [board.to_dict() for board in all_boards]

# Get PinnedBoard by ID
@board_routes.route('/pinned/<int:id>')
@login_required
def get_pinned_board(id):
  one_pinned_board = PinnedBoard.query.get(id)
  return one_pinned_board.to_dict()


# get all boards
# @board_routes.route('/')
# def get_all_board():

#   all_boards = Board.query.all()
#   print("------>", all_boards)
#   return [board.to_dict() for board in all_boards]
# def get_all_boards_with_pins():
#     all_boards = Board.query.all()

#     boards_with_pins = []
#     for board in all_boards:
#         board_data = board.to_dict()
#         pins = []
#         for pinned_board in board.pinned_boards:
#             pin_data = pinned_board.pins.to_dict()
#             pins.append(pin_data)
#         board_data['pins'] = pins
#         boards_with_pins.append(board_data)

#     return jsonify(boards_with_pins)




#  get one pin by id
# @board_routes.route('/<int:id>')
# @login_required
# def get_board(id):
#   one_board = Board.query.get(id)
#   return one_board.to_dict()


# @board_routes.route('/pinned')
# def get_pinned_boards():

#   all_pinned_boards = PinnedBoard.query.all()
#   # print("the all boards----->", all_boards)
#   # board_dict = {board.id: board for board in all_boards}
#   # print("the board dict----------->", board_dict)
#   # return {board.id: board for board in all_boards}
#   return [pinned_board.to_dict() for pinned_board in all_pinned_boards]




# from flask import Blueprint, jsonify
# from app.models import Board

# board_routes = Blueprint('boards', __name__)

# @board_routes.route('/pinned')
# def get_boards_with_pins():
#     all_boards = PinnedBoard.query.all()
#     print("these are all boards-------->", [board.to_dict() for board in all_boards])
#     return [board.to_dict() for board in all_boards]


# @board_routes.route('/pinned')
# def get_boards_with_pins():
#     try:
#         # Query the boards along with their associated pins
#         boards = Board.query.options(
#             db.joinedload(Board.pinned_boards).joinedload(PinnedBoard.pins)
#         ).all()

#         # Convert the data to JSON format
#         # boards_data = [board.to_dict() for board in boards]
#         boards_data = []
#         for board in boards:
#             board_data = board.to_dict()
#             board_data['pins'] = [pin.to_dict() for pinned_board in board.pinned_boards for pin in pinned_board.pins]
#             boards_data.append(board_data)

#         return jsonify(boards_data)

#     except Exception as e:
#         print(e)
#         return jsonify(error='An error occurred while fetching boards and pins'), 500





# @board_routes.route('/pinned/<int:id>')
# @login_required
# def get_pinned_board(id):
#   one_pinned_board = Board.query.get(id)
#   return one_pinned_board.to_dict()
