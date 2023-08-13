from flask import Blueprint, jsonify, session, request
from app.models import Board, db, PinnedBoard, Pin
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import PinForm, UpdatePinForm, BoardForm
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


@board_routes.route('/new', methods=['POST'])
@login_required
def createNewBoard():

  form = BoardForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():

    new_board = Board(
      user_id= form.data["user_id"],
      name= form.data['name'],
      description= form.data['description']
    )

    db.session.add(new_board)
    db.session.commit()
    return new_board.to_dict()


  print(form.errors)
  return {"errors": validation_errors_to_error_messages(form.errors)}




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


