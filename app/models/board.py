from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func
from .pin import Pin
from .pinned_board import PinnedBoard


class Board(db.Model):
    __tablename__ = 'boards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = (db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    type = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # foreign key
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    # Relationships go here
    user = db.relationship("User", back_populates='boards')
    pinned_boards = db.relationship("PinnedBoard", back_populates='boards', cascade="all, delete-orphan")
    pins = db.relationship("Pin", secondary="pinned_boards", back_populates="boards")


    def to_dict(self):


        pinnedBoard = Pin.query.join(PinnedBoard).filter(PinnedBoard.board_id == self.id).all()

        pinLen = len(pinnedBoard)

        boardImages = []

        if pinLen > 0:
            boardImages = [pin.images for pin in pinnedBoard]


        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'boardImages': boardImages,
            'pinLen': pinLen,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            # 'pinned_boards': [pinned_board.to_dict() for pinned_board in self.pinned_boards]
        }

