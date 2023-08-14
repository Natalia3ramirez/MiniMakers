from flask import Blueprint, jsonify, session, request
from app.models import Board, db, PinnedBoard, Pin
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import PinForm, UpdatePinForm, BoardForm, UpdateBoardForm, PinnedBoardForm
from .auth_routes import validation_errors_to_error_messages


board_routes = Blueprint('boards', __name__)




# Remove Pin from Board
@board_routes.route('/<int:boardId>/deletePin/<int:pinId>', methods=['DELETE'])
@login_required
def deletePinToBoard(boardId, pinId):



  board = Board.query.get(boardId)
  if board.user_id != current_user.id:
     return {"message":f"Board does not belong to current user"}
  else:
    board.pins = [pin for pin in board.pins if pinId != pin.id]
    db.session.commit()

  return board.to_dict()


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

# Create a Board
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


#Edit a board
@board_routes.route('/update/<int:boardId>', methods=['PUT'])
@login_required
def editBoard(boardId):


  form = UpdateBoardForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    board = Board.query.get(boardId)

    board.name= form.data['name']
    board.description= form.data['description']


    db.session.commit()

    return board.to_dict()

  print(form.errors)
  return {"errors": validation_errors_to_error_messages(form.errors)}




#  Delete a board
@board_routes.route('/<int:boardId>', methods=['DELETE'])
@login_required
def delete_board(boardId):
  current_user_id = current_user.to_dict()['id']
  current_board = Board.query.get(boardId)

  if not current_board:
    return {'errors': "board not found"}, 400
  if (current_user_id != current_board.user_id):
    return {'errors': "can only delete your own pin"}, 401

  db.session.delete(current_board)
  db.session.commit()

  return {"message":f"Successfully deleted Board {boardId}"}



#  Add pin to board

@board_routes.route('/add', methods=['PUT'])
@login_required
def addPinToBoard():

  form = PinnedBoardForm()
  form['csrf_token'].data = request.cookies['csrf_token']


  if form.validate_on_submit():
    board = Board.query.get(form.data['board_id'])
    pin = Pin.query.get(form.data['pin_id'])

    if not board or not pin:
      return {"error": "Invalid board_id or pin_id"}, 400


    board.pinned_boards.append(PinnedBoard(pin_id=pin.id))



    db.session.commit()
    return board.to_dict()


  print(form.errors)
  return {"errors": validation_errors_to_error_messages(form.errors)}







# # Get all PinnedBoards
# @board_routes.route('/pinned')
# def get_boards_with_pins():
#     all_boards = PinnedBoard.query.all()
#     print("these are all boards-------->", [board.to_dict() for board in all_boards])
#     return [board.to_dict() for board in all_boards]

# # Get PinnedBoard by ID
# @board_routes.route('/pinned/<int:id>')
# @login_required
# def get_pinned_board(id):
#   one_pinned_board = PinnedBoard.query.get(id)
#   return one_pinned_board.to_dict()


