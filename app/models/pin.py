from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func


class Pin(db.Model):
    __tablename__ = 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = (db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    title = db.Column(db.String(50), nullable=False)
    images = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(500), nullable=True)
    alt_text = db.Column(db.String(255), nullable=True)
    website = db.Column(db.String(255))
    created_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True),
                           server_default=func.now(), onupdate=func.now())

    # foreign key
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))


    # Relationships go here
    user = db.relationship("User", back_populates='pins')
    pinned_boards = db.relationship("PinnedBoard", back_populates='pins', cascade="all, delete-orphan")



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'images': self.images,
            'description': self.description,
            'alt_text': self.alt_text,
            'website': self.website,
            'user_id': self.user_id,
            'pinned_boards': [pinned_board.to_dict() for pinned_board in self.pinned_boards],
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'user': {
                'id': self.user.id,
                'firstName': self.user.first_name,
                'lastName': self.user.last_name,
                'image': self.user.image
            }
        }

