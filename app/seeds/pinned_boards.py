from app.models import db, PinnedBoard, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_pinned_boards():

  pinned_board1 = PinnedBoard(
    board_id=5,
    pin_id= 11,
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  pinned_board2 = PinnedBoard(
    board_id=1,
    pin_id= 1,
    created_at= datetime(year=2023, month=3, day=12, hour=11, minute=0, second=0)
  )
  pinned_board3 = PinnedBoard(
    board_id=1,
    pin_id= 4,
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  pinned_board4 = PinnedBoard(
    board_id=1,
    pin_id= 6,
    created_at= datetime(year=2023, month=7, day=15, hour=10, minute=0, second=0)
  )
  pinned_board5 = PinnedBoard(
    board_id=1,
    pin_id= 10,
    created_at= datetime(year=2023, month=6, day=20, hour=14, minute=45, second=0)
  )
  pinned_board6 = PinnedBoard(
    board_id=1,
    pin_id= 16,
    created_at= datetime(year=2023, month=6, day=20, hour=14, minute=45, second=0)
  )
  pinned_board7 = PinnedBoard(
    board_id=2,
    pin_id= 2,
    created_at= datetime(year=2023, month=6, day=20, hour=14, minute=45, second=0)
  )
  pinned_board8 = PinnedBoard(
    board_id=2,
    pin_id= 8,
    created_at= datetime(year=2023, month=6, day=20, hour=14, minute=45, second=0)
  )
  pinned_board9 = PinnedBoard(
    board_id=2,
    pin_id= 12,
    created_at= datetime(year=2023, month=7, day=15, hour=10, minute=0, second=0)
  )
  pinned_board10 = PinnedBoard(
    board_id=2,
    pin_id= 14,
    created_at= datetime(year=2023, month=7, day=15, hour=10, minute=0, second=0)
  )
  pinned_board11 = PinnedBoard(
    board_id=2,
    pin_id= 17,
    created_at= datetime(year=2023, month=7, day=15, hour=10, minute=0, second=0)
  )
  pinned_board12 = PinnedBoard(
    board_id=2,
    pin_id= 11,
    created_at= datetime(year=2023, month=3, day=12, hour=11, minute=0, second=0)
  )
  pinned_board13 = PinnedBoard(
    board_id= 2,
    pin_id= 19,
    created_at= datetime(year=2023, month=3, day=12, hour=11, minute=0, second=0)
  )
  pinned_board14 = PinnedBoard(
    board_id=3,
    pin_id= 5,
    created_at= datetime(year=2023, month=3, day=12, hour=11, minute=0, second=0)
  )
  pinned_board15 = PinnedBoard(
    board_id=4,
    pin_id= 7,
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  pinned_board16 = PinnedBoard(
    board_id=4,
    pin_id= 15,
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  pinned_board17 = PinnedBoard(
    board_id=3,
    pin_id= 18,
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )
  pinned_board18 = PinnedBoard(
    board_id=4,
    pin_id= 20,
    created_at= datetime(year=2023, month=8, day=1, hour=12, minute=30, second=0)
  )

  pinned_board_list = [pinned_board1, pinned_board2, pinned_board3, pinned_board4, pinned_board5, pinned_board6, pinned_board7, pinned_board8, pinned_board9, pinned_board10,
pinned_board11, pinned_board12, pinned_board13, pinned_board14, pinned_board15, pinned_board16, pinned_board17, pinned_board18]

  pinned_boards_list = [db.session.add(board_item) for board_item in pinned_board_list]
  db.session.commit()


def undo_pinned_boards():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pinned_boards RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pinned_boards"))

    db.session.commit()
