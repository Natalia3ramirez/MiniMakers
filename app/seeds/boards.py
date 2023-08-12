from app.models import db, Board, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_boards():

  board1 = Board(
    user_id= 1,
    name= "Food inspiration",
    description= "Snacks and meals for kids.",
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  board2 = Board(
    user_id= 1,
    name= "Arts and Crafts",
    description= "Kid crafts",
    created_at= datetime(year=2023, month=3, day=12, hour=11, minute=0, second=0)
  )
  board3 = Board(
    user_id= 1,
    name= "Outdoor Activites",
    description= "Have some fun outside!",
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  board4 = Board(
    user_id= 1,
    name= "Indoor Activites",
    description= "For the days you're stuck inside.",
    created_at= datetime(year=2023, month=7, day=15, hour=10, minute=0, second=0)
  )
  board5 = Board(
    user_id= 2,
    name= "DIY for kids!",
    description= "Let them do it themselves!",
    created_at= datetime(year=2023, month=6, day=20, hour=14, minute=45, second=0)
  )
  board6 = Board(
    user_id= 2,
    name= "Empty Board",
    description= "This is EMPTY",
    created_at= datetime(year=2023, month=6, day=20, hour=14, minute=45, second=0)
  )

  board_item_list = [board1, board2, board3, board4, board5, board6]

  boards_list = [db.session.add(board_item) for board_item in board_item_list]
  db.session.commit()


def undo_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM boards"))

    db.session.commit()
