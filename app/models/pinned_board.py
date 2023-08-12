from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func


class PinnedBoard(db.Model):
    __tablename__ = 'pinned_boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # foreign key
    board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("boards.id")))
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")))


    # Relationships go here
    pins = db.relationship("Pin", back_populates='pinned_boards')
    boards = db.relationship("Board", back_populates='pinned_boards')


    def to_dict(self):
        return {
            "id": self.id,
            # "pins": self.pins.to_dict(),
            # "boards": self.boards.to_dict(),
            "pin_id": self.pin_id,
            "board_id": self.board_id,
            # 'boards': [board.to_dict() for board in self.boards],
            # 'pins': [board.to_dict() for board in self.pins],
        }
